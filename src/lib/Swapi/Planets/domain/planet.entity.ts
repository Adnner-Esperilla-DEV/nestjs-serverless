export class Planet {
  constructor(
    public name: string,
    public clima: string,
    public diámetro: string,
    public gravedad: string,
    public período_orbital: string,
    public población: string,
    public residentes: string[],
    public período_rotación: string,
    public agua_superficial: string,
    public terreno: string,
    public url: string,
  ) {}
}
export class PlanetsResponse {
  constructor(
    public cantidad: number,
    public siguiente: string | null,
    public anterior: string | null,
    public resultado: Planet[],
  ) {}
}
