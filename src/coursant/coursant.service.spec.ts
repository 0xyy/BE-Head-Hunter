import { Test, TestingModule } from '@nestjs/testing';
import { CoursantService } from './coursant.service';

describe('CoursantService', () => {
  let service: CoursantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursantService],
    }).compile();

    service = module.get<CoursantService>(CoursantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
