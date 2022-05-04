import { formatMs } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from "react-google-maps";

export const WrappedGoogleMap = ({ zoom, center }) => {
	const GoogleMapWithScripts = withScriptjs(
		withGoogleMap(() => (
			<GoogleMap defaultZoom={zoom} defaultCenter={center}>
				{/* <Marker position={{ lat: 30.5083, lng: 97.6789 }}></Marker> */}
			</GoogleMap>
		))
	);

	return (
		<GoogleMapWithScripts
			googleMapURL={
				"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBuBvQjnLRAYFSB5546s_miv4KR5JYM0wM"
			}
			loadingElement={<div style={{ height: "100%" }} />}
			containerElement={<div style={{ height: "100%" }} />}
			mapElement={<div style={{ height: "100%" }} />}
		/>
	);
};
