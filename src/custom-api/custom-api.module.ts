import { Module } from '@nestjs/common';
import { CustomApiService } from './custom-api.service';
import { CustomApiController } from './custom-api.controller';

@Module({
  providers: [CustomApiService],
  controllers: [CustomApiController]
})
export class CustomApiModule {}
