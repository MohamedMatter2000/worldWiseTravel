/* eslint-disable no-unused-vars */
import styles from "./City.module.css";
import { useEffect } from "react";
import Spinner from "./Spinner";
import { useSearchParams, useParams } from "react-router-dom";
import { useCities } from "../contexts/CitesContexts";
import BackBuuton from "./BackBuuton";
import { useCallback } from "react";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // TEMP DATA
  const { id } = useParams();
  const { getcity, currentCity, isLoading } = useCities();
  useEffect(
    function () {
      getcity(id);
    },
    [id, getcity]
  );
  const { cityName, emoji, date, notes } = currentCity;
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}
      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <BackBuuton />
      </div>
    </div>
  );
}

export default City;
