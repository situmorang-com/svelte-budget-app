<?php
// Enable full error reporting for debugging
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
    // Step 1: Read JSON input from the request
    $input = file_get_contents('php://input');
    if ($input === false) {
        throw new Exception("Failed to read POST data.");
    }

    // Decode the JSON input
    $data = json_decode($input, true);
    if ($data === null) {
        throw new Exception("Invalid JSON input: " . json_last_error_msg());
    }

    // Step 2: Validate input data
    $requiredFields = ['name', 'category', 'price', 'date', 'quantity'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Step 3: Set up SQLite database connection
    $dbPath = './purchases.db'; // Ensure this path is correct
    if (!file_exists($dbPath)) {
        throw new Exception("Database file not found: $dbPath");
    }

    // Open SQLite database
    $db = new SQLite3($dbPath);
    $db->busyTimeout(5000); // Set busy timeout to wait for locks


    // Step 4: Prepare SQL statement with retry mechanism
    $maxRetries = 5;
    $retryDelay = 200000; // 200ms delay between retries
    $attempt = 0;
    $success = false;

    $db->exec('BEGIN');
    while ($attempt < $maxRetries && !$success) {
        try {
            $stmt = $db->prepare('INSERT INTO purchases (name, category, price, date, quantity) VALUES (:name, :category, :price, :date, :quantity)');
            if (!$stmt) {
                throw new Exception("Failed to prepare the SQL statement: " . $db->lastErrorMsg());
            }

            // Bind parameters to the SQL statement
            $stmt->bindValue(':name', $data['name'], SQLITE3_TEXT);
            $stmt->bindValue(':category', $data['category'], SQLITE3_TEXT);
            $stmt->bindValue(':price', $data['price'], SQLITE3_FLOAT);
            $stmt->bindValue(':date', $data['date'], SQLITE3_TEXT);
            $stmt->bindValue(':quantity', $data['quantity'], SQLITE3_INTEGER);

            // Execute the statement
            $result = $stmt->execute();
            if (!$result) {
                throw new Exception("Failed to execute the SQL statement: " . $db->lastErrorMsg());
            }

            $db->exec('COMMIT');
            $success = true;
        } catch (Exception $e) {
            $attempt++;
            $db->exec('ROLLBACK'); // Rollback transaction if it fails

            if ($attempt >= $maxRetries) {
                throw new Exception("Failed to execute the SQL statement after multiple retries due to database lock: " . $e->getMessage());
            }
            usleep($retryDelay); // Wait longer before retrying
        }
    }

    // Step 5: Return success response
    echo json_encode(['status' => 'success', 'message' => 'Purchase added successfully']);
} catch (Exception $e) {
    // Return error response in JSON format
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    exit(1);
} finally {
    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($db)) {
        $db->close(); // Close the database connection
    }
}
?>
