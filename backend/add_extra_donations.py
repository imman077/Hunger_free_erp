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
from api.models import Donation, DonorProfile, NGOProfile

def add_extra_donations():
    print("Adding 3 extra sample donations...")
    
    try:
        user = User.objects.get(username='grand_regal_hotel')
    except User.DoesNotExist:
        print("User 'grand_regal_hotel' not found. Picking the first donor...")
        user = User.objects.filter(profile__role='DONOR').first()
    
    if not user:
        print("No donor user found.")
        return

    # Sample NGOs
    ngos = NGOProfile.objects.all()[:3]
    ngo_names = [ngo.name for ngo in ngos] if ngos else ["Global Relief", "Community Kitchen", "Food for All"]

    extra_data = [
        {
            "food_items": "Gourmet Pasta Trays",
            "food_category": "Cooked Food",
            "quantity": "15",
            "unit": "Kg",
            "pickup_address": "Main Entrance, Grand Regal Hotel",
            "status": "PENDING"
        },
        {
            "food_items": "Assorted Fruit Baskets",
            "food_category": "Perishable",
            "quantity": "8",
            "unit": "Kg",
            "pickup_address": "Loading Dock B, Grand Regal Hotel",
            "status": "ACCEPTED"
        },
        {
            "food_items": "Baked Bread & Pastries",
            "food_category": "Bakery Items",
            "quantity": "25",
            "unit": "Units",
            "pickup_address": "Cafe Counter, Grand Regal Hotel",
            "status": "DELIVERED"
        }
    ]

    for i, data in enumerate(extra_data):
        ngo = ngos[i % len(ngos)].user if ngos else None
        
        donation = Donation.objects.create(
            donor=user,
            accepted_ngo=ngo if data["status"] != "PENDING" else None,
            food_items=data["food_items"],
            food_category=data["food_category"],
            quantity=data["quantity"],
            unit=data["unit"],
            pickup_address=data["pickup_address"],
            expiry_time=timezone.now() + timedelta(hours=24),
            status=data["status"]
        )
        print(f"  Created donation: {donation.food_items} (Status: {donation.status})")

if __name__ == "__main__":
    add_extra_donations()
