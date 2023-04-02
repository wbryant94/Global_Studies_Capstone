import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";
import classes from "./WorldMap.module.css";
import allCountries from "../../data/countries.json";
import IntroCard from "./IntroCard.jsx";

import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
  Popup,
  FeatureGroup,
  Circle,
} from "react-leaflet";

const WorldMap = (props) => {
  const [modal, setModal] = useState(false);

  const Popup = ({ feature }) => {
    let popupContent;
    if (feature.properties && feature.properties.popupContent) {
      popupContent = feature.properties.popupContent;
    }
  };

  // wait for click on a country and display ResourceList modal according to data belonging to that country
  const [showResources, setShowResources] = useState(false);

  let countryList = [];
  const forEachCountry = (country, layer) => {
    const countryTitle = country.properties.ADMIN;
    countryList.push(countryTitle);

    layer.bindPopup(ReactDOMServer.renderToString(country.properties.ADMIN));

    // Toggle country to be UNCA color upon a click event //
    layer.on({
      click: (event) => {
        console.log(event.target.feature.properties.ADMIN);
      },
    });
  };

  const { BaseLayer } = LayersControl;

  return (
    <MapContainer
      center={[10, 10]}
      style={{ height: "100vh" }}
      zoom={3}
      minZoom={3}
      maxZoom={8}
      scrollWheelZoom={true}
    >
      <IntroCard />
      <GeoJSON
        style={classes.countryStyling}
        data={allCountries.features}
        onEachFeature={forEachCountry}
      ></GeoJSON>
      <LayersControl>
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          />
        </BaseLayer>
        <BaseLayer name="NASA Gibs Blue Marble">
          <TileLayer
            url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
            attribution="&copy; NASA Blue Marble, image service by OpenGeo"
            maxNativeZoom={8}
          />
        </BaseLayer>
      </LayersControl>
    </MapContainer>
  );
};

export default WorldMap;
