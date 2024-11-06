import { Planet } from './planet.entity';
import { PlanetsResponse } from './planet.entity';

export interface PlanetRepository {
  getPlanets(): Promise<PlanetsResponse>;
  getPlanetById(id: number): Promise<Planet>;
}
