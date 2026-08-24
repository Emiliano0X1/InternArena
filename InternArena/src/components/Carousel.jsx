import { useState, useEffect, useRef, useCallback } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import PropTypes from 'prop-types'

const defaultImages = [
    {
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        title: 'Elite Coding Battles',
        description: 'Compete head-to-head with top developers in real-time programming matches.'
    },
    {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        title: 'Global Developer Community',
        description: 'Join a thriving network of competitive programmers and tech enthusiasts.'
    },
    {
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
        title: 'Arena Event Memories',
        description: 'Relive the excitement of our annual hackathons, coding workshops, and local meetups.'
    },
    {
        url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
        title: 'Master the Leaderboard',
        description: 'Optimize your algorithms, track your stats, and showcase your skills to top employers.'
    }
]

function Carousel({ images = defaultImages, autoPlayInterval = 5000 }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(1) // 1 for right, -1 for left
    const [isPaused, setIsPaused] = useState(false)
    const timerRef = useRef(null)

    // Handle next slide
    const handleNext = useCallback(() => {
        setDirection(1)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, [images.length])

    // Handle previous slide
    const handlePrev = useCallback(() => {
        setDirection(-1)
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }, [images.length])

    // Handle jump to dot
    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? 1 : -1)
        setCurrentIndex(index)
    }

    // Autoplay logic
    useEffect(() => {
        if (!isPaused) {
            timerRef.current = setInterval(handleNext, autoPlayInterval)
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [isPaused, handleNext, autoPlayInterval])

    // Slide animation variants
    const slideVariants = {
        enter: (dir) => ({
            x: dir > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 1.05
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.6 }
            }
        },
        exit: (dir) => ({
            x: dir < 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.95,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.6 }
            }
        })
    }

    return (
        <div 
            className="relative w-full h-full overflow-hidden bg-neutral-950 flex flex-col justify-end"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] z-10 pointer-events-none" />

            {/* Slides container */}
            <div className="absolute inset-0 w-full h-full">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Image */}
                        <img 
                            src={images[currentIndex].url} 
                            alt={images[currentIndex].title}
                            className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05]"
                        />
                        {/* Vibrant color gradient overlay matching orange theme */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Content & Navigation overlay */}
            <div className="relative z-20 w-full p-8 md:p-12 lg:p-16 flex flex-col gap-6 select-none bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent pt-32">
                {/* Caption Text with motion */}
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={currentIndex}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 max-w-xl"
                    >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-sm shadow-orange-500/5">
                            COMMUNITY HIGHLIGHT
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                            {images[currentIndex].title}
                        </h2>
                        <p className="text-sm text-neutral-400 font-medium leading-relaxed">
                            {images[currentIndex].description}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation row (Dots + Arrows) */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-800/40">
                    {/* Dots indicator */}
                    <div className="flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                    index === currentIndex 
                                        ? 'w-6 bg-orange-500' 
                                        : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Manual Navigation Arrows */}
                    <div className="flex gap-2.5">
                        <button
                            onClick={handlePrev}
                            className="w-10 h-10 rounded-full flex items-center justify-center border border-neutral-800 bg-neutral-900/60 backdrop-blur-md text-white hover:text-orange-500 hover:border-orange-500/30 hover:bg-neutral-800/80 transition-all cursor-pointer shadow-md group"
                            aria-label="Previous slide"
                        >
                            <FiChevronLeft className="text-xl transition-transform duration-200 group-hover:-translate-x-0.5" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-10 h-10 rounded-full flex items-center justify-center border border-neutral-800 bg-neutral-900/60 backdrop-blur-md text-white hover:text-orange-500 hover:border-orange-500/30 hover:bg-neutral-800/80 transition-all cursor-pointer shadow-md group"
                            aria-label="Next slide"
                        >
                            <FiChevronRight className="text-xl transition-transform duration-200 group-hover:translate-x-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Carousel.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })
    ),
    autoPlayInterval: PropTypes.number
}

export default Carousel
