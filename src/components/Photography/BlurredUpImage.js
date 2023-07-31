import React from 'react';
import useProgressiveImg from './useProgressiveImg';
import { styled } from '@mui/material/styles';

const BlurredUpImage = ({ blurImg, srcImg, isModal }) => {
  const src = useProgressiveImg(blurImg, srcImg);

  const ThumbnailImg = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    height: '300px',
    borderRadius: '10%',
    overflow: 'hidden',
    objectFit: 'cover',
  });

  const ModalImg = styled('img')({
    border: '4px solid white',
    width: '100%',
  });

  return isModal ? (
    <ModalImg src={src} />
  ) : (
    <ThumbnailImg src={src} loading={'lazy'} />
  );
};
export default BlurredUpImage;
