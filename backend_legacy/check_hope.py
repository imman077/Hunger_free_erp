import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import NGOProfile

try:
    user = User.objects.get(username='hope_foundation')
    profile = NGOProfile.objects.filter(user=user).first()
    
    print(f"Username: {user.username}")
    print(f"Email: {user.email}")
    if profile:
        print(f"NGO Name: {profile.name}")
        print(f"Reg ID: {profile.registration_id}")
        print(f"Address: {profile.office_address}")
        print(f"Category: {profile.category}")
    else:
        print("No NGO profile found for this user.")
except User.DoesNotExist:
    print("User hope_foundation not found.")
