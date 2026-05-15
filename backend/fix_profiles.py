import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth.models import User
from api.models import DonorProfile, NGOProfile, VolunteerProfile

def fix_profiles():
    print("Checking and fixing missing profiles...")
    users = User.objects.all()
    for user in users:
        role = getattr(user.profile, 'role', None)
        if role == 'DONOR':
            if not DonorProfile.objects.filter(user=user).exists():
                DonorProfile.objects.create(user=user, business_name=f"{user.username.capitalize()} Enterprises")
                print(f"  Created missing DonorProfile for {user.username}")
        elif role == 'NGO':
            if not NGOProfile.objects.filter(user=user).exists():
                NGOProfile.objects.create(user=user, name=f"{user.username.capitalize()} NGO")
                print(f"  Created missing NGOProfile for {user.username}")
        elif role == 'VOLUNTEER':
            if not VolunteerProfile.objects.filter(user=user).exists():
                VolunteerProfile.objects.create(user=user)
                print(f"  Created missing VolunteerProfile for {user.username}")

if __name__ == "__main__":
    fix_profiles()
