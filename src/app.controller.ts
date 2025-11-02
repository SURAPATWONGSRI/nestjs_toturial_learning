import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiResponse, createSuccessResponse } from './common/dto/api-response.dto'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @HttpCode(HttpStatus.OK)
  getHello(): ApiResponse {
    const message = this.appService.getHello()
    return createSuccessResponse({ message }, '')
  }

  @Get('health')
  @HttpCode(HttpStatus.OK)
  checkHealth(): ApiResponse {
    return createSuccessResponse({ status: 'ok' }, 'Service is healthy')
  }
}
