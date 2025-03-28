const { updateEnv, readEnv } = require('../lib/database');
const { cmd, commands } = require('../command');
const EnvVar = require('../lib/mongodbenv');

cmd({
    pattern: "settings",
    alias: ["setting","s"],
    desc: "Check bot online or not.",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return;

        const config = await readEnv();

        let work;
        switch (config.MODE) {
            case 'public':
                work = '𝙿𝚄𝙱𝙻𝙸𝙲🌎';
                break;
            case 'private':
                work = '𝙿𝚁𝙸𝚅𝙰𝚃𝙴👤';
                break;
            case 'groups':
                work = '𝙶𝚁𝙾𝚄𝙿 𝙾𝙽𝙻𝚈👥';
                break;
            case 'inbox':
                work = '𝙸𝙽𝙱𝙾𝚇 𝙾𝙽𝙻𝚈🫂';
                break;
            default:
                work = '𝚄𝙽𝙺𝙾𝚆𝙽🛑';
        }

        let autoStatus = config.AUTO_READ_STATUS === 'true' ? '♻️ 𝙾𝙽' : '🚫 𝙾𝙵𝙵';
        let autoVoice = config.AUTO_VOICE === 'true' ? '♻️ 𝙾𝙽' : '🚫 𝙾𝙵𝙵';
        let autoSticker = config.AUTO_STICKER === 'true' ? '♻️ 𝙾𝙽' : '🚫 𝙾𝙵𝙵';
        let autoReply = config.AUTO_REPLY === 'true' ? '♻️ 𝙾𝙽' : '🚫 𝙾𝙵𝙵';
        let ownerreact = config.OWNER_REACT === 'true' ? '♻️ 𝙾𝙽' : '🚫 𝙾𝙵𝙵';
        let autoreact = config.AUTO_REACT === 'true' ? '♻️ 𝙾𝙽' : '🚫 𝙾𝙵𝙵';

        const vv = await conn.sendMessage(from, {
            image: { url: 'https://i.ibb.co/Y4gSh6VL/5486.jpg' },
            caption: `*𝙼𝙰𝙽𝙰𝙶𝙴𝚁   𝙱𝙾𝚃™  𝚂𝙴𝚃𝚃𝙸𝙽𝙶*

╭══════════════════════○
┣━ (01) *𝐖ᴏʀᴋ 𝐌ᴏᴅᴇ...*
> 1.1  Public Work__
> 1.2  Private Work__
> 1.3  Group Only__
> 1.4  Inbox Only__
╭══════════════════════○
┣━ (02) *𝐀ᴜᴛᴏ 𝐕ᴏɪᴄᴇ....*
> 2.1 Auto Voice __true 
> 2.2 Auto Voice_ false 
╭══════════════════════○
┣━ (03) *𝐀ᴜᴛᴏ 𝐒ᴛᴀᴛᴜꜱ 𝐒ᴇᴇɴ...*
> 3.1 Auto Read Status __true 
> 3.2 Auto Read Status_ false 
╭══════════════════════○
┣━ (04) *𝐀ᴜᴛᴏ 𝐒ᴛɪᴄᴋᴇʀ...*
> 4.1 Auto sticker __true 
> 4.2 Auto sticker_ false 
╭══════════════════════○
┣━ (05) *𝐀ᴜᴛᴏ 𝐑ᴇᴘʟʏ....*
> 5.1 Auto reply __true 
> 5.2 Auto reply_ false 
╭══════════════════════○
┣━ (06) *𝐁ᴏᴛ 𝐎ɴʟɪɴᴇ / 𝐎ꜰꜰʟɪɴᴇ...*
> 6.1 Online __true 
> 6.2 Online_ false 
╭══════════════════════○
┣━ (07) *𝐌ꜱɢ 𝐑ᴇᴀᴅ....*
> 7.1 Read Msg __true
> 7.2 Read Msg_ false 
╭══════════════════════○
┣━  (08) *𝐌ꜱɢ 𝐑ᴇᴀᴄᴛ....*
> 8.1 Auto React __true 
> 8.2 Auto React _ false 
╭══════════════════════○
┣━ (09) *𝐀ɴᴛɪ 𝐋ɪɴᴋ.....*
> 9.1 Anti Link__true 
> 9.2 Anti Link _ false 
> 9.3 Anti Link + Remove 
╭══════════════════════○
┣━ (10) *𝐀ᴜᴛᴏ 𝐒ᴛᴀᴛᴜꜱ 𝐑ᴇᴀᴄᴛ & 𝐑ᴇᴘʟʏ.....*
> 10. 1 Status React__true 
> 10. 2 Status React _ false 
> 10. 3 Status Reply__true 
> 10. 4 Status Reply _ false 
╰══════════════════════○


> 𝙼𝙰𝙽𝙰𝙶𝙴𝚁   𝙱𝙾𝚃™`
        }, { quoted: mek });

        // Auto-delete the message after 10 seconds
        setTimeout(async () => {
            await conn.sendMessage(from, { delete: vv.key });
        }, 300000); // 10 seconds timeout for deletion

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1.1':
                        reply('.update MODE:public');
                        reply('.restart');
                        break;
                    case '1.2':
                        reply('.update MODE:private');
                        reply('.restart');
                        break;
                    case '1.3':
                        reply('.update MODE:groups');
                        reply('.restart');
                        break;
                    case '1.4':
                        reply('.update MODE:inbox');
                        reply('.restart');
                        break;
                    case '2.1':
                        reply('.update AUTO_VOICE:true');
                         reply('.restart');
                        break;
                    case '2.2':
                        reply('.update AUTO_VOICE:false');
                         reply('.restart');
                        break;
                    case '3.1':
                        reply('.update AUTO_READ_STATUS:true');
                         reply('.restart');
                        break;
                        case '3.2':
                        reply('.update AUTO_READ_STATUS:true');
                         reply('.restart');
                        break;
                        case '4.1':
                        reply('.update AUTO_STICKER:true');
                         reply('.restart');
                        break;
                        case '4.2':
                        reply('.update AUTO_STICKER:false');
                         reply('.restart');
                        break;
                        case '5.1':
                        reply('.update AUTO_REPLY:true');
                         reply('.restart');
                        break;
                        case '5.2':
                        reply('.update AUTO_REPLY:true');
                         reply('.restart');
                        break;
                         case '6.1':
                        reply('.update ALLWAYS_OFFLINE:true');
                         reply('.restart');
                        break;
                        case '6.2':
                        reply('.update ALLWAYS_OFFLINE:false');
                         reply('.restart');
                        break;
                        case '7.1':
                        reply('.update READ_MESSAGE:true');
                         reply('.restart');
                        break;
                        case '7.2':
                        reply('.update READ_MESSAGE:false');
                         reply('.restart');
                        break;
                         case '8.1':
                        reply('.update AUTO_REACT:true');
                         reply('.restart');
                        break;
                         case '8.2':
                        reply('.update AUTO_REACT:false');
                         reply('.restart');
                        break;
                         case '9.1':
                        reply('.update ANTI_LINK:true');
                         reply('.restart');
                        break;
                         case '9.2':
                        reply('.update ANTI_LINKK:true');
                         reply('.restart');
                        break;
                         case '9.3':
                        reply('.update ANTI_LINK:false');
                         reply('.restart');
                        break;
                         case '10.1':
                        reply('.update AUTO_REACT_STATUS:true');
                         reply('.restart');
                        break;
                         case '10.2':
                        reply('.update AUTO_REACT_STATUS:false');
                         reply('.restart');
                        break;
                         case '10.3':
                        reply('.update AUTO_STATUS_REPLY:true');
                         reply('.restart');
                        break;
                         case '10.4':
                        reply('.update AUTO_STATUS_REPLY:false');
                         reply('.restart');
                        break;
                        
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }
                // Auto-delete the option selection after 10 seconds
                setTimeout(async () => {
                    await conn.sendMessage(from, { delete: msg.key });
                }, 2000); // 10 seconds timeout for deletion

            }
        });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
