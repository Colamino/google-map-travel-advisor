import React from "react";
import "./styles.css";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Rating from "@mui/material/Rating";
import { mapStyles } from "./mapStyles";

export default function Map({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) {
  //return boolean, return false if the device is larger than 600px
  const isDesktop = useMediaQuery("(min-width:600px)");

  const mapContainer = {
    height: "85vh",
    width: "100%",
  };

  return (
    <div style={mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.length &&
          places?.map((place, i) => (
            <div
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
              className="map-div"
            >
              {!isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper
                  elevation={3}
                  sx={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100px",
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    {place.name}
                  </Typography>
                  <img
                    style={{ cursor: "pointer" }}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                    alt={place.name}
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
            </div>
          ))}
        {/* {weatherData?.list.map((data, i) => (
          <div key={i} lat={data?.coord.lat} lng={data?.coord.lon}>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              height={75}
              alt="weather-icon"
            />
          </div>
        ))} */}

        {weatherData && (
          <div lat={weatherData?.coord?.lat} lng={weatherData?.coord?.lon}>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
              height={150}
              alt="weather-icon"
            />
          </div>
        )}
      </GoogleMapReact>
    </div>
  );
}
