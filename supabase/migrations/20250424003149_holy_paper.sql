-- Users Table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Addresses Table
CREATE TABLE addresses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Restaurants Table
CREATE TABLE restaurants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  cuisine VARCHAR(50),
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  rating DECIMAL(3,1),
  delivery_time VARCHAR(20),
  min_order DECIMAL(10,2),
  delivery_fee DECIMAL(10,2),
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Menu Categories Table
CREATE TABLE menu_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Menu Items Table
CREATE TABLE menu_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  category_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(255),
  popular BOOLEAN DEFAULT FALSE,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES menu_categories(id) ON DELETE CASCADE
);

-- Orders Table
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  address_id INT NOT NULL,
  status ENUM('pending', 'preparing', 'onTheWay', 'delivered', 'cancelled') DEFAULT 'pending',
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  payment_method ENUM('cash') DEFAULT 'cash',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  FOREIGN KEY (address_id) REFERENCES addresses(id)
);

-- Order Items Table
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  special_instructions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Order Status History Table
CREATE TABLE order_status_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  status ENUM('pending', 'preparing', 'onTheWay', 'delivered', 'cancelled') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Sample Data for Restaurants
INSERT INTO restaurants (name, description, image, cuisine, address, phone, email, rating, delivery_time, min_order, delivery_fee, featured)
VALUES 
('Burger Kingdom', 'The best burgers in town', 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg', 'American', '123 Main Street', '555-123-4567', 'contact@burgerkingdom.com', 4.7, '25-35', 10.00, 2.99, TRUE),
('Pizza Paradise', 'Authentic Italian pizza', 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg', 'Italian', '456 Oak Avenue', '555-234-5678', 'info@pizzaparadise.com', 4.5, '30-45', 15.00, 1.99, TRUE),
('Sushi Sensation', 'Fresh and delicious sushi', 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg', 'Japanese', '789 Maple Road', '555-345-6789', 'hello@sushisensation.com', 4.8, '35-50', 20.00, 3.99, TRUE),
('Taco Fiesta', 'Authentic Mexican street food', 'https://images.pexels.com/photos/5737241/pexels-photo-5737241.jpeg', 'Mexican', '321 Elm Street', '555-456-7890', 'hola@tacofiesta.com', 4.3, '20-35', 12.00, 2.49, FALSE),
('Pasta Pronto', 'Quick and delicious pasta dishes', 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg', 'Italian', '567 Pine Avenue', '555-567-8901', 'ciao@pastapronto.com', 4.6, '30-40', 15.00, 2.99, FALSE),
('Curry Corner', 'Spicy and flavorful curries', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg', 'Indian', '890 Cedar Road', '555-678-9012', 'namaste@currycorner.com', 4.4, '35-50', 18.00, 3.49, FALSE);

-- Sample Data for Menu Categories
INSERT INTO menu_categories (restaurant_id, name, description, display_order)
VALUES
(1, 'Burgers', 'Our signature burgers', 1),
(1, 'Sides', 'Perfect accompaniments', 2),
(1, 'Drinks', 'Refreshing beverages', 3),
(2, 'Pizza', 'Hand-tossed and wood-fired', 1),
(2, 'Pasta', 'Authentic Italian pasta', 2),
(2, 'Salads', 'Fresh and crisp', 3),
(3, 'Sushi Rolls', 'Fresh and creative rolls', 1),
(3, 'Sashimi', 'Premium cuts of fish', 2),
(3, 'Bento Boxes', 'Complete meals', 3);

-- Sample Data for Menu Items
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, image, popular)
VALUES
(1, 1, 'Classic Cheeseburger', 'Beef patty, cheddar cheese, lettuce, tomato, and special sauce on a brioche bun', 9.99, 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg', TRUE),
(1, 1, 'Bacon Deluxe Burger', 'Beef patty, bacon, American cheese, caramelized onions, and aioli', 12.99, 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg', TRUE),
(1, 1, 'Veggie Burger', 'Plant-based patty, avocado, sprouts, tomato, and vegan mayo', 10.99, 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg', FALSE),
(1, 2, 'French Fries', 'Crispy golden fries served with ketchup', 3.99, 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg', TRUE),
(1, 2, 'Onion Rings', 'Crispy battered onion rings with dipping sauce', 4.99, 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg', FALSE),
(1, 3, 'Soft Drink', 'Choice of soda or juice', 2.49, 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg', FALSE),
(2, 4, 'Margherita Pizza', 'Fresh mozzarella, tomato sauce, and basil', 14.99, 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg', TRUE),
(2, 4, 'Pepperoni Pizza', 'Pepperoni, mozzarella, and tomato sauce', 16.99, 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg', TRUE),
(3, 7, 'California Roll', 'Crab, avocado, and cucumber wrapped in seaweed and rice', 7.99, 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg', TRUE),
(3, 8, 'Salmon Nigiri', 'Fresh salmon slices on vinegared rice', 8.99, 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg', TRUE);