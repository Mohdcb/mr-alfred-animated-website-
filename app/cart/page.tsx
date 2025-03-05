"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, X, Ticket, MapPin } from "lucide-react"
import MapLocationPicker from "../components/map-location-picker"

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  instock: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      // Parse the saved cart and ensure each item has a quantity
      const parsedCart = JSON.parse(savedCart).map((item: CartItem) => ({
        ...item,
        quantity: item.quantity || 1
      }));
      setCart(parsedCart);
    }
  }, []);

  const increaseQuantity = (itemId: string) => {
    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.id === itemId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const decreaseQuantity = (itemId: string) => {
    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.id === itemId && (item.quantity || 1) > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeItem = (itemId: string) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return "/placeholder.svg";
    if (imagePath.startsWith('http')) return imagePath;
    return `${BASE_URL}${imagePath}`;
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const deliveryCharge = 30;
  const total = subtotal + deliveryCharge;

  const handleContactInfoChange = (field: string, value: string) => {
    setContactInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddressSelect = (address: string) => {
    handleContactInfoChange("address", address)
    setShowLocationPicker(false)
  }

  return (
    <main className="pb-20">
      {/* Header */}
      <div className="flex items-center p-4">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1 text-center">Cart</h1>
        <div className="w-5"></div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 px-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-xl p-3 relative">
            <button 
              onClick={() => removeItem(item.id)}
              className="absolute right-3 top-3 bg-white rounded-full p-1"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>

            <div className="flex items-center gap-3">
              <Image
                src={getImageUrl(item.image)}
                alt={item.name}
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-primary text-sm">₹ {item.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span>{item.quantity || 1}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <div className="ml-2">
                <p className="font-medium">₹ {item.price * (item.quantity || 1)}</p>
              </div>
            </div>
          </div>
        ))}

        {cart.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Your cart is empty
          </div>
        )}
      </div>

      {/* Contact Details */}
      <div className="mx-4 bg-gray-50 rounded-xl p-4 mb-4">
        <h2 className="font-medium mb-3">Contact details</h2>

        <div className="space-y-3">
          <div className="bg-white rounded-lg p-3">
            <input
              type="text"
              value={contactInfo.name}
              onChange={(e) => handleContactInfoChange("name", e.target.value)}
              placeholder="Full Name"
              className="w-full outline-none text-sm"
            />
          </div>

          <div className="bg-white rounded-lg p-3">
            <input
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => handleContactInfoChange("phone", e.target.value)}
              placeholder="Phone Number"
              className="w-full outline-none text-sm"
            />
          </div>

          <div className="bg-white rounded-lg p-3">
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => handleContactInfoChange("email", e.target.value)}
              placeholder="Email Address"
              className="w-full outline-none text-sm"
            />
          </div>

          <div className="bg-white rounded-lg p-3 relative">
            <textarea
              value={contactInfo.address}
              onChange={(e) => handleContactInfoChange("address", e.target.value)}
              placeholder="Delivery Address"
              rows={3}
              className="w-full outline-none text-sm resize-none"
            />
            <button onClick={() => setShowLocationPicker(true)} className="absolute right-3 top-3 text-primary">
              <MapPin className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="mt-3 h-32 bg-gray-200 rounded-lg overflow-hidden relative">
          <Image src="/placeholder.svg?height=200&width=400" alt="Map" fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-0.5 bg-primary"></div>
          </div>
          <button
            onClick={() => setShowLocationPicker(true)}
            className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md"
          >
            <MapPin className="h-5 w-5 text-primary" />
          </button>
        </div>
      </div>

      {/* Apply Coupon */}
      <div className="mx-4 bg-gray-50 rounded-xl p-4 mb-4 flex items-center gap-3">
        <Ticket className="h-5 w-5 text-gray-500" />
        <span className="text-gray-600">Apply coupon</span>
      </div>

      {/* Bill Details */}
      <div className="mx-4 bg-gray-50 rounded-xl p-4 mb-4">
        <h2 className="font-medium mb-3">Bill Details</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Item Total</span>
            <span>₹ {subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span>₹ {deliveryCharge}</span>
          </div>
          <div className="border-t pt-2 mt-2 flex justify-between font-medium">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center px-4">
          <Link href="/checkout" className="w-full max-w-sm">
            <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold">
              Proceed to Checkout • ₹ {total}
            </button>
          </Link>
        </div>
      )}

      {/* Map Location Picker */}
      <MapLocationPicker
        isOpen={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        onSelectAddress={handleAddressSelect}
        currentAddress={contactInfo.address}
      />
    </main>
  );
}

