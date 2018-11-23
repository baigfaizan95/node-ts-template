// tslint:disable-next-line:import-name
import Sequelize from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';
import { Configs } from '@configs';
const basename = path.basename(module.filename);
const files: any = [];
const db: any = {};
const folders: any = [];

const sequelize = new Sequelize(Configs.dbConfig);
// To import all the models
const sortDir = (mainDir: string) => {
  folders.push(mainDir);
  let i = 0;
  do {
    sortPath(folders[i]);
    i += 1;
  } while (i < folders.length);
};

const checkFile = (filePath: string) => fs.statSync(filePath).isFile();

const sortPath = (dir: string) => {
  fs.readdirSync(dir)
    .filter((file: string) => {
      if (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        !file.includes('.js.map')
      ) {
        return file;
      }
      // file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })
    .forEach((res: any) => {
      const filePath = path.join(dir, res);
      if (checkFile(filePath)) {
        files.push(filePath);
      } else {
        folders.push(filePath);
      }
    });
};

sortDir(__dirname);

files.forEach((file: string) => {
  const model = sequelize.import(file);
  db[model['name']] = model;
});

Object.keys(db).forEach((model: any) => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

db['sequelize'] = sequelize;
db['Sequelize'] = Sequelize;

module.exports = db;
