import React, { useEffect, useState } from "react";

import "./styles.css";

export const Modal = ({ display, inspectedPhoto, photoUrl, close }) => {
  const [modalDisplay, setModalDisplay] = useState(false);

  useEffect(() => {
    setModalDisplay(display);
  });

  //   const closeModal = () => {
  //     setModalDisplay(false);
  //   };
  return (
    <div
      className="modal-container"
      style={{ display: modalDisplay ? "flex" : "none" }}
      onClick={() => close()}
    >
      <div className="modal">
        {console.log(inspectedPhoto.url)}
        <img src={photoUrl} alt={inspectedPhoto.title}></img>
        <div className="caption">
          <p className="title">{inspectedPhoto.title}</p>
          <p className="location">{`(${inspectedPhoto.location})`}</p>
        </div>
      </div>
    </div>
  );
};
