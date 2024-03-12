import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LexiqueService } from './lexique.service';
import { Nom } from '../types/nom';
import { Pronom } from '../types/pronom';
import { Adjectif } from '../types/adjectif';
import { VerbeTempsPersonne, VerbeTemps, Verbe } from '../types/verbe';
@Controller('lexique')
export class LexiqueController {
  constructor(private readonly lexiqueService: LexiqueService) {}
  private authorizedThemes = ["ete","printemps","automne","hiver"]
  private authorizedTypes = ["personnels","possessifs","demonstratif","indéfinis","relatifs","interrogatifs","réfléchis"]
  private authorizedPlurality = ["singulier","pluriel"]
  private authorizedPersons = ["1s","2s","3s","1p","2p","3p"]
  private authorizedTimes = ["present","passe","futur"]
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
  getNom(@Param('theme') theme: string,@Param('nom') nom: string): object {
    if(!(typeof nom === 'string')){
      throw new Error("nom doit être une chaine de caractere")
    }
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    return this.lexiqueService.getNom(theme,nom); 
  }
  @Post('noms/:theme/:nom')
  createNom(@Body() body: Nom,@Param('theme') theme: string,@Param('nom') nom: string) {
    if(!(typeof nom === 'string')){
      throw new Error("nom doit être une chaine de caractere")
    }
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
    if(!(typeof nom === 'string')){
      throw new Error("nom doit être une chaine de caractere")
    }
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
    if(!(typeof nom === 'string')){
      throw new Error("nom doit être une chaine de caractere")
    }
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
  getPronom(@Param('type') type: string,@Param('plurality') plurality: string,@Param('pronom') pronom: string): object {
    if(!(typeof pronom === 'string')){
      throw new Error("pronom doit être une chaine de caractere")
    }
    if(!this.authorizedTypes.includes(type)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedTypes.join(' soit ')}`)
    }
    if(!this.authorizedPlurality.includes(plurality)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedPlurality.join(' soit ')}`)
    }
    return this.lexiqueService.getPronom(type,plurality,pronom);
  }
  @Post('pronoms/:type/:plurality/:pronom')
  createPronom(
      @Body() body: Pronom,
      @Param('type') type: string,
      @Param('plurality') plurality: string,
      @Param('pronom') pronom: string
    ) {
    if(!(typeof pronom === 'string')){
      throw new Error("pronom doit être une chaine de caractere")
    }
    if(!this.authorizedTypes.includes(type)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedTypes.join(' soit ')}`)
    }
    if(!this.authorizedPlurality.includes(plurality)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedPlurality.join(' soit ')}`)
    }
    const pronomsExistants = this.lexiqueService.getPronomsByTypeAndPlurality(type,plurality);
    if(pronom in pronomsExistants){
      throw new Error("le pronom existe déja")
    }
    this.checkIsValidPronom(body)
    return this.lexiqueService.createPronom(type,plurality,pronom,body);
  }
  @Put('pronoms/:type/:plurality/:pronom')
  updatePronom(
      @Body() body: Pronom,
      @Param('type') type: string,
      @Param('plurality') plurality: string,
      @Param('pronom') pronom: string
    ) {
    if(!(typeof pronom === 'string')){
      throw new Error("pronom doit être une chaine de caractere")
    }
    if(!this.authorizedTypes.includes(type)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedTypes.join(' soit ')}`)
    }
    if(!this.authorizedPlurality.includes(plurality)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedPlurality.join(' soit ')}`)
    }
    const pronomsExistants = this.lexiqueService.getPronomsByTypeAndPlurality(type,plurality);
    if(!(pronom in pronomsExistants)){
      throw new Error("le pronom n'existe pas")
    }
    this.checkIsValidPronom(body)
    return this.lexiqueService.createPronom(type,plurality,pronom,body);
  }
  @Delete('pronoms/:type/:plurality/:pronom')
  deletePronom(
    @Param('type') type: string,
    @Param('plurality') plurality: string,
    @Param('pronom') pronom: string
  ) {
    if(!(typeof pronom === 'string')){
      throw new Error("pronom doit être une chaine de caractere")
    }
    if(!this.authorizedTypes.includes(type)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedTypes.join(' soit ')}`)
    }
    if(!this.authorizedPlurality.includes(plurality)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedPlurality.join(' soit ')}`)
    }
    const pronomsExistants = this.lexiqueService.getPronomsByTypeAndPlurality(type,plurality);
    if(!(pronom in pronomsExistants)){
      throw new Error("le pronom existe déja")
    }
    return this.lexiqueService.deletePronom(type,plurality,pronom);
  }

  @Get('adjectifs')
  getAdjectifs(): object {
    return this.lexiqueService.getAdjectifs();
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
  getAdjectif(@Param('theme') theme: string,@Param('genre') genre: string,@Param('adjectif') adjectif: string): object {
    if(!(typeof adjectif === 'string')){
      throw new Error("adjectif doit être une chaine de caractere")
    }
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    if(!this.authorizedGenre.includes(genre)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedGenre.join(' soit ')}`)
    }
    return this.lexiqueService.getAdjectif(theme,genre,adjectif);
  }
  @Post('adjectifs/:theme/:genre/:adjectif')
  createAdjectif(
    @Body() body: Adjectif,
    @Param('theme') theme: string,
    @Param('genre') genre: string,
    @Param('adjectif') adjectif: string
  ) {
    if(!(typeof adjectif === 'string')){
      throw new Error("adjectif doit être une chaine de caractere")
    }
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    if(!this.authorizedGenre.includes(genre)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedGenre.join(' soit ')}`)
    }
    const adjectifsExistants = this.lexiqueService.getAdjectifsByThemeAndGenre(theme,genre);
    if(adjectif in adjectifsExistants){
      throw new Error("l'adjectif existe déja")
    }
    this.checkIsValidAdjectif(body)
    return this.lexiqueService.createAdjectif(theme,genre,adjectif,body);
  }
  @Put('adjectifs/:theme/:genre/:adjectif')
  updateAdjectif(
    @Body() body: Adjectif,
    @Param('theme') theme: string,
    @Param('genre') genre: string,
    @Param('adjectif') adjectif: string
  ) {
    if(!(typeof adjectif === 'string')){
      throw new Error("adjectif doit être une chaine de caractere")
    }
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    if(!this.authorizedGenre.includes(genre)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedGenre.join(' soit ')}`)
    }
    const adjectifsExistants = this.lexiqueService.getAdjectifsByThemeAndGenre(theme,genre);
    if(!(adjectif in adjectifsExistants)){
      throw new Error("l'adjectif n'existe pas")
    }
    this.checkIsValidAdjectif(body)
    return this.lexiqueService.createAdjectif(theme,genre,adjectif,body);
  }
  @Delete('adjectifs/:theme/:genre/:adjectif')
  deleteAdjectif(
    @Param('theme') theme: string,
    @Param('genre') genre: string,
    @Param('adjectif') adjectif: string
  ) {
    if(!(typeof adjectif === 'string')){
      throw new Error("adjectif doit être une chaine de caractere")
    }
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    if(!this.authorizedGenre.includes(genre)){
      throw new Error(`Les pronoms peuvent être soit: ${this.authorizedGenre.join(' soit ')}`)
    }
    const adjectifsExistants = this.lexiqueService.getAdjectifsByThemeAndGenre(theme,genre);
    if(!(adjectif in adjectifsExistants)){
      throw new Error("l'adjectif n'existe pas")
    }
    return this.lexiqueService.deleteAdjectif(theme,genre,adjectif);
  }

  @Get('verbes')
  getVerbes(): object {
    return this.lexiqueService.getVerbes();
  }
  @Get('verbes/:theme')
  getVerbesByTheme(@Param('theme') theme: string): object {
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    return this.lexiqueService.getVerbesByTheme(theme);
  }
  @Get('verbes/:theme/:verbe')
  getVerbe(
    @Param('theme') theme: string,
    @Param('verbe') verbe: string
  ): object {
    if(!(typeof verbe === 'string')){
      throw new Error("verbe doit être une chaine de caractere")
    }
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    return this.lexiqueService.getVerbe(theme,verbe);
  }
  @Post('verbes/:theme/:verbe')
  createVerbe(
    @Body() body: Verbe,
    @Param('theme') theme: string,
    @Param('verbe') verbe: string
  ) {
    if(!(typeof verbe === 'string')){
      throw new Error("verbe doit être une chaine de caractere")
    }
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    const verbesExistants = this.lexiqueService.getVerbesByTheme(theme);
    if(verbe in verbesExistants){
      throw new Error("le verbe existe déja")
    }
    this.checkIsValidVerbe(body)
    return this.lexiqueService.createVerbe(theme,verbe,body);
  }
  @Put('verbes/:theme/:verbe')
  updateVerbe(
    @Body() body: Verbe,
    @Param('theme') theme: string,
    @Param('verbe') verbe: string
  ) {
    if(!(typeof verbe === 'string')){
      throw new Error("verbe doit être une chaine de caractere")
    }
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    const verbesExistants = this.lexiqueService.getVerbesByTheme(theme);
    if(!(verbe in verbesExistants)){
      throw new Error("le verbe n'existe pas")
    }
    this.checkIsValidVerbe(body)
    return this.lexiqueService.createVerbe(theme,verbe,body);
  }
  @Delete('verbes/:theme/:verbe')
  deleteVerbe(
    @Param('theme') theme: string,
    @Param('verbe') verbe: string
  ) {
    if(!(typeof verbe === 'string')){
      throw new Error("verbe doit être une chaine de caractere")
    }
    if(!this.authorizedThemes.includes(theme)){
      throw new Error("le thème d'un haiku est toujours printemps, été, automne ou hiver")
    }
    const verbesExistants = this.lexiqueService.getVerbesByTheme(theme);
    if(!(verbe in verbesExistants)){
      throw new Error("le verbe n'existe pas")
    }
    return this.lexiqueService.deleteVerbe(theme,verbe);
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
  checkIsValidPronom(body: Pronom): void{
    if(!Number.isInteger(body['syllabes'])){
      throw new Error("syllabes doit être un entier")
    }
    if(![0,1].includes(body['liaison'])){
      throw new Error("liaison doit être égale à 1 ou 0")
    }
    if(!["f","m","i"].includes(body['genre'])){
      throw new Error("liaison doit être égale à 1 ou 0")
    }
  }
  checkIsValidAdjectif(body: Adjectif): void{
    if(!(typeof body['pluriel'] === 'string')){
      throw new Error("liaison doit être égale à 1 ou 0")
    }
    if(!Number.isInteger(body['syllabes'])){
      throw new Error("syllabes doit être un entier")
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
  }
  checkIsValidVerbe(body: Verbe): void{
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
    const nombreDeCle = Object.keys(body).length;
    if(!(Object.keys(body).length === 4)){
      throw new Error("Un verbe est caractérisé par 4 élements : theme, present, passe, futur")
    }
    for(let element in body){
      if(element != "themes"){
        if(!this.authorizedTimes.includes(element)){
          throw new Error(`Un temps doit avoir l'une des valeurs suivantes : ${this.authorizedTimes.join(', ')}`)
        }
        this.checkIsValidVerbeTemps(body[element])
      }
    }
  }
  checkIsValidVerbeTemps(temps: VerbeTemps): void{
    for(let personne in temps){
      if(!this.authorizedPersons.includes(personne)){
        throw new Error(`Une personne doit avoir une des valeur suivante : ${this.authorizedPersons.join(', ')}`)
      }
      this.checkIsValidVerbeTempsPersonne(temps[personne])
    }
  }
  checkIsValidVerbeTempsPersonne(personne: VerbeTempsPersonne): void{
    if(!(typeof personne['value'] === 'string')){
      throw new Error("La valeur conjuguée doit être de type string")
    }
    if(!Number.isInteger(personne['syllabes'])){
      throw new Error("syllabes doit être un entier")
    }
  }

}
