import makeWASocket from './Socket/index.js';
import { proto } from '../WAProto/index.js';
export * from '../WAProto/index.js';
export * from './Utils/index.js';
export * from './Types/index.js';
export * from './Defaults/index.js';
export * from './WABinary/index.js';
export * from './WAM/index.js';
export * from './WAUSync/index.js';
export * from './Store/index.js';
// Kiu/@z4phdev legacy root exports. These keep old plugins that import
// names directly from Baileys from crashing while preserving modern internals.
export const MessageType = {
    text: 'conversation',
    extendedText: 'extendedTextMessage',
    image: 'imageMessage',
    video: 'videoMessage',
    audio: 'audioMessage',
    sticker: 'stickerMessage',
    document: 'documentMessage',
    contact: 'contactMessage',
    contactsArray: 'contactsArrayMessage',
    location: 'locationMessage',
    liveLocation: 'liveLocationMessage',
    buttons: 'buttonsMessage',
    template: 'templateMessage',
    list: 'listMessage',
    reaction: 'reactionMessage',
    pollCreation: 'pollCreationMessage',
    pollUpdate: 'pollUpdateMessage'
};
export const Presence = {
    available: 'available',
    unavailable: 'unavailable',
    composing: 'composing',
    recording: 'recording',
    paused: 'paused'
};
export const Mimetype = {
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
    ogg: 'audio/ogg; codecs=opus',
    opus: 'audio/ogg; codecs=opus',
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    json: 'application/json',
    zip: 'application/zip',
    txt: 'text/plain'
};
export const WAFlag = { ignore: 'ignore', ack: 'ack', unavailable: 'unavailable' };
export const WA_MESSAGE_STUB_TYPES = proto.WebMessageInfo?.StubType || {};
export { makeWASocket };
export default makeWASocket;
//# sourceMappingURL=index.js.map