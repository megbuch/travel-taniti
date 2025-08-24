import { useState, useEffect } from 'react'
import { Button } from '../'
import './styles.scss'

// The Carousel is a reusable component that cycles through multiple images.
// carouselData is an array of objects containing altText, description, image properties.
// Example: [{ altText: string, description: string, image: path to image source }]
// The header is optional.

export default function Carousel({ carouselData, header, buttonText, onClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToItem = index => {
    setCurrentIndex(index);
  };
  
  const goToNextItem = () => {
    setCurrentIndex(prev => (prev + 1) % carouselData.length);
  };
  
  useEffect(() => {
    const interval = setInterval(goToNextItem, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      {header && <h1>{header}</h1>}
      
      {carouselData.map((item, index) => (
        currentIndex === index && <p key={item.description} className='description'>{item.description}</p>)
      )}

      {buttonText && onClick && (
        <Button onClick={onClick} text={buttonText} />
      )}

      <div className="indicators-container">
        {carouselData.map((_, index) => (
          <div
            key={index}
            onClick={() => goToItem(index)}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>

      <div className="color-overlay" />

      <div className="carousel-items" style={{ transform: `translateX(-${currentIndex * 100}vw)` }}>
        {carouselData.map(item => (
          <div key={item.description} className="carousel-item">
            <div className="image-container">
              <img
                src={item.image}
                alt={item.altText}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}