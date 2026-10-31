import { Controller, Get, Query } from '@nestjs/common';

const MENU = [
  {
    id: 'meal-001',
    name: 'Herbed Chicken & Brown Rice Bowl',
    description: 'Roasted chicken, brown rice, carrots and herbs.',
    allergens: [],
    nutritionPerServing: { caloriesKcal: 480, proteinG: 38, carbohydratesG: 48, fatG: 14, sodiumMg: 420 },
    status: 'sample',
    notice: 'Illustrative nutrition data. Not clinically verified.'
  },
  {
    id: 'meal-002',
    name: 'Chickpea Vegetable Bowl',
    description: 'Chickpeas, seasonal vegetables and lemon dressing.',
    allergens: ['sesame'],
    nutritionPerServing: { caloriesKcal: 410, proteinG: 16, carbohydratesG: 62, fatG: 11, sodiumMg: 360 },
    status: 'sample',
    notice: 'Illustrative nutrition data. Not clinically verified.'
  }
];

@Controller('v1/menu')
export class MenuController {
  @Get()
  list(@Query('q') q?: string) {
    const items = q ? MENU.filter(item => item.name.toLowerCase().includes(q.toLowerCase())) : MENU;
    return { items, clinicalFiltering: 'disabled_until_approved_plan_and_validated_rules' };
  }
}
