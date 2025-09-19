import db, { initDB } from '../../lib/db'

export default async function handler(req, res) {
  const token =
    req.query.token || req.headers['authorization']?.replace('Bearer ', '')
  if (!token) return res.status(400).json({ valid: false, error: 'missing token' })

  await initDB()
  const k = db.data.keys.find((k) => k.token === token)
  if (!k || !k.active) return res.json({ valid: false })
  if (Date.now() > k.expiresAt) return res.json({ valid: false, expired: true })

  res.json({ valid: true, note: k.note })
}
