<?php
// Add CORS headers to allow access from any origin
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Read the groceries.json file and output its content
$filePath = './groceries.json'; // Make sure the path is correct
if (file_exists($filePath)) {
    echo file_get_contents($filePath);
} else {
    echo json_encode(['status' => 'error', 'message' => 'File not found']);
}
?>
