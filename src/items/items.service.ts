import { Injectable } from '@nestjs/common'
import { Item } from './item.model'

@Injectable()
export class ItemsService {
  private items: Item[] = []

  findAll(): Item[] {
    return this.items
  }

  findById(id: string): Item {
    return this.items.find((item) => item.id === id)
  }

  create(item: Item): Item {
    this.items = [...this.items, item]
    return item
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
