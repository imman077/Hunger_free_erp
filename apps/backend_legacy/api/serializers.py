from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    UserProfile, DonorProfile, DonorDocument, NGOProfile, VolunteerProfile, 
    Donation, NGOInventoryItem, NGONeed, VolunteerTask,
    Reward, RewardClaim, Milestone, Enquiry, SystemConfiguration,
    BankAccount, UPIIdentity, RewardTier, Badge, UserBadge, PointsHistory,
    Category, CategorySuggestion, LuckySpinPrize, LuckySpinDraw
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# --- User & Profile Serializers ---

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class DonorDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonorDocument
        fields = '__all__'

class DonorProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.ReadOnlyField(source='user.email')
    documents = DonorDocumentSerializer(many=True, read_only=True)
    
    class Meta:
        model = DonorProfile
        fields = '__all__'

class NGOProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.ReadOnlyField(source='user.email')
    class Meta:
        model = NGOProfile
        fields = '__all__'

class VolunteerProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.ReadOnlyField(source='user.email')
    class Meta:
        model = VolunteerProfile
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    donor_profile = DonorProfileSerializer(read_only=True)
    ngo_profile = NGOProfileSerializer(read_only=True)
    volunteer_profile = VolunteerProfileSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name', 
            'profile', 'donor_profile', 'ngo_profile', 'volunteer_profile'
        )

# --- Module Serializers ---

class DonationSerializer(serializers.ModelSerializer):
    donor_name = serializers.ReadOnlyField(source='donor.username')
    donor_hotel = serializers.ReadOnlyField(source='donor.donor_profile.business_name')
    donor_phone = serializers.ReadOnlyField(source='contact_phone')
    donor_email = serializers.ReadOnlyField(source='donor.email')
    
    ngo_name = serializers.ReadOnlyField(source='accepted_ngo.username')
    ngo_org_name = serializers.ReadOnlyField(source='accepted_ngo.ngo_profile.name')
    ngo_phone = serializers.ReadOnlyField(source='accepted_ngo.ngo_profile.contact_number')
    
    volunteer_name = serializers.SerializerMethodField()

    class Meta:
        model = Donation
        fields = '__all__'
        read_only_fields = ('donor', 'status')

    def get_volunteer_name(self, obj):
        return obj.accepted_volunteer.username if obj.accepted_volunteer else None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # Logic: 
            # 1. Assigned Volunteer sees both (to facilitate handover)
            # 2. Donor sees Pickup OTP (to give to volunteer)
            # 3. NGO sees Delivery OTP (to give to volunteer)
            
            is_volunteer = instance.accepted_volunteer == request.user
            is_donor = instance.donor == request.user
            is_ngo = instance.accepted_ngo == request.user
            
            if not is_volunteer:
                if not (is_donor and instance.status == 'ASSIGNED'):
                    representation.pop('pickup_otp', None)
                if not (is_ngo and instance.status == 'PICKED_UP'):
                    representation.pop('delivery_otp', None)
        else:
            representation.pop('pickup_otp', None)
            representation.pop('delivery_otp', None)
            
        return representation


class BankAccountSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = BankAccount
        fields = '__all__'

class UPIIdentitySerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = UPIIdentity
        fields = '__all__'

class NGOInventoryItemSerializer(serializers.ModelSerializer):
    ngo_name = serializers.ReadOnlyField(source='ngo.username')
    class Meta:
        model = NGOInventoryItem
        fields = '__all__'
        read_only_fields = ('ngo',)

class NGONeedSerializer(serializers.ModelSerializer):
    ngo_name = serializers.ReadOnlyField(source='ngo.username')
    is_mine = serializers.SerializerMethodField()
    title = serializers.ReadOnlyField(source='item_name')
    quantity_required = serializers.ReadOnlyField(source='quantity')
    class Meta:
        model = NGONeed
        fields = '__all__'
        read_only_fields = ('ngo',)
    
    def get_is_mine(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.ngo == request.user
        return False

class VolunteerTaskSerializer(serializers.ModelSerializer):
    volunteer_name = serializers.ReadOnlyField(source='volunteer.username')
    donation_details = DonationSerializer(source='donation', read_only=True)
    class Meta:
        model = VolunteerTask
        fields = '__all__'

# --- Rewards & Support Serializers ---

class RewardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reward
        fields = '__all__'

class RewardClaimSerializer(serializers.ModelSerializer):
    reward_name = serializers.ReadOnlyField(source='reward.name')
    user_name = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = RewardClaim
        fields = '__all__'

class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = '__all__'

class EnquirySerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Enquiry
        fields = '__all__'

class RewardTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = RewardTier
        fields = '__all__'

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = '__all__'

class UserBadgeSerializer(serializers.ModelSerializer):
    badge_details = BadgeSerializer(source='badge', read_only=True)
    class Meta:
        model = UserBadge
        fields = '__all__'

class PointsHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PointsHistory
        fields = '__all__'

class SystemConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemConfiguration
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CategorySuggestionSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = CategorySuggestion
        fields = '__all__'

class LuckySpinPrizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LuckySpinPrize
        fields = '__all__'

class LuckySpinDrawSerializer(serializers.ModelSerializer):
    prize_label = serializers.ReadOnlyField(source='prize.label')
    user_name = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = LuckySpinDraw
        fields = '__all__'

# --- Auth Serializers ---

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'role')

    def create(self, validated_data):
        role = validated_data.pop('role')
        user = User.objects.create_user(**validated_data)
        profile = user.profile
        profile.role = role
        profile.save()
        
        # Create empty profile extensions based on role
        if role == 'DONOR':
            DonorProfile.objects.create(user=user)
        elif role == 'NGO':
            NGOProfile.objects.create(user=user)
        elif role == 'VOLUNTEER':
            VolunteerProfile.objects.create(user=user)
            
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Default validation (checks username/password)
        data = super().validate(attrs)
        
        # Check if the requested role matches the user's actual role
        # Note: self.user is set by super().validate(attrs)
        request_role = self.context['request'].data.get('role')
        if request_role and hasattr(self.user, 'profile'):
            if self.user.profile.role != request_role:
                from rest_framework import serializers
                raise serializers.ValidationError({
                    "detail": f"Access Denied: This account is registered as {self.user.profile.role}, not {request_role}."
                })
        
        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.profile.role
        token['username'] = user.username
        return token
