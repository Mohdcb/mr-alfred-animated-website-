"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sachin Tendulkar",
    position: "Marketing Manager",
    image: "/images/sachin.jpeg",
    content:
      "Mr.alfred has completely transformed how I manage my rental properties. The automation tools have saved me countless hours, and the customer support is exceptional. I've been able to grow my business by 30% since using their platform.",
  },
  {
    id: 2,
    name: "Virat Kohli",
    position: "Property Investor",
    image: "/images/virat.webp",
    content:
      "As someone who manages multiple properties, I needed a solution that was both powerful and easy to use. Mr.alfred delivered exactly that. The platform's intuitive design and comprehensive features have made property management a breeze.",
  },
]

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const controls = useAnimation()
  const constraintsRef = useRef(null)

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  const slideRight = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  const slideLeft = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  // Variants for the testimonial content
  const contentVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  }

  // Variants for the stacked images
  const imageStackVariants = {
    initial: {
      rotateY: 0,
      scale: 1,
      zIndex: 10,
      transition: { duration: 0.5 },
    },
    animate: (isActive) => ({
      rotateY: isActive ? 0 : 15,
      scale: isActive ? 1 : 0.85,
      zIndex: isActive ? 10 : 5,
      filter: isActive ? "brightness(100%)" : "brightness(90%)",
      x: isActive ? 0 : 20,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  }

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <motion.div
      className="flex md:flex-row xs:flex-col lg:p-20 md:px-10 md:py-10 md:gap-4 xs:p-10 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
      ref={constraintsRef}
    >
      {/* Left quotation mark */}
      <motion.div className="md:w-[10%]" variants={slideRight}>
        <img src="/images/Vector.png" alt="Quotation mark" width={88} height={68} />
      </motion.div>

      <div className="flex lg:ml-[70px] md:w-[90%] md:flex-row xs:flex-col-reverse">
        {/* Text content */}
        <motion.div className="flex flex-col justify-between md:w-1/2 pt-14 pb-4" variants={slideUp}>
          <div className="gap-8 flex flex-col">
            <h3 className="text-[#008080] font-gilroy-b leading-9 text-[45px]">What Hosts are saying about us</h3>

            <AnimatePresence custom={direction} mode="wait">
              <motion.p
                key={currentIndex}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="pr-16"
              >
                {testimonials[currentIndex].content}
              </motion.p>
            </AnimatePresence>
          </div>

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="md:text-right xs:pt-5 md:pt-0"
            >
              <h5 className="font-semibold text-lg">{testimonials[currentIndex].name}</h5>
              <p className="text-gray-600">{testimonials[currentIndex].position}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Stacked images */}
        <motion.div className="md:w-1/2 relative" variants={slideLeft}>
          <div className="relative h-[458px] w-[381px] mx-auto">
            {testimonials.map((testimonial, index) => {
              const isActive = index === currentIndex
              const nextIndex = (currentIndex + 1) % testimonials.length
              const isNext = index === nextIndex

              // Only render the current and next image for the stack effect
              if (!isActive && !isNext) return null

              return (
                <motion.div
                  key={testimonial.id}
                  custom={isActive}
                  variants={imageStackVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute top-0 left-0 rounded-2xl overflow-hidden"
                  style={{
                    originX: 0,
                    width: 381,
                    height: 458,
                    zIndex: isActive ? 10 : 5,
                    transformStyle: "preserve-3d",
                    perspective: 1000,
                  }}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={`Testimonial from ${testimonial.name}`}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[#008080] border-b-8 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Right quotation mark */}
      <motion.div className="md:w-[10%] flex items-end" variants={slideLeft}>
        <img src="/images/Vector.png" alt="Quotation mark" width={88} height={68} className="scale-x-[-1]" />
      </motion.div>

      {/* Navigation controls */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-[#008080]" : "bg-gray-300"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Arrow navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition-all"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="text-[#008080]" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition-all"
        aria-label="Next testimonial"
      >
        <ChevronRight className="text-[#008080]" />
      </button>
    </motion.div>
  )
}

export default TestimonialSection