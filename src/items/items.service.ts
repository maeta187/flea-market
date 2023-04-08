import { Injectable } from '@nestjs/common'
import { Item } from './item.model'

@Injectable()
export class ItemsService {
  private items: Item[] = []

  findAll() {
    return 'This is findAll'
  }

  create(item: Item): Item {
    this.items = { ...this.items, ...item }
    return item
  }
}
