import { Prisma } from '@prisma/client'
import { returnCategoryObject } from 'src/category/return-category.object'
import { returnReviewObject } from 'src/review/return-review.object'

export const productReturnObject: Prisma.ProductSelect = {
	images: true,
	description: true,
	id: true,
	name: true,
	price: true,
	model: true,
	distancekm: true,
	engine: true,
	gas: true,
	gear: true,
	keys: true,
	origin: true,
	color:true,
	createdAt: true,
	slug: true,
	category: { select: returnCategoryObject },
	reviews: {
		select: returnReviewObject
	}
}

export const productReturnObjectFullest: Prisma.ProductSelect = {
	...productReturnObject,
}
