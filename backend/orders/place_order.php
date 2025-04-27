<?php
// backend/place_order.php

include '../db_connect.php';

// Ensure request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read raw POST body and decode JSON
    $input = json_decode(file_get_contents("php://input"), true);

    // Validate input
    if (!isset($input['customer_id'], $input['restaurant_id'], $input['items'])) {
        echo json_encode(['error' => 'Missing required data']);
        exit;
    }

    $customer_id = intval($input['customer_id']);
    $restaurant_id = intval($input['restaurant_id']);
    $items = $input['items']; // should be an array of item_id + quantity

    $total_price = 0;

    // Calculate total
    foreach ($items as $item) {
        $item_id = intval($item['item_id']);
        $quantity = intval($item['quantity']);

        $stmt = $conn->prepare("SELECT price FROM menu_items WHERE item_id = ?");
        $stmt->bind_param("i", $item_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            $total_price += $row['price'] * $quantity;
        }

        $stmt->close();
    }

    // Insert into orders table
    $stmt = $conn->prepare("INSERT INTO orders (customer_id, restaurant_id, total_price, status) VALUES (?, ?, ?, 'Pending')");
    $stmt->bind_param("iid", $customer_id, $restaurant_id, $total_price);
    $stmt->execute();
    $order_id = $stmt->insert_id;
    $stmt->close();

    // Insert order items
    $stmt = $conn->prepare("INSERT INTO order_items (order_id, item_id, quantity) VALUES (?, ?, ?)");
    foreach ($items as $item) {
        $item_id = intval($item['item_id']);
        $quantity = intval($item['quantity']);
        $stmt->bind_param("iii", $order_id, $item_id, $quantity);
        $stmt->execute();
    }
    $stmt->close();

    echo json_encode(['success' => true, 'order_id' => $order_id]);
} else {
    echo json_encode(['error' => 'Invalid request']);
}
