import { Injectable } from '@nestjs/common';
import * as noms from '../../public/assets/mots/noms.json'; 
import * as pronoms from '../../public/assets/mots/pronoms.json'; 
import * as adjectifs from '../../public/assets/mots/adjectifs.json'; 
import * as verbes from '../../public/assets/mots/verbes.json'; 

@Injectable()
export class LexiqueService {
  getNoms(): object {
    return noms;
  }
  getNomsByTheme(theme: string): object {
    return noms[theme];
  }
  getNomsByThemeAndName(theme: string,nom: string){
    return noms[theme][nom];
  }
  getPronoms(): object {
    return pronoms;
  }
  getPronomsByType(type: string): object {
    return pronoms[type];
  }
  getPronomsByTypeAndPlurality(type: string,plurality: string){
    console.log(type)
    console.log(plurality)
    return pronoms[type][plurality];
  }
  getPronomsByTypeAndPluralityAndPronom(type: string,plurality: string, pronom: string){
    return pronoms[type][plurality][pronom];
  }
  getAdjectifs(): object {
    return adjectifs;
  }
  getAdjectifsByTheme(theme: string): object {
    return adjectifs[theme];
  }
  getAdjectifsByThemeAndGenre(theme: string,genre: string): object {
    return adjectifs[theme][genre];
  }
  getAdjectifsByThemeAndGenreAndAdjectif(theme: string,genre: string,adjectif: string): object {
    return adjectifs[theme][genre][adjectif];
  }
  getVerbes(): object {
    return verbes;
  }
}
