<?php
// backend/track_order.php

include '../db_connect.php';

if (isset($_GET['order_id'])) {
    $order_id = intval($_GET['order_id']);
    $query = "SELECT orders.status, orders.order_date, restaurants.name AS restaurant_name
              FROM orders 
              JOIN restaurants ON orders.restaurant_id = restaurants.restaurant_id
              WHERE order_id = $order_id";
    
    $result = $conn->query($query);
    if ($row = $result->fetch_assoc()) {
        echo json_encode($row);
    } else {
        echo json_encode(['error' => 'Order not found']);
    }
} else {
    echo json_encode(['error' => 'No order ID provided']);
}
?>
