// src/fakeTelegram.js

// Simulated Telegram user object (normally you'd get this from Telegram API or JWT)
export const fakeTelegramUser = {
  id: "123456789",
  username: "testuser",
}

// Fake ID token for local testing (not secure, do NOT use in production)
export const generateFakeIdToken = (user) => {
  const payload = {
    sub: user.id,
    name: user.username,
    iat: Math.floor(Date.now() / 1000),
  }
  return btoa(JSON.stringify(payload)) // Base64 encode (not a real JWT)
}
