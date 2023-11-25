export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  faseEvolution: number;
  fullEnvolved?: boolean;
  generation: number;
}
