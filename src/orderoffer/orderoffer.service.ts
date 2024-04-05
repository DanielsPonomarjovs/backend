import { OrderOffer } from './../../node_modules/.prisma/client/index.d';
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { OrderOfferDto } from './orderoffer.dto'
import { returnOrderOfferObject } from './return-orderoffer.object'

@Injectable()
export class OrderOfferService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.orderOffer.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			select: returnOrderOfferObject
		})
	}

	async create(userId: number, dto: OrderOfferDto) {
		return this.prisma.orderOffer.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}
}
