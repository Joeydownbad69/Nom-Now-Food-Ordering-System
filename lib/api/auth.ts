import { User } from '@/types/user';
import db from '@/lib/db/database';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'nomnow-jwt-secret';

// Register a new user
export async function registerUser(name: string, email: string, password: string): Promise<{ user: User; token: string }> {
  try {
    const existingUser = await db.getRow('SELECT * FROM customers WHERE email = ?', [email]);
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const userId = await db.insert(
      'INSERT INTO customers (name, email, password_hash) VALUES (?, ?, ?)', // <-- fixed here
      [name, email, hashedPassword]
    );
    
    const user = await db.getRow('SELECT id, name, email, phone FROM customers WHERE id = ?', [userId]);
    
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    
    return { user, token };
  } catch (error) {
    console.error('Register user error:', error);
    throw error;
  }
}


// Login user
export async function loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
  try {
    const dbUser = await db.getRow('SELECT * FROM customers WHERE email = ?', [email]);

  if (!dbUser) {
    throw new Error('Invalid email or password');
  }

  // Map password_hash to password
  const user = { ...dbUser, password: dbUser.password_hash };

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

  // Return user data without password
  const { password: _, password_hash: __, ...userWithoutPassword } = user; // <-- also omit password_hash now

  return { user: userWithoutPassword, token };

  } catch (error) {
    console.error('Login user error:', error);
    throw error;
  }
}

// Verify token and get user
export async function verifyToken(token: string): Promise<User | null> {
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    
    // Get user by id
    const user = await db.getRow(
      'SELECT id, name, email, phone FROM customers WHERE id = ?',
      [decoded.id]
    );
    
    return user;
  } catch (error) {
    console.error('Verify token error:', error);
    return null;
  }
}

// Update user profile
export async function updateUserProfile(userId: number, userData: Partial<User>): Promise<User> {
  try {
    // Update user
    await db.update(
      'UPDATE customers SET name = ?, phone = ? WHERE id = ?',
      [userData.name, userData.phone, userId]
    );
    
    // Get updated user
    const user = await db.getRow(
      'SELECT id, name, email, phone FROM customers WHERE id = ?',
      [userId]
    );
    
    return user;
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error;
  }
}

export default {
  registerUser,
  loginUser,
  verifyToken,
  updateUserProfile,
};