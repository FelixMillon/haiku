import { Test, TestingModule } from '@nestjs/testing';
import { HaikuController } from './haiku.controller';
import { HaikuService } from './haiku.service';

describe('HaikuController', () => {
  let controller: HaikuController;
  let service: HaikuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HaikuController],
      providers: [
        {
          provide: HaikuService,
          useValue: {
            getNoms: jest.fn().mockReturnValue({
              hiver: {
                neige: { syllabes: 2, genre: 'f', themes: ['froid'] },
                glace: { syllabes: 2, genre: 'f', themes: ['froid'] }
              }
            }),
            getPronoms: jest.fn().mockReturnValue({
              personnels: {
                singulier: { il: { genre: 'm', syllabes: 1, liaison: '' } },
                pluriel: { ils: { genre: 'm', syllabes: 1, liaison: '' } }
              }
            }),
            getAdjectifs: jest.fn().mockReturnValue({
              hiver: {
                f: {
                  blanche: { syllabes: 2, themes: ['froid', 'couleur'], pluriel: 'blanches' }
                },
                m: {
                  froid: { syllabes: 1, themes: ['température'], pluriel: 'froids' }
                }
              }
            }),
            getVerbes: jest.fn().mockReturnValue({
              hiver: {
                tomber: {
                  present: { '3s': { syllabes: 2, value: 'tombe' }, '3p': { syllabes: 2, value: 'tombent' } },
                  passe: { '3s': { syllabes: 2, value: 'est tombé' }, '3p': { syllabes: 2, value: 'sont tombés' } },
                  futur: { '3s': { syllabes: 2, value: 'tombera' }, '3p': { syllabes: 2, value: 'tomberont' } }
                }
              }
            }),
          },
        },
      ],
    }).compile();
  
    controller = module.get<HaikuController>(HaikuController);
    service = module.get<HaikuService>(HaikuService);
  });
  

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPrez', () => {
    it('should return presentation links', () => {
      expect(controller.getPrez()).toContain('/haiku/printemps/');
      expect(controller.getPrez()).toContain('/haiku/ete/');
      expect(controller.getPrez()).toContain('/haiku/automne/');
      expect(controller.getPrez()).toContain('/haiku/hiver/');
      expect(controller.getPrez()).toContain('<a href="/">accueil</a>');
    });
  });

  describe('getExample', () => {
    it('should return an error message for an unauthorized theme', async () => {
      const theme = 'nonautorise';
      expect(await controller.getExample(theme)).toBe("le thème d'un haiku est toujours printemps, été, automne ou hiver");
    });
  });
});
