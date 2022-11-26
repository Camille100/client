/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import 'react-image-gallery/styles/scss/image-gallery.scss';

const Gallery = ({ pictures, height, width }) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const picturesArr = [];
    pictures.forEach((picture) => {
      picturesArr.push({
        thumbnail: '',
        original: picture,
      });
    });
    setImages(picturesArr);
  }, []);
  return (
    <div style={{
      width, height, display: 'flex', justifyContent: 'flex-start', alignItems: 'center',
    }}
    >
      <ImageGallery
        items={images}
        showThumbnails={false}
        showPlayButton={false}
        renderLeftNav={(onClick, disabled) => (
          <ArrowBackIosNewIcon
            onClick={onClick}
            disabled={disabled}
            sx={{
              height: '20px', cursor: 'pointer', position: 'absolute', left: '-30px', top: '50%', zIndex: '999',
            }}
          />
        )}
        renderRightNav={(onClick, disabled) => (
          <ArrowForwardIosIcon
            onClick={onClick}
            disabled={disabled}
            sx={{
              height: '20px', cursor: 'pointer', position: 'absolute', right: '-30px', top: '50%', zIndex: '999',
            }}
          />
        )}
        renderFullscreenButton={(onClick, isFullScreen) => (
          <div>
            {isFullScreen === false
              ? (
                <FullscreenIcon
                  onClick={onClick}
                  isfullscreen={isFullScreen ? 'true' : 'false'}
                  sx={{
                    height: '30px', cursor: 'pointer', position: 'absolute', right: '10px', bottom: '10px', zIndex: '999', fill: '#FFF',
                  }}
                />
              )
              : (
                <FullscreenExitIcon
                  onClick={onClick}
                  isfullscreen={isFullScreen ? 'true' : 'false'}
                  sx={{
                    height: '50px', cursor: 'pointer', position: 'absolute', right: '40px', bottom: '30px', zIndex: '999', fill: '#FFF',
                  }}
                />
              )}
          </div>
        )}
      />
    </div>
  );
};

export default Gallery;
