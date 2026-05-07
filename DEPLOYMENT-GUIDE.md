# 🚀 ڕێنمایی دروستکردنی ڕیپۆ بۆ ئەرشیف و مایکرۆ-سایتەکان

ئەم فایلە ڕێنمایی تەواوی دروستکردن و دابەزاندنی دوو ڕیپۆی سەربەخۆی Next.js دەگرێتەوە.

---

## بەشی ١: دروستکردنی ڕیپۆی "Archive" (case-study.ibrahim-eng.dev)

### هەنگاوی ١ — دروستکردنی پڕۆژە

```powershell
# لە Desktop یان هەر شوێنێکی تر
cd C:\Users\Tech Line\Desktop

npx create-next-app@latest archive-site --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

لە کاتی دروستکردندا ئەم هەڵبژاردانە دابنێ:
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ `src/` directory
- ✅ App Router
- ❌ Turbopack (نەخێر)

### هەنگاوی ٢ — دابەزاندنی پاکێجەکان

```powershell
cd C:\Users\Tech Line\Desktop\archive-site

npm install framer-motion
```

### هەنگاوی ٣ — کۆپی کردنی دیزاین سیستەم

فایلەکانی خوارەوە لە پۆرتفۆلیۆی سەرەکیت کۆپی بکە بۆ ڕیپۆی نوێ:

```powershell
# کۆپی tailwind.config.ts
copy "C:\Users\Tech Line\Desktop\New folder (2)\my-portfolio\tailwind.config.ts" "C:\Users\Tech Line\Desktop\archive-site\tailwind.config.ts"

# کۆپی globals.css
copy "C:\Users\Tech Line\Desktop\New folder (2)\my-portfolio\src\app\globals.css" "C:\Users\Tech Line\Desktop\archive-site\src\app\globals.css"
```

⚠️ **گرنگ:** لە `archive-site\src\app\layout.tsx` دا فۆنتی `Space Grotesk` زیاد بکە بە هەمان شێوەی پۆرتفۆلیۆی سەرەکی:

```tsx
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

// لە <body> دا:
<body className={`${spaceGrotesk.variable} antialiased`}>
```

### هەنگاوی ٤ — دانانی page.tsx

فایلی تێمپلەیتی ئەرشیف کۆپی بکە:

```powershell
# سڕینەوەی page.tsx ی سەرەتایی و دانانی تێمپلەیتی ئەرشیف
copy "C:\Users\Tech Line\Desktop\New folder (2)\my-portfolio\src\templates\archive\page.tsx" "C:\Users\Tech Line\Desktop\archive-site\src\app\page.tsx"
```

### هەنگاوی ٥ — تاقیکردنەوە

```powershell
cd C:\Users\Tech Line\Desktop\archive-site
npm run dev
```

دەبێت لە `http://localhost:3000` تەبڵی ئەرشیف ببینیت.

### هەنگاوی ٦ — Git و Vercel

```powershell
cd C:\Users\Tech Line\Desktop\archive-site

git init
git add .
git commit -m "feat: archive site — case-study.ibrahim-eng.dev"
```

- لە GitHub ڕیپۆیەکی نوێ دروست بکە بە ناوی `archive-site`
- Push بکە:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/archive-site.git
git branch -M main
git push -u origin main
```

- لە **Vercel** → Import Project → ڕیپۆی `archive-site` هەڵبژێرە
- لە Settings → Domains → زیاد بکە: `case-study.ibrahim-eng.dev`

---

## بەشی ٢: دروستکردنی ڕیپۆی "CSAI Micro-Site" (csai.ibrahim-eng.dev)

### هەنگاوی ١ — دروستکردنی پڕۆژە

```powershell
cd C:\Users\Tech Line\Desktop

npx create-next-app@latest csai-site --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### هەنگاوی ٢ — دابەزاندنی پاکێجەکان

```powershell
cd C:\Users\Tech Line\Desktop\csai-site

npm install framer-motion
```

### هەنگاوی ٣ — کۆپی کردنی دیزاین سیستەم

```powershell
# کۆپی tailwind.config.ts
copy "C:\Users\Tech Line\Desktop\New folder (2)\my-portfolio\tailwind.config.ts" "C:\Users\Tech Line\Desktop\csai-site\tailwind.config.ts"

# کۆپی globals.css
copy "C:\Users\Tech Line\Desktop\New folder (2)\my-portfolio\src\app\globals.css" "C:\Users\Tech Line\Desktop\csai-site\src\app\globals.css"
```

⚠️ **گرنگ:** لە `csai-site\src\app\layout.tsx` دا هەمان فۆنت زیاد بکە:

```tsx
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

<body className={`${spaceGrotesk.variable} antialiased`}>
```

### هەنگاوی ٤ — دانانی page.tsx

```powershell
copy "C:\Users\Tech Line\Desktop\New folder (2)\my-portfolio\src\templates\micro-site-csai\page.tsx" "C:\Users\Tech Line\Desktop\csai-site\src\app\page.tsx"
```

### هەنگاوی ٥ — تاقیکردنەوە

```powershell
cd C:\Users\Tech Line\Desktop\csai-site
npm run dev
```

### هەنگاوی ٦ — Git و Vercel

```powershell
cd C:\Users\Tech Line\Desktop\csai-site

git init
git add .
git commit -m "feat: CSAI case study — csai.ibrahim-eng.dev"

git remote add origin https://github.com/YOUR_USERNAME/csai-site.git
git branch -M main
git push -u origin main
```

- لە **Vercel** → Import Project → ڕیپۆی `csai-site`
- لە Settings → Domains → زیاد بکە: `csai.ibrahim-eng.dev`

---

## ڕێکخستنی DNS (بۆ هەردوو سابدۆمەین)

لە پانێلی DNS-ی دۆمەینت (`ibrahim-eng.dev`)، ئەم ڕیکۆردانە زیاد بکە:

| Type  | Name         | Value                   |
|-------|--------------|-------------------------|
| CNAME | case-study   | cname.vercel-dns.com    |
| CNAME | csai         | cname.vercel-dns.com    |

Vercel بەشێوەیەکی ئۆتۆماتیک SSL دەدرووست دەکات.

---

## پوختەی ستراکچەری فایل

```
archive-site/
├── src/
│   └── app/
│       ├── globals.css      ← کۆپی لە پۆرتفۆلیۆ
│       ├── layout.tsx       ← فۆنتی Space Grotesk زیاد بکە
│       └── page.tsx         ← لە templates/archive/ کۆپی کرا
├── tailwind.config.ts       ← کۆپی لە پۆرتفۆلیۆ
└── package.json

csai-site/
├── src/
│   └── app/
│       ├── globals.css      ← کۆپی لە پۆرتفۆلیۆ
│       ├── layout.tsx       ← فۆنتی Space Grotesk زیاد بکە
│       └── page.tsx         ← لە templates/micro-site-csai/ کۆپی کرا
├── tailwind.config.ts       ← کۆپی لە پۆرتفۆلیۆ
└── package.json
```
