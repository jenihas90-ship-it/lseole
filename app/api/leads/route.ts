import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { practiceName, contactName, email, phone, city, procedureGoal, monthlyBudget } = body;

    if (!practiceName || !contactName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required contact details" },
        { status: 400 }
      );
    }

    // Lead payload formatted for Pay-Per-Lead (PPL) webhook pipeline
    const leadPayload = {
      timestamp: new Date().toISOString(),
      leadId: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      practiceName,
      contactName,
      email,
      phone,
      city: city || "Unspecified",
      procedureGoal,
      monthlyBudget,
      source: "DentalSEOHub Programmatic Landing Page",
      status: "NEW_UNCLAIMED",
      unlockPrice: "$75.00"
    };

    console.log("[PPL Lead Engine] New dental lead captured:", leadPayload);

    // If an external Zapier or Make.com webhook URL is defined in environment variables, dispatch it
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadPayload),
        });
        console.log("[PPL Lead Engine] Webhook dispatched with status:", webhookResponse.status);
      } catch (webhookErr) {
        console.error("[PPL Lead Engine] Webhook dispatch error:", webhookErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lead processed and routed successfully",
        leadId: leadPayload.leadId,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[PPL Lead Engine] Internal error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
