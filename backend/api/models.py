from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# --- User & Role Profiles ---

class UserProfile(models.Model):
    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('DONOR', 'Donor'),
        ('NGO', 'NGO'),
        ('VOLUNTEER', 'Volunteer'),
    )
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='DONOR')
    avatar = models.URLField(max_length=500, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    last_login_at = models.DateTimeField(null=True, blank=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.role}"

class DonorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='donor_profile')
    business_name = models.CharField(max_length=255)
    business_type = models.CharField(max_length=100) # Restaurant, Hotel, Corporate, Individual
    tax_id = models.CharField(max_length=50, blank=True, null=True)
    total_donations_value = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_donations_count = models.IntegerField(default=0)
    points = models.IntegerField(default=0)
    lifetime_points = models.IntegerField(default=0)
    status = models.CharField(max_length=20, default='Active')
    contact_person = models.CharField(max_length=255)

class NGOProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='ngo_profile')
    name = models.CharField(max_length=255)
    registration_no = models.CharField(max_length=100)
    ngo_type = models.CharField(max_length=100, default='Social Service')
    service_areas = models.JSONField(default=list) # List of zones/cities
    beneficiaries = models.CharField(max_length=255) # Description of who they help
    vision = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='PENDING')
    points = models.IntegerField(default=0)
    lifetime_points = models.IntegerField(default=0)

class VolunteerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='volunteer_profile')
    zone = models.CharField(max_length=50)
    skills = models.JSONField(default=list) # e.g. ['Driving', 'First Aid']
    volunteer_areas = models.JSONField(default=list)
    tasks_completed = models.IntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    vehicle_type = models.CharField(max_length=100, blank=True) # Bike, Car, Truck
    status = models.CharField(max_length=20, default='available')
    verification_status = models.CharField(max_length=20, default='Pending')
    points = models.IntegerField(default=0)
    lifetime_points = models.IntegerField(default=0)

# --- Core Modules ---

class Donation(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('ASSIGNED', 'Assigned'),
        ('PICKED_UP', 'Picked Up'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled'),
    )
    donor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donations')
    food_category = models.CharField(max_length=100) # Perishable, Cooked, Raw, Canned
    food_items = models.TextField() # Detailed list of items
    quantity = models.FloatField()
    unit = models.CharField(max_length=20, default='kg') # kg, units, liters
    image = models.ImageField(upload_to='donations/', blank=True, null=True)
    pickup_address = models.TextField()
    pickup_time = models.DateTimeField(null=True, blank=True)
    contact_phone = models.CharField(max_length=15, blank=True, null=True)
    expiry_time = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    assigned_volunteer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_donations')
    assigned_ngo = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='received_donations')
    related_need = models.ForeignKey('NGONeed', on_delete=models.SET_NULL, null=True, blank=True, related_name='fulfilled_donations')
    tracking_history = models.JSONField(default=list) # List of status changes with timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class NGOInventoryItem(models.Model):
    ngo = models.ForeignKey(User, on_delete=models.CASCADE, related_name='inventory')
    item_name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    quantity = models.FloatField()
    unit = models.CharField(max_length=20, default='kg')
    expiry_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, default='In Stock')
    source_donation = models.ForeignKey(Donation, on_delete=models.SET_NULL, null=True, blank=True)
    added_at = models.DateTimeField(auto_now_add=True)

class NGONeed(models.Model):
    ngo = models.ForeignKey(User, on_delete=models.CASCADE, related_name='needs')
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    urgency = models.CharField(max_length=20, default='Normal') # Normal, High, Urgent
    status = models.CharField(max_length=20, default='Open')
    created_at = models.DateTimeField(auto_now_add=True)

class VolunteerTask(models.Model):
    volunteer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    donation = models.ForeignKey(Donation, on_delete=models.SET_NULL, null=True, blank=True)
    task_type = models.CharField(max_length=100) # Pickup, Delivery, Verification, Awareness
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='Assigned')
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

# --- Rewards & Gamification ---

class Reward(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    points_required = models.IntegerField()
    category = models.CharField(max_length=100) # Voucher, Gift, Membership, Service
    provider = models.CharField(max_length=255, blank=True) # Partner brand
    image_url = models.URLField(max_length=500, blank=True, null=True)
    status = models.CharField(max_length=20, default='Active')

class RewardClaim(models.Model):
    reward = models.ForeignKey(Reward, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default='Pending') # Pending, Approved, Rejected, Delivered
    points_at_claim = models.IntegerField()
    claim_details = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

class RewardTier(models.Model):
    role = models.CharField(max_length=10, choices=UserProfile.ROLE_CHOICES)
    name = models.CharField(max_length=100) # Beginner, Bronze, etc.
    min_points = models.IntegerField()
    max_points = models.IntegerField(null=True, blank=True)
    earning_bonus = models.IntegerField(default=0) # Percentage bonus (0 to 40)
    badge_icon = models.CharField(max_length=50, blank=True)

class RewardConfiguration(models.Model):
    category = models.CharField(max_length=20) # DONOR, VOLUNTEER, NGO
    action_key = models.CharField(max_length=100) # e.g., PER_KG_FOOD
    label = models.CharField(max_length=255)
    points = models.IntegerField()
    updated_at = models.DateTimeField(auto_now=True)

class Badge(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50)
    category = models.CharField(max_length=50) # donations, volunteers, green
    required_value = models.IntegerField() # e.g. 100 donations

class UserBadge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    earned_at = models.DateTimeField(auto_now_add=True)

class PointsHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='points_history')
    points = models.IntegerField()
    reason = models.CharField(max_length=255)
    action_type = models.CharField(max_length=50) # DONATION, PICKUP, VERIFICATION
    created_at = models.DateTimeField(auto_now_add=True)

class BankAccount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bank_accounts')
    bank_name = models.CharField(max_length=255)
    account_holder = models.CharField(max_length=255)
    account_number = models.CharField(max_length=50)
    ifsc_code = models.CharField(max_length=20)
    is_primary = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class UPIIdentity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='upi_identities')
    vpa = models.CharField(max_length=255)
    label = models.CharField(max_length=100) # e.g. Primary, Business
    is_primary = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Milestone(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    points_threshold = models.IntegerField()
    reward_bonus = models.IntegerField(default=0)
    icon = models.CharField(max_length=50, default='trophy')
    role_target = models.CharField(max_length=20) # ALL, DONOR, NGO, VOLUNTEER

# --- Administration & Support ---

class Enquiry(models.Model):
    TYPE_CHOICES = (
        ('ONBOARDING', 'Registration/Onboarding'),
        ('REWARD', 'Reward Claim/Points'),
        ('PROFILE', 'Profile Update'),
        ('TECHNICAL', 'Technical Issue'),
        ('DONATION', 'Donation Related'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enquiries')
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    priority = models.CharField(max_length=10, default='medium') # high, medium, low
    subject = models.CharField(max_length=255)
    message = models.TextField()
    status = models.CharField(max_length=20, default='Pending') # Pending, In Review, Resolved, Rejected
    admin_notes = models.TextField(blank=True)
    attachments = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class SystemConfiguration(models.Model):
    key = models.CharField(max_length=100, unique=True)
    value = models.JSONField()
    description = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

# --- Signals ---

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.get_or_create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()
    else:
        UserProfile.objects.get_or_create(user=instance)
