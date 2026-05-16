import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Reward, RewardTier, Badge, RewardConfiguration

def seed_rewards_and_rates():
    # 1. Role-Specific Tier Thresholds (Differentiated by Role Impact)
    # Tiers reflect the unique point-earning potential of each role
    role_tiers = {
        'VOLUNTEER': [
            {'name': 'Beginner', 'min_points': 0, 'max_points': 500, 'earning_bonus': 0},
            {'name': 'Bronze', 'min_points': 501, 'max_points': 1500, 'earning_bonus': 5},
            {'name': 'Silver', 'min_points': 1501, 'max_points': 3500, 'earning_bonus': 10},
            {'name': 'Gold', 'min_points': 3501, 'max_points': 7500, 'earning_bonus': 15},
            {'name': 'Platinum', 'min_points': 7501, 'max_points': 15000, 'earning_bonus': 20},
            {'name': 'Diamond', 'min_points': 15001, 'max_points': 30000, 'earning_bonus': 25},
            {'name': 'Legend', 'min_points': 30001, 'max_points': 70000, 'earning_bonus': 40},
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
            RewardTier.objects.update_or_create(
                role=role, 
                name=t['name'], 
                defaults={
                    'min_points': t['min_points'],
                    'max_points': t['max_points'],
                    'earning_bonus': t['earning_bonus']
                }
            )

    # 2. Seed Base Rates (Differentiated for each role's specific actions)
    rates_data = [
        # Donors
        {'category': 'DONOR', 'action_key': 'FIRST_DONATION', 'label': 'First Donation', 'points': 300},
        {'category': 'DONOR', 'action_key': 'PER_KG_FOOD', 'label': 'Per KG Food', 'points': 25},
        {'category': 'DONOR', 'action_key': 'MILESTONE_BONUS', 'label': 'Milestone Bonus', 'points': 600},
        
        # Volunteers
        {'category': 'VOLUNTEER', 'action_key': 'PER_DELIVERY', 'label': 'Per Delivery', 'points': 150},
        {'category': 'VOLUNTEER', 'action_key': 'WEEKLY_STREAK', 'label': 'Weekly Streak', 'points': 500},
        {'category': 'VOLUNTEER', 'action_key': 'EMERGENCY_BONUS', 'label': 'Emergency Bonus', 'points': 1000},
        
        # NGOs
        {'category': 'NGO', 'action_key': 'REQUEST_APPROVAL', 'label': 'Request Approval Points', 'points': 50},
        {'category': 'NGO', 'action_key': 'WASTE_HANDLING', 'label': 'Waste Handling Points', 'points': 10},
        {'category': 'NGO', 'action_key': 'IMPACT_BONUS', 'label': 'Impact Bonus', 'points': 500},
    ]

    for rate in rates_data:
        RewardConfiguration.objects.update_or_create(
            category=rate['category'], 
            action_key=rate['action_key'], 
            defaults={'label': rate['label'], 'points': rate['points']}
        )

    print("Successfully synchronized ROLE-SPECIFIC base rates and tier thresholds!")

if __name__ == '__main__':
    seed_rewards_and_rates()
