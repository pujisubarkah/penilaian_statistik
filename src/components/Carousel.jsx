import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Carousel = () => {
    const images = [
        require('../Asset/image1.jpeg'),
        require('../Asset/image2.jpeg'),
        require('../Asset/image3.jpeg'),
        require('../Asset/image4.jpeg'),
        require('../Asset/image5.jpeg'),
        require('../Asset/image6.jpeg'),
        // Add more image paths as needed
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 3) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 3 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="flex flex-col items-center justify-center bg-darkred p-5 rounded-lg shadow-lg overflow-hidden">
            <h1 className="text-2xl font-bold mb-4">KEGIATAN PENYELENGGARAN STATISTIK SEKTORAL LAN</h1>
            <div className="relative flex items-center justify-center bg-darkred rounded-lg p-5 shadow-lg">
                <button 
                    onClick={prevSlide} 
                    className="absolute left-5 bg-white text-darkred p-4 rounded-full shadow-md transition duration-300 hover:bg-teal-700 hover:text-white"
                >
                    <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                </button>
                
                <div className="flex items-center justify-center gap-5">
                    {images.length > 0 && [...Array(3)].map((_, i) => {
                        const index = (currentIndex + i) % images.length;
                        return (
                            <img 
                                key={index}
                                src={images[index]}
                                alt={`Slide ${index}`}
                                className="h-[400px] w-auto rounded-lg object-cover transition-transform duration-500"
                            />
                        );
                    })}
                </div>
                
                <button 
                    onClick={nextSlide} 
                    className="absolute right-5 bg-white text-darkred p-4 rounded-full shadow-md transition duration-300 hover:bg-teal-700 hover:text-white"
                >
                    <FontAwesomeIcon icon={faChevronRight} size="2x" />
                </button>
            </div>
        </div>
    );
};

export default Carousel;
