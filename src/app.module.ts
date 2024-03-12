import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';
import { HaikuModule } from './haiku/haiku.module';
import { AppService } from './app.service';
import { LexiqueModule } from './lexique/lexique.module';
import { LexiqueController } from './lexique/lexique.controller';
import { RacineController } from './app.controller';
import { HaikuMiddleware } from './middleware/middleware';

@Module({
  imports: [PresentationModule, HaikuModule,LexiqueModule],
  controllers: [RacineController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HaikuMiddleware)
      .forRoutes(LexiqueController);
  }
}
