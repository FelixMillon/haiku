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
  createNom(theme: string,nom: string, body: Nom): object{
    try{
      let noms = this.getNoms();
      noms[theme][nom] = body;
      const updated = updateJson("./public/assets/mots/noms.json",noms);
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while inserting ${nom}`, "inserted": false};
    }

  }
  deleteNom(theme: string,nom: string): object{
    try{
      let noms = this.getNoms();
      delete noms[theme][nom];
      const updated = updateJson("./public/assets/mots/noms.json",noms); 
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while deleting ${nom}`, "deleted": false};
    }
  }

  getPronoms(): object {
    return pronoms;
  }
  createPronom(type: string, plurality: string, pronom: string, body: Pronom): object{
    try{
      let pronoms = this.getPronoms();
      pronoms[type][plurality][pronom] = body;
      const updated = updateJson("./public/assets/mots/pronoms.json",pronoms);
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while inserting ${pronom}`, "inserted": false};
    }
  }
  deletePronom(type: string, plurality: string, pronom: string): object{
    try{
      let pronoms = this.getPronoms();
      delete pronoms[type][plurality][pronom];
      const updated = updateJson("./public/assets/mots/pronoms.json",pronoms);
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while deleting ${pronom}`, "deleted": false};
    }
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
  createAdjectif(theme: string,genre: string,adjectif: string, body: Adjectif): object {
    try{
      let adjectifs = this.getAdjectifs();
      adjectifs[theme][genre][adjectif] = body;
      const updated = updateJson("./public/assets/mots/adjectifs.json",adjectifs);
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while inserting ${adjectif}`, "inserted": false};
    }

  }
  deleteAdjectif(theme: string,genre: string,adjectif: string): object {
    try{
      let adjectifs = this.getAdjectifs();
      delete adjectifs[theme][genre][adjectif];
      const updated = updateJson("./public/assets/mots/adjectifs.json",adjectifs);
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while deleting ${adjectif}`, "deleted": false};
    }

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
  createVerbe(theme: string,verbe: string, body: Verbe): object {
    try{
      let verbes = this.getVerbes();
      verbes[theme][verbe] = body;
      const updated = updateJson("./public/assets/mots/verbes.json",verbes);
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while inserting ${verbe}`, "inserted": false};
    }
  }
  deleteVerbe(theme: string,verbe: string): object {
    try{
      let verbes = this.getVerbes();
      delete verbes[theme][verbe];
      const updated = updateJson("./public/assets/mots/verbes.json",verbes);
      return {"code": 200, "inserted": updated};
    }catch{
      return {"code": 500, "message": `error while deleting ${verbe}`, "deleted": false};
    }
  }
}
