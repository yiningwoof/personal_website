import React, { useState, useEffect } from "react";
import { render } from "@testing-library/react";
import axios from "axios";

import { Modal } from "../Modal/Modal.js";

import "./styles.css";

export const Photography = () => {
	const baseAPIUrl =
		"https://wang-personal-website-api-9f85cd6bf408.herokuapp.com/api/v1/photos/";

	const [category, setCategory] = useState("");
	const [initial, setInitial] = useState(true);
	const [photos, setPhotos] = useState([]);
	const [inspectedPhoto, setInspectedPhoto] = useState({});
	const [inspectedPhotoUrl, setInspectedPhotoUrl] = useState("");
	const [allowScroll, setAllowScroll] = useState(true);

	const categories = {
		Home: "home",
		Animals: "animals",
		Plants: "plants",
		Civilization: "civilization",
		Lights: "lights",
		"Man vs. Wild": "man_wild",
		Mountains: "mountains",
		Homed: "homed",
	};

	const chooseCategory = (cat) => {
		setCategory(cat);
		axios
			.get(`${baseAPIUrl}${categories[cat]}`)
			.then((res) => res.data)
			.then((data) => setPhotos(data));
	};

	const inspectPhoto = (photo, photoUrl) => {
		setInspectedPhoto(photo);
		setInspectedPhotoUrl(photoUrl);
		setAllowScroll(false);
	};

	const closeModal = () => {
		setInspectedPhoto({});
		setInspectedPhotoUrl("");
		setAllowScroll(true);
	};

	useEffect(() => {
		axios
			.get(`${baseAPIUrl}home`)
			.then((res) => res.data)
			.then((data) => {
				setPhotos(data);
				setCategory("Home");
			});
	}, []);

	return (
		<div
			className="gallery"
			style={{
				overflow: allowScroll ? "auto" : "hidden",
			}}
		>
			<div className="gallery-nav">
				<h2>Categories</h2>
				<ul>
					{Object.keys(categories).map((cat) => (
						<li>
							<a
								className={`category-button${
									category === cat ? " active" : ""
								}`}
								onClick={() => chooseCategory(cat)}
							>
								{cat}
							</a>
						</li>
					))}
				</ul>
			</div>
			<div className="grid-cols-3">
				{photos.map((photo) => {
					let photoUrlStyle = `url(${`https://s3.us-east-2.amazonaws.com/yiningwang.io/${photo.filename}`})`;
					let photoUrl = `https://s3.us-east-2.amazonaws.com/yiningwang.io/${photo.filename}`;
					return (
						<div>
							<div
								className="grid-item"
								style={{
									width: "100%",
									height: "300px",
									border: "solid 4px white",
									borderRadius: "10%",
									overflow: "hidden",
									paddingBottom: "100%",
									backgroundPosition: "center",
									backgroundRepeat: "no-repeat",
									backgroundSize: "cover",
									backgroundImage: `${photoUrlStyle}`,
								}}
								onClick={() => inspectPhoto(photo, photoUrl)}
							/>
						</div>
					);
				})}
			</div>
			<Modal
				display={Object.keys(inspectedPhoto).length === 0 ? false : true}
				inspectedPhoto={inspectedPhoto}
				photoUrl={inspectedPhotoUrl}
				close={closeModal}
			></Modal>
		</div>
	);
};
