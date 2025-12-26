import { useState, useRef, useEffect } from 'react';
import pic1 from '../../assets/placeholder/pic1.jpg';
import pic2 from '../../assets/placeholder/pic2.jpg';
import pic3 from '../../assets/placeholder/pic3.jpg';
import pic4 from '../../assets/placeholder/pic4.jpg';
import './Home.css';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentRecentSlide, setCurrentRecentSlide] = useState(0);
  const [currentLatestNews, setCurrentLatestNews] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const recentTouchStartX = useRef(0);
  const recentTouchEndX = useRef(0);
  const latestNewsTouchStartX = useRef(0);
  const latestNewsTouchEndX = useRef(0);

  // Update cards per view based on window size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth <= 480) {
        setCardsPerView(1);
      } else if (window.innerWidth <= 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const slides = [
    {
      category: 'NEWS',
      headline: "USC, PYDO spearheads Balik Kampus '25, spotlights Fair and Kabataan Caravan",
      meta: 'September 23, 2025 | By Mychel Mainog',
      photoCredit: 'Photo by Clarence Tuballas',
      link: '/news',
      image: pic2
    },
    {
      category: 'FEATURE',
      headline: 'UEP Students Excel in National Journalism Competition',
      meta: 'October 15, 2025 | By Sarah Johnson',
      photoCredit: 'Photo by John Doe',
      link: '/feature',
      image: pic1
    }
  ];

  const recentPosts = [
    {
      category: 'CARTOON',
      headline: 'KORAPTOBER WEEK 1',
      meta: 'October 04, 2025',
      photoCredit: '',
      link: '/post1',
      image: pic4
    },
    {
      category: 'NEWS',
      headline: "CCJ stages officers' induction; Sleuth King and Queen strut during acquaintance",
      meta: 'October 03, 2025 | by Nino Balawang',
      photoCredit: '',
      link: '/post2',
      image: pic2
    },
    {
      category: 'NEWS',
      headline: "Lipon Panitik hosts Huruhimangraw for A.Y. '25-'26",
      meta: 'October 03, 2025 | by Wenona Sagonoy, Ed Almasco',
      photoCredit: '',
      link: '/post3',
      image: pic1
    }
  ];

  const latestNews = [
    {
      category: 'NEWS',
      headline: "CCJ stages officers' induction; Sleuth King and Queen strut during acquaintance",
      meta: 'October 03, 2025',
      photoCredit: '',
      link: '/news1',
      image: pic2
    },
    {
      category: 'NEWS',
      headline: "COE holds Stakeholders' Consultative Meeting, Orientation/Reorientation",
      meta: 'October 03, 2025',
      photoCredit: '',
      link: '/news2',
      image: pic3
    },
    {
      category: 'NEWS',
      headline: "CNAHS kicks off A.Y. '25-'26 with Freshmen Orientation, Onboarding, and Acquaintance Party",
      meta: 'October 03, 2025',
      photoCredit: '',
      link: '/news3',
      image: pic1
    },
    {
      category: 'NEWS',
      headline: "Lipon Panitik hosts Huruhimangraw for A.Y. '25-'26",
      meta: 'October 03, 2025',
      photoCredit: '',
      link: '/news4',
      image: pic4
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Swipe detection
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swipe left - next slide
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Swipe right - previous slide
      prevSlide();
    }

    // Reset
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Recent posts carousel functions
  const nextRecentSlide = () => {
    setCurrentRecentSlide((prev) => (prev + 1) % recentPosts.length);
  };

  const prevRecentSlide = () => {
    setCurrentRecentSlide((prev) => (prev - 1 + recentPosts.length) % recentPosts.length);
  };

  const goToRecentSlide = (index) => {
    setCurrentRecentSlide(index);
  };

  // Recent posts swipe detection
  const handleRecentTouchStart = (e) => {
    recentTouchStartX.current = e.touches[0].clientX;
  };

  const handleRecentTouchMove = (e) => {
    recentTouchEndX.current = e.touches[0].clientX;
  };

  const handleRecentTouchEnd = () => {
    if (!recentTouchStartX.current || !recentTouchEndX.current) return;
    
    const distance = recentTouchStartX.current - recentTouchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextRecentSlide();
    } else if (distance < -minSwipeDistance) {
      prevRecentSlide();
    }

    recentTouchStartX.current = 0;
    recentTouchEndX.current = 0;
  };

  // Latest News carousel functions
  const nextLatestNews = () => {
    const maxIndex = Math.max(0, latestNews.length - cardsPerView);
    setCurrentLatestNews((prev) => {
      if (prev >= maxIndex) {
        return 0; // Loop back to start
      }
      return prev + 1;
    });
  };

  const prevLatestNews = () => {
    const maxIndex = Math.max(0, latestNews.length - cardsPerView);
    setCurrentLatestNews((prev) => {
      if (prev <= 0) {
        return maxIndex; // Loop to end
      }
      return prev - 1;
    });
  };

  const goToLatestNews = (index) => {
    const maxIndex = Math.max(0, latestNews.length - cardsPerView);
    setCurrentLatestNews(Math.min(index, maxIndex));
  };

  // Latest News swipe detection
  const handleLatestNewsTouchStart = (e) => {
    latestNewsTouchStartX.current = e.touches[0].clientX;
  };

  const handleLatestNewsTouchMove = (e) => {
    latestNewsTouchEndX.current = e.touches[0].clientX;
  };

  const handleLatestNewsTouchEnd = () => {
    if (!latestNewsTouchStartX.current || !latestNewsTouchEndX.current) return;
    
    const distance = latestNewsTouchStartX.current - latestNewsTouchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextLatestNews();
    } else if (distance < -minSwipeDistance) {
      prevLatestNews();
    }

    latestNewsTouchStartX.current = 0;
    latestNewsTouchEndX.current = 0;
  };

  return (
    <div className="home">
      <section className="featured-section">
        <h2 className="featured-section__title">FEATURED</h2>
        
        <div className="featured-article">
          <div 
            className="featured-article__container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((slide, index) => {
              const offset = index - currentSlide;
              // Only show current slide, hide others
              let translateX = offset * 100;
              
              return (
              <div
                key={index}
                className="featured-article__slide"
                style={{
                  transform: `translateX(${translateX}%)`,
                  zIndex: index === currentSlide ? 1 : 0
                }}
              >
                <div className="featured-article__image">
                  {slide.image ? (
                    <img 
                      src={slide.image} 
                      alt={slide.headline}
                      className="featured-article__bg-image"
                    />
                  ) : (
                    <div className="featured-article__gradient"></div>
                  )}
                  <div className="featured-article__photo-credit">
                    {slide.photoCredit}
                  </div>
                  
                  <div className="featured-article__overlay">
                    <span className="featured-article__category">{slide.category}</span>
                    <h3 className="featured-article__headline">
                      {slide.headline}
                    </h3>
                    <p className="featured-article__meta">
                      {slide.meta}
                    </p>
                    <button className="featured-article__btn">View Post</button>
                  </div>
                </div>
              </div>
            );
            })}
            
            <div className="featured-article__pagination">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`pagination-dot ${
                    index === currentSlide ? 'pagination-dot--active' : ''
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="recently-posted-section">
        <h2 className="recently-posted-section__title">RECENTLY POSTED</h2>
        
        <div className="recently-posted">
          <div className="recently-posted__container">
            {/* Left card - first post */}
            <div className="recently-posted__card recently-posted__card--left">
              <div className="recently-posted__image">
                {recentPosts[0].image ? (
                  <img 
                    src={recentPosts[0].image} 
                    alt={recentPosts[0].headline}
                    className="recently-posted__bg-image"
                  />
                ) : (
                  <div className="recently-posted__gradient"></div>
                )}
                {recentPosts[0].photoCredit && (
                  <div className="recently-posted__photo-credit">
                    {recentPosts[0].photoCredit}
                  </div>
                )}
                
                <div className="recently-posted__overlay">
                  <span className="recently-posted__category">{recentPosts[0].category}</span>
                  <h3 className="recently-posted__headline">
                    {recentPosts[0].headline}
                  </h3>
                  <p className="recently-posted__meta">
                    {recentPosts[0].meta}
                  </p>
                  <button className="recently-posted__btn">View Post</button>
                </div>
              </div>
            </div>

            {/* Right cards - second and third posts */}
            <div className="recently-posted__right">
              <div className="recently-posted__card recently-posted__card--right">
                <div className="recently-posted__image">
                  {recentPosts[1].image ? (
                    <img 
                      src={recentPosts[1].image} 
                      alt={recentPosts[1].headline}
                      className="recently-posted__bg-image"
                    />
                  ) : (
                    <div className="recently-posted__gradient"></div>
                  )}
                  {recentPosts[1].photoCredit && (
                    <div className="recently-posted__photo-credit">
                      {recentPosts[1].photoCredit}
                    </div>
                  )}
                  
                  <div className="recently-posted__overlay">
                    <span className="recently-posted__category">{recentPosts[1].category}</span>
                    <h3 className="recently-posted__headline">
                      {recentPosts[1].headline}
                    </h3>
                    <p className="recently-posted__meta">
                      {recentPosts[1].meta}
                    </p>
                    <button className="recently-posted__btn">View Post</button>
                  </div>
                </div>
              </div>

              <div className="recently-posted__card recently-posted__card--right">
                <div className="recently-posted__image">
                  {recentPosts[2].image ? (
                    <img 
                      src={recentPosts[2].image} 
                      alt={recentPosts[2].headline}
                      className="recently-posted__bg-image"
                    />
                  ) : (
                    <div className="recently-posted__gradient"></div>
                  )}
                  {recentPosts[2].photoCredit && (
                    <div className="recently-posted__photo-credit">
                      {recentPosts[2].photoCredit}
                    </div>
                  )}
                  
                  <div className="recently-posted__overlay">
                    <span className="recently-posted__category">{recentPosts[2].category}</span>
                    <h3 className="recently-posted__headline">
                      {recentPosts[2].headline}
                    </h3>
                    <p className="recently-posted__meta">
                      {recentPosts[2].meta}
                    </p>
                    <button className="recently-posted__btn">View Post</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="latest-news-section">
        <h2 className="latest-news-section__title">LATEST NEWS</h2>
        
        <div className="latest-news">
          <button 
            className="latest-news__arrow latest-news__arrow--left"
            onClick={prevLatestNews}
            aria-label="Previous news"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div 
            className="latest-news__container"
            onTouchStart={handleLatestNewsTouchStart}
            onTouchMove={handleLatestNewsTouchMove}
            onTouchEnd={handleLatestNewsTouchEnd}
          >
            <div 
              className="latest-news__track"
              style={{
                transform: `translateX(-${currentLatestNews * (100 / cardsPerView)}%)`
              }}
            >
              {latestNews.map((news, index) => (
                <div key={index} className="latest-news__card">
                  <div className="latest-news__image">
                    {news.image ? (
                      <img 
                        src={news.image} 
                        alt={news.headline}
                        className="latest-news__bg-image"
                      />
                    ) : (
                      <div className="latest-news__gradient"></div>
                    )}
                    {news.photoCredit && (
                      <div className="latest-news__photo-credit">
                        {news.photoCredit}
                      </div>
                    )}
                    
                    <div className="latest-news__overlay">
                      <span className="latest-news__category">{news.category}</span>
                      <h3 className="latest-news__headline">
                        {news.headline}
                      </h3>
                      <p className="latest-news__meta">
                        {news.meta}
                      </p>
                      <button className="latest-news__btn">View Post</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="latest-news__arrow latest-news__arrow--right"
            onClick={nextLatestNews}
            aria-label="Next news"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;


