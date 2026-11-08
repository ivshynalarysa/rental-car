
import api from "./api";
import type {
    CarsResponse,
    CarFilters,
    Car,
    BookingData,
    BookingResponse
 } from "../types/car";

export interface GetCarsParams {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  perPage?: number;
  page?: number;
}

export const getCars = async (
  params: GetCarsParams = {}
): Promise<CarsResponse> => {
  const { data } = await api.get<CarsResponse>("/cars", {
    params,
  });

  return data;
};


export const getCarFilters = async (): Promise<CarFilters> => {
  const { data } = await api.get<CarFilters>("/cars/filters");

  return data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const { data } = await api.get<Car>(`/cars/${id}`);

  return data;
};


export const createBooking = async (
  carId: string,
  bookingData: BookingData
): Promise<BookingResponse> => {
  const { data } = await api.post<BookingResponse>(
    `/cars/${carId}/booking-requests`,
    bookingData
  );

  return data;
};

