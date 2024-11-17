<?php
// delete_purchase.php

// Set the content type to JSON
header('Content-Type: application/json');

try {
    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
        exit;
    }

    // Get the JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['id'])) {
        echo json_encode(['status' => 'error', 'message' => 'Missing purchase ID']);
        exit;
    }

    $purchaseId = $input['id'];

    // Connect to the SQLite database
    $db = new PDO('sqlite:./purchases.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare the DELETE statement
    $stmt = $db->prepare('DELETE FROM purchased_items WHERE id = :id');
    $stmt->bindParam(':id', $purchaseId, PDO::PARAM_INT);

    // Execute the DELETE statement
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Purchase deleted successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete purchase']);
    }
} catch (Exception $e) {
    // Handle exceptions
    echo json_encode(['status' => 'error', 'message' => 'Exception: ' . $e->getMessage()]);
}
?>
