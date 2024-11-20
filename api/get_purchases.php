<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Add headers for CORS and JSON content type
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Define the path to your SQLite database
$dbPath = './purchases.db'; // Update this path if needed

try {
    // Open the SQLite database
    $db = new SQLite3($dbPath);

    // Query to select all purchased items
    $result = $db->query('SELECT * FROM purchases');

    // Array to hold all purchased items
    $purchases = [];

    // Fetch data from the query result
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $purchases[] = $row;
    }

    // Close the database connection
    $db->close();

    // Output the data as JSON
    echo json_encode(['status' => 'success', 'data' => $purchases]);

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
