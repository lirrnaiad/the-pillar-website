import { useState, useRef, useEffect } from 'react';
import pic1 from '../../assets/placeholder/pic1.jpg';
import pic2 from '../../assets/placeholder/pic2.jpg';
import pic3 from '../../assets/placeholder/pic3.jpg';
import pic4 from '../../assets/placeholder/pic4.jpg';
import logoImage from '../../assets/placeholder/The PILLAR Logo.png';
import facebookIcon from '../../assets/placeholder/facebook.png';
import gmailIcon from '../../assets/placeholder/gmail.png';
import instagramIcon from '../../assets/placeholder/instagram.avif';
import tiktokIcon from '../../assets/placeholder/tiktok.png';
import youtubeIcon from '../../assets/placeholder/youtube.jpg';
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

  // Latest Feature carousel state
  const [currentLatestFeature, setCurrentLatestFeature] = useState(0);
  const latestFeatureTouchStartX = useRef(0);
  const latestFeatureTouchEndX = useRef(0);

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

  const latestFeatures = [
    {
      category: 'FEATURE',
      headline: 'Isang Batas, Libu-libong Buhay ang Nagwakas',
      meta: 'September 21, 2025',
      link: '/feature1',
      image: pic3
    },
    {
      category: 'LITERARI',
      headline: 'SETYEMBRE BENTE-UNO',
      meta: 'September 21, 2025',
      link: '/feature2',
      image: pic4
    },
    {
      category: 'NEWS FEATURE',
      headline: "UPAO opens stage for artists in auditions for A.Y. '25-26'",
      meta: 'September 25, 2025',
      link: '/feature3',
      image: pic1
    },
    {
      category: 'PHOTO',
      headline: "Stage for artists in A.Y. '25-26",
      meta: 'October 03, 2025',
      link: '/feature4',
      image: pic2
    }
  ];

  const categories = [
    {
      key: 'news',
      title: 'NEWS',
      seeAllLink: '/news',
      hero: {
        image: pic2,
        title: "'Hindi dapat politiko ang iniidolo': Youth org's gather for 53rd ML Anniv., stage standing rally at CL.",
        date: 'September 21, 2025'
      },
      items: [
        { title: "UEP Sports Director, officials tackle scheduling issues in UEPAA Games '25 prep meeting", date: 'September 16, 2025' },
        { title: 'Romualdez resigns as House Speaker; Dy elected unopposed', date: 'September 17, 2025' }
      ]
    },
    {
      key: 'opinion',
      title: 'OPINION',
      seeAllLink: '/opinion',
      hero: {
        image: pic3,
        title: 'History of Unaccountability',
        date: 'September 15, 2025'
      },
      items: [
        { title: 'Labing-Walong Milyon na Tanong Isang Edukasyong Walang Sagot', date: 'September 8, 2025' },
        { title: 'Journalism for Sale', date: 'August 30, 2025' }
      ]
    },
    {
      key: 'features',
      title: 'FEATURES',
      seeAllLink: '/feature',
      hero: {
        image: pic1,
        title: 'Isang Batas, Libu-libong Buhay ang Nagwakas',
        date: 'September 21, 2025'
      },
      items: [
        { title: "UEP Sports Director, officials tackle scheduling issues in UEPAA Games '25 prep meeting", date: 'September 16, 2025' },
        { title: 'Romualdez resigns as House Speaker; Dy elected unopposed', date: 'September 17, 2025' }
      ]
    },
    {
      key: 'scitech',
      title: 'SCI-TECH',
      seeAllLink: '/scitech',
      hero: {
        image: pic4,
        title: 'Pagbabantay kay Bantay: One Health Approach Laban sa Rabies Virus',
        date: 'September 28, 2025'
      },
      items: [
        { title: "UEP Sports Director, officials tackle scheduling issues in UEPAA Games '25 prep meeting", date: 'September 16, 2025' },
        { title: 'Romualdez resigns as House Speaker; Dy elected unopposed', date: 'September 17, 2025' }
      ]
    },
    {
      key: 'cartoon',
      title: 'CARTOON AND COMICS',
      seeAllLink: '/cartoons',
      hero: {
        image: pic1,
        title: 'What I am, After All',
        date: 'October 10, 2025'
      },
      items: [
        { title: 'KORAPTOBER WEEK 1', date: 'October 04, 2025' },
        { title: 'Oktubre Singko', date: 'October 05, 2025' }
      ]
    },
    {
      key: 'photos',
      title: 'PHOTOS',
      seeAllLink: '/photos',
      hero: {
        image: pic2,
        title: 'UEPians: Sa Bisig ng Gabi',
        date: 'October 09, 2025'
      },
      items: [
        { title: 'UEPians: Sa Bisig ng Gabi', date: 'October 09, 2025' },
        { title: "CAC students endure poor facilities: Dean Baya promises urgent action this Sept.", date: 'September 17, 2025' }
      ]
    }
  ];

  const latestIssues = [
    {
      title: 'The Pillar Magazine',
      info: 'Volume 55, Issue No. 5\nAug-Dec 2023 Semestral Magazine',
      image: pic1,
      link: '/magazine/55-5'
    },
    {
      title: 'The Pillar Lampoon',
      info: 'Volume 56, Issue No. 3\nJanuary-June 2024 Semestral Issue',
      image: pic2,
      link: '/magazine/lampoon-56-3'
    },
    {
      title: 'The Pillar Magazine',
      info: 'Volume 55, Issue No. 5\nAug-Dec 2023 Semestral Magazine',
      image: pic3,
      link: '/magazine/55-5-2'
    }
  ];

  // Videos (shown below Categories)
  const videos = [
    {
      title: 'UEPians: Sa Bisig ng Gabi',
      date: 'October 09, 2025',
      image: pic2,
      link: '/videos/uepians-sa-bisig'
    },
    {
      title: 'KORAPTOBER WEEK 1',
      date: 'October 04, 2025',
      image: pic4,
      link: '/videos/koraptober-week-1'
    },
    {
      title: 'Isang Batas, Libu-libong Buhay ang Nagwakas',
      date: 'September 21, 2025',
      image: pic1,
      link: '/videos/isang-batas'
    },
    {
      title: 'SETYEMBRE BENTE-UNO',
      date: 'September 21, 2025',
      image: pic3,
      link: '/videos/setyembre'
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

  // Latest Feature carousel functions
  const nextLatestFeature = () => {
    const maxIndex = Math.max(0, latestFeatures.length - cardsPerView);
    setCurrentLatestFeature((prev) => {
      if (prev >= maxIndex) {
        return 0; // Loop back to start
      }
      return prev + 1;
    });
  };

  const prevLatestFeature = () => {
    const maxIndex = Math.max(0, latestFeatures.length - cardsPerView);
    setCurrentLatestFeature((prev) => {
      if (prev <= 0) {
        return maxIndex; // Loop to end
      }
      return prev - 1;
    });
  };

  const handleLatestFeatureTouchStart = (e) => {
    latestFeatureTouchStartX.current = e.touches[0].clientX;
  };

  const handleLatestFeatureTouchMove = (e) => {
    latestFeatureTouchEndX.current = e.touches[0].clientX;
  };

  const handleLatestFeatureTouchEnd = () => {
    if (!latestFeatureTouchStartX.current || !latestFeatureTouchEndX.current) return;
    const distance = latestFeatureTouchStartX.current - latestFeatureTouchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextLatestFeature();
    } else if (distance < -minSwipeDistance) {
      prevLatestFeature();
    }

    latestFeatureTouchStartX.current = 0;
    latestFeatureTouchEndX.current = 0;
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

      <section className="latest-feature-section">
        <h2 className="latest-feature-section__title">LATEST FEATURE</h2>

        <div className="latest-feature">
          <button
            className="latest-feature__arrow latest-feature__arrow--left"
            onClick={prevLatestFeature}
            aria-label="Previous feature"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div
            className="latest-feature__container"
            onTouchStart={handleLatestFeatureTouchStart}
            onTouchMove={handleLatestFeatureTouchMove}
            onTouchEnd={handleLatestFeatureTouchEnd}
          >
            <div
              className="latest-feature__track"
              style={{ transform: `translateX(-${currentLatestFeature * (100 / cardsPerView)}%)` }}
            >
              {latestFeatures.map((f, idx) => (
                <article key={idx} className="latest-feature__card">
                  <div className="latest-feature__image">
                    {f.image ? (
                      <img src={f.image} alt={f.headline} className="latest-feature__bg-image" />
                    ) : (
                      <div className="latest-feature__gradient"></div>
                    )}
                  </div>
                  <div className="latest-feature__content">
                    <span className="latest-feature__category">{f.category}</span>
                    <h3 className="latest-feature__headline">{f.headline}</h3>
                    <p className="latest-feature__meta">{f.meta}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            className="latest-feature__arrow latest-feature__arrow--right"
            onClick={nextLatestFeature}
            aria-label="Next feature"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>

      <section className="categories-section">
        <h2 className="categories-section__label">CATEGORIES</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div key={cat.key} className="category">
              <div className="category__header">
                <span className="category__title">{cat.title}</span>
                <a className="category__see-all" href={cat.seeAllLink}>See all</a>
              </div>

              <div className="category__hero">
                <div className="category__hero-image">
                  {cat.hero.image ? (
                    <img src={cat.hero.image} alt={cat.hero.title} />
                  ) : (
                    <div className="category__hero-gradient"></div>
                  )}
                </div>
                <div className="category__hero-content">
                  <h3 className="category__hero-title">{cat.hero.title}</h3>
                  <p className="category__hero-date">{cat.hero.date}</p>
                </div>
              </div>

              <hr className="category__divider" />

              <ul className="category__list">
                {cat.items.map((it, i) => (
                  <li key={i} className="category__list-item">
                    <h4 className="category__list-title">{it.title}</h4>
                    <p className="category__list-date">{it.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="videos-section">
        <div className="videos-header">
          <span className="video__title">VIDEOS</span>
          <a className="videos__see-all" href="/videos">See all</a>
          <div className="videos-header__spacer" aria-hidden></div>
        </div>
      </section>

      <section className="latest-issues-section">
        <h2 className="latest-issues-section__title">LATEST ISSUES</h2>
        <div className="latest-issues__rule" aria-hidden></div>

        <div className="latest-issues-grid">
          {latestIssues.map((issue, idx) => (
            <div key={idx} className="latest-issue">
              <a href={issue.link} className="latest-issue__link">
                <img src={issue.image} alt={issue.title} className="latest-issue__cover" />
              </a>
              <div className="latest-issue__meta">
                <h4 className="latest-issue__title">{issue.title}</h4>
                <p className="latest-issue__info">{issue.info}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="feedback-section">
        <div className="feedback-form">
          <div className="feedback-form__header">
            <span className="feedback-form__pill">FEEDBACK FORM</span>
            <div className="feedback-form__rule" aria-hidden></div>
          </div>

          <h3 className="feedback-form__title">Have any questions, clarifications, or comments? Send us a message through the form below</h3>

          <form className="feedback-form__body" onSubmit={(e) => { e.preventDefault(); alert('Thanks — message sent (mock).'); }}>
            <label className="feedback-form__label">Email Address:</label>
            <input className="feedback-form__input" type="email" name="email" placeholder="you@example.com" required />

            <label className="feedback-form__label">Message:</label>
            <textarea className="feedback-form__textarea" name="message" rows={8} placeholder="Write your message here..." required></textarea>

            <div className="feedback-form__actions">
              <button type="submit" className="feedback-form__btn">Send Message</button>
            </div>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__left">
            <div className="site-footer__brand">
              <img src={logoImage} alt="The PILLAR Logo" className="site-footer__logo" />
              <h2 className="site-footer__title">THE PILLAR</h2>
            </div>
            <p className="site-footer__desc"><strong>The Pillar</strong> is the official student publication of the University of Eastern Philippines-Main Campus. Upholding its tenet: <strong>Critical. Fearless. Unapologetic.</strong></p>
            <p className="site-footer__copyright">© The Pillar. All Rights Reserved.</p>
          </div>

          <div className="site-footer__center">
            <h4 className="site-footer__follow">Follow us:</h4>
            <div className="site-footer__socials">
              <a className="social" href="#" aria-label="Facebook"><img src={facebookIcon} alt="Facebook" /></a>
              <a className="social" href="#" aria-label="Mail"><img src={gmailIcon} alt="Email" /></a>
              <a className="social" href="#" aria-label="TikTok"><img src={tiktokIcon} alt="TikTok" /></a>
              <a className="social" href="#" aria-label="Instagram"><img src={instagramIcon} alt="Instagram" /></a>
              <a className="social" href="#" aria-label="YouTube"><img src={youtubeIcon} alt="YouTube" /></a>
            </div>
          </div>

          <div className="site-footer__right">
            <h4 className="site-footer__newsletter-title">Login to get your e-copies of newsletters:</h4>
            <form className="site-footer__newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed (mock).'); }}>
              <input type="email" className="site-footer__newsletter-input" placeholder="name123@gmail.com" />
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;


