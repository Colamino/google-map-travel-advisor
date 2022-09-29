import React, { useEffect, useState, useMemo } from "react";
import { getPlacesData, getWeatherData } from "./api/index";

import { CssBaseline, Grid } from "@mui/material";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

function App() {
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);

  const [type, setType] = useState("restaurants");
  const [filteredPlaces, setFilterPlaces] = useState([]);
  const [rating, setRating] = useState("");

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [weatherData, setWeatherData] = useState();
  const InitialWeatherData = useMemo(() => {
    if (!weatherData) return "";
  }, [weatherData]);

  //get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  console.log(weatherData);
  console.log({ InitialWeatherData });

  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place?.rating > rating);
    setFilterPlaces(filteredPlaces);
  }, [rating, places]);

  useEffect(() => {
    if (bounds?.sw && bounds?.ne) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );

      getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
        setPlaces(
          data?.filter((place) => place?.name && place?.num_reviews > 0)
        );
        setFilterPlaces([]);
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid
        container
        spacing={3}
        style={{ width: "100%" }}
        sx={{ justifyContent: "center", alignContent: "center", ml: 0 }}
      >
        <Grid item xs={12} md={4} style={{ paddingLeft: 0 }}>
          <List
            places={filteredPlaces?.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ paddingLeft: 0 }}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces?.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
