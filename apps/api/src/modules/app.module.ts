import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { MenuController } from './menu.controller';
import { OrdersController } from './orders.controller';
import { ClinicalController } from './clinical.controller';

@Module({ controllers: [HealthController, MenuController, OrdersController, ClinicalController] })
export class AppModule {}
