import { Test } from '@nestjs/testing'
import { ItemsService } from './items.service'
import { ItemRepository } from './items.repository'
import { BadRequestException, NotFoundException } from '@nestjs/common'

const mockItemRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  createItem: jest.fn(),
  updateStatus: jest.fn(),
  deleteItem: jest.fn()
})

const mockUser1 = {
  id: 1,
  username: 'test1',
  password: '1234',
  status: 'PREMIUM'
}

const mockUser2 = {
  id: 2,
  username: 'test2',
  password: '1234',
  status: 'FREE'
}

describe('ItemServiceTest', () => {
  let itemsService
  let itemRepository
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: ItemRepository,
          useFactory: mockItemRepository
        }
      ]
    }).compile()

    itemsService = module.get<ItemsService>(ItemsService)
    itemRepository = module.get<ItemRepository>(ItemRepository)
  })

  describe('findAll', () => {
    it('正常系', async () => {
      const expected = []
      itemRepository.find.mockResolvedValue(expected)
      const result = await itemsService.findAll()

      expect(result).toEqual(expected)
    })
  })

  describe('findById', () => {
    it('正常系', async () => {
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 50000,
        describe: '',
        status: 'ON_SALE',
        createdAt: '',
        updatedAt: '',
        userId: mockUser1.id,
        user: mockUser1
      }

      itemRepository.findOne.mockResolvedValue(expected)
      const result = await itemsService.findById('test-id')

      expect(result).toEqual(expected)
    })

    it('異常系: 商品が存在しない', async () => {
      itemRepository.find.mockResolvedValue(null)
      await expect(itemsService.findById('test-id')).rejects.toThrow(
        NotFoundException
      )
    })
  })

  describe('create', () => {
    it('正常系', async () => {
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 50000,
        describe: '',
        status: 'ON_SALE',
        createdAt: '',
        updatedAt: '',
        userId: mockUser1.id,
        user: mockUser1
      }

      itemRepository.createItem.mockResolvedValue(expected)
      const result = await itemsService.create(
        {
          name: 'PC',
          price: 50000,
          describe: ''
        },
        mockUser1
      )

      expect(result).toEqual(expected)
    })
  })

  describe('updateStatus', () => {
    const mockItem = {
      id: 'test-id',
      name: 'PC',
      price: 50000,
      describe: '',
      status: 'ON_SALE',
      createdAt: '',
      updatedAt: '',
      userId: mockUser1.id,
      user: mockUser1
    }

    it('正常系', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem)
      await itemsService.updateStatus('test-id', mockUser2)
      expect(itemRepository.updateStatus).toHaveBeenCalled()
    })

    it('異常系: 自身の商品購入', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem)
      await expect(
        itemsService.updateStatus('test-id', mockUser1)
      ).rejects.toThrow(BadRequestException)
    })
  })

  describe('deleteItem', () => {
    const mockItem = {
      id: 'test-id',
      name: 'PC',
      price: 50000,
      describe: '',
      status: 'ON_SALE',
      createdAt: '',
      updatedAt: '',
      userId: mockUser1.id,
      user: mockUser1
    }

    it('正常系', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem)
      await itemsService.deleteItem('test-id', mockUser1)
      expect(itemRepository.deleteItem).toHaveBeenCalled()
    })

    it('異常系: 他人を商品を削除', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem)
      await expect(
        itemsService.deleteItem('test-id', mockUser2)
      ).rejects.toThrow(BadRequestException)
    })
  })
})
