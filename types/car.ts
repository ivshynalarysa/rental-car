
export interface CarLocation {
  country: string;
  city: string;
  address: string;
}

export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engine: string;
  features: string[];
  rentalPrice: string;
  rentalCompany: string;
  location: CarLocation;
  rentalConditions: string[];
  mileage: number;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}


export interface CarFilters {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}


export interface BookingData {
  name: string;
  email: string;
  comment: string;
}

export interface BookingResponse {
  message: string;
}

