import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import { entriesToCsv } from "@/lib/dekkhotell/csv";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "Unauthorized - Invalid cron secret" },
      { status: 401 },
    );
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data, error } = await supabase
      .from("dekkhotell_entries")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    const entries = data ?? [];
    const csv = entriesToCsv(entries);
    const dateStr = new Date().toISOString().slice(0, 10);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.BACKUP_EMAIL_TO || process.env.GMAIL_USER,
      subject: `Dekkhotell backup - ${dateStr}`,
      text: `Vedlagt: ${entries.length} oppføringer eksportert fra Dekkhotell (${dateStr}).`,
      attachments: [
        {
          filename: `dekkhotell-backup-${dateStr}.csv`,
          content: csv,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      entryCount: entries.length,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: "Backup failed",
        details: err instanceof Error ? err.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
