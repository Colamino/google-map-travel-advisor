import React, { useState, useEffect, createRef } from "react";
import "./list.css";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

export default function List({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) {
  const [elRefs, setElRefs] = useState([]);

 

  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);


  return (
    <div className="list-container">
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <div className="list-loading-div">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl sx={{ minWidth: 120, marginBottom: "30px", margin: 1 }}>
            <InputLabel id="type-lable">Type</InputLabel>
            <Select
              labelId="type-lable"
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={"restaurants"}>Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120, marginBottom: "30px", margin: 1 }}>
            <InputLabel id="rating-lable">Rating</InputLabel>
            <Select
              labelId="rating-lable"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              label="Rating"
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid
            container
            spacing={3}
            sx={{ height: "75vh", overflow: "auto", mt: 1.5 }}
          >
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} item key={i} xs={12} sx={{ margin: 2 }}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}
