import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorators'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { OrderOfferService } from './orderoffer.service'
import { OrderOfferDto } from './orderoffer.dto'

@Controller('orderoffer')
export class OrderOfferController {
	constructor(private readonly orderOfferService: OrderOfferService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll() {
		return this.orderOfferService.getAll()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('leave/:id')
	@Auth()
	async create(
		@CurrentUser('id') id: number,
		@Body() dto: OrderOfferDto)
	 {
		return this.orderOfferService.create(id, dto)
	}
}
