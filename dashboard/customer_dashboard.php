<?php
session_start();
include '../db_connect.php';

$customer_id = $_SESSION['customer_id'];

$query = "SELECT * FROM orders WHERE customer_id = '$customer_id'";
$result = $conn->query($query);

echo "<h1>Your Orders</h1>";
while ($order = $result->fetch_assoc()) {
    echo "<div>";
    echo "<p>Order ID: " . $order['order_id'] . "</p>";
    echo "<p>Status: " . $order['status'] . "</p>";
    echo "</div>";
}
?>
 
