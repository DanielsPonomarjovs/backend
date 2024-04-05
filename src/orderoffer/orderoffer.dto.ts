import { IsNumber, IsString, Max, Min } from 'class-validator';
export class OrderOfferDto {
	@IsString()
	text: string
}
