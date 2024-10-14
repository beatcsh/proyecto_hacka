// types.ts
export interface Zone {
    location: {
      type: string;
      coordinates: number[][]; // Cambia esto según el tipo de GeoJSON que estés usando
    };
    dangerLevel: string; // o el tipo que correspondan
    description: string; // o el tipo correspondiente
  }
  