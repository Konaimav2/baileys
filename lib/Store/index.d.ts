export type LegacyInMemoryStore = {
  chats: Record<string, any>
  contacts: Record<string, any>
  messages: Record<string, any[] & { upsert?: (msg: any, mode?: string) => any, get?: (id: string) => any }>
  groupMetadata: Record<string, any>
  presences: Record<string, any>
  state: Record<string, any>
  bind: (ev: { on?: (event: string, listener: (...args: any[]) => void) => any }) => LegacyInMemoryStore
  insertMessage: (msg: any, mode?: string) => any
  loadMessage: (jid: string, id: string) => any
  mostRecentMessage: (jid: string) => any
  readFromFile: (path: string) => void
  writeToFile: (path: string) => void
  toJSON: () => any
}
export declare const makeInMemoryStore: (opts?: { logger?: any }) => LegacyInMemoryStore
export default makeInMemoryStore

export declare const makeCacheManagerAuthState: () => Promise<never>;
