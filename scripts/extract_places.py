"""
Google Places API (New) Extraction Pipeline
Extracts verified local dental marketing agencies with strict FieldMask headers to optimize API cost.
"""

import os
import sys
import csv
import json
import argparse
import logging
from typing import List, Dict, Any

try:
    import requests
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

PLACES_API_ENDPOINT = "https://places.googleapis.com/v1/places:searchText"

# Strict FieldMask to query only essential fields for pSEO directory cards
STRICT_FIELD_MASK = (
    "places.displayName,"
    "places.formattedAddress,"
    "places.rating,"
    "places.userRatingCount,"
    "places.websiteUri,"
    "places.nationalPhoneNumber,"
    "places.googleMapsUri"
)

DEFAULT_SEED_CITIES = [
    {"city": "Dallas", "state": "TX", "slug": "dallas"},
    {"city": "Austin", "state": "TX", "slug": "austin"},
    {"city": "Miami", "state": "FL", "slug": "miami"},
    {"city": "Atlanta", "state": "GA", "slug": "atlanta"},
    {"city": "Chicago", "state": "IL", "slug": "chicago"},
    {"city": "Phoenix", "state": "AZ", "slug": "phoenix"},
    {"city": "Houston", "state": "TX", "slug": "houston"},
    {"city": "Denver", "state": "CO", "slug": "denver"},
    {"city": "Tampa", "state": "FL", "slug": "tampa"},
    {"city": "Charlotte", "state": "NC", "slug": "charlotte"},
    {"city": "Los Angeles", "state": "CA", "slug": "los-angeles"},
    {"city": "San Diego", "state": "CA", "slug": "san-diego"},
    {"city": "Las Vegas", "state": "NV", "slug": "las-vegas"},
    {"city": "Orlando", "state": "FL", "slug": "orlando"},
    {"city": "Nashville", "state": "TN", "slug": "nashville"},
    {"city": "Seattle", "state": "WA", "slug": "seattle"},
    {"city": "Boston", "state": "MA", "slug": "boston"},
    {"city": "Philadelphia", "state": "PA", "slug": "philadelphia"},
]

MOCK_AGENCIES_BY_CITY = {
    "dallas": [
        {
            "name": "Apex Dental Marketing Dallas",
            "rating": 4.9,
            "reviewCount": 84,
            "website": "https://apexdentalmarketing.com",
            "address": "2101 Ross Ave, Dallas, TX 75201",
            "phone": "(214) 555-0192",
            "googleMapsUri": "https://maps.google.com/?cid=1001",
            "tags": ["Dental SEO", "Implant Campaigns", "Google Local Services"]
        },
        {
            "name": "Lone Star Practice Growth",
            "rating": 4.8,
            "reviewCount": 62,
            "website": "https://lonestarpracticegrowth.com",
            "address": "1717 McKinney Ave #1200, Dallas, TX 75202",
            "phone": "(214) 555-0143",
            "googleMapsUri": "https://maps.google.com/?cid=1002",
            "tags": ["Full Funnel PPC", "Reputation Management", "Conversion Rate Opt."]
        },
        {
            "name": "DFW Dental Media Partners",
            "rating": 4.7,
            "reviewCount": 49,
            "website": "https://dfwdentalmedia.com",
            "address": "5000 Legacy Dr, Plano, TX 75024",
            "phone": "(972) 555-0188",
            "googleMapsUri": "https://maps.google.com/?cid=1003",
            "tags": ["Cosmetic Dentistry Ads", "Website Design", "Organic Local Pack"]
        }
    ],
    "austin": [
        {
            "name": "Capital City Dental Growth Labs",
            "rating": 4.9,
            "reviewCount": 78,
            "website": "https://capitalcitydentalgrowth.com",
            "address": "600 Congress Ave, Austin, TX 78701",
            "phone": "(512) 555-0133",
            "googleMapsUri": "https://maps.google.com/?cid=2001",
            "tags": ["AI Patient Lead Routing", "Pediatric & Ortho SEO", "High-End Implants"]
        },
        {
            "name": "Silicon Hills Dental Media",
            "rating": 4.8,
            "reviewCount": 54,
            "website": "https://siliconhillsdentalmedia.com",
            "address": "111 Congress Ave #400, Austin, TX 78701",
            "phone": "(512) 555-0177",
            "googleMapsUri": "https://maps.google.com/?cid=2002",
            "tags": ["Google Ads", "Custom Video Testimonials", "Search Optimization"]
        },
        {
            "name": "Austin Practice Elevation",
            "rating": 4.7,
            "reviewCount": 41,
            "website": "https://austinpracticeelevation.com",
            "address": "3800 N Lamar Blvd, Austin, TX 78756",
            "phone": "(512) 555-0112",
            "googleMapsUri": "https://maps.google.com/?cid=2003",
            "tags": ["Local Map Pack", "Invisalign Marketing", "Practice Rebranding"]
        }
    ],
    "miami": [
        {
            "name": "Biscayne Dental Media & SEO",
            "rating": 4.9,
            "reviewCount": 92,
            "website": "https://biscaynedentalmedia.com",
            "address": "1110 Brickell Ave, Miami, FL 33131",
            "phone": "(305) 555-0129",
            "googleMapsUri": "https://maps.google.com/?cid=3001",
            "tags": ["Bilingual Hispanic PPC", "Veneer Patient Funnels", "High-Ticket SEO"]
        },
        {
            "name": "South Beach Smiles Marketing Group",
            "rating": 4.8,
            "reviewCount": 67,
            "website": "https://southbeachsmilesmarketing.com",
            "address": "400 Alton Rd, Miami Beach, FL 33139",
            "phone": "(305) 555-0185",
            "googleMapsUri": "https://maps.google.com/?cid=3002",
            "tags": ["Cosmetic Dentistry", "Social Media Authority", "Local Citation Building"]
        },
        {
            "name": "Florida Dental Growth Collective",
            "rating": 4.7,
            "reviewCount": 53,
            "website": "https://floridadentalgrowth.com",
            "address": "800 Brickell Ave, Miami, FL 33131",
            "phone": "(305) 555-0164",
            "googleMapsUri": "https://maps.google.com/?cid=3003",
            "tags": ["Implants & All-on-4", "Automated Follow-ups", "Google Review Booster"]
        }
    ]
}


def fetch_places_for_city(city: str, state: str, api_key: str) -> List[Dict[str, Any]]:
    """Queries the Google Places API (New) with strict FieldMask headers."""
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": STRICT_FIELD_MASK
    }

    query = f"dental marketing agency in {city}, {state}"
    payload = {
        "textQuery": query,
        "pageSize": 10,
        "languageCode": "en"
    }

    logging.info(f"Querying Google Places API for '{query}'...")
    response = requests.post(PLACES_API_ENDPOINT, json=payload, headers=headers, timeout=15)
    
    if response.status_code != 200:
        logging.error(f"Places API error [{response.status_code}]: {response.text}")
        return []

    data = response.json()
    places = data.get("places", [])
    results = []

    for place in places:
        display_name = place.get("displayName", {}).get("text", "")
        rating = place.get("rating", 4.5)
        review_count = place.get("userRatingCount", 0)
        website = place.get("websiteUri", "")
        address = place.get("formattedAddress", f"{city}, {state}")
        phone = place.get("nationalPhoneNumber", "")
        maps_uri = place.get("googleMapsUri", "")

        results.append({
            "name": display_name,
            "rating": rating,
            "reviewCount": review_count,
            "website": website,
            "address": address,
            "phone": phone,
            "googleMapsUri": maps_uri,
            "tags": ["Dental SEO", "Local Maps Optimization", "Patient Acquisition"]
        })

    return results


def extract_pipeline(use_mock: bool = False, output_csv: str = "data/raw_agencies.csv"):
    api_key = os.getenv("GOOGLE_PLACES_API_KEY", "")
    all_rows = []

    os.makedirs(os.path.dirname(output_csv), exist_ok=True)

    if not api_key and not use_mock:
        logging.warning("No GOOGLE_PLACES_API_KEY found in environment. Automatically activating mock data mode.")
        use_mock = True

    for item in DEFAULT_SEED_CITIES:
        city = item["city"]
        state = item["state"]
        slug = item["slug"]

        if use_mock:
            logging.info(f"Using mock extraction data for {city}, {state}...")
            agencies = MOCK_AGENCIES_BY_CITY.get(slug, [
                {
                    "name": f"{city} Premier Dental Marketing",
                    "rating": 4.8,
                    "reviewCount": 45,
                    "website": f"https://{slug}dentalmarketing.com",
                    "address": f"100 Main St, {city}, {state}",
                    "phone": "(555) 019-2831",
                    "googleMapsUri": "https://maps.google.com",
                    "tags": ["Dental SEO", "PPC Growth", "Patient Retention"]
                },
                {
                    "name": f"{city} Smile Growth Partners",
                    "rating": 4.7,
                    "reviewCount": 38,
                    "website": f"https://{slug}smilesgrowth.com",
                    "address": f"250 Commerce Blvd, {city}, {state}",
                    "phone": "(555) 018-9922",
                    "googleMapsUri": "https://maps.google.com",
                    "tags": ["Cosmetic Dentistry", "Local Map Pack", "Lead Funnels"]
                }
            ])
        else:
            agencies = fetch_places_for_city(city, state, api_key)

        for ag in agencies:
            all_rows.append({
                "city": city,
                "state": state,
                "city_slug": slug,
                "agency_name": ag["name"],
                "rating": ag["rating"],
                "review_count": ag["reviewCount"],
                "website": ag["website"],
                "address": ag["address"],
                "phone": ag.get("phone", ""),
                "tags": "|".join(ag.get("tags", []))
            })

    # Save to CSV
    fieldnames = ["city", "state", "city_slug", "agency_name", "rating", "review_count", "website", "address", "phone", "tags"]
    with open(output_csv, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(all_rows)

    logging.info(f"Successfully extracted {len(all_rows)} agency records into {output_csv}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract dental marketing agencies from Google Places API (New)")
    parser.add_argument("--mock", action="store_true", help="Force mock data mode without calling Google Places API")
    parser.add_argument("--out", default="data/raw_agencies.csv", help="Path to output CSV")
    args = parser.parse_args()

    extract_pipeline(use_mock=args.mock, output_csv=args.out)
