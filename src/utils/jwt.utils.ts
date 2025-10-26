import { SignJWT } from 'jose';

// Secret key cho demo (nên là TextEncoder-compatible string)
const SECRET_KEY = new TextEncoder().encode('your-secret-key-for-demo-12345');

export interface JwtPayload {
  id: string | number;
  role: string;
}

/**
 * Generate JWT token với jose
 * @param id - User ID
 * @param role - User role (admin/user)
 * @returns JWT token string
 */
export async function generateToken(id: string | number, role: string): Promise<string> {
  const token = await new SignJWT({ 
    id: String(id), 
    role: role 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // Token hết hạn sau 24 giờ
    .setIssuer('gym-app')
    .setAudience('gym-users')
    .sign(SECRET_KEY);

  return token;
}

/**
 * Verify và decode JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload hoặc null
 */
export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { jwtVerify } = await import('jose');
    const { payload } = await jwtVerify(token, SECRET_KEY);
    
    return {
      id: payload.id as string | number,
      role: payload.role as string,
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Decode JWT token mà không verify (chỉ để xem nội dung)
 * @param token - JWT token
 * @returns Decoded payload
 */
export function decodeToken(token: string): any {
  try {
    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    console.error('Token decode failed:', error);
    return null;
  }
}

/**
 * Check if token is expired
 * @param token - JWT token
 * @returns true if expired, false otherwise
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    // exp is in seconds, Date.now() is in milliseconds
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Token expired check failed:', error);
    return true;
  }
}
