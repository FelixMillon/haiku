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
      return {"code": 400, "msg": "le thème d'un haiku est toujours printemps, été, automne ou hiver"}
    }
    return this.lexiqueService.getNomsByTheme(theme);
  }
  @Get('noms/:theme/:nom')
  getNom(@Param('theme') theme: string,@Param('nom') nom: string): object {
    if(!(typeof nom === 'string')){
      return {"code": 400, "msg": `le nom '${nom}' doit être une chaine de caractere`}
    }
    if(!this.authorizedThemes.includes(theme)){
      return {"code": 400, "msg": "le thème d'un haiku est toujours printemps, été, automne ou hiver"}
    }
    return this.lexiqueService.getNom(theme,nom); 
  }
  @Post('noms/:theme/:nom')
  createNom(@Body() body: Nom,@Param('theme') theme: string,@Param('nom') nom: string): object {
    if(!(typeof nom === 'string')){
      return {"code": 400, "msg": `le nom '${nom}' doit être une chaine de caractere`}
    }
    if(!this.authorizedThemes.includes(theme)){
      return {"code": 400, "msg": `le thème d'un haiku est toujours printemps, été, automne ou hiver`}
    }
    const nomsExistants = this.lexiqueService.getNomsByTheme(theme);
    if(nom in nomsExistants){
      return {"code": 400, "msg": `le nom '${nom}' existe déja`}
    }
    const errors = this.checkIsValidNom(body)
    if(!(typeof errors == 'undefined')){
      return errors;
    }
    return this.lexiqueService.createNom(theme,nom,body);
  }
  @Put('noms/:theme/:nom')
  updateNom(@Body() body: Nom,@Param('theme') theme: string,@Param('nom') nom: string): object {
    if(!(typeof nom === 'string')){
      return {"code": 400, "msg": `le nom '${nom}' doit être une chaine de caractere`}
    }
    if(!this.authorizedThemes.includes(theme)){
      return {"code": 400, "msg": `le thème d'un haiku est toujours printemps, été, automne ou hiver`}
    }
    const nomsExistants = this.lexiqueService.getNomsByTheme(theme);
    if(!(nom in nomsExistants)){
      return {"code": 400, "msg": `le nom '${nom}' n'existe pas`}
    }
    const errors = this.checkIsValidNom(body)
    if(!(typeof errors == 'undefined')){
      return errors;
    }
    return this.lexiqueService.createNom(theme,nom,body);
  }
  @Delete('noms/:theme/:nom')
  deleteNom(@Param('theme') theme: string,@Param('nom') nom: string) {
    if(!(typeof nom === 'string')){
      return {"code": 400, "msg": `le nom '${nom}' doit être une chaine de caractere`}
    }
    if(!this.authorizedThemes.includes(theme)){
      return {"code": 400, "msg": `le thème d'un haiku est toujours printemps, été, automne ou hiver`}
    }
    let nomsExistants = this.lexiqueService.getNomsByTheme(theme);
    if(!(nom in nomsExistants)){
      return {"code": 400, "msg": `le nom '${nom}' n'existe pas`}
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
      return {"code": 400, "msg": `Les pronoms peuvent être : ${this.authorizedTypes.join(' ou ')}`}
    }
    return this.lexiqueService.getPronomsByType(type);
  }
  @Get('pronoms/:type/:plurality')
  getPronomsByTypeAndPlurality(@Param('type') type: string,@Param('plurality') plurality: string): object {
    if(!this.authorizedTypes.includes(type)){
      return {"code": 400, "msg": `Les pronoms peuvent être : ${this.authorizedTypes.join(' ou ')}`}
    }
    if(!this.authorizedPlurality.includes(plurality)){
      return {"code": 400, "msg": `Les pronoms peuvent être soit: ${this.authorizedPlurality.join(' soit ')}`}
    }
    return this.lexiqueService.getPronomsByTypeAndPlurality(type,plurality);
  }
  @Get('pronoms/:type/:plurality/:pronom')
  getPronom(@Param('type') type: string,@Param('plurality') plurality: string,@Param('pronom') pronom: string): object {
    if(!(typeof pronom === 'string')){
      return {"code": 400, "msg": `le pronom '${pronom}' doit être une chaine de caractere`}
    }
    if(!this.authorizedTypes.includes(type)){
      return {"code": 400, "msg": `Les pronoms peuvent être : ${this.authorizedTypes.join(' ou ')}`}
    }
    if(!this.authorizedPlurality.includes(plurality)){
      return {"code": 400, "msg": `Les pronoms peuvent être soit: ${this.authorizedPlurality.join(' soit ')}`}
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
      return {"code": 400, "msg": `le pronom '${pronom}' doit être une chaine de caractere`}
    }
    if(!this.authorizedTypes.includes(type)){
      return {"code": 400, "msg": `Les pronoms peuvent être : ${this.authorizedTypes.join(' ou ')}`}
    }
    if(!this.authorizedPlurality.includes(plurality)){
      return {"code": 400, "msg": `Les pronoms peuvent être soit: ${this.authorizedPlurality.join(' soit ')}`}
    }
    const pronomsExistants = this.lexiqueService.getPronomsByTypeAndPlurality(type,plurality);
    if(pronom in pronomsExistants){
      return {"code": 400, "msg": `le pronom '${pronom}' existe déja`}
    }
    const errors = this.checkIsValidPronom(body)
    if(!(typeof errors == 'undefined')){
      return errors;
    }
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
      return {"code": 400, "msg": `le pronom '${pronom}' doit être une chaine de caractere`}
    }
    if(!this.authorizedTypes.includes(type)){
      return {"code": 400, "msg": `Les pronoms peuvent être : ${this.authorizedTypes.join(' ou ')}`}
    }
    if(!this.authorizedPlurality.includes(plurality)){
      return {"code": 400, "msg": `Les pronoms peuvent être soit: ${this.authorizedPlurality.join(' soit ')}`}
    }
    const pronomsExistants = this.lexiqueService.getPronomsByTypeAndPlurality(type,plurality);
    if(!(pronom in pronomsExistants)){
      return {"code": 400, "msg": `le pronom '${pronom}' n'existe pas`}
    }
    const errors = this.checkIsValidPronom(body)
    if(!(typeof errors == 'undefined')){
      return errors;
    }
    return this.lexiqueService.createPronom(type,plurality,pronom,body);
  }
  @Delete('pronoms/:type/:plurality/:pronom')
  deletePronom(
    @Param('type') type: string,
    @Param('plurality') plurality: string,
    @Param('pronom') pronom: string
  ) {
    if(!(typeof pronom === 'string')){
      return {"code": 400, "msg": `le pronom '${pronom}' doit être une chaine de caractere`}
    }
    if(!this.authorizedTypes.includes(type)){
      return {"code": 400, "msg": `Les pronoms peuvent être : ${this.authorizedTypes.join(' ou ')}`}
    }
    if(!this.authorizedPlurality.includes(plurality)){
      return {"code": 400, "msg": `Les pronoms peuvent être soit: ${this.authorizedPlurality.join(' soit ')}`}
    }
    const pronomsExistants = this.lexiqueService.getPronomsByTypeAndPlurality(type,plurality);
    if(!(pronom in pronomsExistants)){
      return {"code": 400, "msg": `le pronom '${pronom}' n'existe pas`}
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
      return {"code": 400, "msg": `le thème d'un haiku est toujours printemps, été, automne ou hiver`}
    }
    return this.lexiqueService.getAdjectifsByTheme(theme);
  }
  @Get('adjectifs/:theme/:genre')
  getAdjectifsByThemeAndGenre(@Param('theme') theme: string,@Param('genre') genre: string): object {
    if(!this.authorizedThemes.includes(theme)){
      return {"code": 400, "msg": `le thème d'un haiku est toujours printemps, été, automne ou hiver`}
    }
    if(!this.authorizedGenre.includes(genre)){
      return {"code": 400, "msg": `Les adjectifs peuvent être soit: ${this.authorizedGenre.join(' soit ')}`}
    }
    return this.lexiqueService.getAdjectifsByThemeAndGenre(theme,genre);
  }
  @Get('adjectifs/:theme/:genre/:adjectif')
  getAdjectif(@Param('theme') theme: string,@Param('genre') genre: string,@Param('adjectif') adjectif: string): object {
    if(!(typeof adjectif === 'string')){
      return {"code": 400, "msg": `l'adjectif '${adjectif}' doit être une chaine de caractere`}
    }
    if(!this.authorizedThemes.includes(theme)){
      return {"code": 400, "msg": `le thème d'un haiku est toujours printemps, été, automne ou hiver`}
    }
    if(!this.authorizedGenre.includes(genre)){
      return {"code": 400, "msg": `Les adjectifs peuvent être soit: ${this.authorizedGenre.join(' soit ')}`}
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
      return {"code": 400, "msg": `l'adjectif '${adjectif}' doit être une chaine de caractere`}
    }
    if(!this.authorizedThemes.includes(theme)){
      return {"code": 400, "msg": `le thème d'un haiku est toujours printemps, été, automne ou hiver`}
    }
    if(!this.authorizedGenre.includes(genre)){
      return {"code": 400, "msg": `Les adjectifs peuvent être soit: ${this.authorizedGenre.join(' soit ')}`}
    }
    const adjectifsExistants = this.lexiqueService.getAdjectifsByThemeAndGenre(theme,genre);
    if(adjectif in adjectifsExistants){
      return {"code": 400, "msg": `l'adjectif '${adjectif}' existe déja`}
    }
    const errors = this.checkIsValidAdjectif(body)
    if(!(typeof errors == 'undefined')){
      return errors;
    }
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
      return {"code": 400, "msg": `L'adjectif '${adjectif}' doit être une chaine de caractere`}
    }
    if(!this.authorizedThemes.includes(theme)){
      return {"code": 400, "msg": `Le thème d'un haiku est toujours printemps, été, automne ou hiver`}
    }
    if(!this.authorizedGenre.includes(genre)){
      return {"code": 400, "msg": `Les adjectifs peuvent être soit: ${this.authorizedGenre.join(' soit ')}`}
    }
    const adjectifsExistants = this.lexiqueService.getAdjectifsByThemeAndGenre(theme,genre);
    if(!(adjectif in adjectifsExistants)){
      return {"code": 400, "msg": `L'adjectif '${adjectif}' n'existe pas`}
    }
    const errors = this.checkIsValidAdjectif(body)
    if(!(typeof errors == 'undefined')){
      return errors;
    }
    return this.lexiqueService.createAdjectif(theme,genre,adjectif,body);
  }
  @Delete('adjectifs/:theme/:genre/:adjectif')
  deleteAdjectif(
    @Param('theme') theme: string,
    @Param('genre') genre: string,
    @Param('adjectif') adjectif: string
  ) {
    if(!(typeof adjectif === 'string')){
      return {"code": 400, "msg": `l'adjectif '${adjectif}' doit être une chaine de caractere`}
    }
    if(!this.authorizedThemes.includes(theme)){
      return {"code": 400, "msg": `le thème d'un haiku est toujours printemps, été, automne ou hiver`}
    }
    if(!this.authorizedGenre.includes(genre)){
      return {"code": 400, "msg": `Les adjectifs peuvent être soit: ${this.authorizedGenre.join(' soit ')}`}
    }
    const adjectifsExistants = this.lexiqueService.getAdjectifsByThemeAndGenre(theme,genre);
    if(!(adjectif in adjectifsExistants)){
      return {"code": 400, "msg": `L'adjectif '${adjectif}' n'existe pas`}
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
      return {"code": 400, "msg": `le thème d'un haiku est toujours printemps, été, automne ou hiver`}
    }
    return this.lexiqueService.getVerbesByTheme(theme);
  }
  @Get('verbes/:theme/:verbe')
  getVerbe(
    @Param('theme') theme: string,
    @Param('verbe') verbe: string
  ): object {
    if(!(typeof verbe === 'string')){
      return {"code": 400, "msg": `Le verbe '${verbe}' doit être une chaine de caractere`}
    }
    if(!this.authorizedThemes.includes(theme)){
      return {"code": 400, "msg": `le thème d'un haiku est toujours printemps, été, automne ou hiver`}
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
      return {"code": 400, "msg": `Le verbe '${verbe}' doit être une chaine de caractere`}
    }
    if(!this.authorizedThemes.includes(theme)){
      return {"code": 400, "msg": `le thème d'un haiku est toujours printemps, été, automne ou hiver`}
    }
    const verbesExistants = this.lexiqueService.getVerbesByTheme(theme);
    if(verbe in verbesExistants){
      return {"code": 400, "msg": `le verbe '${verbe}' existe déja`}
    }
    const errors = this.checkIsValidVerbe(body)
    if(!(typeof errors == 'undefined')){
      return errors;
    }
    return this.lexiqueService.createVerbe(theme,verbe,body);
  }
  @Put('verbes/:theme/:verbe')
  updateVerbe(
    @Body() body: Verbe,
    @Param('theme') theme: string,
    @Param('verbe') verbe: string
  ) {
    if(!(typeof verbe === 'string')){
      return {"code": 400, "msg": `Le verbe '${verbe}' doit être une chaine de caractere`}
    }
    if(!this.authorizedThemes.includes(theme)){
      return {"code": 400, "msg": `le thème d'un haiku est toujours printemps, été, automne ou hiver`}
    }
    const verbesExistants = this.lexiqueService.getVerbesByTheme(theme);
    if(!(verbe in verbesExistants)){
      return {"code": 400, "msg": `le verbe '${verbe}' n'existe pas`}
    }
    const errors = this.checkIsValidVerbe(body)
    if(!(typeof errors == 'undefined')){
      return errors;
    }
    return this.lexiqueService.createVerbe(theme,verbe,body);
  }
  @Delete('verbes/:theme/:verbe')
  deleteVerbe(
    @Param('theme') theme: string,
    @Param('verbe') verbe: string
  ) {
    if(!(typeof verbe === 'string')){
      return {"code": 400, "msg": `Le verbe '${verbe}' doit être une chaine de caractere`}
    }
    if(!this.authorizedThemes.includes(theme)){
      return {"code": 400, "msg": `le thème d'un haiku est toujours printemps, été, automne ou hiver`}
    }
    const verbesExistants = this.lexiqueService.getVerbesByTheme(theme);
    if(!(verbe in verbesExistants)){
      return {"code": 400, "msg": `le verbe '${verbe}' n'existe pas`}
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
  checkIsValidNom(body: Nom): object | void{
    if(!Number.isInteger(body['syllabes'])){
      return {"code": 400, "msg": `syllabes doit être un entier`}
    }
    if(body['syllabes']<1){
      return {"code": 400, "msg": `syllabes doit être supérieur à 0`}
    }
    if(![0,1].includes(body['liaison'])){
      return {"code": 400, "msg": `liaison doit être égale à 1 ou 0`}
    }
    if(!(typeof body['pluriel'] === 'string')){
      return {"code": 400, "msg": "pluriel doit être de type string"}
    }
    if(!(typeof body['themes'] === 'object')){
      return {"code": 400, "msg": "themes doit être une liste"}
    }
    for(let index in body['themes']){
      if(!Number.isInteger(parseInt(index))){
        return {"code": 400, "msg": "themes doit être une liste"}
      }
      if(!(typeof body['themes'][index] === 'string')){
        return {"code": 400, "msg": "Chaque thème doit être une chaine de caractère"}
      }
    }
    if(!["f","m"].includes(body['genre'])){
      return {"code": 400, "msg": "genre doit être égal à 'm' ou 'f'"}
    }
  }
  checkIsValidPronom(body: Pronom): object | void{
    if(!Number.isInteger(body['syllabes'])){
      return {"code": 400, "msg": `syllabes doit être un entier`}
    }
    if(body['syllabes']<1){
      return {"code": 400, "msg": `syllabes doit être supérieur à 0`}
    }
    if(![0,1].includes(body['liaison'])){
      return {"code": 400, "msg": `liaison doit être égale à 1 ou 0`}
    }
    if(!["f","m","i"].includes(body['genre'])){
      return {"code": 400, "msg": "genre doit être égal à 'm' ou 'f' ou 'i'"}
    }
  }
  checkIsValidAdjectif(body: Adjectif): object | void{
    if(!(typeof body['pluriel'] === 'string')){
      return {"code": 400, "msg": "pluriel doit être de type string"}
    }
    if(!Number.isInteger(body['syllabes'])){
      return {"code": 400, "msg": `syllabes doit être un entier`}
    }
    if(body['syllabes']<1){
      return {"code": 400, "msg": `syllabes doit être supérieur à 0`}
    }
    if(!(typeof body['themes'] === 'object')){
      return {"code": 400, "msg": "themes doit être une liste"}
    }
    for(let index in body['themes']){
      if(!Number.isInteger(parseInt(index))){
        return {"code": 400, "msg": "themes doit être une liste"}
      }
      if(!(typeof body['themes'][index] === 'string')){
        return {"code": 400, "msg": "Chaque thème doit être une chaine de caractère"}
      }
    }
  }
  checkIsValidVerbe(body: Verbe): object | void{
    if(!(typeof body['themes'] === 'object')){
      return {"code": 400, "msg": "themes doit être une liste"}
    }
    for(let index in body['themes']){
      if(!Number.isInteger(parseInt(index))){
        return {"code": 400, "msg": "themes doit être une liste"}
      }
      if(!(typeof body['themes'][index] === 'string')){
        return {"code": 400, "msg": "Chaque thème doit être une chaine de caractère"}
      }
    }
    const nombreDeCle = Object.keys(body).length;
    if(!(Object.keys(body).length === 4)){
      return {"code": 400, "msg": "l'objet verbe doit avoir 4 clés : theme, present, passe, futur"}
    }
    for(let element in body){
      if(element != "themes"){
        if(!this.authorizedTimes.includes(element)){
          return {"code": 400, "msg": `Un temps doit avoir l'une des valeurs suivantes : ${this.authorizedTimes.join(', ')}`}
        }
        const errors = this.checkIsValidVerbeTemps(body[element])
        if(!(typeof errors == 'undefined')){
          return errors;
        }
      }
    }
  }
  checkIsValidVerbeTemps(temps: VerbeTemps): object | void{
    for(let personne in temps){
      if(!this.authorizedPersons.includes(personne)){
        return {"code": 400, "msg": `Une personne doit avoir une des valeur suivante : ${this.authorizedPersons.join(', ')}; valeur invalide détéctée: ${personne}`}
      }
      const errors = this.checkIsValidVerbeTempsPersonne(temps[personne], personne)
      if(!(typeof errors == 'undefined')){
        return errors;
      }
    }
  }
  checkIsValidVerbeTempsPersonne(personne: VerbeTempsPersonne, cle: string): object | void{
    console.log(personne)
    if(!(typeof personne['value'] === 'string')){
      return {"code": 400, "msg": `La valeur conjuguée de la personne ${cle} doit être de type string`}
    }
    if(!Number.isInteger(personne['syllabes'])){
      return {"code": 400, "msg": `le nombre de syllabes de la personne ${cle} doit être un entier`}
    }
    if(personne['syllabes'] <= 0){
      return {"code": 400, "msg": `le nombre de syllabes de la personne ${cle} doit être supérieur à 0`}
    }
  }

}
