import { SignJWT } from "jose";

const SECRET_KEY = new TextEncoder().encode("your-secret-key-for-demo-12345");

//Payload trả về
export interface JwtPayload {
  id: string | number;
  role: string;
}

//Tạo token
export async function generateToken(
  id: string | number,
  role: string
): Promise<string> {
  const token = await new SignJWT({
    id: String(id),
    role: role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h") // Token hết hạn sau 24 giờ
    .setIssuer("gym-app")
    .setAudience("gym-users")
    .sign(SECRET_KEY);

  return token;
}

//Kiểm tra token
export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { jwtVerify } = await import("jose");
    const { payload } = await jwtVerify(token, SECRET_KEY);

    return {
      id: payload.id as string | number,
      role: payload.role as string,
    };
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

//Giải token
export function decodeToken(token: string) {
  try {
    const parts = token.split(".");
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    console.error("Token decode failed:", error);
    return null;
  }
}

//Kiểm tra hết hạn
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Token expired check failed:", error);
    return true;
  }
}
