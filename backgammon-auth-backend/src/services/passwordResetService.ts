import crypto from 'crypto';
import { User } from '../models/User';
import { sendTelegramNotification } from '../utils/telegram';
import bcrypt from 'bcrypt';

/**
 * Forgot Password - ارسال لینک reset
 */
export const requestPasswordReset = async (email: string): Promise<{ message: string }> => {
  // پیدا کردن user
  const [users] = await User.sequelize!.query(
    'SELECT id, email, "isActive" FROM users WHERE email = $1',
    { bind: [email] }
  );

  // برای امنیت، همیشه همین پیام رو برگردون (حتی اگر user وجود نداشته باشد)
  const successMessage = 'If this email exists, a reset link has been sent';

  if (users.length === 0) {
    return { message: successMessage };
  }

  const user: any = users[0];

  if (!user.isActive) {
    return { message: successMessage };
  }

  // ساخت reset token (6 رقم عددی با crypto)
  const resetToken = crypto.randomInt(100000, 999999).toString();
  
  // Hash کردن token برای ذخیره در database
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  
  // Expiry: 1 ساعت
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  // ذخیره token در database
  await User.sequelize!.query(
    `UPDATE users 
     SET "resetToken" = $1, "resetTokenExpiry" = $2 
     WHERE id = $3`,
    { bind: [hashedToken, expiresAt, user.id] }
  );

  // ساخت لینک ریست
  const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
  
  // ارسال لینک به تلگرام
  await sendTelegramNotification({
    type: 'security',
    title: '🔐 Password Reset Request',
    message: `درخواست ریست پسورد برای: ${email}\n\n🔢 کد تأیید: \`${resetToken}\`\n\n🔗 لینک مستقیم:\n${resetLink}\n\n⏰ اعتبار: 1 ساعت`,
    metadata: {
      email,
      expiresAt: expiresAt.toISOString(),
    }
  });
  
  // لاگ در کنسول (برای دیباگ)
  console.log(`\n🔐 Password Reset Link for ${email}:`);
  console.log(`📱 Reset Code: ${resetToken}`);
  console.log(`🔗 Link: ${resetLink}`);
  console.log(`⏰ Expires: ${expiresAt.toLocaleString('fa-IR')}\n`);

  return { message: successMessage };
};

/**
 * Reset Password با token
 */
export const resetPassword = async (
  email: string,
  token: string,
  newPassword: string
): Promise<{ message: string }> => {
  // Hash کردن token برای مقایسه
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // پیدا کردن user با token معتبر
  const [users] = await User.sequelize!.query(
    `SELECT id, email FROM users 
     WHERE email = $1 
     AND "resetToken" = $2 
     AND "resetTokenExpiry" > NOW()
     AND "isActive" = true`,
    { bind: [email, hashedToken] }
  );

  if (users.length === 0) {
    throw new Error('Invalid or expired reset token');
  }

  const user: any = users[0];

  // Hash کردن password جدید
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // آپدیت password و حذف token
  await User.sequelize!.query(
    `UPDATE users 
     SET password = $1, "resetToken" = NULL, "resetTokenExpiry" = NULL 
     WHERE id = $2`,
    { bind: [hashedPassword, user.id] }
  );

  console.log(`✅ Password reset successful for ${email}`);

  return { message: 'Password reset successful' };
};
