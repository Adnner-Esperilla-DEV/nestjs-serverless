import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PlanetRepository } from '../domain/planet.repository.interface';
import { Planet, PlanetsResponse } from '../domain/planet.entity';

const SWAPI_URL = 'https://swapi.py4e.com/api/planets';

@Injectable()
export class PlanetService implements PlanetRepository {
  async getPlanets(): Promise<PlanetsResponse> {
    try {
      const response = await axios.get(SWAPI_URL);
      const data = {
        cantidad: response.data.count,
        siguiente: response.data.next,
        anterior: response.data.previous,
        resultado: response.data.results.map((item: any) =>
          this.transformPlanetData(item),
        ),
      };
      return data;
    } catch (error) {
      console.error('Error al obtener el planeta de SWAPI:', error.message);
      throw new Error('Error al obtener los planetas de SWAPI');
    }
  }

  async getPlanetById(id: number): Promise<Planet> {
    try {
      const response = await axios.get(`${SWAPI_URL}/${id}`);
      return this.transformPlanetData(response.data);
    } catch (error) {
      console.error('Error al obtener el planeta de SWAPI:', error.message);
      throw new Error('Error al obtener el planeta de SWAPI');
    }
  }
  private transformPlanetData(data: any): Planet {
    return new Planet(
      data.name,
      data.climate,
      data.diameter,
      data.gravity,
      data.orbital_period,
      data.population,
      data.residents,
      data.rotation_period,
      data.surface_water,
      data.terrain,
      data.url,
    );
  }
}
