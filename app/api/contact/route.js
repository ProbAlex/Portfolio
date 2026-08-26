import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL is not set");
      return NextResponse.json(
        { success: false, message: "Contact form is not configured yet. Please email me directly." },
        { status: 500 }
      );
    }

    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const discordMessage = {
      embeds: [
        {
          title: "New Contact Form Submission",
          color: 0x3b82f6,
          fields: [
            { name: "Name", value: name, inline: true },
            { name: "Email", value: email, inline: true },
            { name: "Message", value: message },
            {
              name: "Timestamp",
              value: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
            },
          ],
        },
      ],
    };

    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordMessage),
    });

    if (!discordResponse.ok) {
      throw new Error(`Discord webhook responded with ${discordResponse.status}`);
    }

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
