import { Injectable } from '@nestjs/common'
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

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto)
  }

  updateStatus(id: string): Item {
    const item = this.findById(id)
    item.status = 'SOLD_OUT'
    return item
  }

  delete(id: string): void {
    this.items = this.items.filter((item) => item.id !== id)
  }
}
