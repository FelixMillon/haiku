import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {updateJson, readJsonList} from '../bdd/manage_json';
@Injectable()
export class HaikuMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const logfile = './logs.json'
    let logs = readJsonList(logfile);
    let interaction = {
      "req": {
        "request": req.originalUrl,
        "body": req.body
      },
      'res': {
        "code": res.statusCode,
        // "data": res.json()
      }
    };

    logs = logs || [];
    logs.push(interaction);

    updateJson('./logs.json', logs);
    next();
  }
}
