import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import UserProfile

def create_test_user(username, email, password, role):
    if not User.objects.filter(username=username).exists():
        user = User.objects.create_user(username=username, email=email, password=password)
        # Note: Signal already created the profile, we just update it
        user.profile.role = role
        user.profile.save()
        print(f"Created {role} user: {username}")
    else:
        print(f"User {username} already exists.")

if __name__ == "__main__":
    test_users = [
        ("admin_user", "admin@hungerfree.com", "admin123", "ADMIN"),
        ("donor_user", "donor@hungerfree.com", "donor123", "DONOR"),
        ("ngo_user", "ngo@hungerfree.com", "ngo123", "NGO"),
        ("volunteer_user", "volunteer@hungerfree.com", "volunteer123", "VOLUNTEER"),
    ]
    
    # Cleanup old users before re-seeding
    User.objects.filter(email__icontains='hungerfree.com').delete()
    User.objects.filter(username__icontains='_user').delete()

    for u, e, p, r in test_users:
        create_test_user(u, e, p, r)
    
    print("\n--- Seeding Complete! ---")
