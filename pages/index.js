import { useState } from 'react'

export default function Home() {
  const [token, setToken] = useState('')
  const [result, setResult] = useState(null)

  async function check() {
    const r = await fetch(`/api/verify-key?token=${encodeURIComponent(token)}`)
    const j = await r.json()
    setResult(j)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-4">GetKey — kiểm tra key</h1>

        <label className="block mb-2">Token</label>
        <input
          className="w-full border px-3 py-2 rounded mb-4"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={check}
        >
          Kiểm tra
        </button>

        {result && (
          <pre className="mt-4 bg-slate-100 p-3 rounded">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}

        <hr className="my-6" />
        <p className="text-sm text-slate-600">
          Admin: tạo key qua POST /api/create-key (admin_pass required). Production: dùng DB thật (Supabase/MongoDB/Postgres).
        </p>
      </div>
    </main>
  )
          }
