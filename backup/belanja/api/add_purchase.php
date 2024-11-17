<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Add CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Actual POST request handling
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);

        // Ensure data is valid
        if (isset($data['name'], $data['category'], $data['price'], $data['quantity'], $data['date'])) {
            $dbPath = './purchases.db'; // Update path accordingly

            if (!file_exists($dbPath)) {
                throw new Exception("Database file not found: $dbPath");
            }

            // Open SQLite database
            $db = new SQLite3($dbPath);

            // Prepare SQL statement
            $stmt = $db->prepare('INSERT INTO purchased_items (name, category, price, quantity, date) VALUES (:name, :category, :price,:quantity, :date)');
            if (!$stmt) {
                throw new Exception("Failed to prepare the SQL statement");
            }

            // Bind parameters
            $stmt->bindValue(':name', $data['name'], SQLITE3_TEXT);
            $stmt->bindValue(':category', $data['category'], SQLITE3_TEXT);
            $stmt->bindValue(':price', $data['price'], SQLITE3_FLOAT);
            $stmt->bindValue(':quantity', $data['quantity'], SQLITE3_INTEGER);
            $stmt->bindValue(':date', $data['date'], SQLITE3_TEXT);

            // Execute statement
            $result = $stmt->execute();

            if ($result) {
                echo json_encode(['status' => 'success', 'message' => 'Item added to the database']);
            } else {
                throw new Exception("Failed to execute the SQL statement");
            }

            $db->close();
        } else {
            throw new Exception("Invalid input data");
        }
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
