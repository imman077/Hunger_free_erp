import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth.models import User
from api.models import UserProfile, DonorProfile, DonorDocument, BankAccount, UPIIdentity

def seed_grand_regal_hotel():
    print("Seeding Grand Regal Hotel profile...")
    
    # Check if user already exists
    username = "grand_regal_hotel"
    user, created = User.objects.get_or_create(
        username=username,
        defaults={
            'email': 'john.doe@example.com',
            'first_name': 'Grand',
            'last_name': 'Regal Hotel'
        }
    )
    
    if created:
        user.set_password("password123")
        user.save()
        print(f"Created user: {username}")
    else:
        print(f"User {username} already exists")

    # Update UserProfile
    profile = user.profile
    profile.role = 'DONOR'
    profile.phone = '+91 8374653321'
    profile.is_verified = True
    profile.save()

    # Update or create DonorProfile
    donor_profile, created = DonorProfile.objects.get_or_create(
        user=user,
        defaults={
            'business_name': 'GRAND REGAL HOTEL',
            'business_type': 'HOSPITALITY / 5-STAR HOTEL',
            'sub_category': '5-STAR HOTEL',
            'verification_level': 'Level III',
            'registration_id': 'REG-99203348',
            'profile_completeness': 85,
            
            'legal_name': 'Grand Regal Hotel Private Limited',
            'website': 'https://www.grandregal.com',
            'entity_type': 'Premium Corporate Donor',
            'tax_id': 'GST-IN-122930',
            
            'primary_manager_name': 'Johnathan Doe',
            'primary_manager_email': 'john.doe@example.com',
            'alternate_contact': '+91 8374653321',
            
            'address_line1': '123 Grand Street',
            'address_line2': 'Central District',
            'city': 'Chennai',
            'district': 'Central District',
            'state': 'Tamil Nadu',
            'postal_code': '600001',
            'country': 'India',
            
            'status': 'Active',
            'donation_points': 5000
        }
    )
    
    if not created:
        # Update existing
        donor_profile.verification_level = 'Level III'
        donor_profile.registration_id = 'REG-99203348'
        donor_profile.profile_completeness = 85
        donor_profile.tax_id = 'GST-IN-122930'
        donor_profile.legal_name = 'Grand Regal Hotel Private Limited'
        donor_profile.primary_manager_name = 'Johnathan Doe'
        donor_profile.primary_manager_email = 'john.doe@example.com'
        donor_profile.address_line1 = '123 Grand Street'
        donor_profile.city = 'Chennai'
        donor_profile.save()
        print("Updated existing DonorProfile")
    else:
        print("Created new DonorProfile")

    # Seed Documents
    DonorDocument.objects.get_or_create(
        donor=donor_profile,
        document_type='BUSINESS_LICENSE',
        defaults={'document_id': 'JAN 12, 2025', 'is_verified': True}
    )
    DonorDocument.objects.get_or_create(
        donor=donor_profile,
        document_type='TAX_REGISTRATION',
        defaults={'document_id': 'JAN 12, 2025', 'is_verified': True}
    )

    # Seed Financial
    BankAccount.objects.get_or_create(
        user=user,
        bank_name='HDFC Bank',
        defaults={
            'account_holder': 'Grand Regal Hotel',
            'account_number': '***8890',
            'ifsc_code': 'HDFC000123',
            'is_primary': True,
            'is_verified': True
        }
    )
    
    BankAccount.objects.get_or_create(
        user=user,
        bank_name='ICICI Bank',
        defaults={
            'account_holder': 'Grand Regal Hotel',
            'account_number': '***4421',
            'ifsc_code': 'ICIC0001122',
            'is_primary': False,
            'is_verified': False
        }
    )
    UPIIdentity.objects.get_or_create(
        user=user,
        vpa='grandregal@okaxis',
        defaults={'label': 'Primary', 'is_primary': True, 'is_verified': True}
    )

    print("Seeding completed successfully!")

if __name__ == "__main__":
    seed_grand_regal_hotel()
