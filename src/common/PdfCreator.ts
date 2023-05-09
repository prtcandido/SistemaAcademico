// //Required package
// var pdf = require('pdf-creator-node');
// var fs = require('fs');

const pdf = require('pdf-creator-node');
import { readFileSync } from 'fs';

export class PdfCreator {
  create(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      // Read HTML Template
      const html = readFileSync(__dirname + '/pdf-template.html', {
        encoding: 'utf-8',
      });

      const options = {
        format: 'A3',
        orientation: 'portrait',
        border: '10mm',
        footer: {
          height: '28mm',
          contents: {
            default:
              '<div style="text-align: right;"><span style="color: #444;">{{page}}</span>/<span>{{pages}}</span></div>', // fallback value
          },
        },
      };

      const document = {
        html: html,
        data: data,
        path: './output.pdf',
        type: 'buffer',
      };
      // By default a file is created but you could switch between Buffer and Streams by using "buffer" or "stream" respectively.

      const response = pdf
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
