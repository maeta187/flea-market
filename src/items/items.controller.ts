import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseUUIDPipe
} from '@nestjs/common'
import { Item } from '../entities/item.entity'
import { ItemsService } from './items.service'
import { CreateItemDto } from './dto/create-item.dto'

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll()
  }

  @Get(':id') // items/[id]
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.findById(id)
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(createItemDto)
  }

  @Patch(':id')
  async updateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.updateStatus(id)
  }

  @Delete(':id')
  async deleteItem(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.itemsService.deleteItem(id)
  }
}
