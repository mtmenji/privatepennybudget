import React, { useState } from 'react';

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full mx-auto">
      {/* Slide content */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform ease-in-out duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-[calc(100vh-80px)] relative"
            >
              <img
                src={slide.image}
                alt={slide.text}
                className="w-full h-full object-fill"
              />
              {slide.text && (
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 text-center">
                {slide.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 h-1/6 left-2 transform -translate-y-1/2 text-bodyTextLight bg-dark2 hover:bg-dark3 rounded-md p-2"
      >
        &#8249;
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 h-1/6 right-2 transform -translate-y-1/2 text-bodyTextLight bg-dark2 hover:bg-dark3 rounded-md p-2"
      >
        &#8250;
      </button>

      {/* Dots navigation */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index
                ? 'bg-gray-900'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

const SideNavigationMenu = ({ carousels, setActiveCarousel }) => {
  return (
    <div className="w-56 h-full bg-dark3 shadow-lg">
        <h2 className='pl-2 text-xl py-2 text-bodyTextLight'>Menu</h2>
      <ul className="space-y-1 p-1">
        {carousels.map((carouselName, index) => (
          <li key={index}>
            <button
              onClick={() => setActiveCarousel(index)}
              className="w-full text-left py-1 px-4 bg-light3 hover:bg-light2 focus:bg-gray-400"
            >
              {carouselName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Tutorial = () => {
  const carouselsData = [
    [
        { image: '/images/tutorial1-1Large.png' },
        { image: '/images/tutorial1-2Large.png' }
    ],
    [
      { image: '/images/tutorial2-1Large.png', text: "The Dashboard Page is where you can review your reports. You can set Payment Reminders and Savings Goals. You can also view your spending habits to adjust your battle plans if your proposed plan isn't working!" },
      { image: 'https://via.placeholder.com/400x300', text: 'Reports: ' },
      { image: 'https://via.placeholder.com/400x300', text: 'Payment Reminders: ' },
      { image: 'https://via.placeholder.com/400x300', text: 'Savings Goals: ' },
      { image: 'https://via.placeholder.com/400x300', text: 'Utilized Dashboard Page: ' }
    ],
    [
      { image: 'https://via.placeholder.com/400x300', text: 'Creating a Budget: ' },
      { image: 'https://via.placeholder.com/400x300', text: 'Selecting a Budget: ' },
      { image: 'https://via.placeholder.com/400x300', text: 'Setting a Default Budget or Deleting a Budget: ' },
      { image: 'https://via.placeholder.com/400x300', text: 'Budget Details: ' }
    ],
    [
      { image: 'https://via.placeholder.com/400x300', text: 'Adding a Transaction: ' },
      { image: 'https://via.placeholder.com/400x300', text: 'Filtering Transactions: ' }
    ],
    [
        { image: 'https://via.placeholder.com/400x300', text: 'Editing Account Settings: ' }
    ]
  ];

  const [activeCarousel, setActiveCarousel] = useState(0);

  return (
    <div className="flex h-[calc(100vh-80px)] w-screen">
      {/* Side Navigation Menu */}
      <div>
        <SideNavigationMenu
            carousels={['Getting Started', 'Dashboard Page', 'Budget Page', 'Transactions Page', 'Settings Page']}
            setActiveCarousel={setActiveCarousel}
        />
      </div>

      {/* Carousel */}
      <div className="flex-grow flex items-center justify-center">
        <Carousel slides={carouselsData[activeCarousel]} />
      </div>
    </div>
  );
};

export default Tutorial;