<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Add CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json');

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    $dbPath = './purchases.db'; // Update the path if needed

    // Check if the database file exists
    if (!file_exists($dbPath)) {
        throw new Exception("Database file not found: $dbPath");
    }

    // Open SQLite database with busyTimeout
    $db = new SQLite3($dbPath);
    $db->busyTimeout(5000); // Wait up to 5000 milliseconds if the database is locked

    // Read JSON input
    $inputData = json_decode(file_get_contents('php://input'), true);

    // Validate input data
    if (!isset($inputData['name']) || !isset($inputData['category']) || !isset($inputData['price']) || !isset($inputData['date']) || !isset($inputData['date' ]))) {
        throw new Exception("Missing required fields in input data");
    }

    // Prepare SQL statement
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

    // Execute statement with retry mechanism
    $maxRetries = 5;
    $success = false;

    for ($attempt = 1; $attempt <= $maxRetries; $attempt++) {
        $result = $stmt->execute();
        if ($result) {
            $success = true;
            break;
        } elseif ($db->lastErrorCode() == SQLITE3_BUSY) {
            usleep(rand(100000, 500000)); // Wait for a random time between 100ms and 500ms before retrying
        } else {
            throw new Exception("Failed to execute the SQL statement: " . $db->lastErrorMsg());
        }
    }

    if (!$success) {
        throw new Exception("Failed to execute the statement after multiple retries due to database lock");
    }

    // Send success response
    echo json_encode(['status' => 'success', 'message' => 'Purchase added successfully']);

    // Close the database
    $db->close();
} catch (Exception $e) {
    // Use output buffering to ensure all output is in JSON format
    ob_clean();
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    http_response_code(500);
} finally {
    // Make sure we end buffering and flush output
    if (ob_get_length()) {
        ob_end_flush();
    }
}
?>
