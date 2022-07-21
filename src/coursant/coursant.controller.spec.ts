import { Test, TestingModule } from '@nestjs/testing';
import { CoursantController } from './coursant.controller';
import { CoursantService } from './coursant.service';

describe('CoursantController', () => {
  let controller: CoursantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursantController],
      providers: [CoursantService],
    }).compile();

    controller = module.get<CoursantController>(CoursantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
