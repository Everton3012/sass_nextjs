// src/lib/turnstile.ts
import axios from 'axios'

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  try {
    const response = await axios.post(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data.success
  } catch (error) {
    console.error('Erro ao verificar token Turnstile:', error)
    return false
  }
}