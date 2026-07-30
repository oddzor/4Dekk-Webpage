export const DEKKHOTELL_ALLOWED_EMAILS = [
  "4dekk4@gmail.com",
  "oddgrimholt@gmail.com",
];

export function isDekkhotellEmailAllowed(email: string | null | undefined) {
  if (!email) return false;
  return DEKKHOTELL_ALLOWED_EMAILS.includes(email.toLowerCase());
}
