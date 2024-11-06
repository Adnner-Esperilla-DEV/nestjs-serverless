export class PlanetNotFoundException extends Error {
  constructor() {
    super('Planet not found');
  }
}
