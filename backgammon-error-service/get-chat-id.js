/**
 * اسکریپت برای گرفتن Chat ID تلگرام
 * 
 * نحوه استفاده:
 * 1. npm install node-telegram-bot-api
 * 2. node get-chat-id.js
 * 3. یک پیام در کانال یا گروهت بفرست
 * 4. Chat ID رو میبینی!
 */

const TelegramBot = require('node-telegram-bot-api');

// Token از BotFather
const token = '8391503357:AAHihxMkH8dxo9D4VXI-2FxaxNn6v27Z1ZM';

const bot = new TelegramBot(token, { polling: true });

console.log('🤖 Bot آماده است!');
console.log('📝 یک پیام در کانال یا گروهت بفرست...\n');

bot.on('message', (msg) => {
  console.log('✅ پیام دریافت شد!\n');
  console.log('════════════════════════════════════');
  console.log('📊 اطلاعات Chat:');
  console.log('════════════════════════════════════');
  console.log(`Chat ID: ${msg.chat.id}`);
  console.log(`Chat Type: ${msg.chat.type}`);
  console.log(`Chat Title: ${msg.chat.title || 'بدون عنوان'}`);
  console.log('════════════════════════════════════\n');
  
  console.log(`✨ این عدد رو کپی کن و در .env بزار:`);
  console.log(`TELEGRAM_CHAT_ID=${msg.chat.id}\n`);
  
  // بعد از اولین پیام، Bot رو متوقف کن
  process.exit(0);
});

bot.on('polling_error', (error) => {
  console.error('❌ خطا:', error.message);
});
