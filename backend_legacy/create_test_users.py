import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import UserProfile, DonorProfile, NGOProfile, VolunteerProfile

def create_user_with_profile(username, email, role, password='Password123'):
    user, created = User.objects.get_or_create(
        username=username,
        defaults={'email': email}
    )
    if not created:
        print(f"User {username} already exists. Checking profile...")
    else:
        user.set_password(password)
        user.save()

    # Update UserProfile (created by signals usually, but let's be sure)
    up, _ = UserProfile.objects.get_or_create(user=user)
    up.role = role
    up.save()

    if role == 'DONOR':
        DonorProfile.objects.get_or_create(
            user=user, 
            defaults={
                'business_name': f"{username.capitalize()} Business",
                'business_type': 'Individual',
                'primary_manager_name': username.capitalize()
            }
        )
        print(f"Created Donor: {username}")
    elif role == 'NGO':
        NGOProfile.objects.get_or_create(
            user=user, 
            defaults={
                'name': f"{username.capitalize()} Org", 
                'registration_id': f"REG-{username}",
                'office_address': "Test Address"
            }
        )
        print(f"Created NGO: {username}")
    elif role == 'VOLUNTEER':
        VolunteerProfile.objects.get_or_create(
            user=user,
            defaults={'zone': 'Central'}
        )
        print(f"Created Volunteer: {username}")
    
    return user

# Create requested users
create_user_with_profile('donor2', 'donor2@example.com', 'DONOR')
create_user_with_profile('donor3', 'donor3@example.com', 'DONOR')
create_user_with_profile('ngo2', 'ngo2@example.com', 'NGO')
create_user_with_profile('volunteer2', 'volunteer2@example.com', 'VOLUNTEER')

print("Test accounts creation complete.")
