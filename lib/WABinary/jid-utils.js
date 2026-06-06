export const S_WHATSAPP_NET = '@s.whatsapp.net';
export const OFFICIAL_BIZ_JID = '16505361212@c.us';
export const SERVER_JID = 'server@c.us';
export const PSA_WID = '0@c.us';
export const STORIES_JID = 'status@broadcast';
export const META_AI_JID = '13135550002@c.us';
export var WAJIDDomains;
(function (WAJIDDomains) {
    WAJIDDomains[WAJIDDomains["WHATSAPP"] = 0] = "WHATSAPP";
    WAJIDDomains[WAJIDDomains["LID"] = 1] = "LID";
    WAJIDDomains[WAJIDDomains["HOSTED"] = 128] = "HOSTED";
    WAJIDDomains[WAJIDDomains["HOSTED_LID"] = 129] = "HOSTED_LID";
})(WAJIDDomains || (WAJIDDomains = {}));
export const getServerFromDomainType = (initialServer, domainType) => {
    switch (domainType) {
        case WAJIDDomains.LID:
            return 'lid';
        case WAJIDDomains.HOSTED:
            return 'hosted';
        case WAJIDDomains.HOSTED_LID:
            return 'hosted.lid';
        case WAJIDDomains.WHATSAPP:
        default:
            return initialServer;
    }
};
export const jidEncode = (user, server, device, agent) => {
    return `${user || ''}${!!agent ? `_${agent}` : ''}${!!device ? `:${device}` : ''}@${server}`;
};
export const jidDecode = (jid) => {
    // todo: investigate how to implement hosted ids in this case
    const sepIdx = typeof jid === 'string' ? jid.indexOf('@') : -1;
    if (sepIdx < 0) {
        return undefined;
    }
    const server = jid.slice(sepIdx + 1);
    const userCombined = jid.slice(0, sepIdx);
    const [userAgent, device] = userCombined.split(':');
    const [user, agent] = userAgent.split('_');
    let domainType = WAJIDDomains.WHATSAPP;
    if (server === 'lid') {
        domainType = WAJIDDomains.LID;
    }
    else if (server === 'hosted') {
        domainType = WAJIDDomains.HOSTED;
    }
    else if (server === 'hosted.lid') {
        domainType = WAJIDDomains.HOSTED_LID;
    }
    else if (agent) {
        domainType = parseInt(agent);
    }
    return {
        server: server,
        user: user,
        domainType,
        device: device ? +device : undefined
    };
};
/** is the jid a user */
export const areJidsSameUser = (jid1, jid2) => jidDecode(jid1)?.user === jidDecode(jid2)?.user;
/** is the jid Meta AI */
export const isJidMetaAI = (jid) => jid?.endsWith('@bot');
/** is the jid a PN user */
export const isPnUser = (jid) => jid?.endsWith('@s.whatsapp.net');
// Kiu/@z4phdev legacy alias
export const isJidUser = isPnUser;
/** is the jid a LID */
export const isLidUser = (jid) => jid?.endsWith('@lid');
/** is the jid a broadcast */
export const isJidBroadcast = (jid) => jid?.endsWith('@broadcast');
/** is the jid a group */
export const isJidGroup = (jid) => jid?.endsWith('@g.us');
/** is the jid the status broadcast */
export const isJidStatusBroadcast = (jid) => jid === 'status@broadcast';
/** is the jid a newsletter */
export const isJidNewsletter = (jid) => jid?.endsWith('@newsletter');
// Kiu/@z4phdev legacy typo-cased alias
export const isJidNewsLetter = isJidNewsletter;
/** is the jid a hosted PN */
export const isHostedPnUser = (jid) => jid?.endsWith('@hosted');
/** is the jid a hosted LID */
export const isHostedLidUser = (jid) => jid?.endsWith('@hosted.lid');
const botRegexp = /^1313555\d{4}$|^131655500\d{2}$/;
export const isJidBot = (jid) => jid && botRegexp.test(jid.split('@')[0]) && jid.endsWith('@c.us');
export const jidNormalizedUser = (jid) => {
    const result = jidDecode(jid);
    if (!result) {
        return '';
    }
    const { user, server } = result;
    return jidEncode(user, server === 'c.us' ? 's.whatsapp.net' : server);
};

// Compatibility helper inspired by Elaina Baileys.
// This is a suffix-level fallback only; it is not a real LID↔PN resolver.
export const lidToJid = (jid) => jid && jid.endsWith('@lid') ? jid.replace('@lid', '@s.whatsapp.net') : jid;

// Meta bot id compatibility map inspired by Elaina Baileys.
const BOT_JID_MAP = new Map([
    ['867051314767696', '13135550002'],
    ['1061492271844689', '13135550005'],
    ['245886058483988', '13135550009'],
    ['3509905702656130', '13135550012'],
    ['1059680132034576', '13135550013'],
    ['715681030623646', '13135550014'],
    ['1644971366323052', '13135550015'],
    ['582497970646566', '13135550019'],
    ['645459357769306', '13135550022'],
    ['294997126699143', '13135550023'],
    ['1522631578502677', '13135550027'],
    ['719421926276396', '13135550030'],
    ['1788488635002167', '13135550031'],
    ['24232338603080193', '13135550033'],
    ['689289903143209', '13135550035'],
    ['871626054177096', '13135550039'],
    ['362351902849370', '13135550042'],
    ['1744617646041527', '13135550043'],
    ['893887762270570', '13135550046'],
    ['1155032702135830', '13135550047'],
    ['333931965993883', '13135550048'],
    ['853748013058752', '13135550049'],
    ['1559068611564819', '13135550053'],
    ['890487432705716', '13135550054'],
    ['240254602395494', '13135550055'],
    ['1578420349663261', '13135550062'],
    ['322908887140421', '13135550065'],
    ['3713961535514771', '13135550067'],
    ['997884654811738', '13135550070'],
    ['403157239387035', '13135550081'],
    ['535242369074963', '13135550082'],
    ['946293427247659', '13135550083'],
    ['3664707673802291', '13135550084'],
    ['1821827464894892', '13135550085'],
    ['1760312477828757', '13135550086'],
    ['439480398712216', '13135550087'],
    ['1876735582800984', '13135550088'],
    ['984025089825661', '13135550089'],
    ['1001336351558186', '13135550090'],
    ['3739346336347061', '13135550091'],
    ['3632749426974980', '13135550092'],
    ['427864203481615', '13135550093'],
    ['1434734570493055', '13135550094'],
    ['992873449225921', '13135550095'],
    ['813087747426445', '13135550096'],
    ['806369104931434', '13135550098'],
    ['1220982902403148', '13135550099'],
    ['1365893374104393', '13135550100'],
    ['491811473512352', '13165550064'],
]);

export const getBotJid = (jid) => {
    const sepIdx = typeof jid === 'string' ? jid.indexOf('@') : -1;
    if (sepIdx < 0) return jid;
    const server = jid.slice(sepIdx + 1);
    if (server !== 'bot') return jid;
    const user = jid.slice(0, sepIdx);
    const mappedNumber = BOT_JID_MAP.get(user);
    return mappedNumber ? `${mappedNumber}@s.whatsapp.net` : jid;
};

export const transferDevice = (fromJid, toJid) => {
    const fromDecoded = jidDecode(fromJid);
    const deviceId = fromDecoded?.device || 0;
    const { server, user } = jidDecode(toJid);
    return jidEncode(user, server, deviceId);
};
//# sourceMappingURL=jid-utils.js.map