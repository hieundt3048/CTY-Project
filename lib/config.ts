/**
 * FILE: lib/config.ts
 * MỤC ĐÍCH: Tập trung toàn bộ thông tin công ty và placeholder.
 * Khi khách hàng cung cấp thông tin thật, chỉ cần sửa file này,
 * KHÔNG cần tìm kiếm rải rác trong code.
 *
 * Cách sử dụng: tìm "[[TEN_PLACEHOLDER]]" và thay bằng giá trị thật.
 */

export const COMPANY_INFO = {
  // Tên công ty tiếng Việt
  nameVi: "CÔNG TY TNHH NGUYỄN DƯƠNG TRUNG HIẾU",

  // TODO: thay bằng tên giao dịch quốc tế khi khách cung cấp
  nameEn: "[[TEN_GIAO_DICH_QUOC_TE]]",

  // Loại hình doanh nghiệp
  type: "Công ty TNHH Một Thành Viên",

  // TODO: thay bằng mã số thuế thật khi khách cung cấp
  taxCode: "[[MA_SO_THUE]]",

  // Năm thành lập
  foundedYear: 2015,

  // Số năm kinh nghiệm (tính đến 2026)
  yearsOfExperience: 11,

  // Địa chỉ xưởng
  address: "Số nhà 427, Khu phố Chánh, Phường Gò Dầu, Tỉnh Tây Ninh",

  // TODO: thay bằng số điện thoại thật khi khách cung cấp
  phone: "0968928632",

  // TODO: thay bằng số Zalo thật khi khách cung cấp
  zalo: "0968928632",

  // TODO: thay bằng email công ty thật khi khách cung cấp
  email: "ctytnnhhnguyenduongtrunghieu@gmail.com",

  // Tên miền dự kiến
  domain: "ctytnnhhnguyenduongtrunghieu.com",

  // URL website (production)
  siteUrl: "https://ctytnnhhnguyenduongtrunghieu.com",
} as const;

export const PRODUCTION_STATS = {
  // Số công nhân hiện tại (đã xác nhận)
  workers: 37,

  // TODO: thay bằng số chuyền may/máy móc thật khi khách cung cấp
  sewingLines: "[[SO_CHUYEN_MAY]]",

  // TODO: thay bằng công suất tối đa/tháng thật khi khách cung cấp
  monthlyCapacity: "[[CONG_SUAT_THANG]]",

  // TODO: thay bằng MOQ thật khi khách cung cấp
  moq: "[[MOQ_SO_LUONG]]",
} as const;

export const SERVICES_INFO = {
  // TODO: xác nhận có nhận in/thêu logo hay không
  // Nếu có: thay thành "Có" hoặc mô tả dịch vụ
  // Nếu không: thay thành "Không nhận dịch vụ này"
  printingEmbroidery: "[[XAC_NHAN_CO_NHAN_IN_THEU_KHONG]]",
} as const;

export const MAPS_CONFIG = {
  // Tọa độ xưởng (đã resolve từ Google Maps link rút gọn)
  lat: 11.0593887,
  lng: 106.3289744,

  // Link Google Maps gốc
  originalLink: "https://maps.app.goo.gl/PcvzKkBG2D5VAvTb9",

  // Zoom level cho embed
  zoom: 16,
} as const;

export const EMAIL_CONFIG = {
  // TODO: thay bằng email nhận liên hệ thật (đặt trong .env.local)
  // Biến môi trường: EMAIL_NHAN_LIEN_HE
  receiverEmail: process.env.EMAIL_NHAN_LIEN_HE ?? "[[EMAIL_NHAN_LIEN_HE]]",
} as const;

export const SEO_KEYWORDS = {
  vi: [
    "gia công balo túi xách",
    "xưởng may gia công balo",
    "công ty gia công túi xách Tây Ninh",
    "nhận may gia công balo số lượng lớn",
    "gia công CMT balo",
  ],
  en: [
    "bag backpack manufacturing Vietnam",
    "OEM bag factory Tay Ninh",
    "CMT sewing factory Vietnam",
    "bulk backpack manufacturing",
  ],
} as const;

// Màu brand (tham khảo tailwind.config.ts để sử dụng trong CSS)
export const BRAND_COLORS = {
  navy: "#1F3A5F",
  gold: "#C9A15A",
  white: "#FFFFFF",
  lightGray: "#F7F7F7",
  text: "#2B2B2B",
  placeholder: "#E5E5E5",
} as const;
