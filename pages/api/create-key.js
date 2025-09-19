import { nanoid } from 'nanoid'
import db, { initDB } from '../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' })

  const { admin_pass, note, expires_in_days } = req.body
  if (admin_pass !== process.env.ADMIN_PASS)
    return res.status(401).json({ error: 'Unauthorized' })

  await initDB()
  const token = nanoid(32)
  const createdAt = Date.now()
  const expiresInMs = (Number(expires_in_days) || 30) * 24 * 60 * 60 * 1000
  const keyObj = { token, note: note || '', createdAt, expiresAt: createdAt + expiresInMs, active: true }

  db.data.keys.push(keyObj)
  await db.write()
  res.json({ ok: true, token, expiresAt: keyObj.expiresAt })
}
