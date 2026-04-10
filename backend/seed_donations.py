import os
import django
import sys
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import User, UserProfile, Donation, NGONeed

def seed():
    try:
        # 1. Clear existing
        Donation.objects.all().delete()
        NGONeed.objects.all().delete()
        print("Cleared all donations and needs.")

        # 2. Get Users
        donor = User.objects.filter(profile__role='DONOR').first()
        ngo = User.objects.filter(profile__role='NGO').first()
        
        # Create 'Another NGO' for the need entry
        another_ngo, _ = User.objects.get_or_create(username='hope_foundation')
        UserProfile.objects.get_or_create(user=another_ngo, defaults={'role': 'NGO'})

        # 3. Create Donation from Donor
        d1 = Donation.objects.create(
            donor=donor, 
            food_category='Cooked Food', 
            food_items='Spicy Veg Pulav', 
            quantity=10, 
            unit='kg', 
            status='PENDING', 
            pickup_address='123 Gallery St', 
            pickup_time=timezone.now(),
            expiry_time=timezone.now() + timezone.timedelta(hours=5)
        )

        # 4. Create Donation from Another NGO (Testing NGO-to-NGO marketplace)
        d2 = Donation.objects.create(
            donor=another_ngo,
            food_category='Dry Ration',
            food_items='Rice and Lentils',
            quantity=100,
            unit='parcels',
            status='PENDING',
            pickup_address='Hope HQ, Industrial Area',
            pickup_time=timezone.now(),
            expiry_time=timezone.now() + timezone.timedelta(hours=48)
        )

        # 5. Create NGO Needs
        n1 = NGONeed.objects.create(
            ngo=another_ngo,
            item_name='Rice & Grains',
            category='Dry Ration',
            quantity=500,
            unit='kg',
            urgency='High',
            required_by=timezone.now().date() + timezone.timedelta(days=7),
            description='We need rice for our monthly community kitchen serving 200 families.',
            distribution_address='City Community Hall, Central Park'
        )

        n2 = NGONeed.objects.create(
            ngo=ngo,
            item_name='Vegetable Packs',
            category='Fresh Produce',
            quantity=50,
            unit='Packs',
            urgency='Urgent',
            required_by=timezone.now().date() + timezone.timedelta(days=2),
            description='Urgent need for fresh vegetables for the upcoming weekend distribution drive.',
            distribution_address='Morning Glow Shelter, Sector 4'
        )

        print(f"Seeded 2 Marketplace Donations and 2 NGO Needs.")

    except Exception as e:
        print(f"Error seeding: {e}")

if __name__ == "__main__":
    seed()
