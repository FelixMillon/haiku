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
    try{
      const data = noms
      return {"code": 200, "data": data};
    }catch{
      return {"code": 500, "message": `error while reading noms`};
    }
  }
  getNomsByTheme(theme: string): object {
    try{
      const data = noms[theme]
      return {"code": 200, "data": data};
    }catch{
      return {"code": 500, "message": `error while reading noms by theme`};
    }
  }
  getNom(theme: string,nom: string): object{
    try{
      const data = noms[theme][nom];
      return {"code": 200, "data": data};
    }catch{
      return {"code": 500, "message": `error while reading nom '${nom}'`};
    }
  }
  createNom(theme: string,nom: string, body: Nom): object{
    try{
      let noms = this.getNoms();
      noms[theme][nom] = body;
      const updated = updateJson("./public/assets/mots/noms.json",noms);
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while inserting '${nom}'`, "inserted": false};
    }
  }
  deleteNom(theme: string,nom: string): object{
    try{
      let noms = this.getNoms();
      delete noms[theme][nom];
      const updated = updateJson("./public/assets/mots/noms.json",noms); 
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while deleting '${nom}'`, "deleted": false};
    }
  }

  getPronoms(): object {
    try{
      const data = pronoms
      return {"code": 200, "data": data};
    }catch{
      return {"code": 500, "message": `error while reading pronoms`};
    }
  }
  getPronomsByType(type: string): object {
    try{
      const data = pronoms[type];
      return {"code": 200, "data": data};
    }catch{
      return {"code": 500, "message": `error while reading pronoms by type '${type}'`};
    }
  }
  getPronomsByTypeAndPlurality(type: string,plurality: string): object{
    try{
      const data = pronoms[type][plurality];
      return {"code": 200, "data": data};
    }catch{
      return {"code": 500, "message": `error while reading pronoms by type '${type}' and plurality '${plurality}'`};
    }
  }
  getPronom(type: string,plurality: string, pronom: string): object{
    try{
      const data = pronoms[type][plurality][pronom];
      return {"code": 200, "data": data};
    }catch{
      return {"code": 500, "message": `error while reading pronom '${pronom}'`};
    }
  }
  createPronom(type: string, plurality: string, pronom: string, body: Pronom): object{
    try{
      let pronoms = this.getPronoms();
      pronoms[type][plurality][pronom] = body;
      const updated = updateJson("./public/assets/mots/pronoms.json",pronoms);
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while inserting '${pronom}'`, "inserted": false};
    }
  }
  deletePronom(type: string, plurality: string, pronom: string): object{
    try{
      let pronoms = this.getPronoms();
      delete pronoms[type][plurality][pronom];
      const updated = updateJson("./public/assets/mots/pronoms.json",pronoms);
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while deleting '${pronom}'`, "deleted": false};
    }
  }

  getAdjectifs(): object {
    try{
      const data = adjectifs
      return {"code": 200, "data": data};
    }catch{
      return {"code": 500, "message": `error while reading adjectifs`};
    }
  }
  getAdjectifsByTheme(theme: string): object {
    try{
      const data = adjectifs[theme];
      return {"code": 200, "data": data};
    }catch{
      return {"code": 500, "message": `error while reading adjectifs by theme '${theme}'`};
    }
  }
  getAdjectifsByThemeAndGenre(theme: string,genre: string): object {
    try{
      const data = adjectifs[theme][genre];
      return {"code": 200, "data": data};
    }catch{
      return {"code": 500, "message": `error while reading adjectifs by theme '${theme}' and genre '${genre}'`};
    }
  }
  getAdjectif(theme: string,genre: string,adjectif: string): object {
    try{
      const data = adjectifs[theme][genre][adjectif];
      return {"code": 200, "data": data};
    }catch{
      return {"code": 500, "message": `error while reading adjectif '${adjectif}'`};
    }
  }
  createAdjectif(theme: string,genre: string,adjectif: string, body: Adjectif): object {
    try{
      let adjectifs = this.getAdjectifs();
      adjectifs[theme][genre][adjectif] = body;
      const updated = updateJson("./public/assets/mots/adjectifs.json",adjectifs);
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while inserting '${adjectif}'`, "inserted": false};
    }

  }
  deleteAdjectif(theme: string,genre: string,adjectif: string): object {
    try{
      let adjectifs = this.getAdjectifs();
      delete adjectifs[theme][genre][adjectif];
      const updated = updateJson("./public/assets/mots/adjectifs.json",adjectifs);
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while deleting '${adjectif}'`, "deleted": false};
    }

  }

  getVerbes(): object {
    try{
      const data = verbes;
      return {"code": 200, "data": data};
    }catch{
      return {"code": 500, "message": `error while reading verbes`};
    }
  }
  getVerbesByTheme(theme: string): object {
    try{
      const data = verbes[theme];
      return {"code": 200, "data": data};
    }catch{
      return {"code": 500, "message": `error while reading verbes by theme : '${theme}'`};
    }
  }
  getVerbe(theme: string, verbe: string): object {
    try{
      const data = verbes[theme][verbe];
      return {"code": 200, "data": data};
    }catch{
      return {"code": 500, "message": `error while reading verbe '${verbe}'`};
    }
  }
  createVerbe(theme: string,verbe: string, body: Verbe): object {
    try{
      let verbes = this.getVerbes();
      verbes[theme][verbe] = body;
      const updated = updateJson("./public/assets/mots/verbes.json",verbes);
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while inserting '${verbe}'`, "inserted": false};
    }
  }
  deleteVerbe(theme: string,verbe: string): object {
    try{
      let verbes = this.getVerbes();
      delete verbes[theme][verbe];
      const updated = updateJson("./public/assets/mots/verbes.json",verbes);
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while deleting '${verbe}'`, "deleted": false};
    }
  }
}
