import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { COMPANY_INFO } from "@/lib/config";

const resend = new Resend(process.env.RESEND_API_KEY);

// Schema validate phía server (tách khỏi client schema để bảo mật)
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().max(200).optional(),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^(\+84|0)(3[2-9]|5[6-9]|7[0|6-9]|8[0-9]|9[0-9])[0-9]{7}$/),
  message: z.string().min(10).max(5000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }

    const { name, company, email, phone, message } = parsed.data;

    // TODO: thay EMAIL_NHAN_LIEN_HE bằng email thật trong .env.local
    const receiverEmail = process.env.EMAIL_NHAN_LIEN_HE;
    if (!receiverEmail || receiverEmail.includes("[[")) {
      // Chế độ dev: không gửi email thật, chỉ log
      console.log("[Contact Form - DEV MODE] Form submitted:", {
        name, company, email, phone, message,
      });
      return NextResponse.json({
        success: true,
        message: "Form nhận được (DEV mode — email chưa được gửi)",
      });
    }

    await resend.emails.send({
      from: `Website Liên Hệ <noreply@${COMPANY_INFO.domain}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `[Báo giá] ${name}${company ? ` - ${company}` : ""} — ${new Date().toLocaleDateString("vi-VN")}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1F3A5F; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Yêu cầu báo giá mới</h1>
            <p style="color: #C9A15A; margin: 4px 0 0; font-size: 14px;">
              ${new Date().toLocaleString("vi-VN")}
            </p>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 140px; vertical-align: top; font-size: 14px;">Họ tên</td>
                <td style="padding: 8px 0; font-weight: 600; font-size: 14px;">${name}</td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Công ty</td>
                <td style="padding: 8px 0; font-size: 14px;">${company}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td>
                <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Điện thoại</td>
                <td style="padding: 8px 0; font-size: 14px;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px;">Nội dung yêu cầu:</p>
            <div style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #e5e7eb; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email đã được gửi thành công",
    });
  } catch (error) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi máy chủ" },
      { status: 500 }
    );
  }
}
