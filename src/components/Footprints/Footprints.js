import React, { useState, useEffect } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { GoogleMap, Marker } from "react-google-maps";
import axios from "axios";

import { WrappedGoogleMap } from "../WrappedGoogleMap/WrappedGoogleMap";
import "./styles.css";

export const Footprints = () => {
	const ref = React.useRef(null);
	const [zoom, setZoom] = React.useState(4);
	const [coordinates, setCoordinates] = React.useState({
		lat: 37.863,
		lng: 112.548,
	});
	const [currentMarker, setCurrentMarker] = React.useState(1994);

	const footprintsCoordinates = {
		1994: { lat: 37.863, lng: 112.548 },
		2012: { lat: 43.258, lng: -79.905 },
		2013: { lat: 43.661, lng: -79.395 },
		2017: { lat: 30.285, lng: -97.739 },
		2022: { lat: 30.285, lng: -97.739 },
	};

	const onSliderValueChange = (value) => {
		const years = Object.keys(footprintsCoordinates).map((strYear) =>
			parseInt(strYear)
		);

		console.log(Math.min(...years));

		if (Math.min(...years) <= value <= Math.max(...years)) {
			for (let i = 0; i < years.length; i++) {
				if (value >= years[i] && value < years[i + 1]) {
					if (years[i] !== currentMarker) {
						setCoordinates(footprintsCoordinates[years[i]]);
						setCurrentMarker(years[i]);
					}
				}
			}
		}
	};

	return (
		<div className="pageContainer">
			<div className="controllerContainer">
				<div className="sliderContainer">
					<Slider
						min={1994}
						max={2022}
						marks={{
							1994: 1994,
							2012: 2012,
							2013: 2013,
							2017: 2017,
							2022: 2022,
						}}
						onChange={(value) => onSliderValueChange(value)}
					></Slider>
				</div>
			</div>
			<div className="mapContainer">
				<WrappedGoogleMap zoom={zoom} center={coordinates}></WrappedGoogleMap>
			</div>
		</div>
	);
};
