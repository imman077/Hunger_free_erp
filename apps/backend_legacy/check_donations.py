import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from api.models import Donation
from django.contrib.auth.models import User

def count_donations_for_user(user_id):
    try:
        user = User.objects.get(id=user_id)
        count = Donation.objects.filter(donor=user).count()
        donations = Donation.objects.filter(donor=user)
        
        print(f"User: {user.username} (ID: {user_id})")
        print(f"Total Donations Found: {count}")
        print("-" * 30)
        for d in donations:
            print(f"  - {d.food_items} (Status: {d.status})")
            
    except User.DoesNotExist:
        print(f"No user found with ID {user_id}")

if __name__ == "__main__":
    count_donations_for_user(17)
