postgres models here

#### Guidelines

\*\*\* Steps to create model

- You can create Postgres model with sequelize-cli tool
  Example :- sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
  name - Table Name
  attributes - Columns

  The above command generates migration file and model file.
  (The model file will be generated in src/models/postgres folder please place it inside respective folder.)
  After generating migration file we have to run sequelize db:migrate to create the table inside the database

- We can also create model and migration file manually by creating respective files in respective folders.
