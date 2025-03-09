"use client"

import { useState } from "react"
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export default function Forms() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    company: "",
    jobTitle: "",
    listingsManaged: "",
    startDate: "",
    message: "",
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    // Validate required fields
    if (!formData.firstName) newErrors.firstName = "First name is required"
    if (!formData.lastName) newErrors.lastName = "Last name is required"
    if (!formData.email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address"
    if (!formData.country) newErrors.country = "Country is required"
    if (!formData.company) newErrors.company = "Company is required"
    if (!formData.jobTitle) newErrors.jobTitle = "Job title is required"
    if (!formData.listingsManaged) newErrors.listingsManaged = "Please specify the number of listings"
    if (!formData.startDate) newErrors.startDate = "Please specify when you want to start"
    
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validate form
    const formErrors = validateForm()
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      setIsSubmitting(false)
      return
    }
    
    try {
      // Here you would typically send the data to your API
      console.log("Form submitted successfully:", formData)
      
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        company: "",
        jobTitle: "",
        listingsManaged: "",
        startDate: "",
        message: "",
      })
      
      alert("Form submitted successfully!")
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className=" w-full bg-gradient-to-r from-[#008080] to-[#0E3F3F] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <h1 className="text-white text-4xl text-[50px] font-gilroy-b mb-12">
          Get started with mr.alfred
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First row */}
          <div className="grid grid-cols-2 md:gap-20 xs:gap-3">
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className={`w-full px-4 py-3 rounded-full bg-white font-gilroy-sb text-[16px] placeholder:text-gray-500 focus:outline-none ${
                  errors.firstName ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-white">{errors.firstName}</p>
              )}
            </div>
            
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className={`w-full px-4 py-3 rounded-full bg-white font-gilroy-sb text-[16px] placeholder:text-gray-500 focus:outline-none ${
                  errors.lastName ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-white">{errors.lastName}</p>
              )}
            </div>
          </div>
          
          {/* Second row */}
          <div className="grid grid-cols-2 md:gap-20 xs:gap-3">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full px-4 py-3 rounded-full bg-white font-gilroy-sb text-[16px] placeholder:text-gray-500 focus:outline-none ${
                  errors.email ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-white">{errors.email}</p>
              )}
            </div>
            
            <div>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className={`w-full px-4 py-3 rounded-full bg-white font-gilroy-sb text-[16px] placeholder:text-gray-500 focus:outline-none ${
                  errors.country ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.country && (
                <p className="mt-1 text-sm text-white">{errors.country}</p>
              )}
            </div>
          </div>
          
          {/* Third row */}
          <div className="grid grid-cols-2 md:gap-20 xs:gap-3">
            <div>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company"
                className={`w-full px-4 py-3 rounded-full bg-white font-gilroy-sb text-[16px] placeholder:text-gray-500 focus:outline-none ${
                  errors.company ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-white">{errors.company}</p>
              )}
            </div>
            
            <div>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Job Title"
                className={`w-full px-4 py-3 rounded-full bg-white font-gilroy-sb text-[16px] placeholder:text-gray-500 focus:outline-none ${
                  errors.jobTitle ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.jobTitle && (
                <p className="mt-1 text-sm text-white">{errors.jobTitle}</p>
              )}
            </div>
          </div>
          
          {/* Fourth row */}
          <div className="grid grid-cols-2 md:gap-20 xs:gap-3">
            <div>
              <input
                type="text"
                name="listingsManaged"
                value={formData.listingsManaged}
                onChange={handleChange}
                placeholder="No. of Listings you Manage"
                className={`w-full px-4 py-3 rounded-full bg-white font-gilroy-sb text-[16px] placeholder:text-gray-500 focus:outline-none ${
                  errors.listingsManaged ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.listingsManaged && (
                <p className="mt-1 text-sm text-white">{errors.listingsManaged}</p>
              )}
            </div>
            
            <div>
              <input
                type="text"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="When do you want to start"
                className={`w-full px-4 py-3 rounded-full bg-white font-gilroy-sb text-[16px] placeholder:text-gray-500 focus:outline-none ${
                  errors.startDate ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-white">{errors.startDate}</p>
              )}
            </div>
          </div>
          
          {/* Message field - full width */}
          <div className="rounded-3xl">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter Message"
              rows={5}
              className="w-full px-4 py-3 rounded-3xl bg-white font-gilroy-sb text-[16px] placeholder:text-gray-500 focus:outline-none resize-none"
            />
          </div>
          
          {/* Buttons */}
          <div className="flex py-5 gap-[25px] md:flex-row xs:flex-col">
                     <div className="bg-white md:w-[230px] justify-center text-[#008080] px-7 py-5 rounded-[45px] flex gap-2 font-gilroy-b text-[20px]">
                       <button> Start Free Trial </button>
                       <ArrowUpRight />
                     </div>
         
                     <div className="bg-white md:w-[230px] text-center text-[#008080] px-7 font-gilroy-b text-[20px] py-5 rounded-[45px] flex justify-center">
                       <button> Chat with us </button>
         
                     </div>
         
                   </div>

        </form>
      </div>
    </div>
  )
}