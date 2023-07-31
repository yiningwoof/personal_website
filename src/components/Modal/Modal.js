import React, { useEffect, useState } from 'react';
import BlurredUpImage from '../Photography/BlurredUpImage';

import './styles.css';

export const Modal = ({
  display,
  inspectedPhoto,
  photoUrl,
  placeholderUrl,
  close,
}) => {
  const [modalDisplay, setModalDisplay] = useState(false);

  useEffect(() => {
    setModalDisplay(display);
  });

  const closeModal = () => {
    setModalDisplay(false);
  };
  return (
    <div
      className='modal-container'
      style={{ display: modalDisplay ? 'flex' : 'none' }}
      onClick={() => close()}
    >
      <div className='modal'>
        <BlurredUpImage
          blurImg={placeholderUrl}
          srcImg={photoUrl}
          isModal={true}
        />
        <div className='caption'>
          <p className='title'>{inspectedPhoto.title}</p>
          <p className='location'>{`(${inspectedPhoto.location})`}</p>
        </div>
      </div>
    </div>
  );
};
