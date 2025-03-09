import { ArrowBigDown, ArrowDownRight, ArrowUpRight } from "lucide-react"
import * as motion from "motion/react-client"

import Forms from './forms';
import Footer from './footer';
import Link from "next/link";



export default function Home() {
  return (
    <main className="">


      {/* header */}

<header className="flex flex-row align-middle items-center justify-between px-20 pt-5 pb-10">
<div>
  <img src="images/logo.png" alt="" width={186} height={54} className="object-contain" />
</div>

<nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-lg font-medium hover:text-teal-600 transition">
              Home
            </Link>
            <Link href="/about" className="text-lg font-medium hover:text-teal-600 transition">
              About
            </Link>
            <Link href="/features" className="text-lg font-medium hover:text-teal-600 transition">
              Features
            </Link>
            <Link href="/solution" className="text-lg font-medium hover:text-teal-600 transition">
              Solution
            </Link>
            <Link href="/pricing" className="text-lg font-medium hover:text-teal-600 transition">
              Pricing
            </Link>
            <Link href="/contact" className="text-lg font-medium hover:text-teal-600 transition">
              Contact
            </Link>
          </nav>
<div>
<div className="flex py-5 gap-[25px]">
            <div className="bg-[#008080] text-white px-7 py-3 rounded-[45px]   text-[18px]">
              <button> Start Free Trial </button>
            </div>

            <div className="border-[#008080] border-[1px] text-[#008080] px-7  text-[18px] py-3 rounded-[45px] ">
              <button> Chat with us </button>

            </div>

          </div>
</div>


</header>


{/* section 1  */}


      <div className="flex justify-center pt-5 ">
        <div className="border-2 border-[#80C0C0] rounded-full w-[700px] h-[700px] flex justify-center items-center flex-col ">

          <h1 className="text-center font-gilroy-sb motion-preset-slide-right  text-[45px] pt-24 leading-[58px]">
            Maximize your rental revenue  <br />
            with <span className="font-gilroy-b text-[#008080] ">mr.alfred</span>
          </h1>

          <p className="font-gilroy-b text-[20px] pt-2">
            DET- integrated Vacation Rental Management Software
          </p>

          <div className="flex py-5 gap-[25px]">
            <div className="bg-[#008080] text-white px-7 py-5 rounded-[45px] flex gap-2 font-gilroy-b text-[20px]">
              <button> Start Free Trial </button>
              <ArrowUpRight />
            </div>

            <div className="border-[#008080] border-[1px] text-[#008080] px-7 font-gilroy-b text-[20px] py-5 rounded-[45px] flex gap-2">
              <button> Chat with us </button>

            </div>

          </div>

          <p className="font-gilroy-m leading-5 opacity-[75%] text-[22px] ">Try mr.alfred for free forever.</p>
          <p className="font-gilroy-b text-[18px] opacity-[75%] ">
            No credit card required
          </p>


          <img src="/images/airbnb.png" className="h-[113px] top-[14.5rem] left-[24.5rem] absolute w-[113px] object-cover shadow-md rounded-full border-0" />
          <img src="/images/vrbro.png" className="h-[113px] top-[28.5rem] left-[20rem] absolute w-[113px] object-cover shadow-md rounded-full border-0" />
          <img src="images/MakeMyTrip_NewLogo 1 (1).png" className="h-[113px] top-[45rem] left-[28rem] absolute w-[113px] object-cover shadow-md rounded-[24px] border-0" />



          <img src="/images/a...png" className="h-[113px] top-[14.5rem] right-[24.5rem] absolute w-[113px] object-cover  rounded-full border-0" />
          <img src="/images/b...png" className="h-[113px] top-[28.5rem] right-[20rem] absolute w-[113px] object-cover shadow-md rounded-[20px_20px_20px_0px] border-0" />
          <img src="/images/experia.png" className="h-[113px] top-[45rem] right-[28rem] absolute w-[113px] object-cover shadow-md rounded-full border-0" />




        </div></div>

{/* section 2  */}

      <div className="pt-12 pb-8">
        <div>
          <p className="font-gilroy-bl  text-[#008080] text-center text-[40px]">Our Integrations</p>
        </div>

        <div className="flex flex-row flex-1 max-h-[100px] gap-4 items-center justify-between px-10">
          <img src="/images/icon1.png" className="grayscale object-contain w-[90px]" />
          <img src="/images/icon2.png" className="grayscale object-contain w-[90px]" />

          <img src="/images/icon3.png" className="grayscale object-contain w-[113px]" />
          <img src="/images/icon4.png" className="grayscale object-contain w-[113px]" />
          <img src="/images/icon5.png" className="grayscale object-contain w-[113px]" />
          <img src="/images/icon6.png" className="grayscale object-contain w-[113px]" />
          <img src="/images/icon7.png" className="grayscale object-contain w-[113px]" />
          <img src="/images/icon8.png" className="grayscale object-contain w-[113px]" />
          <img src="/images/icon9.png" className="grayscale object-contain w-[113px]" />


        </div>

      </div>



      {/* 3rd Section */}

      <div className=" bg-gradient-to-r intersect-once intersect:motion-preset-slide-up  from-[#008080] to-[#0E3F3F] flex items-center py-10 justify-center gap-8  ">

        <div className="flex items-end">
          <img src="/images/Group 3914.png" alt="" width={235} height={280} />
          <img src="/images/Group 3913.png" alt="" width={98} height={98} className="h-[98px] " />

        </div>

        <div className="flex justify-center items-center flex-col">
          <h3 className="font-gilroy-sb text-[40px] text-center text-white ">Stay Connected with <br />
            50+ OTAs</h3>

          <div className="flex py-5 gap-[25px]">
            <div className="bg-white text-[#008080] px-7 py-5 rounded-[45px] flex gap-2 font-gilroy-b text-[20px]">
              <button> Start Free Trial </button>
              <ArrowUpRight />
            </div>

            <div className=" bg-white text-[#008080] px-12 font-gilroy-b text-[20px] py-5 rounded-[45px] flex gap-2">
              <button> Chat with us </button>

            </div>

          </div>

        </div>

        <div className="flex items-start">
          <img src="/images/Group 3915.png" alt="" width={98} height={98} className="h-[98px] " />
          <img src="/images/Group 3916.png" alt="" width={235} height={280} />

        </div>

      </div>


      {/* 4th Section  */}
      <div className="flex px-20 py-10 flex-row gap-5">
        <div className="flex flex-col gap-5 w-1/2">

          <div className=" bg-gradient-to-r from-[#008080] h-3/5 to-[#0E3F3F] rounded-[10px]  pr-4 pl-16 pt-12 flex flex-col justify-between ">
            <h3 className="text-white text-[30px] w-1/2 pl-8 mb-[-65px] pt-7 font-gilroy-sb leading-8 ">Host friendly
              Software for
              Vacation Rental</h3>

            <img src="images/ss1.png"></img>
          </div>

          <div className=" bg-gradient-to-r from-[#008080] h-2/5 to-[#0E3F3F] rounded-[10px]  p-12 gap-8 flex flex-row-reverse  items-center">
            <div> <h3 className="text-white text-[30px]  font-gilroy-sb leading-8 ">Effortless Interaction with Your Guest</h3>

              <p className="font-gilroy-r text-[16px pt-3 text-white">Automated messages for easy communication, quick access, and better guest experience.</p> </div>
            <div>
              <img src="images/ss3.png" width={172} height={172}></img></div>
          </div>


        </div>

        <div className="flex flex-col gap-5 w-1/2">



          <div className=" bg-gradient-to-r from-[#008080] to-[#0E3F3F] flex flex-col   rounded-[10px] pl-16 pt-12 ">
            <div><h3 className="text-white font-gilroy-sb text-[30px] w-3/4 leading-9">Multi-Calendar for Smooth
              Operations</h3></div>
            <div className="flex flex-row mt-[-20px]">
              <ul className="list-disc text-white w-full font-gilroy-r text-[16px] pt-10 pl-4">
                <li>Real-time listing updates</li>
                <li>Color-coded bookings</li>
                <li>Quick booking access</li>
                <li>Easy date management</li>
                <li>Add bookings instantly</li>
              </ul>



              <div className="flex items-end"><img src="images/ss2.png"></img></div>
            </div>
          </div>

          <div className=" bg-gradient-to-r from-[#008080] to-[#0E3F3F] flex flex-row   rounded-[10px] p-12 pr-0 ">


            <div className="w-2/3"><h3 className="text-white font-gilroy-sb text-[30px] w-11/12 leading-9">Both Revenue & Financial Management</h3>

              <ul className="list-disc text-white w-full font-gilroy-r text-[16px] pt-10 pl-4">
                <li>Effortless VAT & Tax Management</li>
                <li>Accurate Payment Tracking and Reports</li>
                <li>Reduce Revenue Loss with Smart Tools</li>
                <li>Bank Account Integration & Seamless Billing</li>
                <li>Easy Access to Bills & Receipts</li>
              </ul>
            </div>

            <div className="flex w-1/3 flex-row ">
              <div className="flex items-end"><img src="images/ss4.png"></img></div>
            </div>
          </div>


        </div>

      </div>


      {/* 5th section  */}
      <div className="bg-gradient-to-r from-[#008080] to-[#0E3F3F]  px-48  pt-20  ">
        <div>
          <h3 className="text-white text-[45px] leading-10 pb-7">Pay no more or no less <br />
            than what you need</h3>
          <p className="w-[742px] font-gilroy pb-9 text-white text-[20px]">Choose a package that works for your business right now. No hidden terms.
            No unnecessary upsell. We’re transparent with our payment plans and are happy to adapt as and when required.</p>
        </div>

        <div className=" bg-[#FFFFFF80] backdrop-blur-[35px] rounded-[26px] flex px-16 py-10 gap-8 ">
          <div className="w-2/3 flex gap-8">
            <motion.div className="bg-[#022D2D40] p-6 rounded-[26px] flex flex-col justify-between gap-14 " 
            
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.2,
                scale: { type: "spring", visualDuration: 0.2, bounce: .3 },
            }} 
            
            >
              <div>
                <p className="font-gilroy-b text-[32px] leading-[46px]  text-white">Lite</p>
                <p className="font-gilroy-b text-[28px]   text-white ">$0</p>
                <p className="font-gilroy-b text-[17px]   text-white " >Unit/month</p>
                <p className="font-gilroy-r text-[15px] w-4/5  text-white " >Set your Business on autopilot. More profit. More Time.</p>

              </div>
              <div>
                <button className=" bg-[#05C6C6] text-white px-12 font-gilroy-r text-center text-[20px] py-[12px] rounded-[24px] w-full flex gap-2 justify-center" > Get Started </button>

              </div>
            </motion.div>

            <div className="bg-[#022D2D40] p-6 rounded-[26px] flex flex-col justify-between gap-14 ">
              <div>
                <p className="font-gilroy-b text-[32px] leading-[46px]  text-white">Lite</p>
                <p className="font-gilroy-b text-[28px]   text-white ">$0</p>
                <p className="font-gilroy-b text-[17px]   text-white " >Unit/month</p>
                <p className="font-gilroy-r text-[15px] w-4/5  text-white " >Set your Business on autopilot. More profit. More Time.</p>

              </div>
              <div>
                <button className=" bg-[#05C6C6] text-white px-12 font-gilroy-r text-center text-[20px] py-[12px] rounded-[24px] w-full flex gap-2 justify-center" > Get Started </button>

              </div>
            </div>


          </div>
          <div className="bg-[#022D2D] p-6 rounded-[26px] flex flex-col justify-between gap-14 bottom-[35px] right-[35px] w-[300px] absolute shadow-2xl">
            <div>
              <button className=" bg-[#05C6C6] text-white px-12 font-gilroy-r text-center text-[20px] py-[12px] rounded-[24px] w-full flex gap-2 justify-center" > Get Started </button>

            </div>
            <div>
              <p className="font-gilroy-b text-[32px] leading-[46px]  text-white">Lite</p>
              <p className="font-gilroy-b text-[28px]   text-white ">$0</p>
              <p className="font-gilroy-b text-[17px]   text-white " >Unit/month</p>
              <p className="font-gilroy-r text-[15px] w-4/5  text-white " >Set your Business on autopilot. More profit. More Time.</p>

            </div>
            <div>
              <button className=" bg-[#05C6C6] text-white px-12 font-gilroy-r text-center text-[20px] py-[12px] rounded-[24px] w-full flex gap-2 justify-center" > Get Started </button>

            </div>
          </div>



        </div>

        <div className=" motion-preset-slide-right  flex py-8 gap-[25px] justify-center pb-12 ">
          <div className="bg-white text-[#008080] px-7 py-5  rounded-[45px] flex gap-2 font-gilroy-sb text-[20px]">
            <button> Start Free Trial </button>
            <ArrowUpRight />
          </div>

          <div className="bg-white w-[230px] text-[#008080] px-7 font-gilroy-sb text-[20px] py-5 rounded-[45px] flex gap-2 justify-center">
            <button> Chat with us </button>

          </div>

        </div>

      </div>



{/* 6th Section */}
<div className="flex flex-row p-20">

  <div className="w-[10%]">
    <img src="images/Vector.png" alt=""  width={88} height={68}/>
  </div>


<div className="flex ml-[70px] w-[90%]   flex-row">
  <div className="flex flex-col justify-between w-1/2 pt-14 pb-4">
    
    <div className="gap-8 flex flex-col"><h3 className="text-[#008080] font-gilroy-b leading-9 text-[45px]">What Hosts are saying about us</h3>
  <p className="pr-16">Hear what real hosts have to say about how mr.alfred has transformed their rental management and helped them grow their business.</p></div>
  
  <div className="text-right">
    <h5>Sachin Tendulkar</h5>
    <p> Marketing Manager </p>
  </div>

  </div>

  <div className="w-1/2">
    <img src="images/testi.png " width={381} height={458}/>
  </div>
</div>

<div className="w-[10%] flex items-end">
    <img src="images/Vector.png" alt=""  width={88} height={68} className="scale-x-[-1]"/>
  </div>


</div>


{/* 7th Section  */}


<Forms></Forms>

<Footer></Footer>



    </main>
  )
}

