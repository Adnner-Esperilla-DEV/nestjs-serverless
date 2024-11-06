import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './lib/User/infrastructure/nestjs/user.module';
import { PlanetModule } from './lib/Swapi/Planets/infraestructure/planet.module';
// import { User } from './lib/User/infrastructure/entities/user.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      // entities: [User],
      synchronize: true,
      // logging: true,
    }),
    UserModule,
    PlanetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
