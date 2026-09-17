# Thư mục ảnh Portfolio

Đặt ảnh sản phẩm thật vào đây sau khi nhận từ khách hàng.

## Quy ước đặt tên file
- `balo-hoc-sinh-01.jpg`, `balo-hoc-sinh-02.jpg` — Balo học sinh
- `balo-laptop-01.jpg` — Balo laptop
- `balo-the-thao-01.jpg` — Balo thể thao
- `tui-xach-01.jpg` — Túi xách
- `tui-du-lich-01.jpg` — Túi du lịch

## Kích thước ảnh khuyến nghị
- Tỉ lệ: **4:3** (ví dụ: 1200×900 px)
- Định dạng: **.jpg** hoặc **.webp** (nén tốt hơn)
- Dung lượng: **≤ 300KB** sau khi nén

## Sau khi có ảnh thật
1. Đặt file vào thư mục này
2. Mở file `app/[locale]/du-an/page.tsx`
3. Tìm mảng `portfolioItems`
4. Thay `src: undefined` thành `src: "/images/portfolio/ten-file.jpg"`
5. Cập nhật `alt` và `caption` mô tả sản phẩm
