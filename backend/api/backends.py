from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        # Email is passed in as 'username' from TokenObtainPairRequest
        email = username
        try:
            user = UserModel.objects.get(email=email)
        except UserModel.DoesNotExist:
            # Maybe they typed their username instead
            try:
                user = UserModel.objects.get(username=username)
            except UserModel.DoesNotExist:
                return None

        if user.check_password(password):
            return user
        return None
