import { Controller, Get, Query } from '@nestjs/common';
import { CustomApiService } from './custom-api.service';

@Controller('custom-api')
export class CustomApiController {
  constructor(private readonly customApiService: CustomApiService) {}

  @Get()
  async fetchData(@Query('district') district: string): Promise<any> {
    const data = await this.customApiService.fetchDataFromPublicApi(district);
    return data;
  }
}
