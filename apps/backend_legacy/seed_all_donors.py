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

def seed_all_donors():
    print("Seeding donations for all donors...")
    
    donors = User.objects.filter(profile__role='DONOR')
    ngos = User.objects.filter(profile__role='NGO')
    
    if not ngos.exists():
        print("No NGOs found to assign donations to.")
        return

    ngo_user = ngos.first()
    
    sample_items = [
        ('Cooked Food', 'Freshly Prepared Meals', 20, 'kg', 'PENDING'),
        ('Perishable', 'Assorted Fruits', 15, 'kg', 'ACCEPTED'),
        ('Dry Ration', 'Rice & Wheat Packs', 50, 'units', 'DELIVERED'),
    ]

    for donor in donors:
        print(f"Seeding for {donor.username}...")
        for cat, items, qty, unit, status in sample_items:
            Donation.objects.create(
                donor=donor,
                food_category=cat,
                food_items=items,
                quantity=qty,
                unit=unit,
                status=status,
                pickup_address=f"Main Office of {donor.username}",
                pickup_time=timezone.now() + timedelta(hours=2),
                expiry_time=timezone.now() + timedelta(hours=24),
                accepted_ngo=ngo_user if status != 'PENDING' else None
            )
            print(f"  Created {status} donation for {donor.username}")

if __name__ == "__main__":
    seed_all_donors()
