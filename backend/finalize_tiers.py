import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Reward, RewardTier, Badge, RewardConfiguration

def finalize_system_data():
    # 1. CLEAN UP: Remove all existing tiers to ensure only the requested ones exist
    RewardTier.objects.all().delete()
    print("Cleaned up old tiers.")

    # 2. SEED Standardized Tiers (The ONLY 7 allowed tiers) with Icons
    tier_meta = {
        'Beginner': {'badge_icon': '🌱'},
        'Bronze':   {'badge_icon': '🥉'},
        'Silver':   {'badge_icon': '🥈'},
        'Gold':     {'badge_icon': '🥇'},
        'Platinum': {'badge_icon': '💎'},
        'Diamond':  {'badge_icon': '✨'},
        'Legend':   {'badge_icon': '👑'},
    }

    role_tiers = {
        'VOLUNTEER': [
            {'name': 'Beginner', 'min_points': 0, 'max_points': 500, 'earning_bonus': 0},
            {'name': 'Bronze', 'min_points': 501, 'max_points': 1500, 'earning_bonus': 5},
            {'name': 'Silver', 'min_points': 1501, 'max_points': 3500, 'earning_bonus': 10},
            {'name': 'Gold', 'min_points': 3501, 'max_points': 7500, 'earning_bonus': 15},
            {'name': 'Platinum', 'min_points': 7501, 'max_points': 15000, 'earning_bonus': 20},
            {'name': 'Diamond', 'min_points': 15001, 'max_points': 30000, 'earning_bonus': 25},
            {'name': 'Legend', 'min_points': 30001, 'max_points': 100000, 'earning_bonus': 40},
        ],
        'DONOR': [
            {'name': 'Beginner', 'min_points': 0, 'max_points': 1000, 'earning_bonus': 0},
            {'name': 'Bronze', 'min_points': 1001, 'max_points': 5000, 'earning_bonus': 5},
            {'name': 'Silver', 'min_points': 5001, 'max_points': 15000, 'earning_bonus': 10},
            {'name': 'Gold', 'min_points': 15001, 'max_points': 35000, 'earning_bonus': 15},
            {'name': 'Platinum', 'min_points': 35001, 'max_points': 75000, 'earning_bonus': 20},
            {'name': 'Diamond', 'min_points': 75001, 'max_points': 150000, 'earning_bonus': 25},
            {'name': 'Legend', 'min_points': 150001, 'max_points': 500000, 'earning_bonus': 40},
        ],
        'NGO': [
            {'name': 'Beginner', 'min_points': 0, 'max_points': 2500, 'earning_bonus': 0},
            {'name': 'Bronze', 'min_points': 2501, 'max_points': 10000, 'earning_bonus': 5},
            {'name': 'Silver', 'min_points': 10001, 'max_points': 25000, 'earning_bonus': 10},
            {'name': 'Gold', 'min_points': 25001, 'max_points': 50000, 'earning_bonus': 15},
            {'name': 'Platinum', 'min_points': 50001, 'max_points': 100000, 'earning_bonus': 20},
            {'name': 'Diamond', 'min_points': 100001, 'max_points': 250000, 'earning_bonus': 25},
            {'name': 'Legend', 'min_points': 250001, 'max_points': 1000000, 'earning_bonus': 40},
        ]
    }

    for role, tiers in role_tiers.items():
        for t in tiers:
            meta = tier_meta[t['name']]
            RewardTier.objects.create(
                role=role, 
                name=t['name'], 
                min_points=t['min_points'],
                max_points=t['max_points'],
                earning_bonus=t['earning_bonus'],
                badge_icon=meta['badge_icon']
            )

    print("Successfully synchronized tiers using ONLY names and icons (no benefits).")

if __name__ == '__main__':
    finalize_system_data()
