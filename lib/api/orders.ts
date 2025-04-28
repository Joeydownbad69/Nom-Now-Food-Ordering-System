import db from '@/lib/db/database';

interface OrderItem {
  menuItemId: number;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

interface OrderData {
  userId: number;
  restaurantId: number;
  addressId: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'cash';
  notes?: string;
  items: OrderItem[];
}

// Create new order
export async function createOrder(orderData: OrderData) {
  let connection;
  
  try {
    // Get connection for transaction
    connection = await (db as any).pool.getConnection();
    
    // Start transaction
    await connection.beginTransaction();
    
    // Insert order
    const orderSql = `
      INSERT INTO orders 
      (user_id, restaurant_id, address_id, status, subtotal, delivery_fee, total, payment_method, notes)
      VALUES (?, ?, ?, 'pending', ?, ?, ?, ?, ?)
    `;
    
    const orderParams = [
      orderData.userId,
      orderData.restaurantId,
      orderData.addressId,
      orderData.subtotal,
      orderData.deliveryFee,
      orderData.total,
      orderData.paymentMethod,
      orderData.notes || null,
    ];
    
    const [orderResult] = await connection.execute(orderSql, orderParams);
    const orderId = (orderResult as any).insertId;
    
    // Insert order items
    const itemsSql = `
      INSERT INTO order_items 
      (order_id, menu_item_id, quantity, price, special_instructions)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    for (const item of orderData.items) {
      await connection.execute(itemsSql, [
        orderId, 
        item.menuItemId, 
        item.quantity, 
        item.price,
        item.specialInstructions || null,
      ]);
    }
    
    // Insert initial status entry
    await connection.execute(
      'INSERT INTO order_status_history (order_id, status) VALUES (?, ?)',
      [orderId, 'pending']
    );
    
    // Commit transaction
    await connection.commit();
    
    // Get created order
    const order = await getOrderById(orderId);
    
    return order;
  } catch (error) {
    // Rollback transaction in case of error
    if (connection) {
      await connection.rollback();
    }
    
    console.error('Create order error:', error);
    throw error;
  } finally {
    // Release connection
    if (connection) {
      connection.release();
    }
  }
}

// Get order by ID
export async function getOrderById(orderId: number) {
  try {
    // Get order
    const order = await db.getRow(`
      SELECT o.id, o.user_id, o.restaurant_id, o.address_id, o.status, 
      o.subtotal, o.delivery_fee, o.total, o.payment_method, o.notes, 
      o.created_at, r.name AS restaurant_name, r.image AS restaurant_image
      FROM orders o
      JOIN restaurants r ON o.restaurant_id = r.id
      WHERE o.id = ?
    `, [orderId]);
    
    if (!order) {
      return null;
    }
    
    // Get order items
    const items = await db.query(`
      SELECT oi.id, oi.menu_item_id, oi.quantity, oi.price, oi.special_instructions,
      mi.name, mi.image
      FROM order_items oi
      JOIN menu_items mi ON oi.menu_item_id = mi.id
      WHERE oi.order_id = ?
    `, [orderId]);
    
    // Get order status history
    const statusHistory = await db.query(`
      SELECT status, created_at
      FROM order_status_history
      WHERE order_id = ?
      ORDER BY created_at
    `, [orderId]);
    
    // Add items and status history to order
    order.items = items;
    order.statusHistory = statusHistory;
    
    return order;
  } catch (error) {
    console.error('Get order by ID error:', error);
    throw error;
  }
}

// Get user's orders
export async function getUserOrders(userId: number) {
  try {
    const orders = await db.query(`
      SELECT o.id, o.restaurant_id, o.status, o.total, o.created_at,
      r.name AS restaurant_name, r.image AS restaurant_image
      FROM orders o
      JOIN restaurants r ON o.restaurant_id = r.id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    `, [userId]);
    
    return orders;
  } catch (error) {
    console.error('Get user orders error:', error);
    throw error;
  }
}

// Update order status
export async function updateOrderStatus(orderId: number, status: string) {
  let connection;
  
  try {
    // Get connection for transaction
    connection = await (db as any).pool.getConnection();
    
    // Start transaction
    await connection.beginTransaction();
    
    // Update order status
    await connection.execute(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, orderId]
    );
    
    // Add entry to status history
    await connection.execute(
      'INSERT INTO order_status_history (order_id, status) VALUES (?, ?)',
      [orderId, status]
    );
    
    // Commit transaction
    await connection.commit();
    
    return true;
  } catch (error) {
    // Rollback transaction in case of error
    if (connection) {
      await connection.rollback();
    }
    
    console.error('Update order status error:', error);
    throw error;
  } finally {
    // Release connection
    if (connection) {
      connection.release();
    }
  }
}

export default {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
};