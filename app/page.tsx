import { redirect } from "next/navigation";

// Redirect / → /vi (ngôn ngữ mặc định)
// next-intl middleware xử lý redirect này tự động,
// nhưng file này giữ cho App Router không báo lỗi "page not found"
export default function RootPage() {
  redirect("/vi");
}
