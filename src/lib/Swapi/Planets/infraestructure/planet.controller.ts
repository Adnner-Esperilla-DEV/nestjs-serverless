import { Controller, Get, Param } from '@nestjs/common';
import {
  // ApiOkResponse,
  // ApiOperation,
  // ApiParam,
  // ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  PlanetGetAllUseCase,
  PlanetGetOneByIdUseCase,
} from '../application/planet.usecae';
@ApiTags('Planet')
@Controller('planet')
export class PlanetController {
  constructor(
    private readonly getAllPlanetUseCase: PlanetGetAllUseCase,
    private readonly getOnePlanetUseCase: PlanetGetOneByIdUseCase,
  ) {}
  @Get('')
  async findAll() {
    return this.getAllPlanetUseCase.execute();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getOnePlanetUseCase.execute(+id);
  }
}
