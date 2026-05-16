import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import NGONeed

try:
    needs = NGONeed.objects.all()
    print(f"Found {needs.count()} needs")
    for need in needs:
        print(f"ID: {need.id}, Item: {need.item_name}, NGO: {need.ngo.username}")
except Exception as e:
    print(f"Error: {e}")
