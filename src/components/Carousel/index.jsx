import { useState, useEffect } from 'react';
import './styles.scss';

export default function Carousel({ items, overlayText }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToItem = (index) => {
    setCurrentIndex(index);
  };
  
  const goToNextItem = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % items.length);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextItem();
    }, 8000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div id='carousel'>
      {overlayText &&
        <div className='fixed-overlay'>
          <h1>{overlayText}</h1>
        </div>
      }
      <div
        className='carousel-items'
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {items.map((item, index) => (
          <div className='carousel-item' key={index}>
            <div className='image-container'>
              <img
                src={item.image}
                alt={item.altText}
                style={{ height: '100%', objectFit: 'cover', objectPosition: 'center 75%'}}
              />
              <div className='overlay'></div>
            </div>
          </div>
        ))}
      </div>
      <div className='indicators-container'>
        {items.map(index => (
          <div
            key={index}
            onClick={() => goToItem(index)}
            className={`indicator ${index === currentIndex && 'active'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};