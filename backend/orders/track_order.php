 
<?php
session_start();
include '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $order_id = $_POST['order_id'];

    $query = "SELECT * FROM orders WHERE order_id = '$order_id'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $order = $result->fetch_assoc();
        echo "<h1>Order Status: " . $order['status'] . "</h1>";
    } else {
        echo "Order not found!";
    }
}
?>

<form method="POST">
    Order ID: <input type="number" name="order_id" required>
    <input type="submit" value="Track Order">
</form>
