import { ArrowBigDown, ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="flex justify-center pt-14 px-4">
        <div className="border-2 border-[#80C0C0] rounded-full w-full max-w-[700px] h-auto aspect-square flex justify-center items-center flex-col relative">
          <h1 className="text-center font-gilroy-sb text-[45px] md:text-[40px] sm:text-[30px] pt-24 md:pt-16 sm:pt-12 leading-[58px] md:leading-[48px] sm:leading-[38px] px-4">
            Maximize your rental revenue <br className="hidden md:block" />
            with <span className="font-gilroy-b text-[#008080]">mr.alfred</span>
          </h1>

          <p className="font-gilroy-b text-[20px] md:text-[18px] sm:text-[16px] pt-2 px-4 text-center">
            DET- integrated Vacation Rental Management Software
          </p>

          <div className="flex flex-col sm:flex-row py-5 gap-[25px] px-4">
            <div className="bg-[#008080] text-white px-7 py-5 rounded-[45px] flex gap-2 font-gilroy-b text-[20px] md:text-[18px] sm:text-[16px] justify-center">
              <button>Start Free Trial</button>
              <ArrowUpRight />
            </div>

            <div className="border-[#008080] border-[1px] text-[#008080] px-7 font-gilroy-b text-[20px] md:text-[18px] sm:text-[16px] py-5 rounded-[45px] flex gap-2 justify-center">
              <button>Chat with us</button>
            </div>
          </div>

          <p className="font-gilroy-m leading-5 opacity-[75%] text-[22px] md:text-[20px] sm:text-[18px] text-center">
            Try mr.alfred for free forever.
          </p>
          <p className="font-gilroy-b text-[18px] md:text-[16px] sm:text-[14px] opacity-[75%] text-center">
            No credit card required
          </p>

          {/* Partner logos - made responsive and hidden on small screens */}
          <div className="hidden md:block">
            <img
              src="/images/airbnb.png"
              className="h-[113px] md:h-[90px] sm:h-[70px] top-[8.5rem] md:top-[6.5rem] sm:top-[5rem] left-[24.5rem] md:left-[20rem] sm:left-[16rem] absolute w-[113px] md:w-[90px] sm:w-[70px] object-cover shadow-md rounded-full border-0"
            />
            <img
              src="/images/vrbro.png"
              className="h-[113px] md:h-[90px] sm:h-[70px] top-[22.5rem] md:top-[18rem] sm:top-[14rem] left-[20rem] md:left-[16rem] sm:left-[13rem] absolute w-[113px] md:w-[90px] sm:w-[70px] object-cover shadow-md rounded-full border-0"
            />
            <img
              src="/images/MakeMyTrip_NewLogo 1 (1).png"
              className="h-[113px] md:h-[90px] sm:h-[70px] top-[39rem] md:top-[30rem] sm:top-[22rem] left-[28rem] md:left-[22rem] sm:left-[18rem] absolute w-[113px] md:w-[90px] sm:w-[70px] object-cover shadow-md rounded-[24px] border-0"
            />

            <img
              src="/images/a...png"
              className="h-[113px] md:h-[90px] sm:h-[70px] top-[8.5rem] md:top-[6.5rem] sm:top-[5rem] right-[24.5rem] md:right-[20rem] sm:right-[16rem] absolute w-[113px] md:w-[90px] sm:w-[70px] object-cover rounded-full border-0"
            />
            <img
              src="/images/b...png"
              className="h-[113px] md:h-[90px] sm:h-[70px] top-[22.5rem] md:top-[18rem] sm:top-[14rem] right-[20rem] md:right-[16rem] sm:right-[13rem] absolute w-[113px] md:w-[90px] sm:w-[70px] object-cover shadow-md rounded-[20px_20px_20px_0px] border-0"
            />
            <img
              src="/images/experia.png"
              className="h-[113px] md:h-[90px] sm:h-[70px] top-[39rem] md:top-[30rem] sm:top-[22rem] right-[28rem] md:right-[22rem] sm:right-[18rem] absolute w-[113px] md:w-[90px] sm:w-[70px] object-cover shadow-md rounded-full border-0"
            />
          </div>
        </div>
      </div>

      {/* Integrations Section */}
      <div className="pt-12">
        <div>
          <p className="font-gilroy-bl text-[#008080] text-center text-[40px] md:text-[36px] sm:text-[30px]">
            Our Integrations
          </p>
        </div>

        <div className="flex flex-row flex-wrap gap-4 items-center justify-center px-4 md:px-6 py-8">
          <img src="/images/icon1.png" className="grayscale object-contain w-[90px] md:w-[80px] sm:w-[70px] h-auto" />
          <img src="/images/icon2.png" className="grayscale object-contain w-[90px] md:w-[80px] sm:w-[70px] h-auto" />
          <img src="/images/icon3.png" className="grayscale object-contain w-[113px] md:w-[90px] sm:w-[80px] h-auto" />
          <img src="/images/icon4.png" className="grayscale object-contain w-[113px] md:w-[90px] sm:w-[80px] h-auto" />
          <img src="/images/icon5.png" className="grayscale object-contain w-[113px] md:w-[90px] sm:w-[80px] h-auto" />
          <img src="/images/icon6.png" className="grayscale object-contain w-[113px] md:w-[90px] sm:w-[80px] h-auto" />
          <img src="/images/icon7.png" className="grayscale object-contain w-[113px] md:w-[90px] sm:w-[80px] h-auto" />
          <img src="/images/icon8.png" className="grayscale object-contain w-[113px] md:w-[90px] sm:w-[80px] h-auto" />
          <img src="/images/icon9.png" className="grayscale object-contain w-[113px] md:w-[90px] sm:w-[80px] h-auto" />
        </div>
      </div>

      {/* OTA Connection Section */}
      <div className="bg-gradient-to-r from-[#008080] to-[#0E3F3F] flex flex-col md:flex-row items-center py-10 justify-center gap-8 mb-24 px-4">
        <div className="flex items-end">
          <img src="/images/Group 3914.png" alt="" className="w-[200px] md:w-[235px] h-auto" />
          <img src="/images/Group 3913.png" alt="" className="w-[80px] md:w-[98px] h-auto" />
        </div>

        <div className="flex justify-center items-center flex-col">
          <h3 className="font-gilroy-sb text-[40px] md:text-[36px] sm:text-[30px] text-center text-white">
            Stay Connected with <br />
            50+ OTAs
          </h3>

          <div className="flex flex-col sm:flex-row py-5 gap-[25px]">
            <div className="bg-white text-[#008080] px-7 py-5 rounded-[45px] flex gap-2 font-gilroy-b text-[20px] md:text-[18px] sm:text-[16px] justify-center">
              <button>Start Free Trial</button>
              <ArrowUpRight />
            </div>

            <div className="bg-white text-[#008080] px-12 font-gilroy-b text-[20px] md:text-[18px] sm:text-[16px] py-5 rounded-[45px] flex gap-2 justify-center">
              <button>Chat with us</button>
            </div>
          </div>
        </div>

        <div className="flex items-start md:block sm:hidden">
          <img src="/images/Group 3915.png" alt="" className="w-[80px] md:w-[98px] h-auto" />
          <img src="/images/Group 3916.png" alt="" className="w-[200px] md:w-[235px] h-auto" />
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gradient-to-r from-[#008080] to-[#0E3F3F] py-12 px-4 md:px-8 lg:px-12 relative">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-white text-[45px] md:text-[38px] sm:text-[30px] leading-10 pb-7">
            Pay no more or no less <br className="hidden md:block" />
            than what you need
          </h3>
          <p className="w-full md:w-[80%] lg:w-[742px] font-gilroy pb-9 text-white text-[20px] md:text-[18px] sm:text-[16px]">
            Choose a package that works for your business right now. No hidden terms.
            No unnecessary upsell. We're transparent with our payment plans and are happy to adapt as and when required.
          </p>
        </div>

        <div className="bg-[#FFFFFF80] backdrop-blur-[35px] rounded-[26px] flex flex-col lg:flex-row p-4 md:p-6 lg:px-16 lg:py-10 gap-8 max-w-6xl mx-auto">
          <div className="w-full lg:w-2/3 flex flex-col md:flex-row gap-8">
            <div className="bg-[#022D2D40] p-6 rounded-[26px] flex flex-col justify-between gap-14 flex-1">
              <div>
                <p className="font-gilroy-b text-[32px] md:text-[28px] sm:text-[24px] leading-[46px] text-white">Lite</p>
                <p className="font-gilroy-b text-[28px] md:text-[24px] sm:text-[22px] text-white">$0</p>
                <p className="font-gilroy-b text-[17px] md:text-[16px] sm:text-[15px] text-white">Unit/month</p>
                <p className="font-gilroy-r text-[15px] md:text-[14px] sm:text-[13px] w-full md:w-4/5 text-white">
                  Set your Business on autopilot. More profit. More Time.
                </p>
              </div>
              <div>
                <button className="bg-[#05C6C6] text-white px-12 font-gilroy-r text-center text-[20px] md:text-[18px] sm:text-[16px] py-[12px] rounded-[24px] w-full flex gap-2 justify-center">
                  Get Started
                </button>
              </div>
            </div>

            <div className="bg-[#022D2D40] p-6 rounded-[26px] flex flex-col justify-between gap-14 flex-1">
              <div>
                <p className="font-gilroy-b text-[32px] md:text-[28px] sm:text-[24px] leading-[46px] text-white">Lite</p>
                <p className="font-gilroy-b text-[28px] md:text-[24px] sm:text-[22px] text-white">$0</p>
                <p className="font-gilroy-b text-[17px] md:text-[16px] sm:text-[15px] text-white">Unit/month</p>
                <p className="font-gilroy-r text-[15px] md:text-[14px] sm:text-[13px] w-full md:w-4/5 text-white">
                  Set your Business on autopilot. More profit. More Time.
                </p>
              </div>
              <div>
                <button className="bg-[#05C6C6] text-white px-12 font-gilroy-r text-center text-[20px] md:text-[18px] sm:text-[16px] py-[12px] rounded-[24px] w-full flex gap-2 justify-center">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:absolute lg:bottom-[35px] lg:right-[35px] lg:w-[300px] md:w-[280px] sm:w-[260px]">
            <div className="bg-[#022D2D] p-6 rounded-[26px] flex flex-col justify-between gap-14 shadow-2xl">
              <div>
                <button className="bg-[#05C6C6] text-white px-12 font-gilroy-r text-center text-[20px] md:text-[18px] sm:text-[16px] py-[12px] rounded-[24px] w-full flex gap-2 justify-center">
                  Get Started
                </button>
              </div>
              <div>
                <p className="font-gilroy-b text-[32px] md:text-[28px] sm:text-[24px] leading-[46px] text-white">Lite</p>
                <p className="font-gilroy-b text-[28px] md:text-[24px] sm:text-[22px] text-white">$0</p>
                <p className="font-gilroy-b text-[17px] md:text-[16px] sm:text-[15px] text-white">Unit/month</p>
                <p className="font-gilroy-r text-[15px] md:text-[14px] sm:text-[13px] w-full md:w-4/5 text-white">
                  Set your Business on autopilot. More profit. More Time.
                </p>
              </div>
              <div>
                <button className="bg-[#05C6C6] text-white px-12 font-gilroy-r text-center text-[20px] md:text-[18px] sm:text-[16px] py-[12px] rounded-[24px] w-full flex gap-2 justify-center">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Mobile-only third card */}
          <div className="lg:hidden w-full">
            <div className="bg-[#022D2D] p-6 rounded-[26px] flex flex-col justify-between gap-14 shadow-2xl">
              <div>
                <p className="font-gilroy-b text-[32px] md:text-[28px] sm:text-[24px] leading-[46px] text-white">Lite</p>
                <p className="font-gilroy-b text-[28px] md:text-[24px] sm:text-[22px] text-white">$0</p>
                <p className="font-gilroy-b text-[17px] md:text-[16px] sm:text-[15px] text-white">Unit/month</p>
                <p className="font-gilroy-r text-[15px] md:text-[14px] sm:text-[13px] w-full md:w-4/5 text-white">
                  Set your Business on autopilot. More profit. More Time.
                </p>
              </div>
              <div>
                <button className="bg-[#05C6C6] text-white px-12 font-gilroy-r text-center text-[20px] md:text-[18px] sm:text-[16px] py-[12px] rounded-[24px] w-full flex gap-2 justify-center">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row py-7 gap-[25px] justify-center mt-8">
          <div className="bg-[#008080] text-white px-7 py-5 rounded-[45px] flex gap-2 font-gilroy-b text-[20px] md:text-[18px] sm:text-[16px] justify-center">
            <button>Start Free Trial</button>
            <ArrowUpRight />
          </div>

          <div className="border-[#008080] border-[1px] text-[#008080] px-7 font-gilroy-b text-[20px] md:text-[18px] sm:text-[16px] py-5 rounded-[45px] flex gap-2 justify-center bg-white">
            <button>Chat with us</button>
          </div>
        </div>
      </div>
    </main>
  );
}