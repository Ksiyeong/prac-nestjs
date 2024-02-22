import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: null,
    database: process.env.DB_DATABASE,
    // database: 'board-app',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}
