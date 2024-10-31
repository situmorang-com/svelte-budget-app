<?php
function getDBConnection() {
    try {
        $db = new PDO('sqlite:' . __DIR__ . '/data/budget.db');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $db;
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
        return null;
    }
}
?>
