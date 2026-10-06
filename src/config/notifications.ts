/**
 * Spectre Tutors Network - Notification & WhatsApp Configuration
 * 
 * Set your coordinator phone number here so incoming requests reach you instantly.
 */

export const NOTIFICATION_CONFIG = {
  // Your Spectre Coordinator WhatsApp number (with country code, without '+' or dashes)
  // e.g. '919812345678'
  coordinatorWhatsAppNumber: import.meta.env.VITE_COORDINATOR_WHATSAPP || '919876543210',

  // Optional: CallMeBot WhatsApp API Key for automated background WhatsApp alerts to your phone
  // (Get free key in 30s at https://www.callmebot.com/blog/free-api-whatsapp-messages/)
  callMeBotApiKey: import.meta.env.VITE_CALLMEBOT_API_KEY || '',

  // Optional: Telegram Bot token & Chat ID for instant background push notifications
  telegramBotToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '',
  telegramChatId: import.meta.env.VITE_TELEGRAM_CHAT_ID || '',

  // Optional: Custom Webhook URL (e.g. Zapier / Make.com / n8n / Discord)
  webhookUrl: import.meta.env.VITE_ALERT_WEBHOOK_URL || '',
};
