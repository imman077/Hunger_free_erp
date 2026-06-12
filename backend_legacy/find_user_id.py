import os
import django
import sys

# Setup Django environment
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth.models import User

def get_user_id_by_email(email):
    try:
        user = User.objects.get(email=email)
        print(f"User Found:")
        print(f"  ID: {user.id}")
        print(f"  Username: {user.username}")
        print(f"  Email: {user.email}")
    except User.DoesNotExist:
        # Check by username if email doesn't match
        try:
            user = User.objects.get(username=email)
            print(f"User Found (matched by username):")
            print(f"  ID: {user.id}")
            print(f"  Username: {user.username}")
            print(f"  Email: {user.email}")
        except User.DoesNotExist:
            print(f"No user found with email or username: {email}")

if __name__ == "__main__":
    get_user_id_by_email("donor@hungerfree.com")
