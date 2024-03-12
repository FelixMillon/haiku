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
      let poeme = "";
      const needed_foots = [7,5,7]
      for(let index in needed_foots){
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
        const adjectifInfo = this.selectAdjectif(theme, plurality, genre, sousThemes, syllabes, needed_foots[index])
        const selectedAdj = adjectifInfo["adj"]
        const choosenThemes = adjectifInfo["choosenThemes"]
        syllabes += adjectifInfo["syllabes"]

        let conjuguedVerbe = "";
        let selectedTime = "present"
        if(syllabes < needed_foots[index]){
          // ajouter un verbe*
          const verbeObject = this.chooseVerbe(theme, choosenThemes, plurality, syllabes, needed_foots[index])
          conjuguedVerbe = verbeObject["conjuguedVerbe"]
          selectedTime = verbeObject["selectedTime"]
          syllabes += verbeObject["syllabes"]
        }
        // placer la majuscule
        let vers = `${selectedPronom}`.charAt(0).toUpperCase();
        vers += `${selectedPronom}${liaison}${selectedName} ${selectedAdj} ${conjuguedVerbe}`.slice(1);
        poeme = poeme + vers +'<br>'
      }
      return poeme;
    }
  }

  private getRandomKey(obj: any): string {
    const keys = Object.keys(obj);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  }

  private getRandomElement(unArray: string[]): string {
    const randomIndex = Math.floor(Math.random() * unArray.length);
    return unArray[randomIndex];
  }

  private selectName(theme: string, plurality: string, genre:string): string {
    let security = 0
    let finded = false;
    let selectedName = ""
    while(!finded && security < 100){
      selectedName = this.getRandomKey(this.noms[theme]);
      // a revoir
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

  private selectAdjectif(theme: string, plurality: string, genre:string, themes:string[], versSyllabes:number, needed_foot: number): object {
    let adjThemes: string[];
    let selectedAdjs: string[] = [];
    let adjSyllabes = 0
    let selectedAdj = ""
  
    for( let adj in this.adjectifs[theme][genre]){
      let adjTheme = this.adjectifs[theme][genre][adj]["themes"]
      if(this.matchTheme(adjTheme, themes) != null){
        selectedAdjs.push(adj)
      }
    }

    let security = 0
    while(security < 100){
      selectedAdj = this.getRandomElement(selectedAdjs);
      adjThemes = this.adjectifs[theme][genre][selectedAdj]['themes']
      adjSyllabes = this.adjectifs[theme][genre][selectedAdj]['syllabes']
      if(plurality == 'pluriel'){
        if(this.adjectifs[theme][genre][selectedAdj]['pluriel'] == 'std'){
          selectedAdj += 's'
        }else{
          selectedAdj = this.adjectifs[theme][genre][selectedAdj]['pluriel'] 
        }
      }
      if(adjSyllabes + versSyllabes <= needed_foot){
        break;
      }
      security ++;
    }
    if(adjSyllabes + versSyllabes > needed_foot){
      let liste_themes = "";
      for(let index in themes){
        liste_themes = liste_themes +";"+themes[index]
      }
      console.log(`pas d'adjectifs de moins de ${(needed_foot-versSyllabes).toString()} syllable(s) disponible pour le theme ${liste_themes}`)
    }
    return {
      "adj":selectedAdj,
      "syllabes": adjSyllabes,
      "choosenThemes": adjThemes
    };
  }

  private chooseVerbe(theme: string, choosenThemes: string[], plurality: string, verSyllabes: number, needed_foot: number): object{
    let security = 0
    const needed_syllabes = needed_foot- verSyllabes
    let selectedVerbe = "";
    let conjuguedVerbe = ";"
    let selectedVerbes: string[] = [];

    for( let verbe in this.verbes[theme]){
      let verbeTheme = this.verbes[theme][verbe]["themes"]
      if(this.matchTheme(verbeTheme, choosenThemes) != null){
        selectedVerbes.push(verbe);
      }
    }

    while(security < 200){
      selectedVerbe = this.getRandomElement(selectedVerbes);
      if(this.verbes[theme][selectedVerbe]['present']['3'+plurality.charAt(0)]['syllabes'] == needed_syllabes){
        conjuguedVerbe =  this.verbes[theme][selectedVerbe]['present']['3'+plurality.charAt(0)]['value']
        const syllabes =  this.verbes[theme][selectedVerbe]['present']['3'+plurality.charAt(0)]['syllabes']
        return {"conjuguedVerbe": conjuguedVerbe, "selectedTime": "present", "syllabes": syllabes}
      }else if(this.verbes[theme][selectedVerbe]['passe']['3'+plurality.charAt(0)]['syllabes'] == needed_syllabes){
        conjuguedVerbe =  this.verbes[theme][selectedVerbe]['passe']['3'+plurality.charAt(0)]['value']
        const syllabes =  this.verbes[theme][selectedVerbe]['passe']['3'+plurality.charAt(0)]['syllabes']
        return {"conjuguedVerbe": conjuguedVerbe, "selectedTime": "passe", "syllabes": syllabes}
      }else if(this.verbes[theme][selectedVerbe]['futur']['3'+plurality.charAt(0)]['syllabes'] == needed_syllabes){
        conjuguedVerbe =  this.verbes[theme][selectedVerbe]['futur']['3'+plurality.charAt(0)]['value']
        const syllabes =  this.verbes[theme][selectedVerbe]['futur']['3'+plurality.charAt(0)]['syllabes']
        return {"conjuguedVerbe": conjuguedVerbe, "selectedTime": "futur", "syllabes": syllabes}
      }
      security ++;
    }
    return {"conjuguedVerbe": "", "selectedTime": "present", "syllabes": 0}
  }

  private matchTheme(theme1: string[], theme2: string[]): string | null{
    let choosenTheme = null
    for(let index in theme1){
      if(theme2.includes(theme1[index])){
        choosenTheme = theme1[index];
        return choosenTheme
      }
    }
    return null
  }
}
