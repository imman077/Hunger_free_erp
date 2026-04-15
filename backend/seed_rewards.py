import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Reward, RewardTier, Badge

def seed_rewards():
    # 1. Seed Reward Tiers (Same as before)
    tiers = [
        {'role': 'DONOR', 'name': 'Bronze', 'min_points': 0, 'icon': '🥉'},
        {'role': 'DONOR', 'name': 'Silver', 'min_points': 5000, 'icon': '🥈'},
        {'role': 'DONOR', 'name': 'Gold', 'min_points': 15000, 'icon': '🥇'},
        {'role': 'DONOR', 'name': 'Platinum', 'min_points': 50000, 'icon': '💎'},
        {'role': 'NGO', 'name': 'Partner', 'min_points': 0, 'icon': '🤝'},
        {'role': 'NGO', 'name': 'Premium', 'min_points': 10000, 'icon': '🌟'},
        {'role': 'NGO', 'name': 'Legend', 'min_points': 30000, 'icon': '👑'},
        {'role': 'VOLUNTEER', 'name': 'Rookie', 'min_points': 0, 'icon': '🌱'},
        {'role': 'VOLUNTEER', 'name': 'Pro', 'min_points': 5000, 'icon': '⚡'},
        {'role': 'VOLUNTEER', 'name': 'Master', 'min_points': 15000, 'icon': '🏆'},
    ]
    
    for t in tiers:
        RewardTier.objects.update_or_create(role=t['role'], name=t['name'], defaults=t)
    
    # 2. Seed Rewards from Frontend Mocks
    rewards_data = [
        # --- NGO Rewards: [Quick Money] (Category: cash) ---
        {
            'name': 'Operational Cash', 'amount': '₹5,000', 'category': 'cash', 
            'points_required': 1200, 'role': 'NGO', 'available': True,
            'description': 'Immediate impact funding for local operations.'
        },
        {
            'name': 'Emerging Fund', 'amount': '₹15,000', 'category': 'cash', 
            'points_required': 3500, 'role': 'NGO', 'available': True,
            'description': 'Support for growing social initiatives.'
        },
        {
            'name': 'Growth Capital', 'amount': '₹25,000', 'category': 'cash', 
            'points_required': 6000, 'role': 'NGO', 'available': False,
            'description': 'Strategic capital for expanding your reach.'
        },
        
        # --- NGO Rewards: [Big Funds] (Category: grants) ---
        {
            'name': 'Scale-Up Grant', 'amount': '₹50,000', 'category': 'grants', 
            'points_required': 12000, 'role': 'NGO', 'available': True,
            'description': 'Formal grant for large scale food rescue.'
        },
        {
            'name': 'National Impact', 'amount': '₹1,50,000', 'category': 'grants', 
            'points_required': 35000, 'role': 'NGO', 'available': True,
            'description': 'Major funding for nationwide distribution.'
        },

        # --- NGO Rewards: [Aid & Tools] (Category: social) ---
        {
            'name': 'Cold Storage Unit', 'category': 'social', 
            'points_required': 15000, 'role': 'NGO', 'available': True,
            'details': [
                {'group': 'Impact', 'text': 'Prevents 500kg/mo waste'},
                {'group': 'Hardware', 'text': 'Industrial 200L Capacity'}
            ]
        },
        {
            'name': 'Digital ERP License', 'category': 'social', 
            'points_required': 5000, 'role': 'NGO', 'available': True,
            'details': [
                {'group': 'Digital', 'text': 'Lifetime Admin Access'},
                {'group': 'Training', 'text': 'Full Team Onboarding'}
            ]
        },
        {
            'name': 'Smart Scales', 'category': 'social', 
            'points_required': 2500, 'role': 'NGO', 'available': False,
            'details': [
                {'group': 'Logistics', 'text': 'IoT Enabled Tracking'},
                {'group': 'Accuracy', 'text': '0.01kg precision level'}
            ]
        },

        # --- Donor Rewards ---
        {'name': 'Quick Cash ₹1,000', 'category': 'cash', 'points_required': 600, 'role': 'DONOR', 'available': True},
        {'name': 'Goa Beach Trip', 'category': 'tours', 'points_required': 8000, 'role': 'DONOR', 'available': True},

        # --- Volunteer Rewards ---
        {'name': 'Fuel Voucher ₹500', 'category': 'grants', 'points_required': 1000, 'role': 'VOLUNTEER', 'available': True},
        {'name': 'Monthly Bonus ₹5,000', 'category': 'mega', 'points_required': 15000, 'role': 'VOLUNTEER', 'available': True},
    ]
    
    for r in rewards_data:
        Reward.objects.update_or_create(name=r['name'], defaults=r)

    # 3. Seed Badges (Milestones from UI Screenshots)
    badges = [
        # --- Volunteer Milestones (Image 1) ---
        {'name': 'Swift Start', 'description': 'Complete 10 successful deliveries', 'icon': 'Zap', 'category': 'volunteers', 'required_value': 10, 'reward_points': 100},
        {'name': 'Path Finder', 'description': 'Complete 50 successful deliveries', 'icon': 'Target', 'category': 'volunteers', 'required_value': 50, 'reward_points': 500},
        {'name': 'Food Hero', 'description': 'Achieve 100 successful deliveries', 'icon': 'Shield', 'category': 'volunteers', 'required_value': 100, 'reward_points': 1000},
        {'name': 'Street Legend', 'description': 'Complete 250 successful deliveries', 'icon': 'Zap', 'category': 'volunteers', 'required_value': 250, 'reward_points': 2500},
        {'name': 'Community Savior', 'description': 'Complete 500 successful deliveries', 'icon': 'Trophy', 'category': 'volunteers', 'required_value': 500, 'reward_points': 5000},
        {'name': 'Guardian Angel', 'description': 'Complete 1,000 successful deliveries', 'icon': 'Heart', 'category': 'volunteers', 'required_value': 1000, 'reward_points': 10000},
        {'name': 'Hunger Destroyer', 'description': 'Complete 5,000 successful deliveries', 'icon': 'Crown', 'category': 'volunteers', 'required_value': 5000, 'reward_points': 50000},
        
        {'name': 'Service Spark', 'description': 'Earn 2,000 impact points', 'icon': 'Star', 'category': 'volunteers', 'required_value': 2000, 'reward_points': 0},
        {'name': 'Elite Guardian', 'description': 'Earn 10,000 impact points', 'icon': 'ShieldCheck', 'category': 'volunteers', 'required_value': 10000, 'reward_points': 0},
        
        {'name': 'Reliable Heart', 'description': 'Maintain a 14-day delivery streak', 'icon': 'Heart', 'category': 'volunteers', 'required_value': 14, 'reward_points': 200},
        {'name': 'Commitment Pillar', 'description': 'Maintain a 30-day delivery streak', 'icon': 'Shield', 'category': 'volunteers', 'required_value': 30, 'reward_points': 500},
        {'name': 'The Unstoppable Hero', 'description': 'Maintain a 100-day delivery streak', 'icon': 'Zap', 'category': 'volunteers', 'required_value': 100, 'reward_points': 2000},

        # --- NGO Milestones (Image 2) ---
        {'name': 'Rescue Rookie', 'description': 'Save 100kg of food from wastage', 'icon': 'Package', 'category': 'logistics', 'required_value': 100, 'reward_points': 200},
        {'name': 'Zero Waste Pro', 'description': 'Save 500kg of food from wastage', 'icon': 'Shield', 'category': 'logistics', 'required_value': 500, 'reward_points': 1000},
        {'name': 'Impact Engine', 'description': 'Save 1,000kg of food from wastage', 'icon': 'Zap', 'category': 'logistics', 'required_value': 1000, 'reward_points': 2000},
        {'name': 'Sustainability Star', 'description': 'Save 5,000kg of food from wastage', 'icon': 'Globe', 'category': 'logistics', 'required_value': 5000, 'reward_points': 5000},
        {'name': 'Hunger Warrior', 'description': 'Save 10,000kg of food from wastage', 'icon': 'Trophy', 'category': 'logistics', 'required_value': 10000, 'reward_points': 10000},
        {'name': 'Ecosystem Giant', 'description': 'Save 50,000kg of food from wastage', 'icon': 'Crown', 'category': 'logistics', 'required_value': 50000, 'reward_points': 50000},
        
        {'name': 'Credit Starter', 'description': 'Earn 5,000 impact points', 'icon': 'Star', 'category': 'impact', 'required_value': 5000, 'reward_points': 0},
        {'name': 'Resource Master', 'description': 'Earn 25,000 impact points', 'icon': 'Target', 'category': 'impact', 'required_value': 25000, 'reward_points': 0},
        {'name': 'NGO Elite', 'description': 'Earn 100,000 impact points', 'icon': 'Diamond', 'category': 'impact', 'required_value': 100000, 'reward_points': 0},
        
        {'name': 'Rescue Streak', 'description': 'Maintain a 7-day food rescue streak', 'icon': 'Zap', 'category': 'impact', 'required_value': 7, 'reward_points': 200},
        {'name': 'Reliability Master', 'description': 'Maintain a 30-day food rescue streak', 'icon': 'Target', 'category': 'impact', 'required_value': 30, 'reward_points': 1000},
        {'name': 'Operational Excellence', 'description': 'Maintain a 100-day food rescue streak', 'icon': 'Zap', 'category': 'impact', 'required_value': 100, 'reward_points': 5000},

        # --- Donor Milestones (Image 3) ---
        {'name': 'First Spark', 'description': 'Make your very first donation', 'icon': 'Zap', 'category': 'donations', 'required_value': 1, 'reward_points': 200},
        {'name': 'Helping Hand', 'description': 'Completed 10 total donations', 'icon': 'Users', 'category': 'donations', 'required_value': 10, 'reward_points': 500},
        {'name': 'Kind Soul', 'description': 'Completed 50 total donations', 'icon': 'Heart', 'category': 'donations', 'required_value': 50, 'reward_points': 1000},
        {'name': 'Generous Heart', 'description': 'Completed 100 total donations', 'icon': 'Target', 'category': 'donations', 'required_value': 100, 'reward_points': 2000},
        {'name': 'Community Pillar', 'description': 'Donate 1,000 times to the ecosystem', 'icon': 'Trophy', 'category': 'donations', 'required_value': 1000, 'reward_points': 10000},
        
        {'name': 'Impact Starter', 'description': 'Earn 1,000 impact points', 'icon': 'Zap', 'category': 'donations', 'required_value': 1000, 'reward_points': 0},
        {'name': 'Point Master', 'description': 'Earn 10,000 impact points', 'icon': 'Trophy', 'category': 'donations', 'required_value': 10000, 'reward_points': 0},
        {'name': 'Global Impact', 'description': 'Reach 50,000 total impact points', 'icon': 'Globe', 'category': 'donations', 'required_value': 50000, 'reward_points': 0},
        {'name': 'Elite Patron', 'description': 'Rank in the top tier of donors', 'icon': 'Crown', 'category': 'donations', 'required_value': 1, 'reward_points': 5000},
        
        {'name': 'Consistency King', 'description': '7-day consistent donation streak', 'icon': 'Zap', 'category': 'donations', 'required_value': 7, 'reward_points': 200},
        {'name': 'Streak Sensation', 'description': '30-day consistent donation streak', 'icon': 'Target', 'category': 'donations', 'required_value': 30, 'reward_points': 1000},
        {'name': 'Unstoppable', 'description': '100-day consistent donation streak', 'icon': 'Zap', 'category': 'donations', 'required_value': 100, 'reward_points': 5000},
        
        {'name': 'Local Guardian', 'description': 'Support 5 different local NGOs', 'icon': 'Shield', 'category': 'donations', 'required_value': 5, 'reward_points': 1000},
        {'name': 'Community Glue', 'description': 'Refer 10 new donors', 'icon': 'Users', 'category': 'donations', 'required_value': 10, 'reward_points': 2000},
    ]
    
    for b in badges:
        Badge.objects.update_or_create(name=b['name'], defaults=b)

    print("Successfully seeded ALL milestones from UI screenshots!")

if __name__ == '__main__':
    seed_rewards()
