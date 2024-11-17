<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['amount']) && isset($data['date'])) {
            $dbPath = './purchases.db'; 

            if (!file_exists($dbPath)) {
                throw new Exception("Database file not found: $dbPath");
            }

            $db = new SQLite3($dbPath);

            $stmt = $db->prepare('INSERT INTO budget (date, amount) VALUES (:date, :amount)');
            if (!$stmt) {
                throw new Exception("Failed to prepare the SQL statement");
            }

            $stmt->bindValue(':amount', $data['amount'], SQLITE3_FLOAT);
            $stmt->bindValue(':date', $data['date'], SQLITE3_TEXT);


            $result = $stmt->execute();

            if ($result) {
                echo json_encode(['status' => 'success', 'message' => 'Budget added to the database']);
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
