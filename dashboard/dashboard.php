<?php include '../includes/db.php'; ?>

<!DOCTYPE html>
<html>
<head>
    <title>Restaurant Dashboard</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <h1>NomNow</h1>

    <h2>Menu Items</h2>
    <table border="1">
        <tr><th>Name</th><th>Description</th><th>Price</th></tr>

        <?php
        $sql = "SELECT name, description, price FROM menu_items";
        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            echo "<tr>
                    <td>{$row['name']}</td>
                    <td>{$row['description']}</td>
                    <td>{$row['price']}</td>
                  </tr>";
        }
        ?>
    </table>
</body>
</html>
