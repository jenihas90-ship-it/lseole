# Agency Partner Monetization Playbook
## Programmatic SEO Lead Engine • Pay-Per-Lead (PPL) Architecture

> **Target Vertical**: High-Ticket Dental Marketing & Patient Acquisition  
> **Mediation Model**: Connecting independent private practices with vetted regional agencies for $50–$150/lead or $500–$1,500/month city exclusivity rentals.

---

## 1. The Business Math & Economic Advantage

| Metric | Consumer Affiliate Blog | Dental B2B Lead Engine |
| :--- | :--- | :--- |
| **Typical Target Query** | "best coffee beans" / "cheap shoes" | "Dental SEO Dallas" / "Dental marketing Miami" |
| **Searcher Intent** | Casual browsing / Price shopping | Practice owner looking to spend $2k–$5k/mo on growth |
| **Client Value (Doctor)** | $5–$20 purchase | $10,000–$25,000 per full-arch implant / All-on-4 case |
| **Agency Retainer** | None | $2,000–$5,000/month recurring |
| **Your Payout per Lead** | $0.20–$1.50 AdSense | **$75.00–$150.00** flat pay-per-lead |
| **Traffic Needed for $5k/mo** | 200,000+ monthly visits | **Only 40–60 qualified leads** |

---

## 2. Agency Outreach Email Templates

You already have **103 verified agencies** indexed across 50 markets in `data/enriched_db.json`. Here are the exact high-converting outreach scripts:

### Script 1: The "Complimentary Feature" Introduction (Soft Pitch)

> **Subject**: Featured [Agency Name] as a top dental agency in [City] (Plus patient inquiries)  
>
> Hi [Agency Founder / Growth Lead],  
>  
> I’m reaching out from **DentalSEOHub**. We run a programmatic intelligence directory ranking for local dental patient acquisition queries across [City].  
>  
> We recently published our 2026 market report and featured **[Agency Name]** in our top 3 verified agency rankings for [City]:  
> 👉 [https://lseole-aqc5.vercel.app/dental-agencies/[city-slug]](https://lseole-aqc5.vercel.app)  
>  
> Because our landing pages intercept high-intent dental practice owners searching for local marketing specialists, we regularly capture inquiries from doctors seeking help with high-ticket implant and cosmetic funnels ($3k–$10k/mo ad budgets).  
>  
> We don't take on client retainers ourselves—we route these opportunities to our top featured agencies.  
>  
> Do you currently have capacity to take on 2–4 qualified private dental practices in [City] this month?  
>  
> Best regards,  
> **Jenihas Getachew**  
> Founder, DentalSEOHub  

---

### Script 2: The "Live Inbound Lead" Alert (High Urgency)

> **Subject**: [New Lead] $8,000/mo dental implant marketing inquiry in [City]  
>  
> Hi [Agency Lead],  
>  
> We just captured an inbound consultation request from a private practice in your metro:  
>  
> • **Practice Type**: Private Cosmetic & Restorative Practice  
> • **Location**: [City, State]  
> • **Target Procedure**: Full-Arch Implants / All-on-4  
> • **Stated Ad Budget**: $6,000 – $12,000 / month  
> • **Timeline**: Immediate (next 30 days)  
>  
> To protect lead quality, we offer this inquiry to our top 3 indexed agencies in [City] on a first-come basis.  
>  
> You can unlock the doctor's full contact details, phone number, and practice URL for a flat $95 fee here:  
> 🔗 **[Stripe 1-Click Unlock Link]**  
>  
> Once claimed by an agency partner, this lead is locked and marked exclusive.  
>  
> Best,  
> DentalSEOHub Routing Desk  

---

## 3. Two Monetization Models to Scale

### Model A: Pay-Per-Lead (PPL)
* **General Practice / Hygiene Leads**: **$50.00 – $75.00**
* **High-Ticket Implants / All-on-4 / Cosmetic Veneers**: **$100.00 – $150.00**
* *Implementation*: You receive the email alert in `jenihas90@gmail.com`. You forward the teaser details to the agencies with your Stripe Payment Link. Once paid, Stripe redirects them to the full lead contact sheet.

### Model B: City Page Exclusive Sponsorship (Monthly Retainer)
* Instead of selling leads one by one, an agency pays you **$500 to $1,500/month** to be the **ONLY** featured agency on their city's page (e.g. `https://lseole-aqc5.vercel.app/dental-agencies/dallas`).
* Every quote submitted on that page routes exclusively to them.
* *Math*: 10 city exclusivity rentals at $750/mo = **$7,500/month in recurring automated revenue**.

---

## 4. Setting Up Stripe 1-Click Payment Links

1. Open [dashboard.stripe.com/payment-links](https://dashboard.stripe.com/payment-links).
2. Click **New**.
3. Title: `Dental Practice Lead Unlock - Exclusive Access`.
4. Price: `$95.00` (One-time).
5. In *After payment*, choose **"Don't show confirmation page"** → redirect to a private Google Doc / Notion page containing the lead details.
6. Copy your link: `https://buy.stripe.com/xxxxxx`.
