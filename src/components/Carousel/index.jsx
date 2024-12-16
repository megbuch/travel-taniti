import { useState, useEffect } from 'react'
import './styles.scss'

// The Carousel is a reusable component that cycles through multiple images.
// carouselData is an array of objects containing altText, description, image properties.
// Example: [{ altText: string, description: string, image: path to image source }]
// The header is optional.

export default function Carousel({ carouselData, header }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToItem = index => {
    setCurrentIndex(index);
  };
  
  const goToNextItem = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % carouselData.length);
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
    <div className='carousel'>
      {header && <h1>{header}</h1>}
      {carouselData.map((item, index) => (
        currentIndex === index && (
          <p key={item.description} className='description-overlay'>{item.description}</p>
        )
      ))}
      <div className='color-overlay'></div>
      <div className='indicators-container'>
        {carouselData.map((_, index) => (
          <div
            key={index}
            onClick={() => goToItem(index)}
            className={`indicator ${index === currentIndex && 'active'}`}
          ></div>
        ))}
      </div>
      <div className='carousel-items' style={{ transform: `translateX(-${currentIndex * 100}vw)` }}>
        {carouselData.map(item => (
          <div className='carousel-item' key={item.description}>
            <div className='image-container'>
              <img
                src={item.image}
                alt={item.altText}
                style={{ height: '100%', objectFit: 'cover', objectPosition: 'center 75%'}}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}