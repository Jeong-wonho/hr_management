import { Test, TestingModule } from '@nestjs/testing';
import { CustomApiController } from './custom-api.controller';

describe('CustomApiController', () => {
  let controller: CustomApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomApiController],
    }).compile();

    controller = module.get<CustomApiController>(CustomApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
