"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { getBusinessData } from "../utils/dataLoader";
import { useLanguage } from "../contexts/LanguageContext";
import { trackContactForm, trackPhoneCall } from "./GoogleAnalytics";

interface FormData {
  name: string;
  email: string;
  phone: string;
  regnumber: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const { language } = useLanguage();
  const businessData = getBusinessData(language);

  const emailSubjects = {
    no: [
      {
        value: "booking",
        label: "Forespørsel om reparasjon eller service på bil",
      },
      { value: "service", label: "Dekk og Felg" },
      { value: "pricing", label: "Prisestimat på arbeid" },
      { value: "general", label: "Generelle Spørsmål" },
    ],
    en: [
      { value: "booking", label: "Request for car repair or service" },
      { value: "service", label: "Tires and Rims" },
      { value: "pricing", label: "Price estimate for work" },
      { value: "general", label: "General Questions" },
    ],
  };

  const content = {
    no: {
      name: "Navn",
      email: "E-post",
      phone: "Telefon",
      regNumber: "Registreringsnummer",
      subject: "Emne",
      message: "Melding",
      sendButton: "Send Melding",
      sending: "Sender...",
      successMessage:
        "Takk for din henvendelse! Vi kommer tilbake til deg så snart som mulig.",
      errorMessage:
        "Noe gikk galt. Vennligst prøv igjen eller ring oss direkte.",
      required: "Dette feltet er påkrevd",
      invalidEmail: "Vennligst oppgi en gyldig e-postadresse",
      generalSubject: "Generelt Spørsmål",
      preferDirectContact: "Foretrekker å kontakte oss direkte?",
      privacy: "Personvern:",
      privacyText:
        "Ved å sende inn dette skjemaet samtykker du til å bli kontaktet angående din henvendelse.",
    },
    en: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      regNumber: "Registration Number",
      subject: "Subject",
      message: "Message",
      sendButton: "Send Message",
      sending: "Sending...",
      successMessage:
        "Thank you for your inquiry! We'll get back to you as soon as possible.",
      errorMessage:
        "Something went wrong. Please try again or call us directly.",
      required: "This field is required",
      invalidEmail: "Please enter a valid email address",
      generalSubject: "General Question",
      preferDirectContact: "Prefer to contact us directly?",
      privacy: "Privacy:",
      privacyText:
        "By submitting this form, you consent to being contacted regarding your inquiry.",
    },
  };

  const t = content[language];
  const currentEmailSubjects = emailSubjects[language];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const EMAILJS_SERVICE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
  const EMAILJS_PUBLIC_KEY =
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      trackContactForm();
      
      const selectedSubject = currentEmailSubjects.find(
        (subject) => subject.value === data.subject,
      );
      const subjectLine = selectedSubject
        ? selectedSubject.label
        : t.generalSubject;
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || "Ikke oppgitt",
        from_regnumber: data.regnumber || "Ikke oppgitt",
        subject: subjectLine,
        message: data.message,
        to_email: businessData.contact.email,
        reply_to: data.email,
      };

      const emailjs = (await import("@emailjs/browser")).default;
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      if (result.status === 200) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="regnumber"
          className="block mb-2 text-sm font-medium text-headings"
        >
          {t.regNumber} *
        </label>
        <input
          type="text"
          id="regnumber"
          {...register("regnumber", { required: t.required })}
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-200 text-white placeholder-gray-400 ${
            errors.regnumber
              ? "border-red-500"
              : "border-gray-600 hover:border-gray-500"
          }`}
          placeholder="AB12345"
        />
        {errors.regnumber && (
          <p className="mt-1 text-sm text-red-400">
            {errors.regnumber.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block mb-2 text-sm font-medium text-headings"
        >
          {t.subject} *
        </label>
        <select
          id="subject"
          {...register("subject", { required: t.required })}
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-200 text-white font-medium ${
            errors.subject
              ? "border-red-500"
              : "border-gray-600 hover:border-gray-500"
          }`}
          defaultValue=""
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          <option
            value=""
            disabled
            hidden
            className="font-medium text-gray-400 bg-gray-800"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {language === "no"
              ? "Hva gjelder henvendelsen?"
              : "What is your inquiry about?"}
          </option>
          {currentEmailSubjects.map((subject) => (
            <option
              key={subject.value}
              value={subject.value}
              className="font-medium text-white bg-gray-800"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {subject.label}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-headings"
        >
          {t.name} *
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: t.required })}
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-200 text-white placeholder-gray-400 ${
            errors.name
              ? "border-red-500"
              : "border-gray-600 hover:border-gray-500"
          }`}
          placeholder="Kunde Kundesen"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-headings"
        >
          {t.email} *
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: t.required,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t.invalidEmail,
            },
          })}
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-200 text-white placeholder-gray-400 ${
            errors.email
              ? "border-red-500"
              : "border-gray-600 hover:border-gray-500"
          }`}
          placeholder="din.epost@eksempel.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-headings"
        >
          {t.phone}
        </label>
        <input
          type="tel"
          id="phone"
          {...register("phone")}
          className="w-full px-4 py-3 text-white placeholder-gray-400 transition-colors duration-200 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent hover:border-gray-500"
          placeholder={businessData.contact.phone}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-headings"
        >
          {t.message} *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message", { required: t.required })}
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-200 resize-none text-white placeholder-gray-400 ${
            errors.message
              ? "border-red-500"
              : "border-gray-600 hover:border-gray-500"
          }`}
          placeholder={
            language === "no"
              ? "Fortell så nøye som mulig hva forespørselen gjelder"
              : "Please describe your inquiry in as much detail as possible"
          }
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t.sending : t.sendButton}
      </button>

      {submitStatus === "success" && (
        <div className="p-6 border border-green-500 bg-green-900/20 card-dark">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="font-medium text-green-300">{t.successMessage}</p>
              <p className="mt-1 text-sm text-green-400">
                {language === "no"
                  ? `Vi kommer tilbake til deg snarest. Dersom det haster, ring oss på ${businessData.contact.phone}.`
                  : `We'll get back to you as soon as possible. If it's urgent, call us at ${businessData.contact.phone}.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-6 border border-red-500 bg-red-900/20 card-dark">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="font-medium text-red-300">{t.errorMessage}</p>
              <p className="mt-1 text-sm text-red-400">
                {language === "no"
                  ? `Vennligst prøv å ringe oss direkte på ${businessData.contact.phone}.`
                  : `Please try calling us directly at ${businessData.contact.phone}.`}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 card-dark">
        <h3 className="mb-4 text-lg font-semibold text-headings">
          {t.preferDirectContact}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="mr-3 text-accent">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <a
              href={`tel:${businessData.contact.phoneE164}`}
              onClick={trackPhoneCall}
              className="transition-colors duration-200 text-accent hover:text-accent-dark"
            >
              {businessData.contact.phone}
            </a>
          </div>
          <div className="flex items-center">
            <div className="mr-3 text-accent">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <a
              href={`mailto:${businessData.contact.email}`}
              className="transition-colors duration-200 text-accent hover:text-accent-dark"
            >
              {businessData.contact.email}
            </a>
          </div>
          <div className="flex items-start">
            <div className="mr-3 mt-0.5 text-accent">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span className="text-text">
              {businessData.address.street}, {businessData.address.postalCode}{" "}
              {businessData.address.city}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 border border-gray-600 rounded-lg bg-gray-800/50">
        <p className="text-sm text-gray-300">
          <strong className="text-gray-200">{t.privacy}</strong> {t.privacyText}
        </p>
      </div>
    </form>
  );
}
