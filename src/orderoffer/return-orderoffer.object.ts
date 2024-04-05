import { Prisma } from '@prisma/client'
import { returnUserObject } from 'src/user/return-user.object'

export const returnOrderOfferObject:Prisma.OrderOfferSelect = {
	user: {
		select: returnUserObject
	},
	createdAt: true,
	text: true,
	id: true
}