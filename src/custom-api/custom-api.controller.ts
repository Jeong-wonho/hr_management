import { Body, Controller, Get } from '@nestjs/common';
import { CustomApiService } from './custom-api.service';

@Controller('custom-api')
export class CustomApiController {
  constructor(private readonly customApiService: CustomApiService) {}

  @Get()
  async fetchData(@Body() reqData): Promise<any> {
    const data = await this.customApiService.fetchDataFromPublicApi(reqData);
    return data;
  }
}
