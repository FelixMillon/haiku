import { Module } from '@nestjs/common';
import { LexiqueController } from './lexique.controller';
import { LexiqueService } from './lexique.service';

@Module({
  controllers: [LexiqueController],
  providers: [LexiqueService],
  exports: [LexiqueService],
})
export class LexiqueModule {
  
}
