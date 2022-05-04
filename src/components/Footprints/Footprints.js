import React, { useState, useEffect } from "react";
import { render } from "@testing-library/react";
import { GoogleMap, Marker } from "react-google-maps";
import axios from "axios";

import { WrappedGoogleMap } from "../WrappedGoogleMap/WrappedGoogleMap";
import "./styles.css";

export const Footprints = () => {
	const ref = React.useRef(null);
	const [map, setMap] = React.useState();

	return (
		<div>
			<div>hello a</div>
			<WrappedGoogleMap zoom={2} center={{ lat: 30.5083, lng: 97.6789 }}>
				hello a
			</WrappedGoogleMap>
		</div>
	);
};
