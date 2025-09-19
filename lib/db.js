import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join } from 'path'

const file = join(process.cwd(), 'data', 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

export async function initDB() {
  await db.read()
  db.data ||= { keys: [] }
  await db.write()
  return db
}

export default db
