import { Controller, Get, HttpStatus, Res } from '@nestjs/common'
import { HealthService } from './health.service'
import { Response } from 'express'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('health')
@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/health')
  @ApiOkResponse({ description: 'Get health check', type: 'Ok'})
  healthCheck(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.healthService.sendOk())
  }
}
