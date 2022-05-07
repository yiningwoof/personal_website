import React, { useEffect, useRef } from "react";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";

import "./styles.css";

export const WrappedGoogleMap = ({ zoom, center }) => {
	const map = () => {
		return (
			<GoogleMap defaultZoom={zoom} defaultCenter={center}>
				<Marker position={center}></Marker>
			</GoogleMap>
		);
	};
	const GoogleMapWithScripts = withScriptjs(withGoogleMap(map));

	return (
		<GoogleMapWithScripts
			googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.GOOGLE_MAPS_API_KEY}`}
			loadingElement={<div style={{ height: "100%" }} />}
			containerElement={<div style={{ height: "100%" }} />}
			mapElement={<div style={{ height: "100%" }} />}
		/>
	);
};
