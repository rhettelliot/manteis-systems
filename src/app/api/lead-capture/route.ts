import { NextRequest, NextResponse } from "next/server";

/**
 * Lead Capture API Route
 * Proxies form submissions from manteis.systems to the n8n webhook.
 * n8n runs on the host (localhost:5678) and handles:
 *   - Postgres CRM insert
 *   - Auto-reply email
 *   - iMessage notification to Rhett
 *   - Hermes Kanban task creation
 *
 * This route exists because the browser can't call localhost directly
 * (CORS + network isolation), and we want to keep the n8n URL internal.
 */

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL || "http://localhost:5678/webhook/lead-capture";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Forward to n8n webhook
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        company: body.company || "",
        pain_points: body.pain_points || body.message || "",
        source: body.source || "website-contact-form",
      }),
    });

    if (n8nResponse.ok) {
      const data = await n8nResponse.json().catch(() => ({}));
      return NextResponse.json({
        status: "success",
        message: "Lead captured successfully",
        ...data,
      });
    } else {
      console.error("n8n webhook error:", n8nResponse.status, n8nResponse.statusText);
      return NextResponse.json(
        { error: "Failed to process lead" },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}