<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Add CORS headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    // Define the path to the SQLite database
    $dbPath = './purchases.db'; // Adjust this path if necessary

    // Check if the database file exists
    if (!file_exists($dbPath)) {
        echo json_encode(['status' => 'error', 'message' => "Database file not found: $dbPath"]);
        exit();
    }

    // Open the SQLite database
    $db = new SQLite3($dbPath);

    // Prepare the query to get the budget history
    $query = 'SELECT * FROM budget ORDER BY date DESC';
    $result = $db->query($query);

    // Check if the query was successful
    if (!$result) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to execute query']);
        exit();
    }

    // Fetch the results and prepare the response data
    $budgets = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $budgets[] = $row;
    }

    // Return the data as a JSON response
    echo json_encode(['status' => 'success', 'data' => $budgets]);

    // Close the database connection
    $db->close();
} catch (Exception $e) {
    // Return any error message as JSON
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
