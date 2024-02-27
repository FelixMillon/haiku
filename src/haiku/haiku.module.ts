import { Module } from '@nestjs/common';
import { HaikuController } from './haiku.controller';
import { HaikuService } from './haiku.service';

@Module({
  controllers: [HaikuController],
  providers: [HaikuService],
  exports: [HaikuService],
})
export class HaikuModule {
  
}
