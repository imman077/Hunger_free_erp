from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from django.db import models
from django.utils import timezone
from .models import (
    UserProfile, DonorProfile, DonorDocument, NGOProfile, VolunteerProfile, 
    Donation, NGOInventoryItem, NGONeed, VolunteerTask,
    Reward, RewardClaim, Milestone, Enquiry, SystemConfiguration,
    BankAccount, UPIIdentity, RewardTier, Badge, UserBadge, PointsHistory,
    Category, CategorySuggestion, LuckySpinPrize, LuckySpinDraw
)
from .serializers import (
    UserSerializer, UserProfileSerializer, DonorProfileSerializer, DonorDocumentSerializer,
    NGOProfileSerializer, VolunteerProfileSerializer, RegisterSerializer,
    DonationSerializer, NGOInventoryItemSerializer, NGONeedSerializer, 
    VolunteerTaskSerializer, RewardSerializer, RewardClaimSerializer, 
    MilestoneSerializer, EnquirySerializer, SystemConfigurationSerializer,
    BankAccountSerializer, UPIIdentitySerializer, RewardTierSerializer, 
    BadgeSerializer, UserBadgeSerializer, PointsHistorySerializer,
    CategorySerializer, CategorySuggestionSerializer,
    LuckySpinPrizeSerializer, LuckySpinDrawSerializer
)

# --- Base ViewSets ---

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

class DonorProfileViewSet(viewsets.ModelViewSet):
    queryset = DonorProfile.objects.all()
    serializer_class = DonorProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

class DonorDocumentViewSet(viewsets.ModelViewSet):
    queryset = DonorDocument.objects.all()
    serializer_class = DonorDocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['donor', 'document_type', 'is_verified']

class NGOProfileViewSet(viewsets.ModelViewSet):
    queryset = NGOProfile.objects.all()
    serializer_class = NGOProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

class VolunteerProfileViewSet(viewsets.ModelViewSet):
    queryset = VolunteerProfile.objects.all()
    serializer_class = VolunteerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

# --- Core Business Logic ViewSets ---

from rest_framework.parsers import MultiPartParser, FormParser

from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all().order_by('-created_at')
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['status', 'food_category', 'donor', 'accepted_volunteer', 'accepted_ngo']

    def get_queryset(self):
        user = self.request.user
        queryset = Donation.objects.all().order_by('-created_at')
        
        # Marketplace specific filtering: Only show PENDING and NOT mine
        marketplace = self.request.query_params.get('marketplace')
        if marketplace:
            queryset = queryset.filter(status='PENDING', accepted_ngo__isnull=True).exclude(donor=user)
            
        return queryset

    def perform_create(self, serializer):
        # Auto assign the donor to the current logged in user
        serializer.save(donor=self.request.user, status='PENDING')

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        donation = self.get_object()
        new_status = request.data.get('status')
        if new_status:
            donation.status = new_status
            donation.tracking_history.append({
                'status': new_status,
                'updated_by': request.user.username,
                'timestamp': timezone.now().isoformat()
            })
            donation.save()
            return Response({'status': 'Status updated'})
        return Response({'error': 'No status provided'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        donation = self.get_object()
        if donation.status != 'PENDING':
            return Response({'error': 'Donation already accepted or processed'}, status=status.HTTP_400_BAD_REQUEST)
        
        donation.status = 'ACCEPTED'
        donation.accepted_ngo = request.user
        donation.tracking_history.append({
            'status': 'ACCEPTED',
            'updated_by': request.user.username,
            'timestamp': timezone.now().isoformat(),
            'message': f'Accepted by NGO: {request.user.username}'
        })
        donation.save()
        return Response({'status': 'Donation accepted'})

    @action(detail=True, methods=['post'])
    def volunteer_accept(self, request, pk=None):
        donation = self.get_object()
        if donation.status != 'ACCEPTED':
            return Response({'error': 'Donation not ready for volunteer pickup'}, status=status.HTTP_400_BAD_REQUEST)
        if donation.accepted_volunteer:
            return Response({'error': 'Volunteer already assigned'}, status=status.HTTP_400_BAD_REQUEST)
        
        donation.status = 'ASSIGNED'
        donation.accepted_volunteer = request.user
        donation.tracking_history.append({
            'status': 'ASSIGNED',
            'updated_by': request.user.username,
            'timestamp': timezone.now().isoformat(),
            'message': f'Volunteer claimed pickup: {request.user.username}'
        })
        donation.save()
        return Response({'status': 'Pickup claimed'})

    @action(detail=True, methods=['post'])
    def pickup(self, request, pk=None):
        donation = self.get_object()
        if donation.accepted_volunteer != request.user:
            return Response({'error': 'Only the assigned volunteer can mark as picked up'}, status=status.HTTP_403_FORBIDDEN)
        
        donation.status = 'IN_TRANSIT'
        donation.pickup_time = timezone.now() # Record actual pickup time
        donation.tracking_history.append({
            'status': 'IN_TRANSIT',
            'updated_by': request.user.username,
            'timestamp': timezone.now().isoformat(),
            'message': 'Food picked up and in transit'
        })
        donation.save()
        return Response({'status': 'Marked as picked up'})

    @action(detail=False, methods=['get'])
    def my_tasks(self, request):
        user = request.user
        donations = Donation.objects.filter(accepted_volunteer=user).order_by('-created_at')
        
        page = self.paginate_queryset(donations)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(donations, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def my_requests(self, request):
        user = request.user
        
        # Determine filtering based on user role
        is_ngo = user.groups.filter(name='NGO').exists()
        
        if is_ngo:
            # For NGOs, only show what they have accepted/claimed
            donations = Donation.objects.filter(accepted_ngo=user).order_by('-created_at')
        else:
            # For Donors, show what they donated or are involved in
            donations = Donation.objects.filter(
                models.Q(donor=user) | 
                models.Q(accepted_ngo=user) | 
                models.Q(accepted_volunteer=user)
            ).order_by('-created_at')
        
        page = self.paginate_queryset(donations)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(donations, many=True)
        return Response(serializer.data)

class NGOInventoryViewSet(viewsets.ModelViewSet):
    queryset = NGOInventoryItem.objects.all()
    serializer_class = NGOInventoryItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['ngo', 'category', 'status']

    def perform_create(self, serializer):
        serializer.save(ngo=self.request.user)

class NGONeedViewSet(viewsets.ModelViewSet):
    queryset = NGONeed.objects.all()
    serializer_class = NGONeedSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['ngo', 'category', 'urgency', 'status']

    def perform_create(self, serializer):
        serializer.save(ngo=self.request.user)

    @action(detail=True, methods=['post'])
    def support(self, request, pk=None):
        need = self.get_object()
        user_id = request.user.id
        supporter_quantity = float(request.data.get('quantity', 0))
        
        # Add to supporter_ids if not already there
        if user_id not in need.supporter_ids:
            need.supporter_ids.append(user_id)
            
        # Update fulfilled quantity
        need.fulfilled_quantity += supporter_quantity
            
        # Update status based on quantity
        if need.fulfilled_quantity >= need.quantity:
            need.status = 'Fulfilled'
        else:
            need.status = 'Fulfilling'
            
        need.accepted_by = request.user
        need.accepted_at = timezone.now()
        need.save()
        return Response({
            'status': 'Successfully supported the community need',
            'current_fulfillment': need.fulfilled_quantity,
            'need_status': need.status
        })

class BankAccountViewSet(viewsets.ModelViewSet):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user', 'is_primary']

class UPIIdentityViewSet(viewsets.ModelViewSet):
    queryset = UPIIdentity.objects.all()
    serializer_class = UPIIdentitySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user', 'is_primary']

class VolunteerTaskViewSet(viewsets.ModelViewSet):
    queryset = VolunteerTask.objects.all()
    serializer_class = VolunteerTaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['volunteer', 'status', 'task_type']

# --- Rewards & Gamification ---

class RewardViewSet(viewsets.ModelViewSet):
    queryset = Reward.objects.all()
    serializer_class = RewardSerializer
    permission_classes = [permissions.IsAuthenticated]

class RewardClaimViewSet(viewsets.ModelViewSet):
    queryset = RewardClaim.objects.all()
    serializer_class = RewardClaimSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user', 'status']

class MilestoneViewSet(viewsets.ModelViewSet):
    queryset = Milestone.objects.all()
    serializer_class = MilestoneSerializer
    permission_classes = [permissions.IsAuthenticated]

class RewardTierViewSet(viewsets.ModelViewSet):
    queryset = RewardTier.objects.all()
    serializer_class = RewardTierSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['role']

class BadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['category']

class UserBadgeViewSet(viewsets.ModelViewSet):
    queryset = UserBadge.objects.all()
    serializer_class = UserBadgeSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['user']

class PointsHistoryViewSet(viewsets.ModelViewSet):
    queryset = PointsHistory.objects.all()
    serializer_class = PointsHistorySerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['user', 'action_type']

# --- Admin & Support ---

class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all().order_by('-created_at')
    serializer_class = EnquirySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['type', 'status', 'priority', 'user']
    search_fields = ['subject', 'message', 'user__username']

    @action(detail=True, methods=['post'])
    def respond(self, request, pk=None):
        enquiry = self.get_object()
        new_status = request.data.get('status')
        admin_notes = request.data.get('admin_notes')
        if new_status:
            enquiry.status = new_status
        if admin_notes:
            enquiry.admin_notes = admin_notes
        enquiry.save()
        return Response({'status': f'Enquiry updated to {enquiry.status}'})

class SystemConfigurationViewSet(viewsets.ModelViewSet):
    queryset = SystemConfiguration.objects.all()
    serializer_class = SystemConfigurationSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'key'

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['type', 'is_active']

class CategorySuggestionViewSet(viewsets.ModelViewSet):
    queryset = CategorySuggestion.objects.all().order_by('-created_at')
    serializer_class = CategorySuggestionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['status']
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class LuckySpinPrizeViewSet(viewsets.ModelViewSet):
    queryset = LuckySpinPrize.objects.filter(is_active=True)
    serializer_class = LuckySpinPrizeSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['role']

class LuckySpinDrawViewSet(viewsets.ModelViewSet):
    queryset = LuckySpinDraw.objects.all().order_by('-drawn_at')
    serializer_class = LuckySpinDrawSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# --- Auth ---

class RegisterView(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
