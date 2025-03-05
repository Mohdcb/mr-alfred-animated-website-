"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Ticket,
  CreditCard,
  Smartphone,
  Building,
  Truck,
  MapPin,
  Search,
  X,
  Home,
  Briefcase,
  Heart,
  Check,
} from "lucide-react"

export default function Checkout() {
  const itemPrice = 149
  const deliveryCharge = 30
  const total = itemPrice + deliveryCharge

  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [address, setAddress] = useState(
    "Waves productions, Vadakunathan building, Vennala, Opposite st mathews church pin 682028",
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedSavedAddress, setSelectedSavedAddress] = useState<number | null>(null)

  const savedAddresses = [
    {
      id: 1,
      type: "home",
      name: "Home",
      address: "123 Main Street, Apartment 4B, Kochi, Kerala, 682001",
      icon: <Home className="h-5 w-5" />,
    },
    {
      id: 2,
      type: "work",
      name: "Work",
      address: "Waves productions, Vadakunathan building, Vennala, Opposite st mathews church pin 682028",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      id: 3,
      type: "other",
      name: "Friend's Place",
      address: "45 Park Avenue, Near City Mall, Kochi, Kerala, 682025",
      icon: <Heart className="h-5 w-5" />,
    },
  ]

  const searchResults = [
    "Vennala, Kochi, Kerala, 682028",
    "Vadakunathan Temple, Thrissur, Kerala, 680001",
    "Vennala Junction, Kochi, Kerala, 682028",
    "Vadakunathan Building, Vennala, Kochi, Kerala, 682028",
  ].filter((result) => searchQuery && result.toLowerCase().includes(searchQuery.toLowerCase()))

  useEffect(() => {
    if (showLocationPicker) {
      // Simulate map loading
      const timer = setTimeout(() => {
        setMapLoaded(true)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [showLocationPicker])

  const selectSavedAddress = (id: number) => {
    setSelectedSavedAddress(id)
    const selected = savedAddresses.find((addr) => addr.id === id)
    if (selected) {
      setAddress(selected.address)
    }
  }

  const selectSearchResult = (result: string) => {
    setAddress(result)
    setSearchQuery("")
  }

  return (
    <main>
      {/* Status Bar - Just for visual representation */}
      <div className="flex justify-between items-center p-2 text-xs">
        <div>5:13</div>
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 15V9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M4 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 20H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 17V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="h-2.5 w-2.5">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 20.0001C16.4183 20.0001 20 16.4184 20 12.0001C20 7.58187 16.4183 4.00012 12 4.00012C7.58172 4.00012 4 7.58187 4 12.0001C4 16.4184 7.58172 20.0001 12 20.0001Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16.0001V12.0001"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8.00012H12.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="h-2.5 w-5 relative">
            <div className="absolute inset-0 border border-black rounded-sm">
              <div className="absolute left-0 top-0 bottom-0 right-1 bg-black rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center p-4">
        <Link href="/cart" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1 text-center">Checkout</h1>
        <div className="w-5"></div> {/* For balance */}
      </div>

      {/* Location Picker */}
      <div className="mx-4 bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Delivery Address</h3>
              <p className="text-sm text-gray-600 mt-1">{address}</p>
            </div>
          </div>
          <button onClick={() => setShowLocationPicker(true)} className="text-primary text-sm font-medium">
            Change
          </button>
        </div>
      </div>

      {/* Location Picker Modal */}
      {showLocationPicker && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="bg-white p-4 flex items-center justify-between border-b">
            <h2 className="font-medium">Select Delivery Location</h2>
            <button onClick={() => setShowLocationPicker(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-3 border-b">
            <Search className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for area, street name..."
              className="bg-transparent outline-none w-full text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="bg-white overflow-y-auto max-h-40">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-3 border-b flex items-start gap-3 hover:bg-gray-50"
                  onClick={() => selectSearchResult(result)}
                >
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <span>{result}</span>
                </button>
              ))}
            </div>
          )}

          {/* Saved Addresses */}
          <div className="p-4 border-b">
            <h3 className="font-medium mb-3">Saved Addresses</h3>
            <div className="space-y-3">
              {savedAddresses.map((addr) => (
                <button
                  key={addr.id}
                  className={`w-full text-left p-3 rounded-lg border flex items-start gap-3 ${selectedSavedAddress === addr.id ? "border-primary bg-primary/5" : "border-gray-200"}`}
                  onClick={() => selectSavedAddress(addr.id)}
                >
                  <div
                    className={`p-2 rounded-full ${selectedSavedAddress === addr.id ? "bg-primary text-white" : "bg-gray-100 text-gray-500"}`}
                  >
                    {addr.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{addr.name}</span>
                      {selectedSavedAddress === addr.id && <Check className="h-5 w-5 text-primary" />}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{addr.address}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 bg-white relative">
            <div className="absolute inset-0 bg-gray-200">
              {/* Map would go here - using placeholder */}
              <div className="h-full w-full relative">
                <Image src="/placeholder.svg?height=600&width=400" alt="Map" fill className="object-cover" />

                {mapLoaded && (
                  <>
                    {/* Map UI Elements */}
                    <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                      <button className="h-8 w-8 flex items-center justify-center text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2v20M2 12h20" />
                        </svg>
                      </button>
                    </div>

                    <div className="absolute bottom-24 right-4 bg-white p-2 rounded-full shadow-md">
                      <button className="h-8 w-8 flex items-center justify-center text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v4M12 16h.01" />
                        </svg>
                      </button>
                    </div>

                    {/* Map Pin */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="h-4 w-0.5 bg-primary"></div>
                      <div className="h-1 w-1 rounded-full bg-primary"></div>
                    </div>

                    {/* Address Preview */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                      <h3 className="font-medium">Selected Location</h3>
                      <p className="text-sm text-gray-600 mt-1">Vennala, Kochi, Kerala, 682028</p>
                      <button className="mt-3 bg-primary text-white w-full py-2 rounded-lg font-medium">
                        Confirm Location
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 border-t">
            <button
              onClick={() => {
                // In a real app, we would get the user's current location
                setShowLocationPicker(false)
              }}
              className="w-full py-3 rounded-lg font-medium text-primary flex items-center justify-center gap-2"
            >
              <MapPin className="h-5 w-5" />
              Use current location
            </button>
          </div>
        </div>
      )}

      {/* Apply Coupon */}
      <div className="mx-4 bg-gray-50 rounded-xl p-4 mb-4 flex items-center gap-3">
        <Ticket className="h-5 w-5 text-gray-500" />
        <span className="text-gray-600">Apply coupon</span>
      </div>

      {/* Bill Details */}
      <div className="mx-4 bg-gray-50 rounded-xl p-4 mb-6">
        <h2 className="font-medium mb-3">Bill details</h2>

        <div className="space-y-2">
          <div className="flex justify-between">
            <p>Biriyani</p>
            <p>₹ {itemPrice}</p>
          </div>

          <div className="flex justify-between">
            <p>Delivery charge</p>
            <p>₹ {deliveryCharge}</p>
          </div>

          <div className="border-t border-dashed border-gray-300 my-2 pt-2 flex justify-between font-medium">
            <p>Total</p>
            <p>₹ {total}</p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mx-4 mb-6">
        <h2 className="font-medium mb-3">Payment method</h2>

        <div className="space-y-3">
          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-gray-600" />
            <span>Cards</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
            <Smartphone className="h-5 w-5 text-gray-600" />
            <span>UPI</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
            <Building className="h-5 w-5 text-gray-600" />
            <span>Net banking</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
            <Truck className="h-5 w-5 text-gray-600" />
            <span>Cash on delivery</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mx-4 mb-8">
        <button className="bg-primary text-white w-full py-3 rounded-lg font-medium">Place Order</button>
      </div>
    </main>
  )
}

