import { Controller, Get } from '@nestjs/common';
@Controller()
export class RacineController {
  constructor(
  ) {}

  @Get()
  getPrez(): string {
    return `
    <a href="/lexique/">/lexique/</a><br>
    <a href="/haiku/">/haiku/</a><br>
    <a href="/presentation/">/presentation/</a><br>
    `;
  }

}
