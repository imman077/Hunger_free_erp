import os
import django
import sys
from django.utils import timezone
from datetime import timedelta

# Setup Django environment
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth.models import User
from api.models import NGONeed, NGOProfile

def add_sample_ngo_needs():
    print("Adding sample NGO requests (NGONeed)...")
    
    # Get some NGO users
    ngos = NGOProfile.objects.all()
    if not ngos.exists():
        print("No NGOs found in the database. Please run seed_all_donors.py first.")
        return

    sample_needs = [
        {
            "item_name": "Emergency Rice Supplies",
            "category": "Dry Ration",
            "quantity": 100,
            "unit": "Kg",
            "urgency": "Urgent",
            "description": "Seeking rice for families in the slum resettlement colonies.",
            "address": "Sector 12, Relief Center"
        },
        {
            "item_name": "Infant Milk Powder",
            "category": "Baby Food",
            "quantity": 50,
            "unit": "Tins",
            "urgency": "High",
            "description": "Essential nutrition for infants in our childcare program.",
            "address": "Grace NGO Office, Main Road"
        },
        {
            "item_name": "Bottled Mineral Water",
            "category": "Beverages",
            "quantity": 200,
            "unit": "Liters",
            "urgency": "Normal",
            "description": "Clean drinking water for the upcoming community health camp.",
            "address": "Central Park Community Hall"
        },
        {
            "item_name": "Winter Blankets",
            "category": "Essential",
            "quantity": 30,
            "unit": "Units",
            "urgency": "High",
            "description": "Supporting homeless individuals during the cold weather spike.",
            "address": "Night Shelter, Platform 4 Area"
        },
        {
            "item_name": "Canned Pulses & Beans",
            "category": "Dry Ration",
            "quantity": 75,
            "unit": "Cans",
            "urgency": "Normal",
            "description": "Long-shelf life protein for our food bank inventory.",
            "address": "Unity Hub, Storage Unit 4"
        }
    ]

    for i, data in enumerate(sample_needs):
        ngo_profile = ngos[i % len(ngos)]
        
        need = NGONeed.objects.create(
            ngo=ngo_profile.user,
            item_name=data["item_name"],
            category=data["category"],
            quantity=data["quantity"],
            unit=data["unit"],
            urgency=data["urgency"],
            required_by=timezone.now().date() + timedelta(days=7),
            distribution_address=data["address"],
            description=data["description"],
            status="Open"
        )
        print(f"  Created NGO Need: {need.item_name} for {ngo_profile.name}")

if __name__ == "__main__":
    add_sample_ngo_needs()
