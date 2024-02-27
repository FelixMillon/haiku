import { Controller, Get } from '@nestjs/common';
import { LexiqueService } from './lexique.service';
@Controller('lexique')
export class LexiqueController {
  constructor(private readonly lexiqueService: LexiqueService) {}


  @Get('noms')
  getNoms(): object {
    return this.lexiqueService.getNoms();
  }
  @Get('pronoms')
  getPronoms(): object {
    return this.lexiqueService.getPronoms();
  }
  @Get('adjectifs')
  getAdjectifs(): object {
    return this.lexiqueService.getAdjectifs();
  }
  @Get('verbes')
  getVerbes(): object {
    return this.lexiqueService.getVerbes();
  }
  @Get()
  getPrez(): string {
    return `
    <a href="/lexique/noms/">/lexique/noms/</a><br>
    <a href="/lexique/pronoms/">/lexique/pronoms/</a><br>
    <a href="/lexique/adjectifs/">/lexique/adjectifs/</a><br>
    <a href="/lexique/verbes/">/lexique/verbes/</a><br>
    <a href="/">accueil</a><br>
    `;
  }
}
