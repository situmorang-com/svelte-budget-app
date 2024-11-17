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
    $dbPath = './purchases.db'; // Update the path accordingly

    if (!file_exists($dbPath)) {
        throw new Exception("Database file not found: $dbPath");
    }

    // Open SQLite database
    $db = new SQLite3($dbPath);

    // Handle POST request to add budget
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['amount'])) {
            $stmt = $db->prepare('INSERT INTO budget (date, amount) VALUES (:date, :amount)');
            if (!$stmt) {
                throw new Exception("Failed to prepare the SQL statement");
            }

            $stmt->bindValue(':date', date('Y-m-d'), SQLITE3_TEXT);
            $stmt->bindValue(':amount', $data['amount'], SQLITE3_FLOAT);

            // Execute with retry
            executeWithRetry($db, $stmt);

            echo json_encode(['status' => 'success', 'message' => 'Budget added successfully']);
        } else {
            throw new Exception("Invalid input data");
        }
    }

    $db->close();
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
