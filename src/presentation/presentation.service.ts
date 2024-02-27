import { Injectable } from '@nestjs/common';

@Injectable()
export class PresentationService {
  getData(): string {
    return 'Cette application permet de générer de petits haiku basés sur un thème de saison';
  }
}
