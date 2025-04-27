import { RestaurantType } from '@/types/restaurant';
import db from '@/lib/db/database';

// Get all restaurants
export async function getRestaurants(options: { featured?: boolean; search?: string; category?: string } = {}) {
  try {
    let sql = `
      SELECT id, name, description, image, cuisine, address, 
      rating, delivery_time, min_order, delivery_fee, featured
      FROM restaurants
      WHERE active = true
    `;
    
    const params = [];
    
    // Add featured filter if specified
    if (options.featured !== undefined) {
      sql += ' AND featured = ?';
      params.push(options.featured);
    }
    
    // Add search filter if specified
    if (options.search) {
      sql += ' AND (name LIKE ? OR cuisine LIKE ?)';
      params.push(`%${options.search}%`, `%${options.search}%`);
    }
    
    // Add category filter if specified
    if (options.category) {
      sql += ' AND cuisine LIKE ?';
      params.push(`%${options.category}%`);
    }
    
    // Complete query
    sql += ' ORDER BY featured DESC, rating DESC';
    
    // Execute query
    const restaurants = await db.query(sql, params);
    return restaurants;
  } catch (error) {
    console.error('Get restaurants error:', error);
    throw error;
  }
}

// Get restaurant by ID
export async function getRestaurantById(id: number): Promise<RestaurantType> {
  try {
    const restaurant = await db.getRow(`
      SELECT id, name, description, image, cuisine, address, phone, email,
      rating, delivery_time, min_order, delivery_fee, featured
      FROM restaurants
      WHERE id = ? AND active = true
    `, [id]);
    
    return restaurant;
  } catch (error) {
    console.error('Get restaurant by ID error:', error);
    throw error;
  }
}

// Get menu categories by restaurant ID
export async function getMenuCategories(restaurantId: number) {
  try {
    const categories = await db.query(`
      SELECT id, name, description
      FROM menu_categories
      WHERE restaurant_id = ?
      ORDER BY display_order
    `, [restaurantId]);
    
    return categories;
  } catch (error) {
    console.error('Get menu categories error:', error);
    throw error;
  }
}

// Get menu items by restaurant ID (optionally filtered by category)
export async function getMenuItems(restaurantId: number, categoryId?: number) {
  try {
    let sql = `
      SELECT id, category_id, name, description, price, image, popular
      FROM menu_items
      WHERE restaurant_id = ? AND available = true
    `;
    
    const params = [restaurantId];
    
    // Add category filter if specified
    if (categoryId) {
      sql += ' AND category_id = ?';
      params.push(categoryId);
    }
    
    // Complete query
    sql += ' ORDER BY popular DESC, name';
    
    // Execute query
    const menuItems = await db.query(sql, params);
    return menuItems;
  } catch (error) {
    console.error('Get menu items error:', error);
    throw error;
  }
}

export default {
  getRestaurants,
  getRestaurantById,
  getMenuCategories,
  getMenuItems,
};