import { Module } from '@nestjs/common'
import { ItemsController } from './items.controller'
import { ItemsService } from './items.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ItemRepository } from './items.repository'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository]), AuthModule],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}
