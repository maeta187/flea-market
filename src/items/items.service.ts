import { Injectable, NotFoundException } from '@nestjs/common'
import { Item } from '../entities/item.entity'
import { CreateItemDto } from './dto/create-item.dto'
import { ItemRepository } from './items.repository'

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}
  private items: Item[] = []

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find()
  }

  async findById(id: string): Promise<Item> {
    const found = await this.itemRepository.findOne(id)
    if (!found) {
      throw new NotFoundException()
    }
    return found
  }

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto, user)
  }

  async updateStatus(id: string): Promise<Item> {
    const item = await this.findById(id)
    item.status = 'SOLD_OUT'
    item.updatedAt = new Date().toISOString()
    return await this.itemRepository.updateStatus(item)
  }

  async deleteItem(id: string): Promise<void> {
    await this.itemRepository.delete(id)
  }
}
