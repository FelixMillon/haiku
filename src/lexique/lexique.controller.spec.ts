import { Test, TestingModule } from '@nestjs/testing';
import { LexiqueController } from './lexique.controller';
import { LexiqueService } from './lexique.service';

describe('LexiqueController', () => {
  let controller: LexiqueController;
  let service: LexiqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LexiqueController],
      providers: [
        {
          provide: LexiqueService,
          useValue: {
            getNoms: jest.fn().mockResolvedValue(['nom1', 'nom2']),
            getNomsByTheme: jest.fn().mockResolvedValue({ nom1: {}, nom2: {} }),
            getNom: jest.fn().mockResolvedValue({ syllabes: 2, genre: 'm', themes: ['hiver'] }),
          },
        },
      ],
    }).compile();

    controller = module.get<LexiqueController>(LexiqueController);
    service = module.get<LexiqueService>(LexiqueService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getNoms', () => {
    it('should return an array of noms', async () => {
      const result = ['nom1', 'nom2'];
      jest.spyOn(service, 'getNoms').mockImplementation(() => result);
      expect(await controller.getNoms()).toEqual(result);
    });
  });

  describe('getNomsByTheme', () => {
    it('should return an object of noms by theme', async () => {
      const theme = 'hiver';
      const result = { nom1: {}, nom2: {} };
      jest.spyOn(service, 'getNomsByTheme').mockImplementation(() => result);
      expect(await controller.getNomsByTheme(theme)).toEqual(result);
    });
  });
});
