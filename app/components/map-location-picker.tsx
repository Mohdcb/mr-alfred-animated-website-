"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MapPin, X, Search, Check, Home, Briefcase, Heart } from "lucide-react"

interface MapLocationPickerProps {
  isOpen: boolean
  onClose: () => void
  onSelectAddress: (address: string) => void
  currentAddress: string
}

export default function MapLocationPicker({
  isOpen,
  onClose,
  onSelectAddress,
  currentAddress,
}: MapLocationPickerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedSavedAddress, setSelectedSavedAddress] = useState<number | null>(null)
  const [mapAddress, setMapAddress] = useState("")

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
    if (isOpen) {
      // Find if current address matches any saved address
      const savedAddressMatch = savedAddresses.find((addr) => addr.address === currentAddress)
      if (savedAddressMatch) {
        setSelectedSavedAddress(savedAddressMatch.id)
      } else {
        setSelectedSavedAddress(null)
      }

      // Simulate map loading
      const timer = setTimeout(() => {
        setMapLoaded(true)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isOpen, currentAddress, savedAddresses])

  const selectSavedAddress = (id: number) => {
    setSelectedSavedAddress(id)
    const selected = savedAddresses.find((addr) => addr.id === id)
    if (selected) {
      onSelectAddress(selected.address)
    }
  }

  const selectSearchResult = (result: string) => {
    onSelectAddress(result)
    setSearchQuery("")
  }

  const confirmMapLocation = () => {
    onSelectAddress(mapAddress)
    onClose()
  }

  const useCurrentLocation = () => {
    // In a real app, we would get the user's current location
    // For now, we'll just use a placeholder
    onSelectAddress("Current Location: Kochi, Kerala, 682025")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <h2 className="font-medium">Select Delivery Location</h2>
        <button onClick={onClose}>
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
                  <p className="text-sm text-gray-600 mt-1">{mapAddress}</p>
                  <button
                    className="mt-3 bg-primary text-white w-full py-2 rounded-lg font-medium"
                    onClick={confirmMapLocation}
                  >
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
          onClick={useCurrentLocation}
          className="w-full py-3 rounded-lg font-medium text-primary flex items-center justify-center gap-2"
        >
          <MapPin className="h-5 w-5" />
          Use current location
        </button>
      </div>
    </div>
  )
}

