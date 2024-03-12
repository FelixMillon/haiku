import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {updateJson} from '../bdd/manage_json';
import * as logs from '../../public/jsonlogs/jsonlogs.json'; 
@Injectable()
export class HaikuMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let interaction = {
      "req": {
        "request": req.originalUrl,
        "body": req.body
      },
      'res': {
        "code": res.statusCode,
        "message": res.json
      }
    }
    logs["logs"].push(interaction)
    updateJson('./public/jsonlogs/jsonlogs.json',logs);
    next();
  }
}
