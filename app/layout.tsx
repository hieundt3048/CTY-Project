// Root layout tối giản — locale layout trong app/[locale]/layout.tsx xử lý phần còn lại
// Cần giữ file này để Next.js App Router hoạt động đúng

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
