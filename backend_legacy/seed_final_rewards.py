import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Reward

def seed_rewards():
    # 1. CLEAN UP: Clear existing rewards to prevent duplication and ensure standardized categories
    Reward.objects.all().delete()
    print("Old rewards cleared.")

    # 2. DEFINITIONS
    roles = ['NGO', 'DONOR', 'VOLUNTEER']
    
    # Points multiplier per role to reflect different earning capabilities
    # NGO earns more points but rewards cost more
    role_pts = {
        'NGO': 2.5,
        'DONOR': 5.0,
        'VOLUNTEER': 1.0
    }

    # CATEGORY: Mega Cash Rewards
    cash_data = [
        {'name': 'Mini Cash', 'amount': '₹10,000', 'pts': 20000},
        {'name': 'Super Grant', 'amount': '₹25,000', 'pts': 45000},
        {'name': 'Mega Fund', 'amount': '₹50,000', 'pts': 85000},
        {'name': 'Grand Prize', 'amount': '₹1,00,000', 'pts': 150000},
    ]

    # CATEGORY: Global Travels
    travel_data = [
        {'name': 'Bali Trip', 'desc': '5 Days tropical vacation', 'pts': 250000},
        {'name': 'Swiss Tour', 'desc': '7 Days luxury alpine stay', 'pts': 450000},
        {'name': 'Japan Visit', 'desc': '6 Days tech & culture tour', 'pts': 350000},
        {'name': 'Greece Cruise', 'desc': '4 Days Mediterranean cruise', 'pts': 300000},
    ]

    # CATEGORY: Luxury Tech
    tech_data = [
        {'name': 'MacBook Pro', 'desc': 'M4 Performance Workstation', 'pts': 120000},
        {'name': 'iPhone 16', 'desc': 'Apple Flagship Smartphone', 'pts': 95000},
        {'name': 'Vision Pro', 'desc': 'Mixed Reality Experience', 'pts': 180000},
        {'name': '8K Smart TV', 'desc': 'Ultra HD Cinema Experience', 'pts': 220000},
    ]

    for role in roles:
        multiplier = role_pts[role]
        
        # Determine category mapping
        if role in ['NGO', 'VOLUNTEER']:
            db_cat_cash = 'cash'
            db_cat_travel = 'grants'
            db_cat_tech = 'social'
        else:
            db_cat_cash = 'cash'
            db_cat_travel = 'tours'
            db_cat_tech = 'youth'

        # Add Cash
        for item in cash_data:
            Reward.objects.create(
                role=role,
                name=item['name'],
                amount=item['amount'],
                points_required=int(item['pts'] * multiplier),
                category=db_cat_cash,
                description=f"Direct {item['name']} payout.",
                available=True
            )
        
        # Add Travel
        for item in travel_data:
            Reward.objects.create(
                role=role,
                name=item['name'],
                points_required=int(item['pts'] * multiplier),
                category=db_cat_travel,
                description=item['desc'],
                available=True
            )
            
        # Add Tech
        for item in tech_data:
            Reward.objects.create(
                role=role,
                name=item['name'],
                points_required=int(item['pts'] * multiplier),
                category=db_cat_tech,
                description=item['desc'],
                available=True
            )

    print(f"Successfully seeded {Reward.objects.count()} premium rewards across all roles.")

if __name__ == '__main__':
    seed_rewards()
