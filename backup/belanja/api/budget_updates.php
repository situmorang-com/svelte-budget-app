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

try {
    $dbPath = './purchases.db'; // Update the path accordingly

    if (!file_exists($dbPath)) {
        throw new Exception("Database file not found: $dbPath");
    }

    // Open SQLite database
    $db = new SQLite3($dbPath);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['amount'])) {
            $stmt = $db->prepare('INSERT INTO budget (date, amount) VALUES (:date, :amount)');
            if (!$stmt) {
                throw new Exception("Failed to prepare the SQL statement");
            }

            $stmt->bindValue(':date', date('Y-m-d'), SQLITE3_TEXT);
            $stmt->bindValue(':amount', $data['amount'], SQLITE3_FLOAT);

            $result = $stmt->execute();
            if ($result) {
                echo json_encode(['status' => 'success', 'message' => 'Budget added successfully']);
            } else {
                throw new Exception("Failed to execute the SQL statement");
            }
        } else {
            throw new Exception("Invalid input data");
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $result = $db->query('SELECT * FROM budget ORDER BY date DESC');
        $budgets = [];
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $budgets[] = $row;
        }
        echo json_encode(['status' => 'success', 'data' => $budgets]);
    }

    $db->close();
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
