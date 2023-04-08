import { Controller, Get, Post, Body } from '@nestjs/common'
import { Item } from './item.model'
import { ItemsService } from './items.service'

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  findAll() {
    return this.itemsService.findAll()
  }

  @Post()
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string
  ): Item {
    const item: Item = {
      id,
      name,
      price,
      description,
      status: 'ON_SALE'
    }
    return this.itemsService.create(item)
  }
}
