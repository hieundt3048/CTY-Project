"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// Schema validate — dùng translation keys qua useTranslations
function buildSchema(t: ReturnType<typeof useTranslations<"contact.validation">>) {
  return z.object({
    name: z
      .string()
      .min(1, t("nameRequired"))
      .min(2, t("nameMin")),
    company: z.string().optional(),
    email: z
      .string()
      .min(1, t("emailRequired"))
      .email(t("emailInvalid")),
    phone: z
      .string()
      .min(1, t("phoneRequired"))
      .regex(
        /^(\+84|0)(3[2-9]|5[6-9]|7[0|6-9]|8[0-9]|9[0-9])[0-9]{7}$/,
        t("phoneInvalid")
      ),
    message: z
      .string()
      .min(1, t("messageRequired"))
      .min(10, t("messageMin")),
  });
}

type FormData = z.infer<ReturnType<typeof buildSchema>>;

export default function ContactForm() {
  const t = useTranslations("contact");
  const tVal = useTranslations("contact.validation");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const schema = buildSchema(tVal);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  // Success state
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{t("successTitle")}</h3>
        <p className="text-gray-500 max-w-sm">{t("successMessage")}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-[#1F3A5F] hover:underline font-medium"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Error banner */}
      {status === "error" && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <p className="text-sm">{t("errorMessage")}</p>
        </div>
      )}

      {/* Họ tên */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t("nameLabel")} <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          {...register("name")}
          className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#C9A15A]/50 ${
            errors.name
              ? "border-red-400 bg-red-50"
              : "border-gray-300 bg-white focus:border-[#C9A15A]"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Tên công ty (optional) */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t("companyLabel")}
        </label>
        <input
          id="company"
          type="text"
          autoComplete="organization"
          placeholder={t("companyPlaceholder")}
          {...register("company")}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm transition-colors outline-none focus:ring-2 focus:ring-[#C9A15A]/50 focus:border-[#C9A15A]"
        />
      </div>

      {/* Email + Phone - 2 cols */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("emailLabel")} <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            {...register("email")}
            className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#C9A15A]/50 ${
              errors.email
                ? "border-red-400 bg-red-50"
                : "border-gray-300 bg-white focus:border-[#C9A15A]"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t("phoneLabel")} <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("phonePlaceholder")}
            {...register("phone")}
            className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#C9A15A]/50 ${
              errors.phone
                ? "border-red-400 bg-red-50"
                : "border-gray-300 bg-white focus:border-[#C9A15A]"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Nội dung */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t("messageLabel")} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          {...register("message")}
          className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#C9A15A]/50 resize-none ${
            errors.message
              ? "border-red-400 bg-red-50"
              : "border-gray-300 bg-white focus:border-[#C9A15A]"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-[#1F3A5F] text-white px-6 py-4 rounded-lg font-semibold text-base hover:bg-[#2d5491] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            {t("submitting")}
          </>
        ) : (
          t("submitButton")
        )}
      </button>
    </form>
  );
}
