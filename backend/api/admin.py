from django.contrib import admin
from .models import (
    UserProfile, DonorProfile, DonorDocument, NGOProfile, VolunteerProfile,
    Donation, NGOInventoryItem, NGONeed, VolunteerTask,
    Reward, RewardClaim, Milestone, Enquiry, SystemConfiguration,
    BankAccount, UPIIdentity, RewardTier, Badge, UserBadge, PointsHistory,
    Category, CategorySuggestion, LuckySpinPrize, LuckySpinDraw
)

# --- Profiles ---

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'phone', 'is_verified', 'created_at')
    list_filter = ('role', 'is_verified')
    search_fields = ('user__username', 'phone')

class DonorDocumentInline(admin.TabularInline):
    model = DonorDocument
    extra = 1

@admin.register(DonorProfile)
class DonorProfileAdmin(admin.ModelAdmin):
    list_display = ('business_name', 'business_type', 'verification_level', 'status', 'donation_points')
    list_filter = ('business_type', 'verification_level', 'status')
    search_fields = ('business_name', 'registration_id', 'legal_name')
    inlines = [DonorDocumentInline]

@admin.register(NGOProfile)
class NGOProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'registration_id', 'category', 'status')
    list_filter = ('category', 'status')
    search_fields = ('name', 'registration_id')

@admin.register(VolunteerProfile)
class VolunteerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'zone', 'status', 'verification_status', 'points')
    list_filter = ('status', 'verification_status', 'zone')
    search_fields = ('user__username', 'zone')

# --- Core ---

@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('donor', 'food_category', 'quantity', 'unit', 'status', 'created_at')
    list_filter = ('status', 'food_category')
    search_fields = ('donor__username', 'pickup_address')

@admin.register(NGOInventoryItem)
class NGOInventoryItemAdmin(admin.ModelAdmin):
    list_display = ('item_name', 'ngo', 'category', 'quantity', 'unit', 'storage_location', 'item_condition', 'status')
    list_filter = ('category', 'status')

@admin.register(NGONeed)
class NGONeedAdmin(admin.ModelAdmin):
    list_display = ('item_name', 'ngo', 'urgency', 'status', 'created_at')
    list_filter = ('urgency', 'status')

@admin.register(VolunteerTask)
class VolunteerTaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'volunteer', 'task_type', 'status', 'created_at')
    list_filter = ('task_type', 'status')

# --- Rewards & Gamification ---

@admin.register(Reward)
class RewardAdmin(admin.ModelAdmin):
    list_display = ('name', 'points_required', 'category', 'status')
    list_filter = ('category', 'status')

@admin.register(RewardClaim)
class RewardClaimAdmin(admin.ModelAdmin):
    list_display = ('reward', 'user', 'status', 'created_at')
    list_filter = ('status',)

@admin.register(RewardTier)
class RewardTierAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'min_points', 'max_points')
    list_filter = ('role',)

@admin.register(Badge)
class BadgeAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'required_value')
    list_filter = ('category',)

@admin.register(UserBadge)
class UserBadgeAdmin(admin.ModelAdmin):
    list_display = ('user', 'badge', 'earned_at')

@admin.register(PointsHistory)
class PointsHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'points', 'action_type', 'reason', 'created_at')
    list_filter = ('action_type',)

@admin.register(BankAccount)
class BankAccountAdmin(admin.ModelAdmin):
    list_display = ('user', 'bank_name', 'account_number', 'is_primary', 'is_verified')
    list_filter = ('is_primary', 'is_verified')

@admin.register(UPIIdentity)
class UPIIdentityAdmin(admin.ModelAdmin):
    list_display = ('user', 'vpa', 'label', 'is_primary', 'is_verified')
    list_filter = ('is_primary', 'is_verified')

@admin.register(Milestone)
class MilestoneAdmin(admin.ModelAdmin):
    list_display = ('name', 'points_threshold', 'role_target')
    list_filter = ('role_target',)

# --- Support ---

@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('subject', 'user', 'type', 'priority', 'status', 'created_at')
    list_filter = ('type', 'priority', 'status')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'is_active', 'created_at')
    list_filter = ('type', 'is_active')

@admin.register(CategorySuggestion)
class CategorySuggestionAdmin(admin.ModelAdmin):
    list_display = ('category_name', 'user', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('category_name', 'user__username')

@admin.register(LuckySpinPrize)
class LuckySpinPrizeAdmin(admin.ModelAdmin):
    list_display = ('label', 'role', 'prize_type', 'value', 'probability')
    list_filter = ('role', 'prize_type')
    search_fields = ('label',)

@admin.register(LuckySpinDraw)
class LuckySpinDrawAdmin(admin.ModelAdmin):
    list_display = ('user', 'prize', 'drawn_at')
    list_filter = ('drawn_at',)

admin.site.register(SystemConfiguration)
