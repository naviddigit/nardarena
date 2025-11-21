# 🎓 راهنمای کامل - درک ساختار SOLID

## 📂 Button Component - قدم به قدم

### فایل 1: `Button.types.ts` (تعریف Types و Styles)

**چرا این فایل رو جدا کردیم؟**
- طبق اصل **Single Responsibility**: Types و Styles جدا از Logic
- طبق اصل **Open/Closed**: می‌تونی variant جدید اضافه کنی بدون تغییر کد اصلی

**چی داره؟**
```typescript
// 1. Interface برای props:
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | ...  // نوع دکمه
  size?: 'sm' | 'md' | 'lg'                // سایز
  isLoading?: boolean                       // حالت loading
  leftIcon?: React.ReactNode               // آیکون چپ
  // ...
}

// 2. Style Configuration (جدا از component):
export const buttonVariants = {
  primary: 'bg-purple-600 hover:bg-purple-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 ...',
  // برای اضافه کردن variant جدید فقط یه خط اضافه می‌کنی
}

export const buttonSizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
}
```

**فایده:**
- اگه بخوای دکمه "danger" اضافه کنی:
  ```typescript
  danger: 'bg-red-600 hover:bg-red-700 text-white'
  ```
  همین! کد قدیمی دست نخورده.

---

### فایل 2: `Button.tsx` (کامپوننت اصلی)

**وظایفش چیه؟**
1. دریافت props
2. ترکیب کلاس‌ها بر اساس props
3. نمایش UI

**کد ساده شده:**
```typescript
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',     // پیش‌فرض
  size = 'md',
  isLoading = false,
  leftIcon,
  children,
  ...restProps             // بقیه props مثل onClick
}) => {
  // 1. انتخاب style بر اساس variant
  const variantStyle = buttonVariants[variant];
  const sizeStyle = buttonSizes[size];
  
  // 2. ترکیب کلاس‌ها
  const finalClassName = `${baseStyles} ${variantStyle} ${sizeStyle}`;
  
  // 3. Render
  return (
    <motion.button className={finalClassName} {...restProps}>
      {isLoading && <LoadingSpinner />}
      {leftIcon && <span>{leftIcon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}
```

**نکات مهم:**
- `...restProps`: همه props استاندارد HTML button رو می‌گیره (onClick, disabled, type, ...)
- `motion.button`: از Framer Motion برای انیمیشن
- `LoadingSpinner`: یه SVG ساده برای loading

---

### فایل 3: `index.ts` (Export ها)

```typescript
export { Button } from './Button';
export type { ButtonProps } from './Button.types';
```

**چرا؟**
تا بقیه فایل‌ها بتونن راحت import کنن:
```typescript
import { Button } from '@shared/components/atoms/Button';
```

---

## 📂 Input Components - قدم به قدم

### چرا 4 فایل جدا داریم؟

```
Input/
├── Input.types.ts        → Types و Styles
├── InputWrapper.tsx      → Label, Error, Helper (مشترک)
├── TextInput.tsx         → Input متنی
└── PasswordInput.tsx     → Password با show/hide
```

**دلیل:**
- **DRY Principle**: InputWrapper برای همه استفاده می‌شه
- **Single Responsibility**: هر فایل یه کار مشخص
- **Composition**: PasswordInput از TextInput استفاده می‌کنه

---

### فایل 1: `InputWrapper.tsx`

**وظیفه:** نمایش Label, Error, HelperText

```typescript
export const InputWrapper = ({ label, error, helperText, children }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      {children}  {/* اینجا خود Input قرار می‌گیره */}
      {error && <p className="text-red-400">{error}</p>}
      {helperText && <p className="text-gray-400">{helperText}</p>}
    </div>
  );
}
```

**فایده:** 
- هم TextInput و هم PasswordInput از این استفاده می‌کنن
- اگه بخوای Error را عوض کنی، فقط یه جا تغییر می‌دی

---

### فایل 2: `TextInput.tsx`

**وظیفه:** Input متنی با آیکون

```typescript
export const TextInput = ({ label, error, leftIcon, rightIcon, ...props }) => {
  return (
    <InputWrapper label={label} error={error}>
      <div className="relative">
        {leftIcon && <div className="absolute left-3">{leftIcon}</div>}
        <input className={finalClassName} {...props} />
        {rightIcon && <div className="absolute right-3">{rightIcon}</div>}
      </div>
    </InputWrapper>
  );
}
```

---

### فایل 3: `PasswordInput.tsx`

**وظیفه:** Password با دکمه show/hide

```typescript
export const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <TextInput
      type={showPassword ? 'text' : 'password'}
      rightIcon={
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOpen /> : <EyeClosed />}
        </button>
      }
      {...props}
    />
  );
}
```

**نکته مهم:** 
- PasswordInput از TextInput استفاده می‌کنه (Composition)
- فقط `type` و `rightIcon` رو تغییر می‌ده

---

## 🧪 چطور تست کنی؟

### تست 1: Button Loading

```typescript
const [loading, setLoading] = useState(false);

<Button 
  isLoading={loading} 
  onClick={() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }}
>
  Click Me
</Button>
```

**چی باید ببینی:**
1. کلیک می‌کنی
2. دکمه Spinner نشون می‌ده
3. بعد 2 ثانیه برمی‌گرده به حالت عادی

---

### تست 2: Input Validation

```typescript
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const validateEmail = (value) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    setError('Invalid email');
  } else {
    setError('');
  }
};

<TextInput
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  }}
  error={error}
/>
```

**چی باید ببینی:**
1. تایپ می‌کنی: `test`
2. Error نشون می‌ده: "Invalid email"
3. تایپ می‌کنی: `test@gmail.com`
4. Error بر می‌داره

---

### تست 3: Password Show/Hide

```typescript
<PasswordInput
  placeholder="Enter password"
  label="Password"
/>
```

**چی باید ببینی:**
1. تایپ می‌کنی → `******` نشون می‌ده
2. کلیک روی چشم → پسورد واضح می‌شه
3. دوباره کلیک → برمی‌گرده به `******`

---

## 📊 Git Workflow - چطور کار می‌کنه؟

```bash
# 1. الان روی این branch هستیم:
git branch
# * feature/ui-design

# 2. تا الان 2 commit داریم:
git log --oneline
# 2103f63 feat: Rewrite Input components with SOLID
# da0f0e8 feat: Rewrite Button component with SOLID
# 4517f67 Initial commit

# 3. وقتی UI تمام شد:
git checkout develop
git merge feature/ui-design
git tag -a v0.1.0 -m "Release: UI Components"

# 4. برای دیدن تغییرات:
git diff develop feature/ui-design
```

---

## ✅ Checklist تسلط

پاسخ بده ببینی متوجه شدی:

### سوال 1: اگه بخوام دکمه "danger" قرمز اضافه کنم، کجا باید تغییر بدم؟
<details>
<summary>پاسخ (کلیک کن)</summary>

فقط در `Button.types.ts`:
```typescript
export const buttonVariants = {
  // ... existing variants
  danger: 'bg-red-600 hover:bg-red-700 text-white',
}
```

بعد استفاده:
```typescript
<Button variant="danger">Delete</Button>
```

</details>

---

### سوال 2: چرا InputWrapper رو جدا کردیم؟
<details>
<summary>پاسخ</summary>

چون Label, Error, HelperText در همه Input ها مشترکه.
بدون InputWrapper باید این کدها رو تو TextInput و PasswordInput تکرار می‌کردیم.
الان هر تغییری فقط یه جا اعمال می‌شه.

</details>

---

### سوال 3: PasswordInput چطور کار می‌کنه؟
<details>
<summary>پاسخ</summary>

1. یک `state` داره: `showPassword`
2. از `TextInput` استفاده می‌کنه
3. فقط `type` را بین 'password' و 'text' تغییر می‌ده
4. یک `rightIcon` اضافه می‌کنه (دکمه چشم)
5. وقتی کلیک می‌شه، `showPassword` toggle می‌شه

</details>

---

## 🎯 تمرین عملی

### تمرین 1: اضافه کردن Button XL

**هدف:** یک size "xl" به Button اضافه کن

**راهنمایی:**
1. برو `Button.types.ts`
2. تو `buttonSizes` یه خط اضافه کن
3. تست کن

---

### تمرین 2: Input با Icon سمت راست

**هدف:** یک TextInput با آیکون سمت راست بساز

**راهنمایی:**
```typescript
<TextInput
  placeholder="Search..."
  rightIcon={<SearchIcon />}
/>
```

---

## 📞 اگه سوال داشتی

بگو کدوم قسمت رو نفهمیدی:
- [ ] Types و Interface ها
- [ ] ترکیب کلاس‌ها
- [ ] Composition (PasswordInput از TextInput)
- [ ] Git workflow
- [ ] چیز دیگه

بگو تا توضیح بدم! 🚀
