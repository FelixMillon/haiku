import { Controller, Get, Res } from '@nestjs/common';
import { PresentationService } from './presentation.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

@Controller('presentation')
export class PresentationController {
  constructor(private readonly presentationService: PresentationService) {}

  @Get()
  getPage(@Res({ passthrough: true }) res: Response): void {
    const templatePath = path.resolve(__dirname, '../../../public/assets/views/presentation.hbs');
    const template = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = handlebars.compile(template);
    const renderedHtml = compiledTemplate({ nom: 'Haiku' });

    res.set({ 'content-type': 'text/html' }).send(renderedHtml);
  }
}
