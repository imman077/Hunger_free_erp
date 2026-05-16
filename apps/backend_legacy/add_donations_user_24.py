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
from api.models import Donation, NGOProfile

def add_donations_for_donor_user():
    user_id = 24
    print(f"Adding extra donations for User ID: {user_id} (donor_user)...")
    
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        print(f"Error: User with ID {user_id} not found.")
        return

    # Get some NGOs to assign as "Accepted" status
    ngos = NGOProfile.objects.all()

    extra_data = [
        {
            "food_items": "Traditional Meal Boxes",
            "food_category": "Cooked Food",
            "quantity": "20",
            "unit": "Units",
            "pickup_address": "Apartment 4B, Emerald Heights",
            "status": "PENDING"
        },
        {
            "food_items": "Organic Fruit Platters",
            "food_category": "Perishable",
            "quantity": "5",
            "unit": "Kg",
            "pickup_address": "Lobby Area, Emerald Heights",
            "status": "ACCEPTED"
        },
        {
            "food_items": "Assorted Canned Veggies",
            "food_category": "Dry Ration",
            "quantity": "12",
            "unit": "Cans",
            "pickup_address": "Doorstep, Apartment 4B",
            "status": "DELIVERED"
        },
        {
            "food_items": "Morning Breakfast Sandwiches",
            "food_category": "Cooked Food",
            "quantity": "15",
            "unit": "Units",
            "pickup_address": "Emerald Heights Gate 2",
            "status": "ASSIGNED"
        },
        {
            "food_items": "Fresh Milk & Yogurt Packs",
            "food_category": "Dairy",
            "quantity": "10",
            "unit": "Liters",
            "pickup_address": "Kitchen Entrance, Emerald Heights",
            "status": "PENDING"
        },
        {
            "food_items": "Bagels & Cream Cheese",
            "food_category": "Bakery Items",
            "quantity": "8",
            "unit": "Units",
            "pickup_address": "Apartment 4B, Emerald Heights",
            "status": "DELIVERED"
        }
    ]

    for i, data in enumerate(extra_data):
        ngo = ngos[i % len(ngos)].user if ngos else None
        
        donation = Donation.objects.create(
            donor=user,
            accepted_ngo=ngo if data["status"] in ["ACCEPTED", "ASSIGNED", "DELIVERED"] else None,
            food_items=data["food_items"],
            food_category=data["food_category"],
            quantity=data["quantity"],
            unit=data["unit"],
            pickup_address=data["pickup_address"],
            expiry_time=timezone.now() + timedelta(hours=24),
            status=data["status"]
        )
        print(f"  Created donation: {donation.food_items} (Status: {donation.status})")

    print("\nSuccessfully added 6 extra donations for donor_user!")

if __name__ == "__main__":
    add_donations_for_donor_user()
