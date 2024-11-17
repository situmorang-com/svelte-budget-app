<?php
require 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$db = getDBConnection();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retrieve all expenses
    $stmt = $db->query('SELECT * FROM expenses');
    $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($expenses);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Create a new expense
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $db->prepare('INSERT INTO expenses (item_name, category, amount, date) VALUES (:item_name, :category, :amount, :date)');
    $stmt->execute([
        ':item_name' => $data['item_name'],
        ':category' => $data['category'],
        ':amount' => $data['amount'],
        ':date' => $data['date'],
    ]);
    echo json_encode(['status' => 'success']);
}
?>
