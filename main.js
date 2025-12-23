//code gửi tin nhắn all server

const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

client.on('ready', async () => {
  console.log(`Login as ${client.user.username}`);

  client.guilds.cache.forEach(guild => {
    // tìm channel general
    const channel = guild.channels.cache.find(
      ch => ch.name === 'general' && ch.isText()
    );

    if (!channel) {
      console.log(`❌ ${guild.name}: không có general`);
      return;
    }

    // gửi tin nhắn
    channel.send('https://discord.com/oauth2/authorize?client_id=1438073384805072998')
      .then(() => {
        console.log(`✅ Đã gửi ở ${guild.name}`);
      })
      .catch(err => {
        console.log(`⚠️ Lỗi gửi ở ${guild.name}: ${err.message}`);
      });
  });
});

client.login('MTQ1Mjk0NTY3NjMyODUwMTQwMQ.GOuL3u.0M_XY6fr9Xzng1wfO6BUYkAB7DThVHZIjWvMr4');
