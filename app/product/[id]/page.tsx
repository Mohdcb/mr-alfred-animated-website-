"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Star, ChevronDown, ChevronUp, Plus, Minus } from "lucide-react"

// This would typically come from an API or database
const getProductById = (id: string) => {
  const products = {
    "1": {
      id: 1,
      name: "Chicken Biriyani",
      price: 149,
      rating: 4.8,
      reviews: 243,
      description:
        "A fragrant mix of basmati rice, tender chicken pieces, and aromatic spices. Our biriyani is slow-cooked in the traditional dum style to ensure all flavors are perfectly infused.",
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      variants: ["Regular", "Family Pack", "Party Pack"],
      addons: [
        { name: "Extra Raita", price: 15 },
        { name: "Extra Gravy", price: 25 },
        { name: "Soft Drink", price: 20 },
      ],
    },
    "2": {
      id: 2,
      name: "Puttu",
      price: 17,
      rating: 4.6,
      reviews: 128,
      description:
        "A traditional Kerala breakfast dish made with steamed rice flour and coconut. Served with kadala curry or banana.",
      images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
      variants: ["Regular", "Special"],
      addons: [
        { name: "Kadala Curry", price: 15 },
        { name: "Banana", price: 10 },
      ],
      pieces: 2,
    },
  }

  return products[id as keyof typeof products] || products["1"]
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [showDescription, setShowDescription] = useState(true)
  const [showReviews, setShowReviews] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const toggleAddon = (addon: string) => {
    setSelectedAddons((prev) => (prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]))
  }

  const calculateTotal = () => {
    let total = product.price * quantity

    // Add addon prices
    product.addons.forEach((addon) => {
      if (selectedAddons.includes(addon.name)) {
        total += addon.price * quantity
      }
    })

    return total
  }

  return (
    <main className="pb-20">
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
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1 text-center">Product Details</h1>
        <button className="w-5">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* Product Images */}
      <div className="relative">
        <div className="w-full h-64 bg-gray-100">
          <Image
            src={product.images[activeImage] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Image Thumbnails */}
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex gap-2 justify-center">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`h-2 w-2 rounded-full ${activeImage === index ? "bg-primary" : "bg-white bg-opacity-70"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Image Thumbnails Scrollable */}
      <div className="px-4 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`min-w-[60px] h-16 rounded-lg overflow-hidden border-2 ${activeImage === index ? "border-primary" : "border-transparent"}`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} thumbnail ${index + 1}`}
                width={60}
                height={60}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>
          </div>
          <div className="text-xl font-bold text-primary">₹ {product.price}</div>
        </div>

        {/* Variants */}
        <div className="mt-4">
          <h3 className="font-medium mb-2">Choose Size</h3>
          <div className="flex gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 rounded-lg border ${selectedVariant === variant ? "bg-primary text-white border-primary" : "border-gray-300"}`}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mt-4">
          <h3 className="font-medium mb-2">Quantity</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={decreaseQuantity}
              className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-lg">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Add-ons */}
        <div className="mt-4">
          <h3 className="font-medium mb-2">Add-ons</h3>
          <div className="space-y-2">
            {product.addons.map((addon) => (
              <div key={addon.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={addon.name}
                    checked={selectedAddons.includes(addon.name)}
                    onChange={() => toggleAddon(addon.name)}
                    className="h-4 w-4 text-primary rounded"
                  />
                  <label htmlFor={addon.name}>{addon.name}</label>
                </div>
                <span className="text-sm">+₹ {addon.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 border-t pt-4">
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="flex items-center justify-between w-full"
          >
            <h3 className="font-medium">Description</h3>
            {showDescription ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          {showDescription && <p className="mt-2 text-sm text-gray-600">{product.description}</p>}
        </div>

        {/* Reviews */}
        <div className="mt-4 border-t pt-4">
          <button onClick={() => setShowReviews(!showReviews)} className="flex items-center justify-between w-full">
            <h3 className="font-medium">Reviews</h3>
            {showReviews ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          {showReviews && (
            <div className="mt-2 space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <span className="text-sm font-medium">Rahul S.</span>
                </div>
                <p className="text-sm mt-1">
                  Absolutely delicious! The spices were perfectly balanced and the rice was fluffy.
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">Priya M.</span>
                </div>
                <p className="text-sm mt-1">Great taste but could use a bit more meat. Delivery was quick though!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-4 border-t flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Total Price</p>
          <p className="text-lg font-bold text-primary">₹ {calculateTotal()}</p>
        </div>
        <Link href="/cart">
          <button className="bg-primary text-white px-6 py-3 rounded-full">Add to Cart</button>
        </Link>
      </div>
    </main>
  )
}

