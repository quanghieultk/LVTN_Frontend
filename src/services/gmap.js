// import "mapbox-gl/dist/mapbox-gl.css";
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import React, { useState, useRef, useCallback, useEffect, Component } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import ReactMapGL, { Marker, NavigationControl, FullscreenControl } from "react-map-gl";
// import Geocoder from "react-map-gl-geocoder";
// import LocationOnIcon from '@material-ui/icons/LocationOn';
// import DeckGL, { GeoJsonLayer } from 'deck.gl';

// import { locationActions } from './../actions/location.actions';
// // Please be a decent human and don't abuse my Mapbox API token.
// // If you fork this sandbox, replace my API token with your own.
// // Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
// const MAPBOX_TOKEN =
// 	// 'pk.eyJ1IjoidG9hbmRvIiwiYSI6ImNrbThscTh4cjBrNnQycHF5MWJqd29jaDQifQ.LNubsbmqGfZhCCRymL-A2g';
// 	"pk.eyJ1Ijoiam9obmJvcyIsImEiOiJjanl1b3l1MmkwaDdnM2pwaG5yNm1mZmlrIn0.O7X5QEcRO2ncLo_vLMVeTQ";

// export default function GMap() {

// 	// const locate=useSelector(state=>state.location);
// 	const dispatch = useDispatch();
// 	const [viewport, setViewport] = useState({
// 		width: "100%",
// 		height: "100%",
// 		latitude: 0,
// 		longitude: 0,
// 		zoom: 15
// 	});
// 	const [searchResultLayer, setSearchResultLayer] = useState(null);
// 	const [position, setPosition] = useState({
// 		latitude: 0,
// 		longitude: 0
// 	})
// 	const navStyle = {
// 		position: "absolute",
// 		top: 36,
// 		left: 0,
// 		padding: "10px"
// 	};
// 	const fullscreenControlStyle = {
// 		position: "absolute",
// 		top: 0,
// 		left: 0,
// 		padding: "10px"
// 	};
// 	const mapRef = useRef();
// 	const geocoderContainerRef = useRef();
// 	const handleViewportChange = useCallback(
// 		(newViewport) => setViewport(newViewport),
// 		[]
// 	);

// 	const handleGeocoderViewportChange = useCallback(
// 		(newViewport) => {
// 			const geocoderDefaultOverrides = { transitionDuration: 1000 };
// 			return handleViewportChange({
// 				...newViewport,
// 				...geocoderDefaultOverrides
// 			});
// 		},
// 		[]
// 	);
// 	function handleOnResult(event) {
// 		setSearchResultLayer(new GeoJsonLayer({
// 			id: "search-result",
// 			data: event.result.geometry,
// 			getFillColor: [255, 0, 0, 128],
// 			getRadius: 1000,
// 			pointRadiusMinPixels: 10
// 		}))
// 	}

// 	useEffect(() => {
// 		navigator.geolocation.getCurrentPosition(
// 			function (position) {
// 				setViewport({
// 					latitude: position.coords.latitude,
// 					longitude: position.coords.longitude,
// 					zoom: 15
// 				})
// 				setPosition({
// 					latitude: position.coords.latitude,
// 					longitude: position.coords.longitude,
// 				})
// 			},
// 			function (error) {
// 				console.error("Error Code = " + error.code + " - " + error.message);
// 			}
// 		);
// 	}, []);

// 	return (
// 		<div style={{ height: "100%" }}>
// 			<ReactMapGL
// 				ref={mapRef}
// 				{...viewport}
// 				width="100%"
// 				height="100%"
// 				onViewportChange={handleViewportChange}
// 				mapboxApiAccessToken={MAPBOX_TOKEN}

// 			>
// 				<div className="nav" style={navStyle}>
// 					<NavigationControl />
// 				</div>
// 				<div className="fullscreen" style={fullscreenControlStyle}>
// 					<FullscreenControl />
// 				</div>
// 				<Geocoder
// 					// limit={2}
// 					mapRef={mapRef}
// 					containerRef={geocoderContainerRef}
// 					onViewportChange={handleGeocoderViewportChange}
// 					mapboxApiAccessToken={MAPBOX_TOKEN}
// 					position="top-right"
// 					// onResult={(result)=>{dispatch(locationActions.setLocation(result.result.center,result.result.place_name));}}
// 					onResult={handleOnResult}
// 				/>
// 				<Marker
// 					key="marker_1"
// 					longitude={position.longitude}
// 					latitude={position.latitude}
// 				>
// 					<LocationOnIcon></LocationOnIcon>
// 				</Marker>
// 			</ReactMapGL>
// 		</div>
// 	);
// };

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { GeoJsonLayer } from "deck.gl";
import { connect } from "react-redux";
import { locationActions } from './../actions/location.actions';

class Map extends Component {
	state = {
		viewport: {
			latitude: 37.7577,
			longitude: -122.4376,
			zoom: 8
		},
		searchResultLayer: null
	};

	mapRef = React.createRef();

	handleViewportChange = viewport => {
		this.setState({
			viewport: { ...this.state.viewport, ...viewport }
		});
	};
	handleGeocoderViewportChange = viewport => {
		const geocoderDefaultOverrides = { transitionDuration: 1000 };

		return this.handleViewportChange({
			...viewport,
			...geocoderDefaultOverrides
		});
	};

	handleOnResult = event => {
		const { dispatch } = this.props;
		dispatch(locationActions.setLocation(event.result.center,event.result.place_name))
		this.setState({
			searchResultLayer: new GeoJsonLayer({
				id: "search-result",
				data: event.result.geometry,
				getFillColor: [255, 0, 0, 128],
				getRadius: 1000,
				pointRadiusMinPixels: 10,
				pointRadiusMaxPixels: 10
			})
		});
	};

	render() {
		const { viewport } = this.state;
		return (
			<ReactMapGL
				ref={this.mapRef}
				mapboxApiAccessToken={
					"pk.eyJ1IjoidG9hbmRvIiwiYSI6ImNrbThscTh4cjBrNnQycHF5MWJqd29jaDQifQ.LNubsbmqGfZhCCRymL-A2g"
				}
				width="100%"
				height="100%"
				{...viewport}
				onViewportChange={this.handleViewportChange}
			>
				<Geocoder
					id="ABC"
					mapRef={this.mapRef}
					onResult={this.handleOnResult}
					onViewportChange={this.handleGeocoderViewportChange}
					mapboxApiAccessToken={
						"pk.eyJ1IjoidG9hbmRvIiwiYSI6ImNrbThscTh4cjBrNnQycHF5MWJqd29jaDQifQ.LNubsbmqGfZhCCRymL-A2g"
					}
					position="top-right"
				/>
			</ReactMapGL>
		);
	}
}

const GMap = connect(null)(Map);
export default GMap;
