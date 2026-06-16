import "./Home.css";
import { useState, useEffect } from "react";

import heroModel1 from "../Assets/character1.png";
import heroModel2 from "../Assets/character2.png";
import heroModel3 from "../Assets/character3.png";
import heroModel4 from "../Assets/mobile-character.png";
import MEN from "../Assets/MEN-fashion.jpg";
import WOMEN from "../Assets/WOMEN-fashion.jpg";
import KIDS from "../Assets/KIDS-fashion.jpg";
import bottomBanner from "../Assets/bottom-banner.png";
import bottomBannerMobile from "../Assets/bottom-banner-mobile.png";
import Review from "../Components/Review";

import useScreenSize from "../hooks/useScreenSize";

function Home() {
  const isMobile = useScreenSize();
  
  const slides = [
    {
      image: heroModel1,
      subtitle: "Discover now latest collection",
      title: "Summer collection 2026",
    },
    {
      image: heroModel2,
      subtitle: "Explore the newest arrivals",
      title: "Winter collection 2026",
    },
    {
      image: heroModel3,
      subtitle: "Fresh fashion trends",
      title: "Autumn collection 2026",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Keeps the slider automatically rotating every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="home-lay">
      
      {/* --- HERO SECTION --- */}
      {isMobile ? (
        <div className="hero-section-mobile">
          <div className="hero-image-mobile">
            <img src={heroModel4} alt="mobile-character" />
          </div>
          <div className="hero-text-mobile">
            <p>Discover now latest collection</p>
            <h1>Summer collection 2026</h1>
            <button className="primary-btn">Shop now</button>
          </div>
        </div>
      ) : (
        <div className="hero-section">
          <div className="hero-image-container">
            <img src={slides[currentSlide].image} alt="Hero Campaign" className="hero-image" />
            <div className="hero-text">
              <p>{slides[currentSlide].subtitle}</p>
              <h1>{slides[currentSlide].title}</h1>
              <button className="primary-btn">Shop now</button>
            </div>
          </div>
        </div>
      )}

      {/* --- CURATED COLLECTION HEADING --- */}
      <div className="sub-items">
        <p>CURATED COLLECTION</p>
        <h2>FOR EVERY GENERATION</h2>
      </div>

      {/* --- CATEGORY CARDS --- */}
      <div className="card-view">
        <div className="card-item">
          <div className="card-image-wrapper">
            <img src={MEN} alt="Men's Collection" />
          </div>
          <div className="card-content">
            <p>Men</p>
            <button className="secondary-btn">Shop Now</button>
          </div>
        </div>
        
        {/* FIXED: Changed text from MEN to Women */}
        <div className="card-item">
          <div className="card-image-wrapper">
            <img src={WOMEN} alt="Women's Collection" />
          </div>
          <div className="card-content">
            <p>Women</p>
            <button className="secondary-btn">Shop Now</button>
          </div>
        </div>

        {/* FIXED: Changed text from MEN to Kids */}
        <div className="card-item">
          <div className="card-image-wrapper">
            <img src={KIDS} alt="Kids' Collection" />
          </div>
          <div className="card-content">
            <p>Kids</p>
            <button className="secondary-btn">Shop Now</button>
          </div>
        </div>
      </div>

      {/* --- BOTTOM PROMO BANNER --- */}
      <div className="bottom-banner-section">
        <div className="banner-container">
          <img 
            src={isMobile ? bottomBannerMobile : bottomBanner} 
            alt="Promo Banner" 
            className="banner-image" 
          />
          <div className="banner-text">
            <p>SIGNATURE STYLE</p>
            <h2>The Icons of <br/> the Season</h2>
            <button className="primary-btn">OUR STORY</button>
          </div>
        </div>
      </div>

      {/* --- REVIEWS --- */}
      <div className="review-section">
        <Review />
      </div>
    </div>
  );
}

export default Home;