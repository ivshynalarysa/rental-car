"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import useCarById from "../../../hooks/useCarById";
import BookingForm from "../../../components/BookingForm/BookingForm";

export default function CarDetailsPage() {
  const params = useParams<{ carId: string }>();
  const { data: car, isLoading, isError, error } = useCarById(
    params.carId
  );

  if (isLoading) {
    return <p>Loading car details...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!car) {
    return <p>Car not found.</p>;
  }

return (
  <main>
    <section>
      <div>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={480}
        />
      </div>

      <div>
        <h1>
          {car.brand} {car.model}, {car.year}
        </h1>

        <p>Article: {car.id}</p>

        <p>
          {car.location.city}, {car.location.country}
        </p>

        <h2>${car.rentalPrice}</h2>

        <p>{car.description}</p>

        <h2>Rental Conditions</h2>

        <ul>
          {car.rentalConditions.map((condition, index) => (
            <li key={index}>{condition}</li>
          ))}
        </ul>

        <h2>Car Specifications</h2>

        <ul>
          <li>Year: {car.year}</li>
          <li>Type: {car.type}</li>
          <li>Fuel Consumption: {car.fuelConsumption}</li>
          <li>Engine: {car.engine}</li>
          <li>Mileage: {car.mileage.toLocaleString("en-US")} km</li>
        </ul>

        <h2>Features</h2>

        <ul>
          {car.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
                </ul>
                
        <BookingForm carId={car.id} />
      </div>
    </section>
  </main>
);
}