 
<?php
session_start();
include '../db_connect.php';

$driver_id = $_SESSION['driver_id'];  // Assuming driver is logged in

$query = "SELECT * FROM orders WHERE driver_id = '$driver_id' AND status = 'pending'";
$result = $conn->query($query);

echo "<h1>Your Deliveries</h1>";
while ($order = $result->fetch_assoc()) {
    echo "<div>";
    echo "<p>Order ID: " . $order['order_id'] . "</p>";
    echo "<p>Status: " . $order['status'] . "</p>";
    echo "</div>";
}
?>
