import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { Browsers } from '../lib/Utils/browser-utils.js'
import { buildTcTokenFromJid } from '../lib/Utils/tc-token-utils.js'

const android = Browsers.android('MikirBot')
assert.deepEqual(android, ['MikirBot', 'Android', ''])

const genericsTypes = await readFile(new URL('../lib/Utils/generics.d.ts', import.meta.url), 'utf8')
assert.match(genericsTypes, /import\s+type\s+Long\s+from\s+['"]long['"]/)

const jid = '6281111111111@s.whatsapp.net'
const timestamp = Math.floor(Date.now() / 1000)
const token = Buffer.from([4, 1, 33])
const tcTokenContent = await buildTcTokenFromJid({
  authState: {
    keys: {
      get: async () => ({ [jid]: { token, timestamp } }),
      set: async () => {},
    },
  },
  jid,
  baseContent: [],
  getLIDForPN: async () => undefined,
})
assert.equal(tcTokenContent?.length, 1)
assert.deepEqual(tcTokenContent[0].attrs, { t: String(timestamp) })
assert.deepEqual(tcTokenContent[0].content, token)

let clearedTokenWrite
const missingTimestampContent = await buildTcTokenFromJid({
  authState: {
    keys: {
      get: async () => ({ [jid]: { token } }),
      set: async value => { clearedTokenWrite = value },
    },
  },
  jid,
  baseContent: [],
  getLIDForPN: async () => undefined,
})
assert.equal(missingTimestampContent, undefined)
assert.deepEqual(clearedTokenWrite, { tctoken: { [jid]: null } })

const chats = await import('../lib/Socket/chats.js')
assert.equal(typeof chats.buildProfilePictureQueryContent, 'function')
assert.deepEqual(chats.buildProfilePictureQueryContent('preview'), [
  { tag: 'picture', attrs: { type: 'preview', query: 'url' } },
])
assert.deepEqual(chats.buildProfilePictureQueryContent('image', tcTokenContent), [
  {
    tag: 'picture',
    attrs: { type: 'image', query: 'url' },
    content: tcTokenContent,
  },
])

console.log('PASS: upstream post-rc13 compiled backports are complete')
