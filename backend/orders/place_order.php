 
<?php
session_start();
include '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $customer_id = $_SESSION['customer_id'];
    $restaurant_id = $_POST['restaurant_id'];
    $total_price = $_POST['total_price'];
    $status = 'pending';

    // Insert into orders table
    $query = "INSERT INTO orders (customer_id, restaurant_id, total_price, status) VALUES ('$customer_id', '$restaurant_id', '$total_price', '$status')";
    if ($conn->query($query) === TRUE) {
        $order_id = $conn->insert_id;

        // Insert each item in the order_items table
        foreach ($_POST['items'] as $item) {
            $item_id = $item['item_id'];
            $quantity = $item['quantity'];
            $query = "INSERT INTO order_items (order_id, item_id, quantity) VALUES ('$order_id', '$item_id', '$quantity')";
            $conn->query($query);
        }

        echo "Order placed successfully!";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>

<form method="POST">
    Restaurant ID: <input type="number" name="restaurant_id" required>
    Total Price: <input type="number" name="total_price" required>
    <!-- Add order items dynamically based on the menu -->
    <input type="submit" value="Place Order">
</form>
