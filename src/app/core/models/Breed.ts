export interface Breed {
  id: string;
  name: string;
  origin: string;
  temperament: string;
  description: string;
  intelligence: number;
  adaptability: number;
  life_span: string;
  image?: {
    url: string;
  };
  vetstreet_url?: string;
}