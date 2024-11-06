import { Inject, Injectable } from '@nestjs/common';
import { PlanetRepository } from '../domain/planet.repository.interface'; // La interfaz del repositorio
import { PlanetNotFoundException } from '../domain/user-not-found.exception';
@Injectable()
export class PlanetGetAllUseCase {
  constructor(
    @Inject('PlanetRepository')
    private readonly planetRepository: PlanetRepository,
  ) {}

  async execute() {
    return await this.planetRepository.getPlanets();
  }
}
export class PlanetGetOneByIdUseCase {
  constructor(
    @Inject('PlanetRepository')
    private readonly planetRepository: PlanetRepository,
  ) {}

  async execute(id: number) {
    const planet = await this.planetRepository.getPlanetById(id);
    if (!planet) {
      throw new PlanetNotFoundException();
    }
    return planet;
  }
}
