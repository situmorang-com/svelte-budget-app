<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Add CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json');

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

function executeWithRetry($db, $stmt, $maxRetries = 5, $sleepDuration = 500000) {
    $attempt = 0;
    while ($attempt < $maxRetries) {
        try {
            $result = $stmt->execute();
            if ($result) {
                return $result;
            }
        } catch (Exception $e) {
            if (strpos($e->getMessage(), 'database is locked') !== false) {
                usleep($sleepDuration); // Sleep in microseconds
                $attempt++;
            } else {
                throw $e;
            }
        }
    }
    throw new Exception("Failed to execute the SQL statement after $maxRetries attempts");
}

try {
    $dbPath = './purchases.db'; // Update the path if needed

    // Check if the database file exists
    if (!file_exists($dbPath)) {
        throw new Exception("Database file not found: $dbPath");
    }

    // Open SQLite database with busyTimeout
    $db = new SQLite3($dbPath);
    //$db->busyTimeout(5000); // Wait up to 5000 milliseconds if the database is locked

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Read JSON input
        $inputData = json_decode(file_get_contents('php://input'), true);

        // Validate input data
        if (isset($inputData['name']) || isset($inputData['category']) || isset($inputData['price']) || isset($inputData['date']) || isset($inputData['quantity' ]))) {
            $stmt = $db->prepare('INSERT INTO purchases (name, category, price, date, quantity) VALUES (:name, :category, :price, :date, :quantity)');
            if (!$stmt) {
                throw new Exception("Failed to prepare the SQL statement: " . $db->lastErrorMsg());
            }
            
            // Bind values to the statement
            $stmt->bindValue(':name', $inputData['name'], SQLITE3_TEXT);
            $stmt->bindValue(':category', $inputData['category'], SQLITE3_TEXT);
            $stmt->bindValue(':price', $inputData['price'], SQLITE3_FLOAT);
            $stmt->bindValue(':date', $inputData['date'], SQLITE3_TEXT);
            $stmt->bindValue(':quantity', $inputData['quantity'], SQLITE3_INTEGER);
             // Execute with retry
            executeWithRetry($db, $stmt);
            echo json_encode(['status' => 'success', 'message' => 'Budget added successfully']);
        } else {
            throw new Exception("Missing required fields in input data");
        }
    }
    $db->close();
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>