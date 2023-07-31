import React, { useState, useEffect } from 'react';
import photoData from './photoData.js';
import Grid from '@mui/material/Grid';
import { Modal } from '../Modal/Modal.js';
import BlurredUpImage from './BlurredUpImage.js';

import './styles.css';

export const Photography = () => {
  const [category, setCategory] = useState('Home');
  const [photos, setPhotos] = useState([]);
  const [inspectedPhoto, setInspectedPhoto] = useState({});
  const [inspectedPhotoUrl, setInspectedPhotoUrl] = useState('');
  const [inspectedPhotoPlaceholderUrl, setInspectedPhotoPlaceholderUrl] =
    useState('');
  const [allowScroll, setAllowScroll] = useState(true);

  const categories = {
    Home: 'home',
    Animals: 'animals',
    Plants: 'plants',
    Civilization: 'civilization',
    Lights: 'lights',
    'Man vs. Wild': 'man_wild',
    Mountains: 'mountains',
    Homed: 'homed',
    Waters: 'waters',
  };

  const chooseCategory = (cat) => {
    setCategory(cat);
    const lowercaseCat = categories[cat];
    const photosInCat = photoData.filter((p) =>
      p.categories.includes(lowercaseCat)
    );
    setPhotos(photosInCat);
  };

  const inspectPhoto = (photo, photoUrl, placeholderUrl) => {
    setInspectedPhoto(photo);
    setInspectedPhotoUrl(photoUrl);
    setInspectedPhotoPlaceholderUrl(placeholderUrl);
    setAllowScroll(false);
  };

  const closeModal = () => {
    setInspectedPhoto({});
    setInspectedPhotoUrl('');
    setInspectedPhotoPlaceholderUrl('');
    setAllowScroll(true);
  };

  useEffect(() => {
    setPhotos(photoData);
    setCategory('Home');
  }, []);

  return (
    <div
      className='gallery'
      style={{
        overflow: allowScroll ? 'auto' : 'hidden',
      }}
    >
      <div className='gallery-nav'>
        <h2>Categories</h2>
        <ul>
          {Object.keys(categories).map((cat) => (
            <li key={`category ${cat}`}>
              <a
                className={`category-button${
                  category === cat ? ' active' : ''
                }`}
                onClick={() => chooseCategory(cat)}
              >
                {cat}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Grid container columns={{ xs: 1, sm: 1, md: 12 }} spacing={2}>
        {photos.map((photo) => {
          let originalUrl = `https://s3.us-east-2.amazonaws.com/yiningwang.io/high_res/${photo.filename}`;
          let thumbnailUrl = `https://s3.us-east-2.amazonaws.com/yiningwang.io/thumbnails/${photo.filename}`;
          let placeholderUrl = `https://s3.us-east-2.amazonaws.com/yiningwang.io/placeholders/${photo.filename}`;
          return (
            <Grid
              item
              xs={1}
              sm={1}
              md={4}
              sx={{
                width: '100%',
                height: '300px',
              }}
              onClick={() => inspectPhoto(photo, originalUrl, placeholderUrl)}
            >
              <BlurredUpImage
                blurImg={placeholderUrl}
                srcImg={thumbnailUrl}
                isModal={false}
              ></BlurredUpImage>
            </Grid>
          );
        })}
      </Grid>
      <Modal
        display={Object.keys(inspectedPhoto).length === 0 ? false : true}
        inspectedPhoto={inspectedPhoto}
        photoUrl={inspectedPhotoUrl}
        placeholderUrl={inspectedPhotoPlaceholderUrl}
        close={closeModal}
      ></Modal>
    </div>
  );
};
