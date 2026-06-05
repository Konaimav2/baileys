/**
 * Legacy makeInMemoryStore compatibility helper.
 *
 * Baileys v7 no longer ships the old Store folder used by many CJS bots.
 * This lightweight store keeps the old surface MikirBot needs: chats, contacts,
 * messages, bind(ev), readFromFile(), writeToFile(), loadMessage().
 */
import { writeFileSync, readFileSync, existsSync } from 'fs'

const jidKey = (jid = '') => String(jid)
const messageId = (msg = {}) => msg?.key?.id || msg?.id || ''
const chatIdFromMessage = (msg = {}) => msg?.key?.remoteJid || msg?.chat || ''

const makeMessageBucket = () => {
  const arr = []
  arr.upsert = (msg, mode = 'append') => {
    const id = messageId(msg)
    const idx = id ? arr.findIndex((x) => messageId(x) === id) : -1
    if (idx >= 0) arr[idx] = { ...arr[idx], ...msg }
    else if (mode === 'prepend') arr.unshift(msg)
    else arr.push(msg)
    return msg
  }
  arr.get = (id) => arr.find((x) => messageId(x) === id)
  arr.toJSON = () => Array.from(arr)
  return arr
}

export const makeInMemoryStore = ({ logger } = {}) => {
  const store = {
    chats: {},
    contacts: {},
    messages: {},
    groupMetadata: {},
    presences: {},
    labels: {},
    labelAssociations: {},
    state: {},
    logger,

    bind(ev) {
      if (!ev?.on) return this

      ev.on('messaging-history.set', ({ chats = [], contacts = [], messages = [], isLatest } = {}) => {
        for (const chat of chats) if (chat?.id) this.chats[jidKey(chat.id)] = { ...(this.chats[jidKey(chat.id)] || {}), ...chat }
        for (const contact of contacts) if (contact?.id) this.contacts[jidKey(contact.id)] = { ...(this.contacts[jidKey(contact.id)] || {}), ...contact }
        for (const msg of messages) this.insertMessage(msg)
        this.state.isLatest = isLatest
      })

      ev.on('chats.set', ({ chats = [] } = {}) => {
        this.chats = {}
        for (const chat of chats) if (chat?.id) this.chats[jidKey(chat.id)] = chat
      })

      ev.on('contacts.set', ({ contacts = [] } = {}) => {
        this.contacts = {}
        for (const contact of contacts) if (contact?.id) this.contacts[jidKey(contact.id)] = contact
      })

      ev.on('messages.set', ({ messages = [] } = {}) => {
        this.messages = {}
        for (const msg of messages) this.insertMessage(msg)
      })

      ev.on('chats.upsert', (chats = []) => {
        for (const chat of chats) if (chat?.id) this.chats[jidKey(chat.id)] = { ...(this.chats[jidKey(chat.id)] || {}), ...chat }
      })

      ev.on('chats.update', (updates = []) => {
        for (const update of updates) if (update?.id) this.chats[jidKey(update.id)] = { ...(this.chats[jidKey(update.id)] || {}), ...update }
      })

      ev.on('contacts.upsert', (contacts = []) => {
        for (const contact of contacts) if (contact?.id) this.contacts[jidKey(contact.id)] = { ...(this.contacts[jidKey(contact.id)] || {}), ...contact }
      })

      ev.on('contacts.update', (updates = []) => {
        for (const update of updates) if (update?.id) this.contacts[jidKey(update.id)] = { ...(this.contacts[jidKey(update.id)] || {}), ...update }
      })

      ev.on('messages.upsert', ({ messages = [], type } = {}) => {
        const mode = type === 'prepend' ? 'prepend' : 'append'
        for (const msg of messages) this.insertMessage(msg, mode)
      })

      ev.on('messages.update', (updates = []) => {
        for (const update of updates) {
          const jid = jidKey(update?.key?.remoteJid)
          const id = update?.key?.id
          if (!jid || !id || !this.messages[jid]) continue
          const msg = this.messages[jid].get(id)
          if (msg) Object.assign(msg, update.update || update)
        }
      })

      ev.on('groups.update', (updates = []) => {
        for (const update of updates) if (update?.id) this.groupMetadata[jidKey(update.id)] = { ...(this.groupMetadata[jidKey(update.id)] || {}), ...update }
      })

      ev.on('group-participants.update', ({ id, participants = [], action } = {}) => {
        if (!id) return
        const meta = this.groupMetadata[jidKey(id)] || { id, participants: [] }
        const existing = new Map((meta.participants || []).map((p) => [p.id, p]))
        if (action === 'remove') for (const jid of participants) existing.delete(jid)
        else for (const jid of participants) if (!existing.has(jid)) existing.set(jid, { id: jid })
        meta.participants = Array.from(existing.values())
        this.groupMetadata[jidKey(id)] = meta
      })

      ev.on('presence.update', ({ id, presences } = {}) => {
        if (id) this.presences[jidKey(id)] = presences || {}
      })

      return this
    },

    insertMessage(msg, mode = 'append') {
      const jid = jidKey(chatIdFromMessage(msg))
      if (!jid) return msg
      if (!this.messages[jid]) this.messages[jid] = makeMessageBucket()
      return this.messages[jid].upsert(msg, mode)
    },

    loadMessage(jid, id) {
      return this.messages?.[jidKey(jid)]?.get?.(id)
    },

    loadMessages(jid, count = 25) {
      const bucket = this.messages?.[jidKey(jid)] || []
      return Array.from(bucket).slice(-count)
    },

    fetchImageUrl(jid) {
      return this.contacts?.[jidKey(jid)]?.imgUrl || this.chats?.[jidKey(jid)]?.imgUrl
    },

    fetchGroupMetadata(jid) {
      return this.groupMetadata?.[jidKey(jid)]
    },

    fetchMessageReceipts() {
      return []
    },

    getLabels() { return this.labels || [] },
    getChatLabels(jid) { return this.labelAssociations?.[jidKey(jid)] || [] },
    getMessageLabels(jid, id) { return this.labelAssociations?.[`${jidKey(jid)}|${id}`] || [] },

    mostRecentMessage(jid) {
      const bucket = this.messages?.[jidKey(jid)] || []
      return bucket[bucket.length - 1]
    },

    readFromFile(path) {
      if (!existsSync(path)) return
      const data = JSON.parse(readFileSync(path, 'utf8'))
      this.chats = data.chats || {}
      this.contacts = data.contacts || {}
      this.groupMetadata = data.groupMetadata || {}
      this.presences = data.presences || {}
      this.labels = data.labels || {}
      this.labelAssociations = data.labelAssociations || {}
      this.state = data.state || {}
      this.messages = {}
      for (const [jid, messages] of Object.entries(data.messages || {})) {
        const bucket = makeMessageBucket()
        for (const msg of messages || []) bucket.upsert(msg)
        this.messages[jid] = bucket
      }
    },

    writeToFile(path) {
      const messages = {}
      for (const [jid, bucket] of Object.entries(this.messages || {})) messages[jid] = Array.from(bucket || [])
      writeFileSync(path, JSON.stringify({
        chats: this.chats,
        contacts: this.contacts,
        messages,
        groupMetadata: this.groupMetadata,
        presences: this.presences,
        labels: this.labels,
        labelAssociations: this.labelAssociations,
        state: this.state
      }, null, 2))
    },

    toJSON() {
      const messages = {}
      for (const [jid, bucket] of Object.entries(this.messages || {})) messages[jid] = Array.from(bucket || [])
      return {
        chats: this.chats,
        contacts: this.contacts,
        messages,
        groupMetadata: this.groupMetadata,
        presences: this.presences,
        labels: this.labels,
        labelAssociations: this.labelAssociations,
        state: this.state
      }
    }
  }

  return store
}

export default makeInMemoryStore


/**
 * Kiu/@z4phdev legacy export placeholder.
 * The modern auth path should use useMultiFileAuthState(), but exposing this
 * name prevents old imports from crashing. It intentionally fails loudly if
 * someone tries to use the unimplemented cache-manager auth backend.
 */
export const makeCacheManagerAuthState = async () => {
  throw new Error('makeCacheManagerAuthState is not implemented in @konaa/baileys; use useMultiFileAuthState instead')
}
