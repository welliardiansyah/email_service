import { Test, TestingModule } from '@nestjs/testing';
import { ConfigEmailService } from './config-email.service';

describe('ConfigEmailService', () => {
  let service: ConfigEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigEmailService],
    }).compile();

    service = module.get<ConfigEmailService>(ConfigEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
