import { Controller, Get, Param } from '@nestjs/common';
import { HaikuService } from './haiku.service';
@Controller('haiku')
export class HaikuController {
  constructor(private readonly haikuService: HaikuService) {}
  private authorizedThemes = ["ete","printemps","automne","hiver"]
  private noms = this.haikuService.getNoms();
  private pronoms = this.haikuService.getPronoms();
  private adjectifs = this.haikuService.getAdjectifs();
  private verbes = this.haikuService.getVerbes();
  getNoms(): object {
    return this.noms;
  }
  getPronoms(): object {
    return this.pronoms;
  }
  getAdjectifs(): object {
    return this.adjectifs;
  }
  getVerbes(): object {
    return this.verbes;
  }
  @Get()
  getPrez(): string {
    return `
    <a href="/haiku/printemps/">/haiku/printemps/</a><br>
    <a href="/haiku/ete/">/haiku/ete/</a><br>
    <a href="/haiku/automne/">/haiku/automne/</a><br>
    <a href="/haiku/hiver/">/haiku/hiver/</a><br>
    <a href="/">accueil</a><br>
    `;
  } 
  @Get(':theme')
  getExample(@Param('theme') theme: string): string {
    if(!this.authorizedThemes.includes(theme)){
      return "le thème d'un haiku est toujours printemps, été, automne ou hiver";
    }else{
      // choix pluriel ou singulier
      let plurality = this.getRandomKey(this.pronoms['demonstratif'])
      // selection du pronom
      let selectedPronom = this.getRandomKey(this.pronoms['demonstratif'][plurality])
      // definition du genre
      let genre = this.pronoms['demonstratif'][plurality][selectedPronom]['genre']
      // nombre de syllabes dans le pronom
      let syllabes = this.pronoms['demonstratif'][plurality][selectedPronom]['syllabes']
      //initialisation du nom
      let selectedName = ""
      //initialisation de la liaison entre nom et pronom
      let liaison = " "

      //selection du nom
      selectedName = this.selectName(theme, plurality, genre);

      // cle nom
      const keyName = selectedName
      // recuperations des sous themes associés
      const sousThemes = this.noms[theme][selectedName]['themes']

      //ajout des syllabes du nom
      syllabes += this.noms[theme][selectedName]['syllabes']

      //conjuguer le nom en fonction du pronom
      const conjugaisons = this.conjugueName(theme, plurality, selectedName, selectedPronom)
      selectedName = conjugaisons["conjugName"]
      selectedPronom = conjugaisons["conjugPronom"]
      if(selectedPronom == "l'"){
        syllabes = syllabes - 1
        liaison = ""
      }

      // en cas de genre indeterminé, prendre le genre du nom
      if(genre == 'i'){
        genre = this.noms[theme][keyName]['genre']
      }

      //selectionner et conjuguer adjectif
      const adjectifInfo = this.selectAdjectif(theme, plurality, genre, sousThemes)
      const selectedAdj = adjectifInfo["adj"]
      syllabes += adjectifInfo["syllabes"]
      return `${selectedPronom}${liaison}${selectedName} ${selectedAdj} : ${syllabes}`
    }
  }

  private getRandomKey(obj: any): string {
    const keys = Object.keys(obj);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  }

  private selectName(theme: string, plurality: string, genre:string): string {
    let security = 0
    let finded = false;
    let selectedName = ""
    while(!finded && security < 100){
      selectedName = this.getRandomKey(this.noms[theme]);
      if(this.noms[theme][selectedName]['pluriel'] == 'idnb' && plurality == 'singulier'){
        if(this.noms[theme][selectedName]['genre'] == genre){
          finded = true;
        }
      }
      if(this.noms[theme][selectedName]['genre'] == genre){
        finded = true;
      }
      security ++;
    }
    return selectedName;
  }

  private conjugueName(theme: string, plurality: string, nameKey: string, pronomKey: string):object{
    let conjugName = nameKey;
    let conjugPronom = pronomKey;
    if(plurality == 'pluriel'){
      if(this.noms[theme][nameKey]['pluriel'] != 'idnb'){
        if(this.noms[theme][nameKey]['pluriel'] == 'std') {
          conjugName += 's'
        }else{
          conjugName = this.noms[theme][nameKey]['pluriel']
        }
      }
    }else if(this.noms[theme][nameKey]['liaison'] != 0 && this.pronoms['demonstratif'][plurality][pronomKey]['liaison'] != 0){
      conjugPronom = this.pronoms['demonstratif'][plurality][pronomKey]['liaison']
    }
    return {"conjugName": conjugName, "conjugPronom": conjugPronom}
  }

  private selectAdjectif(theme: string, plurality: string, genre:string, themes:string[]): object {
    let security = 0
    let finded = false;
    let selectedAdj = ""
    let adjThemes: string[];
    let matchThemes = false
    let syllabes = 0
    while(!finded && security < 100){
      selectedAdj = this.getRandomKey(this.adjectifs[theme][genre]);
      adjThemes = this.adjectifs[theme][genre][selectedAdj]['themes']
      console.log(adjThemes)
      console.log(themes)
      for(let index in themes){
        if(adjThemes.includes(themes[index])){
          matchThemes = true
          console.log(themes[index])
        }
      }
      if(matchThemes){
        syllabes = this.adjectifs[theme][genre][selectedAdj]['syllabes']
        if(plurality == 'pluriel'){
          if(this.adjectifs[theme][genre][selectedAdj]['pluriel'] == 'std'){
            selectedAdj += 's'
          }else{
            selectedAdj = this.adjectifs[theme][genre][selectedAdj]['pluriel'] 
          }
        }
        finded = true;
      }
      security ++;
    }
    return {
      "adj":selectedAdj,
      "syllabes": syllabes
    };
  }
}
