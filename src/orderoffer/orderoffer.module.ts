import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { OrderOfferController } from './orderoffer.controller'
import { OrderOfferService } from './orderoffer.service'

@Module({
	controllers: [OrderOfferController],
	providers: [OrderOfferService, PrismaService]
})
export class OrderOfferModule {}
