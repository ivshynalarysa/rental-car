"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import useCarById from "../../../hooks/useCarById";
import BookingForm from "../../../components/BookingForm/BookingForm";
import styles from "./card.module.css";


const iconList: Record<string, string> = {
  location: "/sprite.svg#icon-location",
  check: "/sprite.svg#icon-checkcircle",
  road: "/sprite.svg#icon-road",
  car: "/sprite.svg#icon-car",
  fuel: "/sprite.svg#icon-pumpoil",
  settings: "/sprite.svg#icon-settings",
  calendar: "/sprite.svg#icon-calendar",
  exclamation: "/sprite.svg#icon-exclamation",
};

function Icon({ name }: { name: keyof typeof iconList }) {
  return (
    <svg className={styles.icon} aria-hidden="true">
      <use href={iconList[name]} />
    </svg>
  );
}

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
  <main className={styles.page}>
        <section className={styles.container}>
            <div className={styles.leftColumn}>
      <div className={styles.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={640}
          height={480}
        />
                </div>

        <BookingForm carId={car.id} />        

            </div>
      

            <div className={styles.details}>
                <div className={styles.carHeader}>
                    <h2 className={styles.title}>
                        {car.brand} {car.model}, {car.year}
                    </h2>
                    <span className={styles.article}>
                        Article: {car.id.slice(0,4)}
                    </span>
                </div>

                <p className={styles.location}>
                    <Icon name="location" />
          {car.location.city}, {car.location.country}
        </p>

                <p className={styles.price}>
                    ${car.rentalPrice}</p>

                <p className={styles.description}>
                    {car.description}</p>
                

                <div className={styles.infoSectionBlock}>
                    <div className={styles.infoSection}>
                  <h3 className={styles.infoSectionTitle}>Rental Conditions</h3>
                   <ul className={styles.list}>
                    {car.rentalConditions.map((condition, index) => (
                        <li key={index}>
                            <Icon name="check" />
                            {condition}
                        </li>
                    ))}
                   </ul>
                    </div>
                    
                    <div className={styles.infoSection} >
                      <h3 className={styles.infoSectionTitle}>Car Specifications</h3>

                <ul className={styles.list}>
                        <li>
                            <Icon name="calendar" />
                            Year: {car.year}
                        </li>
                        <li>
                            <Icon name="car" />
                            Type: {car.type}
                        </li>
                        <li>
                            <Icon name="fuel" />
                            Fuel Consumption: {car.fuelConsumption}
                        </li>
                        <li>
                            <Icon name="settings" />
                            Engine: {car.engine}
                        </li>
                        <li>
                            <Icon name="road" />
                            Mileage: {car.mileage.toLocaleString("en-US")} km
                        </li>
                </ul>   
                    </div>  
                
                    <div className={styles.infoSection}>
    
           <h3 className={styles.infoSectionTitle}>Features</h3>

        <ul className={styles.list}>
          {car.features.map((feature, index) => (
              <li key={index}>
                  <Icon name="check" />
                  {feature}</li>
          ))}
                        </ul>
                        </div>
          </div>     

       
                
        
      </div>
    </section>
  </main>
);
}