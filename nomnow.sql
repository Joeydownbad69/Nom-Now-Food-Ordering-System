-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 11:23 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nomnow`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `street` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `country` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `phone`, `address`, `password_hash`) VALUES
(2, 'dummy', 'dummy@email.com', NULL, NULL, '$2a$10$3fsfNHiKJmCrSgpHMjvQ5eDp0OjF8AK77pLD5stoCpnn/qWqMscEy');

-- --------------------------------------------------------

--
-- Table structure for table `menu_categories`
--

CREATE TABLE `menu_categories` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `cuisine` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_categories`
--

INSERT INTO `menu_categories` (`id`, `restaurant_id`, `name`, `description`, `display_order`, `image`, `cuisine`) VALUES
(1, 1, 'Pizza', NULL, 1, 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600', 'Italian'),
(2, 1, 'Burgers', NULL, 2, 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=600', 'American'),
(3, 1, 'Chicken', NULL, 3, 'https://www.allrecipes.com/thmb/q-IfK20zxeyp1DgKWhrVp6CQ43w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-89268-triple-dipped-fried-chicken-beauty-4x3-3961ac838ddd41958e7cb9f49376cd68.jpg', 'Filipino'),
(4, 1, 'Fries', NULL, 4, 'https://sausagemaker.com/wp-content/uploads/Homemade-French-Fries_8.jpg', 'French'),
(5, 1, 'Sisig', NULL, 5, 'https://curiousflavors.com/wp-content/uploads/2023/02/1-2.jpg', 'Filipino'),
(6, 1, 'Donut', NULL, 6, 'https://jipan.com.ph/cdn/shop/products/minidonuts.png?v=1597895775', 'American'),
(7, 1, 'Shawarma', NULL, 7, 'https://cdn.sanity.io/images/g1s4qnmz/production/86ea7cc20cf83221e5a00e50828bab494c12f011-1364x1125.png', 'Middle Eastern'),
(8, 1, 'Coffee', NULL, 8, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', 'Global');

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `category_id` int(11) DEFAULT NULL,
  `available` tinyint(1) NOT NULL,
  `popular` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_items`
--

INSERT INTO `menu_items` (`id`, `restaurant_id`, `name`, `description`, `price`, `image`, `created_at`, `category_id`, `available`, `popular`) VALUES
(17, 2, 'Whopper', 'A flame-grilled beef patty with lettuce, tomato, pickles, and onions on a toasted sesame seed bun.', 199.99, 'https://www.burgerking.ee/images/optimized/products/whopper-desktop-d8cee499661a700caa53bb89104c0e37.png', '2025-04-28 06:36:50', NULL, 1, 1),
(18, 2, 'Chicken Fries', 'Crispy chicken strips in a fun, fry-shaped form, served with a dipping sauce.', 99.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(19, 2, 'French Fries', 'Golden, crispy fries made with 100% real potatoes.', 59.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(20, 3, 'Pepperoni Pizza', 'Classic pepperoni pizza with mozzarella cheese and tomato sauce.', 399.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(21, 3, 'Margherita Pizza', 'A traditional pizza topped with fresh mozzarella, tomatoes, and basil.', 349.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(22, 3, 'Chicken Alfredo Pizza', 'A creamy white sauce pizza with grilled chicken, spinach, and mozzarella.', 499.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(23, 4, 'Chicken Inasal', 'Grilled marinated chicken served with garlic rice and a side of soy sauce and calamansi.', 149.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(24, 4, 'Pork BBQ', 'Grilled pork skewers served with a side of rice and dipping sauce.', 179.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(25, 4, 'Palabok', 'A Filipino noodle dish with garlic sauce, shrimp, pork, and boiled egg.', 129.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(26, 5, 'Chickenjoy', 'Crispy, juicy fried chicken served with gravy and a side of mashed potatoes or rice.', 179.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(27, 5, 'Jolly Spaghetti', 'Sweet-style spaghetti with sliced hotdog and a special tomato sauce.', 139.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(28, 5, 'Burger Steak', 'Beef steak in a flavorful mushroom gravy sauce, served with rice.', 159.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(29, 6, 'Hot Chicken Wings', 'Spicy and crispy chicken wings with a flavorful seasoning.', 199.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(30, 6, 'Fried Chicken Bucket', 'A bucket of crispy fried chicken, perfect for sharing with family or friends.', 599.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(31, 6, 'Cheesy Fries', 'Crispy fries topped with melted cheese and special seasoning.', 129.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(32, 7, 'Cheese Fries', 'Golden fries topped with a generous serving of melted cheese.', 89.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(33, 7, 'BBQ Fries', 'Crispy fries tossed with smoky barbecue seasoning.', 79.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(34, 7, 'Sour Cream Fries', 'Fries seasoned with tangy sour cream powder.', 89.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(35, 8, 'Classic Donut', 'A soft, sweet donut glazed to perfection.', 39.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(36, 8, 'Boston Cream Donut', 'A donut filled with creamy custard and topped with chocolate glaze.', 59.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(37, 8, 'Iced Coffee', 'Cold coffee with milk and ice, perfect for a refreshing treat.', 99.99, NULL, '2025-04-28 06:36:50', NULL, 1, 1),
(38, 9, 'Lahmacun', 'A Turkish flatbread topped with ground beef, vegetables, and spices.', 129.99, NULL, '2025-04-28 06:36:50', NULL, 1, 0),
(39, 9, 'Doner Kebab', 'Grilled lamb or chicken served with vegetables, wrapped in flatbread or pita.', 199.99, NULL, '2025-04-28 06:36:50', NULL, 1, 0),
(40, 9, 'Baklava', 'Sweet pastry filled with nuts and honey, topped with sugar syrup.', 89.99, NULL, '2025-04-28 06:36:50', NULL, 1, 0),
(41, 10, 'Cappuccino', 'A classic coffee drink made with espresso, steamed milk, and foam.', 129.99, NULL, '2025-04-28 06:36:50', NULL, 1, 0),
(42, 10, 'Iced Latte', 'A refreshing iced coffee made with espresso and cold milk.', 149.99, NULL, '2025-04-28 06:36:50', NULL, 1, 0),
(43, 10, 'Affogato', 'A scoop of vanilla ice cream topped with a shot of hot espresso.', 159.99, NULL, '2025-04-28 06:36:50', NULL, 1, 0),
(44, 11, 'Original Glazed Donut', 'The classic donut with a sweet, glazed coating.', 49.99, NULL, '2025-04-28 06:36:50', NULL, 1, 0),
(45, 11, 'Chocolate Glazed Donut', 'A donut covered in a rich chocolate glaze.', 59.99, NULL, '2025-04-28 06:36:50', NULL, 1, 0),
(46, 11, 'Strawberry Filled Donut', 'A soft donut filled with sweet strawberry jam and topped with sugar.', 69.99, NULL, '2025-04-28 06:36:50', NULL, 1, 0),
(47, 12, 'Stuffed Crust Pizza', 'A pizza with a cheesy stuffed crust and your choice of toppings.', 499.99, NULL, '2025-04-28 06:36:50', NULL, 1, 0),
(48, 12, 'Meat Lover\'s Pizza', 'A pizza loaded with bacon, sausage, pepperoni, and ham.', 599.99, NULL, '2025-04-28 06:36:50', NULL, 1, 0),
(49, 12, 'Veggie Supreme Pizza', 'A pizza topped with a variety of fresh vegetables.', 449.99, NULL, '2025-04-28 06:36:50', NULL, 1, 0),
(50, 13, 'Beef Shawarma', 'Tender beef wrapped in flatbread with garlic sauce, pickles, and tomatoes.', 149.99, NULL, '2025-04-28 06:36:50', NULL, 1, 0),
(51, 13, 'Chicken Shawarma', 'Grilled chicken wrapped with garlic sauce and fresh vegetables in pita bread.', 139.99, NULL, '2025-04-28 06:36:50', NULL, 1, 0),
(52, 13, 'Shawarma Platter', 'Shawarma served on a platter with rice and garlic sauce.', 199.99, NULL, '2025-04-28 06:36:50', NULL, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `subtotal` decimal(10,2) NOT NULL,
  `delivery_fee` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `payment_method` enum('cash') NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `special_instructions` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_status_history`
--

CREATE TABLE `order_status_history` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `cuisine` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT 0.0,
  `delivery_time` varchar(50) DEFAULT NULL,
  `min_order` decimal(10,2) DEFAULT 0.00,
  `delivery_fee` decimal(10,2) DEFAULT 0.00,
  `featured` tinyint(1) DEFAULT 0,
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `description`, `image`, `cuisine`, `address`, `phone`, `email`, `rating`, `delivery_time`, `min_order`, `delivery_fee`, `featured`, `active`, `created_at`, `updated_at`) VALUES
(1, 'dummy-restaurant', 'example', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', NULL, 'Place, Dummy Address', '09999', 'dummy@restaurant.com', 3.0, NULL, 0.00, 2.00, 0, 1, '2025-04-27 21:48:16', '2025-04-27 22:57:38'),
(2, 'Burger King', NULL, 'https://admin.itsnicethat.com/images/sxTAeLCeojRNQh2mcZvVv8TT5LE=/198174/format-webp%7Cwidth-1440/burger_king_rebrand_graphic_design_itsnicethat1.jpg', 'American', 'N. Escario Street, this branch operates 24 hours and offers takeout services.', NULL, NULL, 4.7, '25-35', 0.00, 40.00, 1, 1, '2025-04-28 06:33:44', '2025-04-28 06:33:44'),
(3, 'Domino\'s Pizza', NULL, 'https://logowik.com/content/uploads/images/dominos-pizza5190.jpg', 'Italian', 'Horizons 101, Mango Avenue', NULL, NULL, 4.5, '30-45', 0.00, 40.00, 1, 1, '2025-04-28 06:33:44', '2025-04-28 06:33:44'),
(4, 'Mang Inasal', NULL, 'https://play-lh.googleusercontent.com/27vRhNZV2nAXSrIkWYlr22wIZSMLqeQzlirRF4UQqWVxTB_8PT59sPTATLrArDJoZpE', 'Filipino', 'Sm Seaside Lower Ground Floor SM Seaside SRP Road Mambaling', NULL, NULL, 4.5, '30-45', 0.00, 40.00, 1, 1, '2025-04-28 06:33:44', '2025-04-28 06:33:44'),
(5, 'Jollibee', NULL, 'https://download.logo.wine/logo/Jollibee/Jollibee-Logo.wine.png', 'Filipino', 'F. Llamas, Punta Prinsesa', NULL, NULL, 4.6, '20-30', 0.00, 50.00, 1, 1, '2025-04-28 06:33:44', '2025-04-28 06:33:44'),
(6, '24 Chicken', NULL, 'https://24chicken.com/images/marketing/logo.png', 'Filipino', 'The Strip, Osmeña Boulevard Barangay Capitol Site ', NULL, NULL, 4.2, '20-35', 0.00, 60.00, 1, 1, '2025-04-28 06:33:44', '2025-04-28 06:33:44'),
(7, 'Potato Corner', NULL, 'https://app.aranetacity.com/files/establishments/image/f556a0c5-f958-4051-987d-81146509ae66/472771_QJ46vfdiXnpcj0Fm_0.jpg', 'Filipino', 'Casa Mira Labangon', NULL, NULL, 4.5, '15-20', 0.00, 30.00, 1, 1, '2025-04-28 06:33:44', '2025-04-28 06:33:44'),
(8, 'Dunkin\' Donut', NULL, 'https://logo.com/image-cdn/images/kts928pd/production/a21c8a29a28c8998ca840a00064142e93f085f6f-700x394.png?w=1920&q=72&fm=webp', 'American', 'E-Mall, Sanciangko St.', NULL, NULL, 4.4, '5-10', 0.00, 40.00, 1, 1, '2025-04-28 06:33:44', '2025-04-28 06:33:44'),
(9, 'Leylam', NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoFBJ95NL0n5-ySYEMMhMsnrsBfVQsmnt6zg&s', 'Turkish', 'Gaisano Capital Tisa, Francisco Llamas St.', NULL, NULL, 4.1, '15-20', 0.00, 30.00, 1, 1, '2025-04-28 06:33:44', '2025-04-28 06:33:44'),
(10, 'Bo\'s Coffee', NULL, 'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_864/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/owvoogusq2lnddn6q91h/BosCoffee(SelectedBranchesNationwide).jpg', 'American', 'Osmeña Blvd. Cebu City', NULL, NULL, 4.3, '5-10', 0.00, 30.00, 1, 1, '2025-04-28 06:33:44', '2025-04-28 06:33:44'),
(11, 'Krispy Kreme Doughnuts', NULL, 'https://www.freebielist.com/wp-content/uploads/2022/07/krispykreme-800x400-1.jpg', 'American', 'SM Seaside City Cebu', NULL, NULL, 4.5, '10-15', 0.00, 50.00, 1, 1, '2025-04-28 06:33:44', '2025-04-28 06:33:44'),
(12, 'Pizza Hut', NULL, 'https://1000logos.net/wp-content/uploads/2017/05/Pizza-Hut-Logo-1999.jpg', 'Italian', 'Fuente Osmeña Cebu City', NULL, NULL, 4.1, '20-30', 0.00, 50.00, 1, 1, '2025-04-28 06:33:44', '2025-04-28 06:33:44'),
(13, 'Shawarma Shack', NULL, 'https://tb-static.uber.com/prod/image-proc/processed_images/27b76eb372be9aa5a0eebfaff01e68b6/df577d3a0807d3bb859f2fb53aefcd86.jpeg', 'Turkish', 'Elizabeth Mall Cebu City', NULL, NULL, 4.3, '15-25', 0.00, 30.00, 1, 1, '2025-04-28 06:33:44', '2025-04-28 06:33:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `menu_categories`
--
ALTER TABLE `menu_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_id` (`restaurant_id`),
  ADD KEY `fk_category_id` (`category_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `restaurant_id` (`restaurant_id`),
  ADD KEY `address_id` (`address_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `menu_item_id` (`menu_item_id`);

--
-- Indexes for table `order_status_history`
--
ALTER TABLE `order_status_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `menu_categories`
--
ALTER TABLE `menu_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_status_history`
--
ALTER TABLE `order_status_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `menu_categories`
--
ALTER TABLE `menu_categories`
  ADD CONSTRAINT `menu_categories_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `menu_categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`);

--
-- Constraints for table `order_status_history`
--
ALTER TABLE `order_status_history`
  ADD CONSTRAINT `order_status_history_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
