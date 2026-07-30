"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const ERROR_MESSAGES: Record<string, string> = {
  unauthorized: "Denne Google-kontoen har ikke tilgang til Dekkhotell.",
  auth: "Innlogging feilet. Prøv igjen.",
};

export default function DekkhotellLoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = new URLSearchParams(window.location.search).get(
      "error",
    );
    if (errorParam) {
      setErrorMessage(ERROR_MESSAGES[errorParam] ?? ERROR_MESSAGES.auth);
    }
  }, []);

  const onSignIn = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dekkhotell`,
      },
    });

    if (error) {
      setErrorMessage(ERROR_MESSAGES.auth);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 rounded-lg card-dark">
        <h1 className="mb-6 text-2xl text-center text-headings">
          Dekkhotell Innlogging
        </h1>

        {errorMessage && (
          <div className="p-4 mb-5 border border-red-500 rounded-lg bg-red-900/20">
            <p className="text-sm text-red-300">{errorMessage}</p>
          </div>
        )}

        <button
          type="button"
          onClick={onSignIn}
          disabled={isSubmitting}
          className="flex items-center justify-center w-full gap-3 px-4 py-3 font-medium text-gray-800 transition-colors duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.28 1.48-1.13 2.73-2.4 3.58v2.98h3.88c2.27-2.09 3.54-5.17 3.54-8.8z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.88-2.98c-1.08.72-2.45 1.15-4.05 1.15-3.11 0-5.75-2.1-6.69-4.93H1.3v3.09C3.26 21.3 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.31 14.34c-.24-.72-.38-1.49-.38-2.34s.14-1.62.38-2.34V6.57H1.3A11.99 11.99 0 0 0 0 12c0 1.93.46 3.76 1.3 5.43l4.01-3.09z"
            />
            <path
              fill="#EA4335"
              d="M12 4.77c1.76 0 3.34.61 4.58 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.3 6.57l4.01 3.09c.94-2.83 3.58-4.89 6.69-4.89z"
            />
          </svg>
          {isSubmitting ? "Logger inn..." : "Logg inn med Google"}
        </button>
      </div>
    </div>
  );
}
