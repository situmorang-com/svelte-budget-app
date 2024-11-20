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
// Connect to SQLite database
$dbPath = './purchases.db';
if (!file_exists($dbPath)) {
    echo "data: " . json_encode(['error' => "Database file not found: $dbPath"]) . "\n\n";
    flush();
    exit();
}

try {
    $db = new SQLite3($dbPath);
    $jsonPath = './groceries.json';

    // Check if the groceries file exists
    if (!file_exists($jsonPath)) {
        echo "data: " . json_encode(['error' => "Groceries file not found: $jsonPath"]) . "\n\n";
        flush();
        exit();
    }

    // Endless loop to keep the connection alive and send data updates
    while (true) {
        // Purchases data
        $purchaseResult = $db->query("SELECT * FROM purchases");
        $purchases = [];
        while ($row = $purchaseResult->fetchArray(SQLITE3_ASSOC)) {
            $purchases[] = $row;
        }

        // Budget data
        $budgetResult = $db->query("SELECT SUM(amount) as total FROM budget");
        $budgetTotal = 0;
        if ($budgetRow = $budgetResult->fetchArray(SQLITE3_ASSOC)) {
            $budgetTotal = $budgetRow['total'] ?? 0;
        }

        // Groceries data from JSON file
        $jsonData = file_get_contents($jsonPath);
        $groceries = json_decode($jsonData, true);

        if ($groceries === null) {
            echo "data: " . json_encode(['error' => "Invalid JSON format in groceries file"]) . "\n\n";
            flush();
            sleep(3);
            continue;
        }

        // Send the updates as SSE messages
        $data = [
            'purchases' => $purchases,
            'budget' => ['total' => $budgetTotal],
            'groceries' => $groceries['groceries'] ?? []
        ];

        echo "data: " . json_encode($data) . "\n\n";
        flush();

        // Sleep for a few seconds before sending the next update
        sleep(3);
    }

    $db->close();
} catch (Exception $e) {
    echo "data: " . json_encode(['error' => $e->getMessage()]) . "\n\n";
    flush();
}
?>
