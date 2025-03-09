"use client"

import { ArrowUpRight } from "lucide-react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"

import Header from "../header"

import Forms from "../forms"
import Footer from "../footer"

export default function Home() {
  // Animation variants for reuse
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
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

  const slideRight = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
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

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const floatAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  }

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  }

  const shimmerAnimation = {
    initial: { opacity: 1 },
    animate: {
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  }

  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const leftRotation = useTransform(scrollYProgress, [0, 1], [-60, 70]) // Half rotation
  const rightRotation = useTransform(scrollYProgress, [0, 1], [0, -100]) // Half rotation

  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const handleTestimonialChange = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentTestimonial((prev) => (prev === 1 ? 0 : 1))
    } else {
      setCurrentTestimonial((prev) => (prev === 0 ? 1 : 0))
    }
  }

  return (
    <main className="">
      {/* header */}
      <Header />

      {/* section 1 */}
      <motion.div
        className="flex justify-center pt-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="border-2 border-[#80C0C0] rounded-full md:w-[700px] md:h-[700px] xs:w-[400px] xs:h-[400px] flex justify-center items-center flex-col relative">
          <motion.h1
            className="text-center font-gilroy-sb md:text-[45px] md:pt-24 xs:text-[45px] leading-[58px] xs:w-4/5 md:w-full xs:leading-9 md:leading-[44px] xs:pt-6"
            variants={slideUp}
          >
            Maximize your rental revenue <br />
            with <span className="font-gilroy-b text-[#008080]">mr.alfred</span>
          </motion.h1>

          <motion.p
            className="font-gilroy-b md:text-[20px] xs:w-1/2 md:w-full text-center xs:text-[14px] pt-2"
            variants={slideUp}
          >
            DET- integrated Vacation Rental Management Software
          </motion.p>

          <div className="xs:hidden md:block">
            <motion.div className="flex py-5 gap-[25px]" variants={slideUp}>
              <motion.div
                className="bg-[#008080] text-white px-7 py-5 rounded-[45px] flex gap-2 font-gilroy-b text-[20px] cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: "white", color: "#008080", border: "1px 1px #008080" }}
                transition={{ duration: 0.2 }}
              >
                <button>Start Free Trial</button>
                <ArrowUpRight />
              </motion.div>

              <motion.div
                className="border-[#008080] border-[1px] text-[#008080] px-7 font-gilroy-b text-[20px] py-5 rounded-[45px] flex gap-2 cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: "#008080", color: "white" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <button>Chat with us</button>
              </motion.div>
            </motion.div>

            <motion.p className="font-gilroy-m leading-5 opacity-[75%] text-center text-[22px]" variants={slideUp}>
              Try mr.alfred for free forever.
            </motion.p>

            <motion.p className="font-gilroy-b text-[18px] text-center opacity-[75%]" variants={slideUp}>
              No credit card required
            </motion.p>
          </div>

          {/* Partner logos with animations */}
          {[
            {
              src: "/images/airbnb.png",
              position: "md:top-[5.5rem] md:left-[35.5rem] xs:top-[0rem] xs:left-[1rem]",
              borderRadius: "rounded-full",
            },
            {
              src: "/images/vrbro.png",
              position: "md:top-[19.5rem] md:left-[40rem] xs:top-[10rem] xs:left-[-2rem]",
              borderRadius: "rounded-full",
            },
            {
              src: "images/MakeMyTrip_NewLogo 1 (1).png",
              position: "md:top-[33rem] md:left-[33rem] xs:top-[20rem] xs:left-[3rem]",
              borderRadius: "rounded-[24px]",
            },
            {
              src: "/images/a...png",
              position: "md:top-[5.5rem] md:right-[35.5rem] xs:top-[0rem] xs:right-[0rem]",
              borderRadius: "rounded-full",
            },
            {
              src: "/images/b...png",
              position: "md:top-[19.5rem] md:right-[40rem] xs:top-[10rem] xs:right-[-2rem]",
              borderRadius: "rounded-[20px_20px_20px_0px]",
            },
            {
              src: "/images/experia.png",
              position: "md:top-[33rem] md:right-[33rem] xs:top-[20rem] xs:right-[3rem] ",
              borderRadius: "rounded-full",
            },
          ].map((logo, index) => (
            <motion.img
              key={index}
              src={logo.src}
              className={`h-[113px] ${logo.position} absolute md:w-[113px] xs:w-[80px] xs:h-[80px] md:h-[113px] object-cover shadow-md ${logo.borderRadius} border-0 cursor-pointer`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
              animate={{
                y: [0, -5, 0],
                transition: {
                  duration: 2 + index * 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
              }}
              transition={{
                delay: 0.2 + index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* only mobile */}
      <div className="md:hidden">
        <motion.div className="flex flex-col px-8 py-5 gap-[10px] pt-20" variants={slideUp}>
          <motion.div
            className="bg-[#008080] text-white px-7 py-4 justify-center rounded-[45px] flex gap-2 font-gilroy-b text-[18px] cursor-pointer"
            whileHover={{ scale: 1.05, backgroundColor: "#006666" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <button>Start Free Trial</button>
            <ArrowUpRight />
          </motion.div>

          <motion.div
            className="border-[#008080] border-[1px] justify-center text-[#008080] px-7 font-gilroy-b text-[18px] py-3 rounded-[45px] flex gap-2 cursor-pointer"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 128, 128, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <button>Chat with us</button>
          </motion.div>
        </motion.div>

        <motion.p className="font-gilroy-m leading-5 opacity-[75%] text-[22px] text-center" variants={slideUp}>
          Try mr.alfred for free forever.
        </motion.p>

        <motion.p className="font-gilroy-b text-[18px] opacity-[75%] text-center" variants={slideUp}>
          No credit card required
        </motion.p>
      </div>

      {/* section 2 */}
      <motion.div
        className="pt-12 md:pb-8 xs:pb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <motion.div variants={slideUp}>
          <p className="font-gilroy-bl text-[#008080] text-center text-[40px]">Our Integrations</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-9 xs:grid-cols-5 flex-1 max-h-[100px] gap-4 items-center justify-between px-10"
          variants={staggerChildren}
        >
          {Array.from({ length: 9 }, (_, i) => (
            <motion.img
              key={i}
              src={`/images/icon${i + 1}.png`}
              className="grayscale object-contain w-[90px] cursor-pointer"
              variants={scaleIn}
              whileHover={{
                scale: 1.2,
                filter: "grayscale(0)",
                transition: { duration: 0.3 },
              }}
              animate={{
                y: [0, -5, 0],
                transition: {
                  duration: 2 + i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* 3rd Section */}
      <motion.div
        ref={sectionRef}
        className="bg-gradient-to-r from-[#008080] to-[#0E3F3F] flex md:flex-col xs:flex-col lg:flex-row items-center py-10 justify-center gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <motion.div className="flex items-end" variants={slideRight}>
          <motion.img src="/images/Group 3914.png" alt="" width={235} height={280} style={{ rotate: leftRotation }} />
          <motion.img
            src="/images/Group 3913.png"
            alt=""
            width={98}
            height={98}
            className="h-[98px]"
            style={{ rotate: leftRotation }}
          />
        </motion.div>

        <motion.div className="flex justify-center items-center flex-col" variants={slideUp}>
          <h3 className="font-gilroy-sb text-[40px] text-center text-white">
            Stay Connected with <br />
            50+ OTAs
          </h3>

          <div className="flex py-5 gap-[25px]">
            <motion.div
              className="bg-white text-[#008080] px-7 py-5 rounded-[45px] flex gap-2 font-gilroy-b text-[20px] cursor-pointer"
              whileHover={{ scale: 1.05, backgroundColor: "white", color: "#008080" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <button>Start Free Trial</button>
              <ArrowUpRight />
            </motion.div>

            <motion.div
              className="bg-white text-[#008080] px-12 font-gilroy-b text-[20px] py-5 rounded-[45px] flex gap-2 cursor-pointer"
              whileHover={{ scale: 1.05, backgroundColor: "white", color: "#008080" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <button>Chat with us</button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="flex items-start" variants={slideLeft}>
          <motion.img
            src="/images/Group 3915.png"
            alt=""
            width={98}
            height={98}
            className="h-[98px]"
            style={{ rotate: rightRotation }}
          />
          <motion.img src="/images/Group 3916.png" alt="" width={235} height={280} style={{ rotate: rightRotation }} />
        </motion.div>
      </motion.div>

      {/* 4th Section */}
      <div className="flex lg:px-20 px-10 md:px-10 py-10 md:flex-row xs:flex-col gap-5">
        <div className="flex flex-col gap-5 md:w-1/2">
          <motion.div
            className="bg-gradient-to-r from-[#008080] lg:h-3/5 to-[#0E3F3F] rounded-[10px] lg:pr-4 lg:pl-16 lg:pt-12 flex flex-col justify-between"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.3 },
            }}
          >
            <h3 className="text-white text-[30px] lg:w-3/4 md:pb-16 md:p-8 pl-8 md:mb-[-65px] lg:mb-[0px] pt-7 font-gilroy-sb leading-8">
              Host friendly Software for Vacation Rental
            </h3>
            <img src="images/ss1.png" />
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-[#008080]  lg:h-2/5 to-[#0E3F3F] rounded-[10px] p-12 gap-8 flex lg:flex-row-reverse md:flex-col-reverse items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.3 },
            }}
          >
            <div>
              <h3 className="text-white text-[30px] font-gilroy-sb leading-8">
                Effortless Interaction with Your Guest
              </h3>
              <p className="font-gilroy-r text-[16px pt-3 text-white">
                Automated messages for easy communication, quick access, and better guest experience.
              </p>
            </div>
            <div>
              <img className="" src="images/ss3.png" width={172} height={172} />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-5 md:w-1/2">
          <motion.div
            className="bg-gradient-to-r from-[#008080] to-[#0E3F3F] flex flex-col rounded-[10px] xs:p-[20px_0px_0px_20px] lg:pl-16 lg:pt-12 md:p-10 lg:p-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.3 },
            }}
          >
            <div>
              <h3 className="text-white font-gilroy-sb lg:text-[30px] xs:text-[20px] xs:pb-5  md:text-2xl md:pb-5 lg:w-3/4 md:pr-3 leading-9">
                Multi-Calendar for Smooth Operations
              </h3>
            </div>
            <div className="flex lg:flex-row md:flex-col lg:mt-[-20px]">
              <ul className="list-disc text-white w-full font-gilroy-r md:text-[16px] lg:text-[20px]  text-[15px] lg:pt-10 pl-4">
                <li>Real-time listing updates</li>
                <li>Color-coded bookings</li>
                <li>Quick booking access</li>
                <li>Easy date management</li>
                <li>Add bookings instantly</li>
              </ul>
              <div className="flex items-end md:hidden lg:flex xs:w-2/3 md:w-full">
                <img src="images/ss2.png" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-[#008080] to-[#0E3F3F] flex flex-row rounded-[10px] xs:p-[20px_0px_20px_20px]  pr-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="lg:w-2/3 md:p-10">
              <h3 className="text-white font-gilroy-sb md:text-[30px] xs:leading-6 xs:text-[20px]  md:leading-9">
                Both Revenue & Financial Management
              </h3>
              <ul className="list-disc text-white w-full font-gilroy-r text-[16px] lg:text-[20px] md:pt-10 xs:pt-5 pl-4">
                <li>Effortless VAT & Tax Management</li>
                <li>Accurate Payment Tracking and Reports</li>
                <li>Reduce Revenue Loss with Smart Tools</li>
                <li>Bank Account Integration & Seamless Billing</li>
                <li>Easy Access to Bills & Receipts</li>
              </ul>
            </div>
            <div className="flex w-1/3 flex-row md:hidden lg:flex ">
              <div className="flex xs:items-start md:items-end">
                <img src="images/ss4.png" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 5th section */}
      <div className="bg-gradient-to-r from-[#008080] to-[#0E3F3F] lg:px-48 md:px-10 xs:px-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-white  md:text-[45px] xs:text-[35px] leading-10 pb-7">
            Pay no more or no less <br /> than what you need
          </h3>
          <p className="lg:w-[742px] font-gilroy pb-9 text-white md:text-[20px] xs:text-[15px]">
            Choose a package that works for your business right now. No hidden terms. No unnecessary upsell. We're
            transparent with our payment plans and are happy to adapt as and when required.
          </p>
        </motion.div>

        <div className="md:bg-[#FFFFFF80] backdrop-blur-[35px] rounded-[26px]  flex md:flex-row xs:flex-col lg:px-16 md:pl-5 md:py-10 gap-8 md:gap-4 relative">
          <div className="md:w-2/3 flex gap-8 md:flex-row xs:flex-col">
            <motion.div
              className="bg-[#022D2D40] p-6 rounded-[26px] flex flex-col  justify-between gap-14"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.1,
                type: "spring",
                stiffness: 100,
              }}
            >
              <div>
                <p className="font-gilroy-b text-[32px] leading-[46px] text-white">Lite</p>
                <p className="font-gilroy-b text-[28px] text-white">$0</p>
                <p className="font-gilroy-b text-[17px] text-white">Unit/month</p>
                <p className="font-gilroy-r text-[15px] w-4/5 text-white">
                  Set your Business on autopilot. More profit. More Time.
                </p>
              </div>
              <div>
                <motion.button
                  className="bg-[#05C6C6] text-white lg:px-12 font-gilroy-r text-center lg:text-[20px] py-[12px] rounded-[24px] w-full flex gap-2 justify-center"
                  whileHover={{ scale: 1.05, backgroundColor: "#04a0a0" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="bg-[#022D2D40] p-6 rounded-[26px] flex flex-col justify-between gap-14"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
            >
              <div>
                <p className="font-gilroy-b text-[32px] leading-[46px] text-white">Pro</p>
                <p className="font-gilroy-b text-[28px] text-white">$7</p>
                <p className="font-gilroy-b text-[17px] text-white">Unit/month</p>
                <p className="font-gilroy-r text-[15px] w-4/5 text-white">
                Turbo-boost your operations and run your business like a pro.                </p>
              </div>
              <div>
                <motion.button
                  className="bg-[#05C6C6] text-white lg:px-12 font-gilroy-r text-center lg:text-[20px] py-[12px] rounded-[24px] w-full flex gap-2 justify-center"
                  whileHover={{ scale: 1.05, backgroundColor: "#04a0a0" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="bg-[#022D2D] p-6 rounded-[26px] flex flex-col justify-between gap-14 bottom-[35px] lg:right-[35px] md:right-[-2%] lg:w-[300px] md:w-1/3 md:absolute shadow-2xl"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
            }}
          >
            <div className="flex justify-end">
              <motion.button
                className="bg-[#05C6C6] text-white px-4 font-gilroy-r text-center lg:text-[13px] py-[8px] rounded-[24px]  flex gap-2 justify-end"
                whileHover={{ scale: 1.05, backgroundColor: "#04a0a0" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
MOST POPULAR              </motion.button>
            </div>
            <div>
              <p className="font-gilroy-b text-[32px] leading-[46px] text-white">Platinum</p>
              <p className="font-gilroy-b text-[28px] text-white">$15</p>
              <p className="font-gilroy-b text-[17px] text-white">Unit/month</p>
              <p className="font-gilroy-r text-[15px] w-4/5 text-white">
              Work with a fully customized solution designed to aid growth & business longevity.              </p>
            </div>
            <div>
              <motion.button
                className="bg-[#05C6C6] text-white px-12 font-gilroy-r text-center lg:text-[20px] py-[12px] rounded-[24px] w-full flex gap-2 justify-center"
                whileHover={{ scale: 1.05, backgroundColor: "#04a0a0" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex md:flex-row xs:flex-col py-8 gap-[25px] justify-center pb-12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            className="bg-white text-[#008080] px-7 py-5 rounded-[45px] justify-center flex gap-2 font-gilroy-sb text-[20px] cursor-pointer"
            whileHover={{ scale: 1.05, backgroundColor: "#f0f0f0" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <button>Start Free Trial</button>
            <ArrowUpRight />
          </motion.div>

          <motion.div
            className="bg-white md:w-[230px] text-[#008080] px-7 font-gilroy-sb text-[20px] py-5 rounded-[45px] flex gap-2 justify-center cursor-pointer"
            whileHover={{ scale: 1.05, backgroundColor: "#f0f0f0" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <button>Chat with us</button>
          </motion.div>
        </motion.div>
      </div>

      {/* 6th Section */}
      <motion.div
        className="flex md:flex-row xs:flex-col lg:p-20 md:px-10 md:py-10 md:gap-4 xs:p-10 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <motion.div className="md:w-[10%]" variants={slideRight}>
          <img src="images/Vector.png" alt="" width={88} height={68} />
        </motion.div>

        {/* Testimonial content */}
        <div className="flex lg:ml-[70px] md:w-[90%] md:flex-row xs:flex-col-reverse">
          <motion.div className="flex flex-col justify-between md:w-1/2 pt-14 pb-4" variants={slideUp}>
            <div className="gap-8 flex flex-col">
              <h3 className="text-[#008080] font-gilroy-b leading-9 text-[45px]">What Hosts are saying about us</h3>

              {/* Testimonial content with animation */}
              <AnimatePresence mode="wait">
                {currentTestimonial === 0 ? (
                  <motion.p
                    key="testimonial1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="pr-16"
                  >
                    Hear what real hosts have to say about how mr.alfred has transformed their rental management and
                    helped them grow their business. The platform has been a game-changer for my properties.
                  </motion.p>
                ) : (
                  <motion.p
                    key="testimonial2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="pr-16"
                  >
                    Mr.alfred has completely revolutionized how I manage my vacation rentals. The intuitive interface
                    and powerful features have saved me countless hours and increased my bookings.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Testimonial author with animation */}
            <AnimatePresence mode="wait">
              {currentTestimonial === 0 ? (
                <motion.div
                  key="author1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="md:text-right xs:pt-5 md:pt-0"
                >
                  <h5>Sachin Tendulkar</h5>
                  <p>Marketing Manager</p>
                </motion.div>
              ) : (
                <motion.div
                  key="author2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="md:text-right xs:pt-5 md:pt-0"
                >
                  <h5>Virat Kohli</h5>
                  <p>Property Investor</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Stacked images with animation */}
          <motion.div className="md:w-1/2 lg:pl-20 relative" variants={slideLeft}>
            <div className="relative" style={{ width: 284, height: 435 }}>
              {/* Back image (always visible but partially) */}
              <motion.div
                className="absolute top-0 left-0"
                animate={{
                  x: currentTestimonial === 0 ? 20 : 0,
                  y: currentTestimonial === 0 ? 19 : 0,
                  scale: currentTestimonial === 0 ? 0.95 : 1,
                  rotateY: currentTestimonial === 0 ? "10deg" : "0deg",
                  zIndex: currentTestimonial === 0 ? 1 : 2,
                  filter: currentTestimonial === 0 ? "brightness(90%) blur(1px)" : "brightness(100%) blur(0px)",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              >
                <img
                  src="/images/virat.webp"
                  width={284}
                  height={435}
                  alt="Testimonial"
                  className="rounded-2xl object-cover w-[284px] h-[435px]"
                />
              </motion.div>

              {/* Front image */}
              <motion.div
                className="absolute top-0 left-0"
                animate={{
                  x: currentTestimonial === 1 ? 20 : 0,
                  y: currentTestimonial === 1 ? 10 : 0,
                  scale: currentTestimonial === 1 ? 0.95 : 1,
                  rotateY: currentTestimonial === 1 ? "10deg" : "0deg",
                  zIndex: currentTestimonial === 1 ? 1 : 2,
                  filter: currentTestimonial === 1 ? "brightness(90%)" : "brightness(100%)",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              >
                <img
                  src="/images/sachin.jpeg"
                  width={284}
                  height={435}
                  alt="Testimonial"
                  className="rounded-2xl object-cover w-[284px] h-[435px]"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div className="md:w-[10%] flex items-end" variants={slideLeft}>
          <img src="images/Vector.png" alt="" width={88} height={68} className="scale-x-[-1]" />
        </motion.div>

        {/* Navigation dots */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
          <button
            onClick={() => setCurrentTestimonial(0)}
            className={`w-3 h-3 rounded-full ${currentTestimonial === 0 ? "bg-[#008080]" : "bg-gray-300"}`}
            aria-label="View first testimonial"
          />
          <button
            onClick={() => setCurrentTestimonial(1)}
            className={`w-3 h-3 rounded-full ${currentTestimonial === 1 ? "bg-[#008080]" : "bg-gray-300"}`}
            aria-label="View second testimonial"
          />
        </div>
        {/* Next/Previous buttons */}
        <div className=" xs:hidden md:flex z-30 absolute top-1/2 left-10 right-10 transform -translate-y-1/2 flex justify-between px-4 md:px-10 pointer-events-none">
          <button
            onClick={() => handleTestimonialChange("prev")}
            className="bg-[#008080] bg-opacity-50 rounded-full p-5 hover:bg-opacity-80 transition-all shadow-md pointer-events-auto"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={() => handleTestimonialChange("next")}
            className="bg-[#008080] bg-opacity-50 rounded-full p-5 hover:bg-opacity-80 transition-all shadow-md pointer-events-auto"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </motion.div>

      {/* 7th Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Forms />
      </motion.div>

      {/* footer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Footer />
      </motion.div>
    </main>
  )
}

