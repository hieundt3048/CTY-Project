# Website Công Ty TNHH Nguyễn Dương Trung Hiếu

Website giới thiệu năng lực gia công balo – túi xách, phục vụ B2B.
Hỗ trợ 4 ngôn ngữ: 🇻🇳 Tiếng Việt · 🇬🇧 English · 🇨🇳 中文 · 🇰🇷 한국어

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **i18n**: next-intl (4 locales: vi, en, zh, ko)
- **Form validation**: react-hook-form + zod
- **Email**: Resend
- **Icons**: lucide-react

---

## Chạy Local (Development)

### 1. Cài dependencies

```bash
npm install
```

### 2. Tạo file biến môi trường

```bash
cp .env.example .env.local
```

Mở `.env.local` và điền:

| Biến | Mô tả |
|------|-------|
| `RESEND_API_KEY` | API key từ [resend.com](https://resend.com/api-keys) |
| `EMAIL_NHAN_LIEN_HE` | Email nhận yêu cầu liên hệ |

> **Lưu ý dev:** Nếu chưa có API key, form vẫn hoạt động ở chế độ "DEV mode" (dữ liệu in ra console, không gửi email thật).

### 3. Chạy dev server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

---

## Cấu trúc Dự Án

```
website/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx                    ← Trang chủ
│   │   ├── gioi-thieu/page.tsx         ← Về chúng tôi
│   │   ├── dich-vu/page.tsx            ← Dịch vụ
│   │   ├── nang-luc-san-xuat/page.tsx  ← Năng lực sản xuất
│   │   ├── du-an/page.tsx              ← Portfolio
│   │   ├── lien-he/page.tsx            ← Liên hệ
│   │   └── layout.tsx
│   ├── api/contact/route.ts            ← API gửi email
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                             ← Shared components
│   ├── Header.tsx, Footer.tsx
│   ├── LanguageSwitcher.tsx
│   ├── HeroSection.tsx, StatsBlock.tsx
│   ├── Gallery.tsx, ContactForm.tsx, MapEmbed.tsx
├── messages/                           ← Nội dung đa ngôn ngữ
│   ├── vi.json, en.json, zh.json, ko.json
├── lib/
│   ├── config.ts                       ← ⭐ TẤT CẢ placeholder tập trung đây
│   ├── routing.ts, i18n.ts, utils.ts
└── public/
    ├── images/portfolio/               ← Đặt ảnh sản phẩm thật vào đây
    └── logo-placeholder.svg
```

---

## Cập nhật Placeholder

Tất cả placeholder tập trung tại `lib/config.ts`. Tìm `[[TEN_PLACEHOLDER]]` và thay bằng giá trị thật.

| Placeholder | Mô tả |
|-------------|-------|
| `[[SO_DIEN_THOAI]]` | Số điện thoại công ty |
| `[[SO_ZALO]]` | Số Zalo |
| `[[EMAIL_CONG_TY]]` | Email công ty |
| `[[MA_SO_THUE]]` | Mã số thuế |
| `[[TEN_GIAO_DICH_QUOC_TE]]` | Tên giao dịch quốc tế |
| `[[SO_CHUYEN_MAY]]` | Số chuyền may |
| `[[CONG_SUAT_THANG]]` | Công suất sản xuất/tháng |
| `[[MOQ_SO_LUONG]]` | Số lượng đặt hàng tối thiểu |
| `[[XAC_NHAN_CO_NHAN_IN_THEU_KHONG]]` | Xác nhận dịch vụ in/thêu |
| `[[RESEND_API_KEY]]` | API key Resend (trong `.env.local`) |
| `[[EMAIL_NHAN_LIEN_HE]]` | Email nhận liên hệ (trong `.env.local`) |

### Thêm ảnh Portfolio thật

1. Đặt ảnh vào `/public/images/portfolio/` (xem README trong thư mục đó)
2. Mở `app/[locale]/du-an/page.tsx`
3. Tìm `portfolioItems` và thêm `src: "/images/portfolio/ten-file.jpg"`

---

## Build Production

```bash
npm run build && npm run start
```

---

## Deploy lên Render

1. Push code lên GitHub (`git push origin main`)
2. Tạo **Web Service** trên Render, kết nối repo
3. Cấu hình:
   - Build: `npm install && npm run build`
   - Start: `npm run start`
4. Thêm env vars: `RESEND_API_KEY`, `EMAIL_NHAN_LIEN_HE`
5. Render tự deploy khi push code

### Gắn domain chính thức
`ctytnnhhnguyenduongtrunghieu.com` → Render Dashboard → Settings → Custom Domains

---

## Ghi chú

- **URL mặc định**: `/` = `/vi/`, `/en/about`, `/zh/about`, `/ko/about`
- **Google Maps**: tọa độ `11.0593887, 106.3289744` (Phường Gò Dầu, Tây Ninh)
- **Form**: Chạy ở chế độ DEV (log console) khi chưa có `EMAIL_NHAN_LIEN_HE` thật
