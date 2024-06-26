import * as dotenv from 'dotenv'
import { PrismaClient, Product } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { generateSlug } from 'src/utils/generate-slug'

dotenv.config();
const prisma = new PrismaClient({
  errorFormat: 'pretty',
})

const createProducts = async (quantity: number) =>
{
	const products: Product[] = []

	for(let i = 0; i < quantity; i++)
	{
		const productName = faker.animal.crocodilia()
		const categoryName = faker.commerce.department()

		const product = await prisma.product.create({
			data: {
				name: productName,
				slug: faker.helpers.slugify(productName).toLowerCase(),
				description: faker.commerce.productDescription(),
				
				price: +faker.commerce.price({ min: 10, max: 999, dec: 0}),
				images: Array.from({ length: faker.number.int( { min: 1, max: 5}) }).map(() => 
				faker.image.url({ width: 500, height: 500}),
				),

				model: faker.commerce.productMaterial(),
				distancekm: "150000",
				engine: "2.0",
				gas: "Diesel",
				gear: "AKKP",
				keys: "Yes",
				origin: "Korea",
				color: faker.color.rgb(),

				category: {
					create: {
						name: categoryName,
						slug: faker.helpers.slugify(categoryName).toLowerCase()
					}
				},

				reviews: {
					create: [
						{
							rating: faker.number.int({ min: 1, max: 5 }),
							text: faker.lorem.paragraph(),
							user: {
								connect: {
									id: 1
								}
							}
						},
						{
							rating: faker.number.int( { min: 1, max: 5}),
							text: faker.lorem.paragraph(),
							user: {
								connect: {
									id: 1
								}
							}
						}
					] 
				}

			}
		})
		products.push(product)
	}
	console.log('Created ${products.length} products')
}

async function main()
{
	console.log('Start seeding')
	await createProducts(10)
}

main()
	.catch(e => console.log(e))
	.finally(async () => {
		await prisma.$disconnect()
	})