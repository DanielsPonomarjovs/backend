import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
import { CategoryDto } from './category.dto'
import { returnCategoryObject } from './return-category.object'
import { faker } from '@faker-js/faker'
@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number) {
		const category = await this.prisma.category.findUnique({
			where: {
				id
			},
			select: returnCategoryObject
		})

		if (!category) {
			throw new NotFoundException('Category not found')
		}

		return category
	}

	async bySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				slug
			},
			select: returnCategoryObject
		})

		if (!category) {
			throw new NotFoundException('Category not found')
		}

		return category
	}

	async getAll() {
		return this.prisma.category.findMany({
			select: returnCategoryObject
		})
	}

	async create() {
		try {
			const categoryName = faker.person.fullName()

			const createCategory = await this.prisma.category.create({
				data: {
					name: categoryName,
					slug: categoryName
				}
			})
			return createCategory.id
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				// The .code property can be accessed in a type-safe manner
				if (e.code === 'P2002') {
					console.log(
						'There is a unique constraint violation, a new user cannot be created with this email'
					)
				}
			}
			throw e
		}
	}

	async update(id: number, dto: CategoryDto) {
		return this.prisma.category.update({
			where: {
				id
			},
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			}
		})
	}

	async delete(id: number) {
		return this.prisma.category.delete({
			where: {
				id
			}
		})
	}
}
