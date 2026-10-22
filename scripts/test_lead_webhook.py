"""
Pay-Per-Lead (PPL) Webhook Simulator
Demonstrates the programmatic lead routing engine described on page 4 of the blueprint:
1. Ingests raw practice lead
2. Matches against top 3 agencies in that city
3. Generates the agency alert email with masked lead details & Stripe unlock payment link
"""

import json
import os
import sys

def simulate_ppl_dispatch():
    db_path = os.path.join(os.path.dirname(__file__), "..", "data", "enriched_db.json")
    if not os.path.exists(db_path):
        print(f"Error: {db_path} does not exist.")
        return

    with open(db_path, "r", encoding="utf-8") as f:
        database = json.load(f)

    # Sample incoming lead from a high-ticket dental practice
    incoming_lead = {
        "leadId": "lead_99214_tx",
        "timestamp": "2026-10-22T13:45:00Z",
        "practiceName": "Highland Park Premier Dental",
        "contactName": "Dr. Robert Vance, DDS",
        "email": "dr.vance@highlandparkdental.com",
        "phone": "(214) 555-8921",
        "city": "Dallas",
        "state": "TX",
        "procedureGoal": "Dental Implants / All-on-4",
        "monthlyBudget": "$6,000 - $12,000 / month",
        "unlockFee": "$95.00"
    }

    target_city = incoming_lead["city"].lower()
    city_record = next((c for c in database["cities"] if c["slug"] == target_city or c["cityName"].lower() == target_city), None)

    if not city_record:
        print(f"No city found for {incoming_lead['city']}")
        return

    top_agencies = city_record["agencies"][:3]

    print("=" * 70)
    print("      PAY-PER-LEAD (PPL) ROUTING ENGINE - SIMULATION OUTPUT")
    print("=" * 70)
    print(f"Captured Lead ID:      {incoming_lead['leadId']}")
    print(f"Target Metro Area:     {city_record['cityName']}, {city_record['state']}")
    print(f"High-Ticket Procedure: {incoming_lead['procedureGoal']}")
    print(f"Monthly Ad Budget:     {incoming_lead['monthlyBudget']}")
    print("-" * 70)
    print(f"Dispatched To Top {len(top_agencies)} Verified Agencies in {city_record['cityName']}:")
    for idx, ag in enumerate(top_agencies, 1):
        print(f"  {idx}. {ag['name']} (Rating: {ag['rating']}/5.0, Reviews: {ag['reviewCount']})")
    print("-" * 70)
    print("SAMPLE NOTIFICATION EMAIL SENT TO AGENCIES:")
    print("-" * 70)

    # Masked contact information
    email_preview = f"""Subject: [NEW EXCLUSIVE LEAD] {incoming_lead['procedureGoal']} inquiry in {incoming_lead['city']}, {incoming_lead['state']}

Hello {top_agencies[0]['name']} Growth Team,

A qualified dental practice in your immediate service area has requested agency proposals:

- Practice: {incoming_lead['practiceName']}
- Contact: Dr. R***** V**** (Practice Owner)
- Target Procedure: {incoming_lead['procedureGoal']}
- Stated Monthly Budget: {incoming_lead['monthlyBudget']}
- Location: {incoming_lead['city']}, {incoming_lead['state']}
- Captured: {incoming_lead['timestamp']}

To maintain lead exclusivity, this opportunity is offered to the top 3 verified agencies in {incoming_lead['city']}. 

Click below to unlock full contact details, direct phone number, and practice website:
-> UNLOCK FULL LEAD ({incoming_lead['unlockFee']}): https://buy.stripe.com/test_ppl_unlock_{incoming_lead['leadId']}

---
DentalSEOHub Lead Engine | High-Ticket B2B Lead Routing
"""
    print(email_preview)
    print("=" * 70)


if __name__ == "__main__":
    simulate_ppl_dispatch()
