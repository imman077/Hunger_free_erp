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
    
    # Header Info
    business_name = models.CharField(max_length=255)
    business_type = models.CharField(max_length=100) # Restaurant, Hotel, Corporate, Individual
    sub_category = models.CharField(max_length=100, blank=True, null=True) # e.g., 5-STAR HOTEL
    verification_level = models.CharField(max_length=20, default='Level I') # Level I, II, III
    registration_id = models.CharField(max_length=50, blank=True, null=True)
    profile_completeness = models.IntegerField(default=0) # Percentage (0-100)
    
    # Legal & Identity
    legal_name = models.CharField(max_length=255, blank=True, null=True)
    website = models.URLField(max_length=500, blank=True, null=True)
    entity_type = models.CharField(max_length=100, blank=True, null=True) # e.g., Premium Corporate Donor
    tax_id = models.CharField(max_length=50, blank=True, null=True) # Tax Identifier (GST, PAN etc.)
    
    # Primary Contact Details
    primary_manager_name = models.CharField(max_length=255)
    primary_manager_email = models.EmailField(blank=True, null=True)
    alternate_contact = models.CharField(max_length=15, blank=True, null=True)
    
    # Registered Address
    address_line1 = models.CharField(max_length=255, blank=True, null=True)
    address_line2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    district = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)
    country = models.CharField(max_length=100, default='India')
    
    # Activity Stats
    total_donations_count = models.IntegerField(default=0)
    donation_points = models.IntegerField(default=0)
    status = models.CharField(max_length=20, default='Active') # Active / Operational, Inactive
    
    def __str__(self):
        return self.business_name

class DonorDocument(models.Model):
    DOCUMENT_TYPES = (
        ('BUSINESS_LICENSE', 'Business License'),
        ('TAX_REGISTRATION', 'Tax Registration'),
        ('IDENTITY_PROOF', 'Identity Proof'),
        ('OTHER', 'Other'),
    )
    donor = models.ForeignKey(DonorProfile, on_delete=models.CASCADE, related_name='documents')
    document_type = models.CharField(max_length=50, choices=DOCUMENT_TYPES)
    document_id = models.CharField(max_length=100, blank=True, null=True) # e.g., JAN 12, 2025 (as seen in UI) or actual ID
    file = models.FileField(upload_to='donor_documents/', blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    expiry_date = models.DateField(null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.donor.business_name} - {self.document_type}"

class NGOProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='ngo_profile')
    name = models.CharField(max_length=255) # NGO NAME
    registration_id = models.CharField(max_length=100) # REG. ID
    category = models.CharField(max_length=100, default='Social Service') # CATEGORY
    
    # Organization Details
    managing_director = models.CharField(max_length=255, blank=True, null=True) # Sarah Micheals
    managing_director_email = models.EmailField(blank=True, null=True)
    contact_number = models.CharField(max_length=20, blank=True, null=True)
    website = models.URLField(max_length=500, blank=True, null=True) # WEBSITE
    tax_id = models.CharField(max_length=100, blank=True, null=True) # TAX ID
    office_address = models.TextField(blank=True, null=True) # OPERATING OFFICE
    
    # Stats (as seen in UI)
    total_donations_count = models.IntegerField(default=0) 
    beneficiaries_helped_count = models.DecimalField(max_digits=10, decimal_places=1, default=0.0) 
    active_needs_count = models.IntegerField(default=0) 
    
    # Status
    status = models.CharField(max_length=20, default='PENDING') 

    def __str__(self):
        return self.name

class NGODocument(models.Model):
    DOCUMENT_TYPES = (
        ('80G_CERTIFICATE', 'Tax Exempt Certificate (80G)'),
        ('OPERATING_LICENSE', 'Operating License'),
        ('NGO_REGISTRATION', 'NGO Registration'),
        ('TRUST_DEED', 'Trust Deed'),
        ('OTHER', 'Other'),
    )
    ngo = models.ForeignKey(NGOProfile, on_delete=models.CASCADE, related_name='documents')
    document_type = models.CharField(max_length=50, choices=DOCUMENT_TYPES)
    document_id = models.CharField(max_length=100, blank=True, null=True) # e.g., JAN 15, 2025
    file = models.FileField(upload_to='ngo_documents/', blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.ngo.name} - {self.document_type}"

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
        ('PENDING', 'Pending'),      # Donor posted, waiting for NGO
        ('ACCEPTED', 'Accepted'),    # NGO accepted, waiting for Volunteer
        ('ASSIGNED', 'Assigned'),    # Volunteer assigned for pickup
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
    accepted_volunteer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='accepted_donations_volunteer')
    accepted_ngo = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='accepted_donations_ngo')
    tracking_history = models.JSONField(default=list) # List of status changes with timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class NGOInventoryItem(models.Model):
    ngo = models.ForeignKey(User, on_delete=models.CASCADE, related_name='inventory')
    item_name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    quantity = models.FloatField(default=0)
    unit = models.CharField(max_length=20, default='kg')
    expiry_date = models.DateField(null=True, blank=True)
    storage_location = models.CharField(max_length=255, blank=True, null=True)
    item_condition = models.CharField(max_length=100, default='Excellent')
    additional_notes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, default='In Stock')
    source_donation = models.ForeignKey(Donation, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.item_name} - {self.ngo.username}"

class NGONeed(models.Model):
    ngo = models.ForeignKey(User, on_delete=models.CASCADE, related_name='needs')
    item_name = models.CharField(max_length=255) # Replaces title
    category = models.CharField(max_length=100)
    quantity = models.FloatField(default=0)
    unit = models.CharField(max_length=20, default='Units')
    urgency = models.CharField(max_length=20, default='Medium Priority') # Normal, High, Urgent
    required_by = models.DateField(null=True, blank=True)
    image = models.ImageField(upload_to='needs/', blank=True, null=True)
    distribution_address = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='Open') # Open, Fulfilling, Fulfilled, Closed
    fulfilled_quantity = models.FloatField(default=0) # Track total donated so far
    supporter_ids = models.JSONField(default=list) # List of User IDs (Donors or NGOs) who helped
    accepted_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='accepted_needs')
    accepted_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.item_name} - {self.ngo.username}"

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
    role = models.CharField(max_length=10, choices=UserProfile.ROLE_CHOICES, default='NGO')
    name = models.CharField(max_length=50) # Beginner, Partner, etc.
    min_points = models.IntegerField()
    max_points = models.IntegerField(null=True, blank=True)
    color = models.CharField(max_length=7, default='#000000')
    icon = models.CharField(max_length=50, blank=True)
    bonus_percentage = models.FloatField(default=0.0) # Used for "+X% MORE FUNDING"
    description = models.TextField(blank=True) # "Unlock permanent status..."
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.role})"

class LuckySpinPrize(models.Model):
    PRIZE_TYPES = (
        ('CASH', 'Cash Reward'),
        ('GRANT', 'Grand Grant'),
        ('POINTS', 'Points Bonus'),
        ('BADGE', 'Exclusive Badge'),
    )
    role = models.CharField(max_length=10, choices=UserProfile.ROLE_CHOICES) # Specific prizes per role
    label = models.CharField(max_length=100) # "₹25,000 WIN"
    prize_type = models.CharField(max_length=20, choices=PRIZE_TYPES, default='CASH')
    value = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    icon = models.CharField(max_length=50, blank=True) # Icon name for UI
    probability = models.FloatField(default=0.1) # Odds of winning this prize
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.label} - {self.role}"

class LuckySpinDraw(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lucky_spins')
    prize = models.ForeignKey(LuckySpinPrize, on_delete=models.CASCADE)
    drawn_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} won {self.prize.label}"

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

class Category(models.Model):
    CATEGORY_TYPES = (
        ('DONATION', 'Donation Category'),
        ('NEED', 'NGO Need Category'),
        ('ITEM', 'Inventory Item Category'),
    )
    name = models.CharField(max_length=100, unique=True)
    type = models.CharField(max_length=20, choices=CATEGORY_TYPES, default='NEED')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.type})"

class CategorySuggestion(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='category_suggestions')
    category_name = models.CharField(max_length=100)
    reason = models.TextField() # "Why should we add this?"
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Suggestion: {self.category_name} by {self.user.username}"

class InformationUpdateRequest(models.Model):
    # Unique Display ID (e.g., REQ-1001)
    request_id = models.CharField(max_length=20, unique=True, editable=False)
    
    # Associated user
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='info_updates')
    
    # Category (CONTACT INFO, LEGAL DETAILS, PAYOUT SYSTEM, GENERAL HELP)
    category = models.CharField(max_length=50)
    
    # Selected fields to update (JSON list of buttons)
    selected_fields = models.JSONField(default=list)
    
    # Textarea description
    message = models.TextField(blank=True, null=True)
    
    # Status tracking
    status = models.CharField(max_length=20, default='PENDING')
    
    # Standard review time displayed in UI
    estimated_review = models.CharField(max_length=50, default='12 - 24 Hours')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.request_id:
            # Simple logic to generate REQ-XXXX
            last_request = InformationUpdateRequest.objects.order_by('id').last()
            if not last_request:
                self.request_id = 'REQ-0001'
            else:
                last_id = int(last_request.request_id.split('-')[1])
                self.request_id = f'REQ-{str(last_id + 1).zfill(4)}'
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.request_id} - {self.user.username}"

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
