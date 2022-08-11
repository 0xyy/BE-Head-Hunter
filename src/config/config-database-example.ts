import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'PASSWORD',
    database: 'NAME-DATABASE',
    entities: ['dist/**/**.entity{.ts,.js}'],
    logging: true,
    bigNumberStrings: false,
    synchronize: true,
    migrations: ['dist/migrations/*.js'],
    cli: {
        migrationsDir: 'migrations'
    },
} as DataSourceOptions);
