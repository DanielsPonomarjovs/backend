import { Body, Controller, Get, HttpCode, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './review.dto'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorators'

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  @Auth('admin')
  async getAll() {
    return this.reviewService.getAll()
  } 

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('leave/:productId')
  @Auth()
  async leaveReview(
    @CurrentUser('id') id: number,
    @Body() dto: ReviewDto,
    @Param('productId') productId: string
  )
  {
    return this.reviewService.create(id, dto, +productId)
  }

  @Get('average-by-product/:productId')
  async getAverageByProduct( @Param('productId')
  productId: string) {
    return this.reviewService.getAverageValueProductId(+productId)
  }
  


}
