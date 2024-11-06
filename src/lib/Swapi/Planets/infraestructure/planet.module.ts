import { Module } from '@nestjs/common';
import { PlanetController } from './planet.controller';
import { PlanetService } from './planet.service';
import {
  PlanetGetAllUseCase,
  PlanetGetOneByIdUseCase,
} from '../application/planet.usecae';
@Module({
  controllers: [PlanetController],
  providers: [
    {
      provide: 'PlanetRepository',
      useClass: PlanetService,
    },
    PlanetGetAllUseCase,
    PlanetGetOneByIdUseCase,
  ],
})
export class PlanetModule {}
