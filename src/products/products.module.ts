import { Module } from '@nestjs/common'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { ProductController } from './products.controller'
import { ProductService } from './products.service'
import { CategoryModule } from 'src/category/category.module'
import { PaginationModule } from 'src/pagination/pagination.module'

@Module({
	controllers: [ProductController],
	imports: [PaginationModule, CategoryModule],
	providers: [ProductService, PrismaService, PaginationService]
})
export class ProductsModule {}
