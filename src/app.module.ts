import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';
import { HaikuModule } from './haiku/haiku.module';
import { LexiqueModule } from './lexique/lexique.module';
import { RacineController } from './app.controller';

@Module({
  imports: [PresentationModule, HaikuModule,LexiqueModule],
  controllers: [RacineController],
})
export class AppModule {}
