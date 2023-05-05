import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  price: number

  @Column()
  description: string

  @Column()
  status: 'ON_SALE' | 'SOLD_OUT'

  @Column()
  createdAt: string

  @Column()
  updatedAt: string

  @ManyToOne(() => User, (user) => user.items)
  user: User

  @Column()
  userId: string
}
