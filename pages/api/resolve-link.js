export default async function handler(req, res) {
  const { url } = req.query
  if (!url) return res.status(400).json({ error: 'missing url' })

  const token = process.env.EXTERNAL_API_TOKEN
  const apiUrl = `https://yeumoney.com/QL_api.php?token=${token}&url=${encodeURIComponent(
    url
  )}`

  try {
    const r = await fetch(apiUrl)
    const text = await r.text()
    res.status(r.status).send(text)
  } catch (err) {
    res.status(500).json({ error: 'proxy-failed', details: String(err) })
  }
}
