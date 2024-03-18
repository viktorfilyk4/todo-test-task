import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

// TODO: move it to `main.ts` and check if seeding would work
config({ path: ['.env.development'] });

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'], // TODO: change to better solution
  synchronize: true, // do not set it true in production application
  logging: +process.env.DB_LOG_QUERIES ? true : false,
  seeds: ['dist/db/seeds/**/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);
