import React, { useState, useEffect } from 'react';
import photoData from './photoData.js';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import { Modal } from '../Modal/Modal.js';

import './styles.css';

export const Photography = () => {
  const [category, setCategory] = useState('Home');
  const [photos, setPhotos] = useState([]);
  const [inspectedPhoto, setInspectedPhoto] = useState({});
  const [inspectedPhotoUrl, setInspectedPhotoUrl] = useState('');
  const [allowScroll, setAllowScroll] = useState(true);

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '10%',
    overflow: 'hidden',
  });

  const categories = {
    Home: 'home',
    Animals: 'animals',
    Plants: 'plants',
    Civilization: 'civilization',
    Lights: 'lights',
    'Man vs. Wild': 'man_wild',
    Mountains: 'mountains',
    Homed: 'homed',
  };

  const chooseCategory = (cat) => {
    setCategory(cat);
    const lowercaseCat = categories[cat];
    const photosInCat = photoData.filter((p) =>
      p.categories.includes(lowercaseCat)
    );
    setPhotos(photosInCat);
  };

  const inspectPhoto = (photo, photoUrl) => {
    setInspectedPhoto(photo);
    setInspectedPhotoUrl(photoUrl);
    setAllowScroll(false);
  };

  const closeModal = () => {
    setInspectedPhoto({});
    setInspectedPhotoUrl('');
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
            <li>
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
          let photoUrl = `https://s3.us-east-2.amazonaws.com/yiningwang.io/${photo.filename}`;
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
              onClick={() => inspectPhoto(photo, photoUrl)}
            >
              <Img src={photoUrl} loading={'lazy'}></Img>
            </Grid>
          );
        })}
      </Grid>
      <Modal
        display={Object.keys(inspectedPhoto).length === 0 ? false : true}
        inspectedPhoto={inspectedPhoto}
        photoUrl={inspectedPhotoUrl}
        close={closeModal}
      ></Modal>
    </div>
  );
};
