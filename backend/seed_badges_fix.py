import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Reward, RewardTier, Badge

def seed_badges_correctly():
    # CLEAN UP OLD BADGES
    Badge.objects.all().delete()
    print("Cleaned up old badges.")

    # 3. Seed Badges (Milestones from UI Screenshots with CORRECT categories and NO reward_points)
    badges = [
        # --- VOLUNTEER MILESTONES (Image 1) ---
        # Category: DELIVERY MILESTONES
        {'name': 'Swift Start', 'description': 'Complete 10 successful deliveries', 'icon': 'Zap', 'category': 'DELIVERY MILESTONES', 'required_value': 10},
        {'name': 'Path Finder', 'description': 'Complete 50 successful deliveries', 'icon': 'Target', 'category': 'DELIVERY MILESTONES', 'required_value': 50},
        {'name': 'Food Hero', 'description': 'Achieve 100 successful deliveries', 'icon': 'Shield', 'category': 'DELIVERY MILESTONES', 'required_value': 100},
        {'name': 'Street Legend', 'description': 'Complete 250 successful deliveries', 'icon': 'Zap', 'category': 'DELIVERY MILESTONES', 'required_value': 250},
        {'name': 'Community Savior', 'description': 'Complete 500 successful deliveries', 'icon': 'Trophy', 'category': 'DELIVERY MILESTONES', 'required_value': 500},
        {'name': 'Guardian Angel', 'description': 'Complete 1,000 successful deliveries', 'icon': 'Heart', 'category': 'DELIVERY MILESTONES', 'required_value': 1000},
        {'name': 'Hunger Destroyer', 'description': 'Complete 5,000 successful deliveries', 'icon': 'Crown', 'category': 'DELIVERY MILESTONES', 'required_value': 5000},
        
        # Category: POINT MILESTONES
        {'name': 'Service Spark', 'description': 'Earn 2,000 impact points', 'icon': 'Star', 'category': 'POINT MILESTONES', 'required_value': 2000},
        {'name': 'Elite Guardian', 'description': 'Earn 10,000 impact points', 'icon': 'ShieldCheck', 'category': 'POINT MILESTONES', 'required_value': 10000},
        
        # Category: STREAK MILESTONES
        {'name': 'Reliable Heart', 'description': 'Maintain a 14-day delivery streak', 'icon': 'Heart', 'category': 'STREAK MILESTONES', 'required_value': 14},
        {'name': 'Commitment Pillar', 'description': 'Maintain a 30-day delivery streak', 'icon': 'Shield', 'category': 'STREAK MILESTONES', 'required_value': 30},
        {'name': 'The Unstoppable Hero', 'description': 'Maintain a 100-day delivery streak', 'icon': 'Zap', 'category': 'STREAK MILESTONES', 'required_value': 100},

        # --- NGO MILESTONES (Image 2) ---
        # Category: FOOD RESCUE MILESTONES
        {'name': 'Rescue Rookie', 'description': 'Save 100kg of food from wastage', 'icon': 'Package', 'category': 'FOOD RESCUE MILESTONES', 'required_value': 100},
        {'name': 'Zero Waste Pro', 'description': 'Save 500kg of food from wastage', 'icon': 'Shield', 'category': 'FOOD RESCUE MILESTONES', 'required_value': 500},
        {'name': 'Impact Engine', 'description': 'Save 1,000kg of food from wastage', 'icon': 'Zap', 'category': 'FOOD RESCUE MILESTONES', 'required_value': 1000},
        {'name': 'Sustainability Star', 'description': 'Save 5,000kg of food from wastage', 'icon': 'Globe', 'category': 'FOOD RESCUE MILESTONES', 'required_value': 5000},
        {'name': 'Hunger Warrior', 'description': 'Save 10,000kg of food from wastage', 'icon': 'Trophy', 'category': 'FOOD RESCUE MILESTONES', 'required_value': 10000},
        {'name': 'Ecosystem Giant', 'description': 'Save 50,000kg of food from wastage', 'icon': 'Crown', 'category': 'FOOD RESCUE MILESTONES', 'required_value': 50000},
        
        # Category: POINT MILESTONES (NGO)
        {'name': 'Credit Starter', 'description': 'Earn 5,000 impact points', 'icon': 'Star', 'category': 'POINT MILESTONES', 'required_value': 5000},
        {'name': 'Resource Master', 'description': 'Earn 25,000 impact points', 'icon': 'Target', 'category': 'POINT MILESTONES', 'required_value': 25000},
        {'name': 'NGO Elite', 'description': 'Earn 100,000 impact points', 'icon': 'Diamond', 'category': 'POINT MILESTONES', 'required_value': 100000},
        
        # Category: STREAK MILESTONES (NGO)
        {'name': 'Rescue Streak', 'description': 'Maintain a 7-day food rescue streak', 'icon': 'Zap', 'category': 'STREAK MILESTONES', 'required_value': 7},
        {'name': 'Reliability Master', 'description': 'Maintain a 30-day food rescue streak', 'icon': 'Target', 'category': 'STREAK MILESTONES', 'required_value': 30},
        {'name': 'Operational Excellence', 'description': 'Maintain a 100-day food rescue streak', 'icon': 'Zap', 'category': 'STREAK MILESTONES', 'required_value': 100},

        # --- DONOR MILESTONES (Image 3) ---
        # Category: DONATION MILESTONES
        {'name': 'First Spark', 'description': 'Make your very first donation', 'icon': 'Zap', 'category': 'DONATION MILESTONES', 'required_value': 1},
        {'name': 'Helping Hand', 'description': 'Completed 10 total donations', 'icon': 'Users', 'category': 'DONATION MILESTONES', 'required_value': 10},
        {'name': 'Kind Soul', 'description': 'Completed 50 total donations', 'icon': 'Heart', 'category': 'DONATION MILESTONES', 'required_value': 50},
        {'name': 'Generous Heart', 'description': 'Completed 100 total donations', 'icon': 'Target', 'category': 'DONATION MILESTONES', 'required_value': 100},
        {'name': 'Community Pillar', 'description': 'Donate 1,000 times to the ecosystem', 'icon': 'Trophy', 'category': 'DONATION MILESTONES', 'required_value': 1000},
        
        # Category: POINT MILESTONES (Donor)
        {'name': 'Impact Starter', 'description': 'Earn 1,000 impact points', 'icon': 'Zap', 'category': 'POINT MILESTONES', 'required_value': 1000},
        {'name': 'Point Master', 'description': 'Earn 10,000 impact points', 'icon': 'Trophy', 'category': 'POINT MILESTONES', 'required_value': 10000},
        {'name': 'Global Impact', 'description': 'Reach 50,000 total impact points', 'icon': 'Globe', 'category': 'POINT MILESTONES', 'required_value': 50000},
        {'name': 'Elite Patron', 'description': 'Rank in the top tier of donors', 'icon': 'Crown', 'category': 'POINT MILESTONES', 'required_value': 1},
        
        # Category: STREAK MILESTONES (Donor)
        {'name': 'Consistency King', 'description': '7-day consistent donation streak', 'icon': 'Zap', 'category': 'STREAK MILESTONES', 'required_value': 7},
        {'name': 'Streak Sensation', 'description': '30-day consistent donation streak', 'icon': 'Target', 'category': 'STREAK MILESTONES', 'required_value': 30},
        {'name': 'Unstoppable', 'description': '100-day consistent donation streak', 'icon': 'Zap', 'category': 'STREAK MILESTONES', 'required_value': 100},
        
        # Category: COMMUNITY & OTHERS
        {'name': 'Local Guardian', 'description': 'Support 5 different local NGOs', 'icon': 'Shield', 'category': 'COMMUNITY & OTHERS', 'required_value': 5},
        {'name': 'Community Glue', 'description': 'Refer 10 new donors', 'icon': 'Users', 'category': 'COMMUNITY & OTHERS', 'required_value': 10},
    ]
    
    for b in badges:
        Badge.objects.create(**b)

    print("Successfully seeded all badges with CORRECT categories and NO fixed points!")

if __name__ == '__main__':
    seed_badges_correctly()
