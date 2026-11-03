import { BOOKING_CATEGORIES, SITE } from "@/lib/site";

type BookingMail = {
  name: string;
  email: string;
  date: string;
  message: string;
  categories: string[];
  createdAt: string;
};

function categoryLabels(ids: string[]) {
  return ids
    .map((id) => BOOKING_CATEGORIES.find((cat) => cat.id === id)?.de ?? id)
    .join(", ");
}

export async function sendBookingNotification(booking: BookingMail) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY missing, booking notification skipped");
    return;
  }

  const text = [
    "Neue Buchungsanfrage über zeminberlin.de",
    "",
    `Name: ${booking.name}`,
    `E-Mail: ${booking.email}`,
    `Zeitraum: ${booking.date || "—"}`,
    `Kategorien: ${categoryLabels(booking.categories) || "—"}`,
    `Eingegangen: ${new Date(booking.createdAt).toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}`,
    "",
    "Nachricht:",
    booking.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.BOOKING_MAIL_FROM || "ZEMIN BERLIN <booking@zeminberlin.de>",
      to: (process.env.BOOKING_MAIL_TO || SITE.email).split(",").map((s) => s.trim()),
      reply_to: booking.email,
      subject: `Buchungsanfrage: ${booking.name}`,
      text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}
