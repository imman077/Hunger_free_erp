from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    UserProfile, DonorProfile, NGOProfile, VolunteerProfile, 
    Donation, NGOInventoryItem, NGONeed, VolunteerTask,
    Reward, RewardClaim, Milestone, Enquiry, SystemConfiguration,
    BankAccount, UPIIdentity, RewardTier, Badge, UserBadge, PointsHistory
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# --- User & Profile Serializers ---

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class DonorProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.ReadOnlyField(source='user.email')
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
    volunteer_name = serializers.ReadOnlyField(source='assigned_volunteer.username')
    ngo_name = serializers.ReadOnlyField(source='assigned_ngo.username')

    class Meta:
        model = Donation
        fields = '__all__'

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

class NGONeedSerializer(serializers.ModelSerializer):
    ngo_name = serializers.ReadOnlyField(source='ngo.username')
    class Meta:
        model = NGONeed
        fields = '__all__'

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
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.profile.role
        token['username'] = user.username
        return token
