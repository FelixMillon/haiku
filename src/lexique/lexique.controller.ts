import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { LexiqueService } from './lexique.service';
@Controller('lexique')
export class LexiqueController {
  constructor(private readonly lexiqueService: LexiqueService) {}
  private authorizedThemes = ["ete","printemps","automne","hiver"]
  private authorizedTypes = ["personnels","possessifs","demonstratif","indéfinis","relatifs","interrogatifs","réfléchis"]
  private authorizedPlurality = ["singulier","pluriel"]
  private authorizedGenre = ["m","f"]
  @Get('noms')
  getNoms(): object {
    return this.lexiqueService.getNoms();
  }
  @Get('noms/:theme')
  getNomsByTheme(@Param('theme') theme: string): object {
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }else{
      return this.lexiqueService.getNomsByTheme(theme);
    }
  }
  @Get('noms/:theme/:nom')
  getNomsByThemeAndName(@Param('theme') theme: string,@Param('nom') nom: string): object {
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }else{
      return this.lexiqueService.getNomsByThemeAndName(theme,nom);
    }
  } 
  @Get('pronoms')
  getPronoms(): object {
    return this.lexiqueService.getPronoms();
  }
  @Get('pronoms/:type')
  getPronomsByType(@Param('type') type: string): object {
    if(!this.authorizedTypes.includes(type)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedTypes.join(' soit ')}`)
    }else{
      return this.lexiqueService.getPronomsByType(type);
    }
  }
  @Get('pronoms/:type/:plurality')
  getPronomsByTypeAndPlurality(@Param('type') type: string,@Param('plurality') plurality: string): object {
    if(!this.authorizedTypes.includes(type)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedTypes.join(' soit ')}`)
    }else if(!this.authorizedPlurality.includes(plurality)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedPlurality.join(' soit ')}`)
    }else{
      return this.lexiqueService.getPronomsByTypeAndPlurality(type,plurality);
    }
  }
  @Get('pronoms/:type/:plurality/:pronom')
  getPronomsByTypeAndPluralityAndPronom(@Param('type') type: string,@Param('plurality') plurality: string,@Param('pronom') pronom: string): object {
    if(!this.authorizedTypes.includes(type)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedTypes.join(' soit ')}`)
    }else if(!this.authorizedPlurality.includes(plurality)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedPlurality.join(' soit ')}`)
    }else{
      return this.lexiqueService.getPronomsByTypeAndPluralityAndPronom(type,plurality,pronom);
    }
  }
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    // Utilisation des données du corps de la requête pour créer un nouvel élément
    return this.itemsService.create(createItemDto);
  }
  @Get('adjectifs/:theme')
  getAdjectifsByTheme(@Param('theme') theme: string): object {
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }else{
      return this.lexiqueService.getAdjectifsByTheme(theme);
    }
  }
  @Get('adjectifs/:theme/:genre')
  getAdjectifsByThemeAndGenre(@Param('theme') theme: string,@Param('genre') genre: string): object {
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }else if(!this.authorizedGenre.includes(genre)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedGenre.join(' soit ')}`)
    }else{
      return this.lexiqueService.getAdjectifsByThemeAndGenre(theme,genre);
    }
  }
  @Get('adjectifs/:theme/:genre/:adjectif')
  getAdjectifsByThemeAndGenreAndAdjectif(@Param('theme') theme: string,@Param('genre') genre: string,@Param('adjectif') adjectif: string): object {
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }else if(!this.authorizedGenre.includes(genre)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedGenre.join(' soit ')}`)
    }else{
      return this.lexiqueService.getAdjectifsByThemeAndGenreAndAdjectif(theme,genre,adjectif);
    }
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
    <a href="/lexique/noms/<theme>/">/lexique/noms/<theme>/</a><br>
    <a href="/lexique/pronoms/">/lexique/pronoms/</a><br>
    <a href="/lexique/adjectifs/">/lexique/adjectifs/</a><br>
    <a href="/lexique/verbes/">/lexique/verbes/</a><br>
    <a href="/">accueil</a><br>
    `;
  }
}
