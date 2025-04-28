import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nomnow',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Helper function to execute queries
export async function query(sql: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Helper function to get a single row
export async function getRow(sql: string, params: any[] = []) {
  const results = await query(sql, params);
  return results[0] || null;
}

// Helper function to insert data and return the inserted ID
export async function insert(sql: string, params: any[] = []) {
  try {
    const [result] = await pool.execute(sql, params);
    return (result as any).insertId;
  } catch (error) {
    console.error('Database insert error:', error);
    throw error;
  }
}

// Helper function to update data and return the number of affected rows
export async function update(sql: string, params: any[] = []) {
  try {
    const [result] = await pool.execute(sql, params);
    return (result as any).affectedRows;
  } catch (error) {
    console.error('Database update error:', error);
    throw error;
  }
}

// Helper function to delete data and return the number of affected rows
export async function remove(sql: string, params: any[] = []) {
  try {
    const [result] = await pool.execute(sql, params);
    return (result as any).affectedRows;
  } catch (error) {
    console.error('Database delete error:', error);
    throw error;
  }
}

// Helper function to check if a connection can be established
export async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export default {
  query,
  getRow,
  insert,
  update,
  remove,
  testConnection,
};