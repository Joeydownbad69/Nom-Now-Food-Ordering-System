<?php include '../includes/db.php'; ?>

<!DOCTYPE html>
<html>
<head>
    <title>Rider Dashboard</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <h1>Delivery Tasks</h1>

    <table border="1">
        <tr><th>Order ID</th><th>Customer</th><th>Address</th><th>Status</th></tr>

        <?php
        // Example: show orders assigned to driver_id = 1
        $driver_id = 1; 

        $sql = "SELECT o.order_id, c.name AS customer_name, c.address, o.status
                FROM orders o
                JOIN customers c ON o.customer_id = c.customer_id
                WHERE o.driver_id = $driver_id";

        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            echo "<tr>
                    <td>{$row['order_id']}</td>
                    <td>{$row['customer_name']}</td>
                    <td>{$row['address']}</td>
                    <td>{$row['status']}</td>
                  </tr>";
        }
        ?>
    </table>
</body>
</html>
