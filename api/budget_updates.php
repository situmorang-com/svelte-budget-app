<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Add CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    $dbPath = './purchases.db'; // Update the path accordingly

    if (!file_exists($dbPath)) {
        echo "data: " . json_encode(["error" => "Database file not found: $dbPath"]) . "\n\n";
        flush();
        exit();
    }

    // Open SQLite database
    $db = new SQLite3($dbPath);

    // Retry function to handle database lock issues
    function executeWithRetry($db, $query, $params = [], $maxRetries = 3, $sleepSeconds = 1) {
        $retryCount = 0;
        while ($retryCount < $maxRetries) {
            $stmt = $db->prepare($query);
            if (!$stmt) {
                throw new Exception("Failed to prepare the SQL statement");
            }

            // Bind parameters
            foreach ($params as $param => $value) {
                $stmt->bindValue($param, $value, is_int($value) ? SQLITE3_INTEGER : SQLITE3_TEXT);
            }

            $result = $stmt->execute();
            if ($result) {
                return $result;
            } else {
                if ($db->lastErrorCode() === SQLITE3_BUSY) {
                    $retryCount++;
                    sleep($sleepSeconds);
                } else {
                    throw new Exception("Failed to execute the SQL statement: " . $db->lastErrorMsg());
                }
            }
        }

        throw new Exception("Max retries reached. Unable to execute the SQL statement.");
    }

    // Handle POST request to add budget
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['amount'])) {
            $query = 'INSERT INTO budget (date, amount) VALUES (:date, :amount)';
            $params = [
                ':date' => date('Y-m-d'),
                ':amount' => $data['amount']
            ];

            executeWithRetry($db, $query, $params);
            echo json_encode(['status' => 'success', 'message' => 'Budget added successfully']);
            flush();
        } else {
            throw new Exception("Invalid input data");
        }
    }
    // Handle GET request for SSE
    elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        while (true) {
            try {
                // Query to get the total budget
                $query = 'SELECT SUM(amount) AS total FROM budget';
                $result = executeWithRetry($db, $query);
                
                $row = $result->fetchArray(SQLITE3_ASSOC);
                if (!$row) {
                    echo "data: " . json_encode(["total" => 0]) . "\n\n";
                } else {
                    $data = [
                        'total' => $row['total'] ?? 0 // Default to 0 if no budget is found
                    ];
                    echo "data: " . json_encode($data) . "\n\n";
                }

                flush();
                // Wait for 3 seconds before sending the next update
                sleep(3);
            } catch (Exception $e) {
                echo "data: " . json_encode(['status' => 'error', 'message' => $e->getMessage()]) . "\n\n";
                flush();
                sleep(3);
            }
        }
    }

    $db->close();
} catch (Exception $e) {
    echo "data: " . json_encode(['status' => 'error', 'message' => $e->getMessage()]) . "\n\n";
    flush();
}
?>
