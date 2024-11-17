<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Add CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

// Define the retry function to handle database lock issues
function executeWithRetry($stmt, $retries = 5, $delay = 100) {
    for ($i = 0; $i < $retries; $i++) {
        try {
            $result = $stmt->execute();
            if ($result) {
                return $result;
            }
        } catch (Exception $e) {
            if (strpos($e->getMessage(), 'database is locked') !== false) {
                usleep($delay * 1000); // Delay in milliseconds
            } else {
                throw $e; // Re-throw if it's not a "database is locked" error
            }
        }
    }
    throw new Exception("Failed to execute the statement after multiple retries due to database lock");
}

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    $dbPath = './purchases.db';

    if (!file_exists($dbPath)) {
        throw new Exception("Database file not found: $dbPath");
    }

    // Open SQLite database
    $db = new SQLite3($dbPath);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['name'], $data['category'], $data['price'], $data['date'], $data['quantity'])) {
            // Prepare SQL statement
            $stmt = $db->prepare('INSERT INTO purchased_items (name, category, price, date, quantity) VALUES (:name, :category, :price, :date, :quantity)');
            if (!$stmt) {
                throw new Exception("Failed to prepare the SQL statement");
            }

            // Bind parameters
            $stmt->bindValue(':name', $data['name'], SQLITE3_TEXT);
            $stmt->bindValue(':category', $data['category'], SQLITE3_TEXT);
            $stmt->bindValue(':price', $data['price'], SQLITE3_FLOAT);
            $stmt->bindValue(':date', $data['date'], SQLITE3_TEXT);
            $stmt->bindValue(':quantity', $data['quantity'], SQLITE3_INTEGER);

            // Execute statement with retry logic
            executeWithRetry($stmt);

            echo json_encode(['status' => 'success', 'message' => 'Item added to the database']);
        } else {
            throw new Exception("Invalid input data");
        }
    }

    $db->close();
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    http_response_code(500);
}
?>
