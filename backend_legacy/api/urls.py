from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    UserViewSet, UserProfileViewSet, DonorProfileViewSet, DonorDocumentViewSet,
    NGOProfileViewSet, VolunteerProfileViewSet, RegisterView,
    DonationViewSet, NGOInventoryViewSet, NGONeedViewSet, 
    VolunteerTaskViewSet, RewardViewSet, RewardClaimViewSet, 
    MilestoneViewSet, EnquiryViewSet, SystemConfigurationViewSet,
    BankAccountViewSet, UPIIdentityViewSet, RewardTierViewSet,
    BadgeViewSet, UserBadgeViewSet, PointsHistoryViewSet,
    CategoryViewSet, CategorySuggestionViewSet,
    LuckySpinPrizeViewSet, LuckySpinDrawViewSet
)
from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Using the custom token serializer for JWT
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', UserProfileViewSet)
router.register(r'donor-profiles', DonorProfileViewSet)
router.register(r'donor-documents', DonorDocumentViewSet)
router.register(r'ngo-profiles', NGOProfileViewSet)
router.register(r'volunteer-profiles', VolunteerProfileViewSet)
router.register(r'donations', DonationViewSet)
router.register(r'inventory', NGOInventoryViewSet)
router.register(r'needs', NGONeedViewSet)
router.register(r'tasks', VolunteerTaskViewSet)
router.register(r'rewards', RewardViewSet)
router.register(r'reward-claims', RewardClaimViewSet)
router.register(r'milestones', MilestoneViewSet)
router.register(r'enquiries', EnquiryViewSet)
router.register(r'bank-accounts', BankAccountViewSet)
router.register(r'upi-identities', UPIIdentityViewSet)
router.register(r'reward-tiers', RewardTierViewSet)
router.register(r'badges', BadgeViewSet)
router.register(r'user-badges', UserBadgeViewSet)
router.register(r'points-history', PointsHistoryViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'category-suggestions', CategorySuggestionViewSet)
router.register(r'lucky-spin-prizes', LuckySpinPrizeViewSet)
router.register(r'lucky-spin-draws', LuckySpinDrawViewSet)
router.register(r'config', SystemConfigurationViewSet, basename='config')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view({'post': 'create'}), name='register'),
    path('auth/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', UserViewSet.as_view({'get': 'me'}), name='user-me'),
]
