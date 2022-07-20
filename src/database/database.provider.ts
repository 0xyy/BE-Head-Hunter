import { dataSource } from '../config/config-database';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => dataSource.initialize(),
  },
];
