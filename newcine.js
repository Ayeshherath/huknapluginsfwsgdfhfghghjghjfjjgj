const {
  cmd,
  commands
} = require("../command");
const {
  fetchJson
} = require('../lib/functions');
cmd({
  'pattern': "cinesubz",
  'alias': ["cine"],
  'react': '🎬',
  'desc': "Search and download movies from CineSubz",
  'category': 'movie',
  'use': ".cinesubz <name>",
  'filename': __filename
}, async (_0x1bab1f, _0x13a4c9, _0xf1d7e8, {
  from: _0x3fe55f,
  q: _0xa110e9,
  senderNumber: _0x347ee7,
  reply: _0x503c62
}) => {
  try {
    if (!_0xa110e9) {
      return await _0x503c62("*plese provide A movie name TO Search! (E.g, x man)*");
    }
    const _0x3cbf21 = await fetchJson("https://cinesubz-api-zazie.vercel.app/api/search?q=" + encodeURIComponent(_0xa110e9));
    if (!_0x3cbf21.status) {
      return await _0x503c62("*No results found for:* \"" + _0xa110e9 + "\"");
    }
    const _0x268160 = _0x3cbf21.result.data;
    let _0x2e0d9b = " *💥__𝐂𝐈𝐍𝐄𝐙𝐔𝐁  𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑__💥*\n\n🎥 *Search Results for* \"" + _0xa110e9 + "\":\n\n";
    _0x268160.forEach((_0x2e0c94, _0x56439b) => {
      _0x2e0d9b += '*' + (_0x56439b + 0x1) + ".* " + _0x2e0c94.title + " (" + _0x2e0c94.year + ")\n";
    });
    const _0x4d877a = await _0x1bab1f.sendMessage(_0x3fe55f, {
      'text': _0x2e0d9b
    }, {
      'quoted': _0xf1d7e8
    });
    const _0x429937 = _0x4d877a.key.id;
    _0x1bab1f.ev.on("messages.upsert", async _0x4e425e => {
      const _0x46a8a4 = _0x4e425e.messages[0x0];
      if (!_0x46a8a4.message) {
        return;
      }
      const _0x508a9d = _0x46a8a4.message.conversation || _0x46a8a4.message.extendedTextMessage?.['text'];
      const _0x5a9a09 = _0x46a8a4.message.extendedTextMessage && _0x46a8a4.message.extendedTextMessage.contextInfo.stanzaId === _0x429937;
      if (_0x5a9a09) {
        const _0x4069ec = parseInt(_0x508a9d.trim());
        if (!isNaN(_0x4069ec) && _0x4069ec > 0x0 && _0x4069ec <= _0x268160.length) {
          const _0xc88287 = _0x268160[_0x4069ec - 0x1];
          const _0x625801 = await fetchJson("https://cinesubz-api-zazie.vercel.app/api/movie?url=" + encodeURIComponent(_0xc88287.link));
          if (!_0x625801.status || !_0x625801.result.data.dl_links) {
            return await _0x503c62("*Error fetching download links for this movie.*");
          }
          const {
            title: _0x4029f5,
            imdbRate: _0x40f271,
            image: _0x3091d6,
            date: _0x2d1601,
            country: _0x42a79e,
            duration: _0x4846d5,
            dl_links: _0x26d9b5
          } = _0x625801.result.data;
          if (_0x26d9b5.length === 0x0) {
            return await _0x503c62("*No download links available for this movie.*");
          }
          let _0x1ffb41 = "*𝗔𝗩𝗜𝗕𝗟𝗘 𝗗𝗢𝗪𝗡𝗟𝗢𝗗 𝗟𝗜𝗡𝗞𝗦:*\n";
          _0x26d9b5.forEach((_0x22331a, _0x14e03b) => {
            _0x1ffb41 += '*' + (_0x14e03b + 0x1) + ".* " + _0x22331a.quality + " - " + _0x22331a.size + "\n" + _0x22331a.link + "\n\n";
          });
          let _0x25e57f = "💗_𝐏𝐎𝐃𝐃𝐀  𝐗   𝐌𝐃   𝐂𝐈𝐍𝐄𝐙𝐔𝐁  𝐃𝐄𝐓𝐀𝐈𝐋𝐒_💗\n\n          \n\n             🎥 ✘  *" + _0x4029f5 + "*\n\n";
          _0x25e57f += " ⭐ *𝗥𝗔𝗧𝗜𝗡𝗚:* " + _0x40f271 + "\n 📅 *𝗥𝗘𝗟𝗘𝗦𝗘 𝗗𝗔𝗧𝗘:* " + _0x2d1601 + "\n🌍 *𝗖𝗢𝗨𝗡𝗧𝗥𝗬:* " + _0x42a79e + "\n✘ ⏳ *𝗗𝗨𝗥𝗔𝗧𝗜𝗢𝗡:* " + _0x4846d5 + "\n\n";
          _0x25e57f += "> 𓄂ꪴꪰ 𝙿𝙾𝚆𝙴𝚁𝙳  𝙱𝚈  𝙿𝙾𝙳𝙳𝙰  𝚇  〽️𝙳™\n\n";
          await _0x1bab1f.sendMessage(_0x3fe55f, {
            'image': {
              'url': _0x3091d6
            },
            'caption': _0x25e57f,
            'contextInfo': {
              'mentionedJid': ["94775341543@s.whatsapp.net"],
              'groupMentions': [],
              'forwardingScore': 0x3e7,
              'isForwarded': true,
              'forwardedNewsletterMessageInfo': {
                'newsletterJid': "@newsletter",
                'newsletterName': "> 𓄂ꪴꪰ 𝙿𝙾𝚆𝙴𝚁𝙳  𝙱𝚈  𝙿𝙾𝙳𝙳𝙰  𝚇  〽️𝙳™",
                'serverMessageId': 0x3e7
              },
              'externalAdReply': {
                'title': "𝙲𝙸𝙽𝙴𝚉𝚄𝙱  𝙼𝚅  𝙳𝙻",
                'body': "𝙳𝙻_𝚂𝚈𝚂𝚃𝙴𝙼_☠️",
                'mediaType': 0x1,
                'sourceUrl': 'https://github.com/CYBER-MD',
                'thumbnailUrl': "https://telegra.ph/file/380e16af11d1d77ab77e5.jpg",
                'renderLargerThumbnail': false,
                'showAdAttribution': false
              }
            }
          }, {
            'quoted': _0x46a8a4
          });
          const _0x2be730 = await _0x1bab1f.sendMessage(_0x3fe55f, {
            'image': {
              'url': _0x3091d6
            },
            'caption': _0x1ffb41,
            'contextInfo': {
              'mentionedJid': ["94775341543@s.whatsapp.net"],
              'groupMentions': [],
              'forwardingScore': 0x3e7,
              'isForwarded': true,
              'forwardedNewsletterMessageInfo': {
                'newsletterJid': "@newsletter",
                'newsletterName': "> 𓄂ꪴꪰ 𝙿𝙾𝚆𝙴𝚁𝙳  𝙱𝚈  𝙿𝙾𝙳𝙳𝙰  𝚇  〽️𝙳™",
                'serverMessageId': 0x3e7
              },
              'externalAdReply': {
                'title': "𝙲𝙸𝙽𝙴𝚉𝚄𝙱  𝙼𝚅  𝙳𝙻",
                'body': "𝙳𝙻_𝚂𝚈𝚂𝚃𝙴𝙼_☠️",
                'mediaType': 0x1,
                'sourceUrl': "https://github.com/CYBER-MD",
                'thumbnailUrl': "https://telegra.ph/file/380e16af11d1d77ab77e5.jpg",
                'renderLargerThumbnail': false,
                'showAdAttribution': false
              }
            }
          }, {
            'quoted': _0x46a8a4
          });
          const _0x1f3041 = _0x2be730.key.id;
          _0x1bab1f.ev.on("messages.upsert", async _0x598989 => {
            const _0x3d707c = _0x598989.messages[0x0];
            if (!_0x3d707c.message) {
              return;
            }
            const _0x446f1b = _0x3d707c.message.conversation || _0x3d707c.message.extendedTextMessage?.["text"];
            const _0xe81c88 = _0x3d707c.message.extendedTextMessage && _0x3d707c.message.extendedTextMessage.contextInfo.stanzaId === _0x1f3041;
            if (_0xe81c88) {
              const _0x350acc = parseInt(_0x446f1b.trim());
              if (!isNaN(_0x350acc) && _0x350acc > 0x0 && _0x350acc <= _0x26d9b5.length) {
                const _0x27cfba = _0x26d9b5[_0x350acc - 0x1];
                const _0x2e102e = await fetchJson("https://cinesubz-api-zazie.vercel.app/api/links?url=" + encodeURIComponent(_0x27cfba.link));
                const _0x4f4ad4 = _0x2e102e.result.direct;
                await _0x1bab1f.sendMessage(_0x3fe55f, {
                  'react': {
                    'text': '⬆️',
                    'key': _0xf1d7e8.key
                  }
                });
                await _0x1bab1f.sendMessage(_0x3fe55f, {
                  'document': {
                    'url': _0x4f4ad4
                  },
                  'mimetype': "video/mp4",
                  'fileName': _0x4029f5 + " - " + _0x27cfba.quality + ".mp4",
                  'caption': "> 𓄂ꪴꪰ 𝙿𝙾𝚆𝙴𝚁𝙳  𝙱𝚈  𝙿𝙾𝙳𝙳𝙰  𝚇  〽️𝙳",
                  'contextInfo': {
                    'mentionedJid': ["94704031866@s.whatsapp.net"],
                    'groupMentions': [],
                    'forwardingScore': 0x3e7,
                    'isForwarded': true,
                    'forwardedNewsletterMessageInfo': {
                      'newsletterJid': "@newsletter",
                      'newsletterName': "*> 𓄂ꪴꪰ 𝙿𝙾𝚆𝙴𝚁𝙳  𝙱𝚈  𝙿𝙾𝙳𝙳𝙰  𝚇  〽️𝙳™*",
                      'serverMessageId': 0x3e7
                    },
                    'externalAdReply': {
                      'title': "𝙲𝙸𝙽𝙴𝚉𝚄𝙱  𝙼𝚅  𝙳𝙻",
                      'body': "𝙳𝙻_𝚂𝚈𝚂𝚃𝙴𝙼_☠️",
                      'mediaType': 0x1,
                      'sourceUrl': "https://github.com/CYBER-MD",
                      'thumbnailUrl': "https://telegra.ph/file/380e16af11d1d77ab77e5.jpg",
                      'renderLargerThumbnail': false,
                      'showAdAttribution': false
                    }
                  }
                }, {
                  'quoted': _0x3d707c
                });
                await _0x1bab1f.sendMessage(_0x3fe55f, {
                  'react': {
                    'text': '✅',
                    'key': _0xf1d7e8.key
                  }
                });
              } else {
                await _0x503c62("Invalid selection. Please reply with a valid number.");
              }
            }
          });
        } else {
          await _0x503c62("Invalid selection. Please reply with a valid number.");
        }
      }
    });
  } catch (_0xb62837) {
    console.error("Error during CineSubz command execution:", _0xb62837);
    _0x503c62("*An error occurred while processing your request.*");
  }
}); //