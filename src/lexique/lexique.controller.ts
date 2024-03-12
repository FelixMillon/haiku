import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LexiqueService } from './lexique.service';
import { Nom } from '../types/nom';
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
    }
    return this.lexiqueService.getNomsByTheme(theme);
  }
  @Get('noms/:theme/:nom')
  getNomsByThemeAndName(@Param('theme') theme: string,@Param('nom') nom: string): object {
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    return this.lexiqueService.getNomsByThemeAndName(theme,nom); 
  }
  @Post('noms/:theme/:nom')
  createNom(@Body() body: Nom,@Param('theme') theme: string,@Param('nom') nom: string) {
    
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    const nomsExistants = this.lexiqueService.getNomsByTheme(theme);
    if(nom in nomsExistants){
      throw new Error("le nom existe déja")
    }
    this.checkIsValidNom(body)
    return this.lexiqueService.createNom(theme,nom,body);
  }
  @Put('noms/:theme/:nom')
  updateNom(@Body() body: Nom,@Param('theme') theme: string,@Param('nom') nom: string) {
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    const nomsExistants = this.lexiqueService.getNomsByTheme(theme);
    if(!(nom in nomsExistants)){
      throw new Error("le nom n'existe pas")
    }
    this.checkIsValidNom(body)
    return this.lexiqueService.createNom(theme,nom,body);
  }
  @Delete('noms/:theme/:nom')
  deleteNom(@Param('theme') theme: string,@Param('nom') nom: string) {
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    let nomsExistants = this.lexiqueService.getNomsByTheme(theme);
    if(!(nom in nomsExistants)){
      throw new Error("le nom n'existe pas")
    }
    return this.lexiqueService.deleteNom(theme,nom);
  }

  @Get('pronoms')
  getPronoms(): object {
    return this.lexiqueService.getPronoms();
  }
  @Get('pronoms/:type')
  getPronomsByType(@Param('type') type: string): object {
    if(!this.authorizedTypes.includes(type)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedTypes.join(' soit ')}`)
    }
    return this.lexiqueService.getPronomsByType(type);
  }
  @Get('pronoms/:type/:plurality')
  getPronomsByTypeAndPlurality(@Param('type') type: string,@Param('plurality') plurality: string): object {
    if(!this.authorizedTypes.includes(type)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedTypes.join(' soit ')}`)
    }
    if(!this.authorizedPlurality.includes(plurality)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedPlurality.join(' soit ')}`)
    }
    return this.lexiqueService.getPronomsByTypeAndPlurality(type,plurality);
  }
  @Get('pronoms/:type/:plurality/:pronom')
  getPronomsByTypeAndPluralityAndPronom(@Param('type') type: string,@Param('plurality') plurality: string,@Param('pronom') pronom: string): object {
    if(!this.authorizedTypes.includes(type)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedTypes.join(' soit ')}`)
    }
    if(!this.authorizedPlurality.includes(plurality)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedPlurality.join(' soit ')}`)
    }
    return this.lexiqueService.getPronomsByTypeAndPluralityAndPronom(type,plurality,pronom);
  }
  @Get('adjectifs/:theme')
  getAdjectifsByTheme(@Param('theme') theme: string): object {
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    return this.lexiqueService.getAdjectifsByTheme(theme);
  }
  @Get('adjectifs/:theme/:genre')
  getAdjectifsByThemeAndGenre(@Param('theme') theme: string,@Param('genre') genre: string): object {
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    if(!this.authorizedGenre.includes(genre)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedGenre.join(' soit ')}`)
    }
    return this.lexiqueService.getAdjectifsByThemeAndGenre(theme,genre);
  }
  @Get('adjectifs/:theme/:genre/:adjectif')
  getAdjectifsByThemeAndGenreAndAdjectif(@Param('theme') theme: string,@Param('genre') genre: string,@Param('adjectif') adjectif: string): object {
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    if(!this.authorizedGenre.includes(genre)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedGenre.join(' soit ')}`)
    }
    return this.lexiqueService.getAdjectifsByThemeAndGenreAndAdjectif(theme,genre,adjectif);
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
  checkIsValidNom(body: Nom): void{
    if(!Number.isInteger(body['syllabes'])){
      throw new Error("syllabes doit être un entier")
    }
    if(![0,1].includes(body['liaison'])){
      throw new Error("liaison doit être égale à 1 ou 0")
    }
    if(!(typeof body['pluriel'] === 'string')){
      throw new Error("liaison doit être égale à 1 ou 0")
    }
    if(!(typeof body['themes'] === 'object')){
      throw new Error("liaison doit être une liste")
    }
    for(let index in body['themes']){
      if(!Number.isInteger(parseInt(index))){
        throw new Error("liaison doit être une liste")
      }
      if(!(typeof body['themes'][index] === 'string')){
        throw new Error("Chaque thème doit être une chaine de caractère")
      }
    }
    if(!["f","m"].includes(body['genre'])){
      throw new Error("liaison doit être égale à 1 ou 0")
    }
  }
}
