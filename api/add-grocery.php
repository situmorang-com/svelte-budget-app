<?php
// Allow Cross-Origin Requests if needed for local testing
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the input data from POST request
    $input = json_decode(file_get_contents("php://input"), true);

    if ($input && isset($input['name']) && isset($input['category']) && isset($input['price'])) {
        // Read the existing JSON file
        $filePath = 'data/groceries.json';
        $jsonString = file_get_contents($filePath);
        $groceries = json_decode($jsonString, true);

        // Add the new item to the groceries array
        $groceries['groceries'][] = $input;

        // Write the updated JSON data back to the file
        if (file_put_contents($filePath, json_encode($groceries, JSON_PRETTY_PRINT))) {
            echo json_encode(["message" => "Item added successfully"]);
        } else {
            echo json_encode(["message" => "Failed to save data"]);
        }
    } else {
        echo json_encode(["message" => "Invalid input"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>
