import { Item } from 'src/entities/item.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateItemDto } from './dto/create-item.dto'

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async createItem(CreateItemDto: CreateItemDto): Promise<Item> {
    const { name, price, description } = CreateItemDto
    const item = this.create({
      name,
      price,
      description,
      status: 'ON_SALE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    await this.save(item)

    return item
  }

  async updateStatus(item: Item): Promise<Item> {
    return await this.save(item)
  }

}
