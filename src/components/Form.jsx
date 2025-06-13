/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUrlpositon } from "../hook/useUrlposition";
import BackBuuton from "./BackBuuton";
import Button from "./Button";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./Form.module.css";
import { useCities } from "../contexts/CitesContexts";
import { useNavigate } from "react-router-dom";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const Base_Url = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlpositon();
  const { createCity, isLoading } = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setisLoadingGeocoding] = useState(false);
  const [emoji, setemoji] = useState("");
  const [geocodingError, setgeocodingError] = useState("");
  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setisLoadingGeocoding(true);
          setgeocodingError("");
          const res = await fetch(
            `${Base_Url}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data);
          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city click SomeWhere eles"
            );
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setemoji(convertToEmoji(data.countryCode));
        } catch (err) {
          console.log(err.message);
          setgeocodingError(err.message);
        } finally {
          setisLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );
  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName && date) return;
    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }
  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng) return <Message message={"fakkafk;la;ka"} />;
  if (geocodingError) return <Message message={geocodingError} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(data) => setDate(data)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackBuuton />
      </div>
    </form>
  );
}

export default Form;
