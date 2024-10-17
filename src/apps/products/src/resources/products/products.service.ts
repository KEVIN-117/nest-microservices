import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ProductsService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }
  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const total = await this.product.count();

    const meta = {
      total,
      page,
      last_page: Math.ceil(total / limit),
      items: limit,
    };
    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          name: 'desc',
        },
      }),
      meta,
    };
  }

  findOne(id: string) {
    return this.product.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.product.update({
      where: {
        id: id,
      },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.product.delete({
      where: {
        id: id,
      },
    });
  }
}
