import { Injectable } from '@nestjs/common';
import * as noms from '../../public/assets/mots/noms.json'; 
import * as pronoms from '../../public/assets/mots/pronoms.json'; 
import * as adjectifs from '../../public/assets/mots/adjectifs.json'; 
import * as verbes from '../../public/assets/mots/verbes.json';
import { Nom } from '../types/nom';
import { Pronom } from '../types/pronom';
import { Adjectif } from '../types/adjectif';
import { Verbe } from '../types/verbe';
import { updateJson } from '../bdd/manage_json';

@Injectable()
export class LexiqueService {
  getNoms(): object {
    return noms;
  }
  getNomsByTheme(theme: string): object {
    return noms[theme];
  }
  getNom(theme: string,nom: string): object{
    return noms[theme][nom];
  }
  createNom(theme: string,nom: string, body: Nom): boolean{
    let noms = this.getNoms();
    noms[theme][nom] = body;
    const updated = updateJson("noms.json",noms);
    return updated;
  }
  deleteNom(theme: string,nom: string): boolean{
    let noms = this.getNoms();
    delete noms[theme][nom];
    const updated = updateJson("noms.json",noms); 
    return updated;
  }

  getPronoms(): object {
    return pronoms;
  }
  createPronom(type: string, plurality: string, pronom: string, body: Pronom): boolean{
    let pronoms = this.getPronoms();
    pronoms[type][plurality][pronom] = body;
    const updated = updateJson("pronoms.json",pronoms);
    return updated;
  }
  deletePronom(type: string, plurality: string, pronom: string): boolean{
    let pronoms = this.getPronoms();
    delete pronoms[type][plurality][pronom];
    const updated = updateJson("pronoms.json",pronoms);
    return updated;
  }
  getPronomsByType(type: string): object {
    return pronoms[type];
  }
  getPronomsByTypeAndPlurality(type: string,plurality: string): object{
    return pronoms[type][plurality];
  }
  getPronom(type: string,plurality: string, pronom: string): object{
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
  getAdjectif(theme: string,genre: string,adjectif: string): object {
    return adjectifs[theme][genre][adjectif];
  }
  createAdjectif(theme: string,genre: string,adjectif: string, body: Adjectif): boolean {
    let adjectifs = this.getAdjectifs();
    adjectifs[theme][genre][adjectif] = body;
    const updated = updateJson("adjectifs.json",adjectifs);
    return updated;
  }
  deleteAdjectif(theme: string,genre: string,adjectif: string): boolean {
    let adjectifs = this.getAdjectifs();
    delete adjectifs[theme][genre][adjectif];
    const updated = updateJson("adjectifs.json",adjectifs);
    return updated;
  }

  getVerbes(): object {
    return verbes;
  }
  getVerbesByTheme(theme: string): object {
    return verbes[theme];
  }
  getVerbe(theme: string, verbe: string): object {
    return verbes[theme][verbe];
  }
  createVerbe(theme: string,verbe: string, body: Verbe): boolean {
    let verbes = this.getVerbes();
    verbes[theme][verbe] = body;
    const updated = updateJson("verbes.json",adjectifs);
    return updated;
  }
  deleteVerbe(theme: string,verbe: string): boolean {
    let verbes = this.getVerbes();
    delete verbes[theme][verbe];
    const updated = updateJson("verbes.json",adjectifs);
    return updated;
  }
}
