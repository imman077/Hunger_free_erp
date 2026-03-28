from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('role', 'phone', 'address')

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'profile')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=UserProfile.ROLE_CHOICES, write_only=True, required=False)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'role')

    def create(self, validated_data):
        role = validated_data.pop('role', 'DONOR')
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', ''),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        # Profile is created by signal, but we update the role
        user.profile.role = role
        user.profile.save()
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['role'] = user.profile.role
        return token

    def validate(self, attrs):
        # attrs['username'] contains whatever the user typed in the box (could be email or username)
        # attrs['password'] contains the plain password
        data = super().validate(attrs)
        
        # Check if a role was requested (from the UI icons)
        requested_role = self.context['request'].data.get('role')
        if requested_role and self.user.profile.role != requested_role.upper():
            from rest_framework import exceptions
            raise exceptions.ValidationError({
                "detail": f"This account is registered as a {self.user.profile.role}, not a {requested_role}."
            })
            
        return data
