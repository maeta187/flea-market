import { Item } from 'src/entities/item.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateItemDto } from './dto/create-item.dto'
import { User } from 'src/entities/user.entity'

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async createItem(CreateItemDto: CreateItemDto, user: User): Promise<Item> {
    const { name, price, description } = CreateItemDto
    const item = this.create({
      name,
      price,
      description,
      status: 'ON_SALE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user
    })

    await this.save(item)

    return item
  }

  async updateStatus(item: Item): Promise<Item> {
    return await this.save(item)
  }

  async deleteItem(id: string): Promise<void> {
    await this.delete(id)
  }
}
