<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight request
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['name'], $data['category'], $data['price'])) {
        $newItem = [
            'name' => $data['name'],
            'category' => $data['category'],
            'price' => number_format((float)$data['price'], 0, '.', ',')
        ];

        $filePath = '../api/groceries.json';
        if (file_exists($filePath)) {
            $groceries = json_decode(file_get_contents($filePath), true);
            // Check if item already exists
            $exists = false;
            foreach ($groceries['groceries'] as $item) {
                if (strtolower($item['name']) === strtolower($newItem['name'])) {
                    $exists = true;
                    break;
                }
            }
            if (!$exists) {
                $groceries['groceries'][] = $newItem;
                file_put_contents($filePath, json_encode($groceries, JSON_PRETTY_PRINT));
                echo json_encode(['status' => 'success', 'message' => 'Item added to groceries list']);
            } else {
                echo json_encode(['status' => 'exists', 'message' => 'Item already exists']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Groceries file not found']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
