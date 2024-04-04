import { Test, TestingModule } from '@nestjs/testing';
import { PresentationController } from './presentation.controller';
import { PresentationService } from './presentation.service';
import { Response } from 'express';

import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

jest.mock('fs');
jest.mock('path');
jest.mock('handlebars');

describe('PresentationController', () => {
  let controller: PresentationController;

  const mockResponse = () => {
    const res = {};
    res['set'] = jest.fn().mockReturnValue(res);
    res['send'] = jest.fn().mockReturnValue(res);
    return res as unknown as Response;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresentationController],
      providers: [PresentationService],
    }).compile();

    controller = module.get<PresentationController>(PresentationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should render the presentation page with the correct data', () => {
    const res = mockResponse();
    const compiledTemplateMock = jest.fn().mockImplementation((data) => {
      expect(data).toEqual({ nom: 'Haiku' });
      return 'Rendered HTML with Haiku';
    });
    (fs.readFileSync as jest.Mock).mockReturnValue('fake template content');
    (handlebars.compile as jest.Mock).mockReturnValue(compiledTemplateMock);
    (path.resolve as jest.Mock).mockReturnValue('fake/path');

    controller.getPage(res);

    expect(res.set).toHaveBeenCalledWith({ 'content-type': 'text/html' });
    expect(res.send).toHaveBeenCalledWith('Rendered HTML with Haiku');
    expect(fs.readFileSync).toHaveBeenCalledWith('fake/path', 'utf8');
    expect(handlebars.compile).toHaveBeenCalledWith('fake template content');
});

});
