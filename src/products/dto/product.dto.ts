import { Prisma } from '@prisma/client'
import { ArrayMinSize, IsNumber, IsOptional, IsString, isString } from 'class-validator'

export class ProductDto implements Prisma.ProductUpdateInput {
	@IsString()
	name: string

	@IsNumber()
	price: number

	@IsOptional()
	@IsString()
	description: string

	@IsOptional()
	@IsString()
	model: string

	@IsOptional()
	@IsString()
	distancekm: string

	@IsOptional()
	@IsString()
	engine: string

	@IsOptional()
	@IsString()
	gas: string

	@IsOptional()
	@IsString()
	gear: string

	@IsOptional()
	@IsString()
	keys: string

	@IsOptional()
	@IsString()
	origin: string

	@IsOptional()
	@IsString()
	color: string

	@IsString({ each: true })
	@ArrayMinSize(1)
	images: string[]

	@IsNumber()
	categoryId: number
}
