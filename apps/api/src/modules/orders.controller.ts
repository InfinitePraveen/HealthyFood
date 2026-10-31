import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';

type Order = {
  id: string;
  customerReference: string;
  itemIds: string[];
  status: string;
  totalCents: number;
  warningAcknowledged: boolean;
  createdAt: string;
};

const orders = new Map<string, Order>();

@Controller('v1/orders')
export class OrdersController {
  @Post()
  create(@Body() body: { customerReference?: string; itemIds?: string[]; totalCents?: number }) {
    if (!body.customerReference || !Array.isArray(body.itemIds) || body.itemIds.length === 0) {
      return { error: 'customerReference and at least one itemId are required' };
    }
    if (!Number.isInteger(body.totalCents) || (body.totalCents ?? -1) < 0) {
      return { error: 'totalCents must be a non-negative integer' };
    }
    const order: Order = {
      id: randomUUID(),
      customerReference: body.customerReference,
      itemIds: body.itemIds,
      status: 'placed',
      totalCents: body.totalCents!,
      warningAcknowledged: false,
      createdAt: new Date().toISOString()
    };
    orders.set(order.id, order);
    return { order, mode: 'synthetic_pilot' };
  }

  @Get(':id')
  get(@Param('id') id: string) {
    const order = orders.get(id);
    if (!order) throw new NotFoundException('Order not found');
    return { order };
  }

  @Post(':id/acknowledge-warnings')
  acknowledge(@Param('id') id: string, @Body() body: { acknowledgementText?: string }) {
    const order = orders.get(id);
    if (!order) throw new NotFoundException('Order not found');
    if (!body.acknowledgementText?.trim()) return { error: 'acknowledgementText is required' };
    order.warningAcknowledged = true;
    return { orderId: id, acknowledged: true, recordedAt: new Date().toISOString() };
  }
}
