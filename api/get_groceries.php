<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Add CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json');

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    $jsonPath = './groceries.json'; // Update this path if necessary

    if (!file_exists($jsonPath)) {
        throw new Exception("JSON file not found: $jsonPath");
    }

    // Read the JSON file
    $jsonData = file_get_contents($jsonPath);

    if ($jsonData === false) {
        throw new Exception("Unable to read the JSON file.");
    }

    // Decode to ensure it's valid JSON
    $data = json_decode($jsonData, true);
    if ($data === null) {
        throw new Exception("Invalid JSON format.");
    }

    // Output JSON response without extra nesting
    echo json_encode(['status' => 'success', 'groceries' => $data['groceries'] ?? $data]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
