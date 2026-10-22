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
      unlockPrice: "$75.00",
    };

    console.log("[PPL Lead Engine] New dental lead captured:", leadPayload);

    const emailRecipient = process.env.NOTIFICATION_EMAIL || "jenihas90@gmail.com";

    // 1. Direct Email Dispatch via Resend (Free 3,000 emails/month)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Dental Leads <onboarding@resend.dev>",
            to: [emailRecipient],
            subject: `[HIGH-TICKET DENTAL LEAD] ${procedureGoal} in ${city || "Metro Area"}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
                <div style="background: #0284c7; padding: 16px; border-radius: 8px; color: #ffffff; text-align: center; margin-bottom: 20px;">
                  <h2 style="margin: 0; font-size: 20px;">🦷 New Dental Practice Lead Captured!</h2>
                  <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Exclusive Matchmaking Opportunity</p>
                </div>
                
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold; width: 40%;">Practice Name:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold;">${practiceName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">Doctor / Contact:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${contactName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">Location / Metro:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${city}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">Growth Procedure:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0284c7; font-weight: bold;">${procedureGoal}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">Monthly Ad Budget:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #10b981; font-weight: bold;">${monthlyBudget}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">Direct Phone:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="tel:${phone}" style="color: #0284c7; text-decoration: none; font-weight: bold;">${phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">Business Email:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b;">Lead ID:</td>
                    <td style="padding: 10px 0; color: #94a3b8; font-size: 12px;">${leadPayload.leadId}</td>
                  </tr>
                </table>

                <div style="margin-top: 25px; padding: 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
                  Captured from DentalSEOHub Programmatic Engine • Value: $50–$150 Pay-Per-Lead Unlock
                </div>
              </div>
            `,
          }),
        });

        if (resendRes.ok) {
          console.log("[PPL Lead Engine] Email successfully delivered to", emailRecipient);
        } else {
          const errData = await resendRes.text();
          console.error("[PPL Lead Engine] Resend delivery failed:", errData);
        }
      } catch (err) {
        console.error("[PPL Lead Engine] Resend exception:", err);
      }
    }

    // 2. Custom Webhook Dispatch (Optional: Zapier, Make.com, or Webhook.site)
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadPayload),
        });
        console.log("[PPL Lead Engine] Webhook dispatched successfully");
      } catch (webhookErr) {
        console.error("[PPL Lead Engine] Webhook dispatch error:", webhookErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lead processed and notification dispatched",
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
