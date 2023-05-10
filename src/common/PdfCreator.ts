const pdf = require('pdf-creator-node');
import { readFileSync } from 'fs';

export class PdfCreator {
  create(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const html = readFileSync(__dirname + '/pdf-template.html', {
        encoding: 'utf-8',
      });

      const options = {
        format: 'A3',
        orientation: 'portrait',
        border: '15mm',
        header: {
          height: '10',
          contents: '<div style="text-align: center;"></div>',
        },
        footer: {
          height: '15mm',
          contents: {
            default:
              '<div style="text-align: right;"><span style="color: #444;">{{page}}</span>/<span>{{pages}}</span></div>',
          },
        },
      };

      const document = {
        html: html,
        data: data,
        path: './output.pdf',
        type: 'buffer',
      };

      pdf
        .create(document, options)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}
