import { User } from '../models/User';
import { generateTokens, verifyRefreshToken } from '../utils/jwt';
import bcrypt from 'bcrypt';
import { notifyFailedLogin, notifySuccessfulLogin } from '../utils/telegram';

/**
 * Service: Register
 * ثبت‌نام کاربر جدید - فقط با Email و Password
 */
export const registerUser = async (
  email: string,
  password: string
): Promise<{ user: any; tokens: { accessToken: string; refreshToken: string } }> => {
  // چک کردن وجود user قبلی
  const existingUserByEmail = await User.findOne({ where: { email } });
  if (existingUserByEmail) {
    throw new Error('Email already exists');
  }

  // ساخت username از email (موقت - بعداً user خودش انتخاب میکنه)
  const tempUsername = 'user_' + Date.now();

  // Hash کردن password (مطمئن میشیم که hash میشه)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // ساخت user جدید
  const user = await User.create({
    username: tempUsername,
    email,
    password: hashedPassword, // password از قبل hash شده
    role: 'player', // پیش‌فرض player
    isActive: true, // فعال کردن کاربر جدید
    isEmailVerified: false, // بعداً verify میکنه
    stats: {
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
    },
  });

  // Reload user to get auto-generated fields
  await user.reload();

  // ساخت tokens
  const tokens = generateTokens({
    userId: String(user.id),
    email: user.email,
    role: user.role,
  });

  // برگردوندن user بدون password
  const userObject = user.toJSON();
  delete (userObject as any).password;

  return { user: userObject, tokens };
};

/**
 * Service: Login
 * ورود کاربر - با رمزنگاری استاندارد bcrypt
 * 
 * ⚠️ نکته مهم: از raw query استفاده میکنیم چون Sequelize ORM 
 * فیلد password رو به درستی load نمیکرد (undefined)
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: any; tokens: { accessToken: string; refreshToken: string } }> => {
  // پیدا کردن user با raw query برای اطمینان از load شدن password
  const [users] = await User.sequelize!.query(
    'SELECT * FROM users WHERE email = $1',
    { bind: [email] }
  );
  
  if (users.length === 0) {
    // ارسال notification به تلگرام
    notifyFailedLogin(email, 'User not found');
    throw new Error('Invalid email or password');
  }

  const user: any = users[0];
  
  // چک کردن active بودن
  if (!user.isActive) {
    notifyFailedLogin(email, 'Account deactivated');
    throw new Error('Account is deactivated');
  }

  // چک کردن password با bcrypt
  if (!user.password) {
    notifyFailedLogin(email, 'No password in database');
    throw new Error('Invalid email or password');
  }
  
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
  if (!isPasswordCorrect) {
    notifyFailedLogin(email, 'Invalid password');
    throw new Error('Invalid email or password');
  }

  // ارسال notification موفقیت
  notifySuccessfulLogin(email);

  // ساخت tokens
  const tokens = generateTokens({
    userId: String(user.id),
    email: user.email,
    role: user.role,
  });

  // برگردوندن user بدون password (قبلاً toJSON شده)
  const userResponse = { ...user };
  delete (userResponse as any).password;

  return { user: userResponse, tokens };
};

/**
 * Service: Get User by ID
 * گرفتن اطلاعات user
 */
export const getUserById = async (userId: string): Promise<User | null> => {
  return await User.findByPk(userId, {
    attributes: { exclude: ['password'] }, // بدون password
  });
};

/**
 * Service: Refresh Token
 * تمدید access token با refresh token
 */
export const refreshAccessToken = async (
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  // تایید refresh token
  const decoded = verifyRefreshToken(refreshToken);

  // پیدا کردن user
  const user = await User.findByPk(decoded.userId);

  if (!user || !user.isActive) {
    throw new Error('User not found or deactivated');
  }

  // ساخت tokens جدید
  return generateTokens({
    userId: String(user.id),
    email: user.email,
    role: user.role,
  });
};
