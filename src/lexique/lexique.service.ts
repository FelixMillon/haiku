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
  getPronoms(): object {
    return pronoms;
  }
  getAdjectifs(): object {
    return adjectifs;
  }
  getVerbes(): object {
    return verbes;
  }
}
