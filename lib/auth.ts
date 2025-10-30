import crypto from "crypto"

// Simple password hashing (in production, use bcrypt)
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

// Generate secure session token
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

// Session storage (in production, use Redis or database)
const sessions = new Map<string, { username: string; expiresAt: number }>()

export function createSession(username: string): string {
  const token = generateSessionToken()
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  sessions.set(token, { username, expiresAt })
  return token
}

export function validateSession(token: string): string | null {
  const session = sessions.get(token)
  if (!session) return null
  if (session.expiresAt < Date.now()) {
    sessions.delete(token)
    return null
  }
  return session.username
}

export function destroySession(token: string): void {
  sessions.delete(token)
}
