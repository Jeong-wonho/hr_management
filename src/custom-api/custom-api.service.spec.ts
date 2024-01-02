import { Test, TestingModule } from '@nestjs/testing';
import { CustomApiService } from './custom-api.service';

describe('CustomApiService', () => {
  let service: CustomApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomApiService],
    }).compile();

    service = module.get<CustomApiService>(CustomApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
