"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, Plus, ChevronRight, Grid2X2, Minus } from "lucide-react"
import { axiosInstance } from "@/API/authapi"
import { toast } from "react-hot-toast"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface Category {
  id: string;
  name: string;
  logo: string;
  totalProducts: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Banner {
  id: number;
  image: string;
  title: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  logo?: string;
  rating?: number;
  pieces?: number;
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [companyInfo, setCompanyInfo] = useState<{ name: string; logo: string; tagline: string }>({
    name: "",
    logo: "/placeholder.svg",
    tagline: "",
  });
  const [banners, setBanners] = useState<Banner[]>([
    { id: 1, image: "/placeholder.svg?height=150&width=400", title: "Loading..." },
  ]);
  const [popularItems, setPopularItems] = useState<Product[]>([
    { id: 5, name: "Chicken Biriyani", price: 149, image: "/placeholder.svg?height=200&width=200", rating: 4.8 },
    { id: 6, name: "Mutton Biriyani", price: 199, image: "/placeholder.svg?height=200&width=200", rating: 4.7 },
    { id: 7, name: "Veg Biriyani", price: 129, image: "/placeholder.svg?height=200&width=200", rating: 4.5 },
    { id: 8, name: "Hyderabadi Biriyani", price: 179, image: "/placeholder.svg?height=200&width=200", rating: 4.9 },
  ]);
  const [recommendedItems, setRecommendedItems] = useState<Product[]>([
    { id: 9, name: "Butter Chicken", price: 180, image: "/placeholder.svg?height=200&width=200", rating: 4.6 },
    { id: 10, name: "Paneer Tikka", price: 160, image: "/placeholder.svg?height=200&width=200", rating: 4.4 },
    { id: 11, name: "Chicken 65", price: 140, image: "/placeholder.svg?height=200&width=200", rating: 4.3 },
    { id: 12, name: "Fish Curry", price: 170, image: "/placeholder.svg?height=200&width=200", rating: 4.5 },
  ]);
  const [foodItems, setFoodItems] = useState<Product[]>([
    { id: 1, name: "Biriyani", price: 149, image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Puttu", price: 17, image: "/placeholder.svg?height=200&width=200", pieces: 2 },
    { id: 3, name: "Idli", price: 12, image: "/placeholder.svg?height=200&width=200", pieces: 5 },
    { id: 4, name: "Appam", price: 15, image: "/placeholder.svg?height=200&width=200", pieces: 2 },
  ]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch home content on component mount
  useEffect(() => {
    fetchHomeContent();
    fetchCategories();
  }, []);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const fetchHomeContent = async () => {
    try {
      const response = await axiosInstance.get('/hotel/home');
      const { 
        companyInfo: fetchedCompanyInfo, 
        banners: fetchedBanners,
        popular: popularProducts,
        recommended: recommendedProducts,
        all: allProducts
      } = response.data;
      
      if (fetchedCompanyInfo) {
        const updatedCompanyInfo = {
          ...fetchedCompanyInfo,
          logo: fetchedCompanyInfo.logo && !fetchedCompanyInfo.logo.startsWith('http') 
            ? `${BASE_URL}${fetchedCompanyInfo.logo}`
            : fetchedCompanyInfo.logo
        };
        setCompanyInfo(updatedCompanyInfo);
      }
      
      if (fetchedBanners) {
        const updatedBanners = fetchedBanners.map((banner: Banner) => ({
          ...banner,
          image: banner.image && !banner.image.startsWith('http')
            ? `${BASE_URL}${banner.image}`
            : banner.image
        }));
        setBanners(updatedBanners);
      }

      // Update product images with base URL
      const processProducts = (products: Product[] | undefined) => {
        return products?.map(product => ({
          ...product,
          image: product.logo && !product.logo.startsWith('http')
            ? `${BASE_URL}${product.logo}`
            : product.logo || "/placeholder.svg"
        })) || [];
      };

      setPopularItems(processProducts(popularProducts));
      setRecommendedItems(processProducts(recommendedProducts));
      setFoodItems(processProducts(allProducts));
    } catch (error) {
      console.error('Error fetching home content:', error);
      toast.error('Failed to load content');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addToCart = (item: { id: number; name: string; price: number; image: string }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    toast.success(`Added ${item.name} to cart`);
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter((item) => item.id !== itemId);
    });
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Function to get a valid image URL
  const getImageUrl = (logoPath: string | null) => {
    if (!logoPath) {
      return "/placeholder.svg";
    }
    if (logoPath.startsWith('http')) {
      return logoPath;
    }
    return `${BASE_URL}${logoPath}`;
  };

  return (
    <main className="pb-20">
      {/* Company Logo and Name */}
      <div className="flex items-center gap-3 p-4">
        <Image
          src={companyInfo.logo || "/placeholder.svg"}
          alt={companyInfo.name}
          width={40}
          height={40}
          className="rounded-md"
        />
        <div>
          <h1 className="font-bold text-lg">{companyInfo.name}</h1>
          <p className="text-xs text-gray-500">{companyInfo.tagline}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 px-4 pb-4">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 flex-1">
          <Search className="h-5 w-5 text-gray-500" />
          <input type="text" placeholder="Search..." className="bg-transparent outline-none w-full text-sm" />
        </div>
        <button className="bg-gray-100 p-3 rounded-full">
          <Filter className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Categories */}
      <div className="px-4 mb-4">
        <h2 className="font-medium mb-4">Choose category</h2>
        <div className="flex gap-6 overflow-x-auto pb-2 no-scrollbar">
          {/* All Category */}
          <Link
            href="/category/all"
            className="flex flex-col items-center gap-2 min-w-[72px]"
          >
            <div className="w-[72px] h-[72px] relative">
              <div className="w-full h-full bg-gray-50 rounded-full overflow-hidden border-2 border-gray-100 flex items-center justify-center">
                <Grid2X2 className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-center text-gray-700 whitespace-nowrap">
                All
              </span>
              <span className="text-xs text-gray-500">
                {categories.reduce((total, cat) => total + (parseInt(cat?.totalProducts.toString()) || 0), 0)} items
              </span>
            </div>
          </Link>

          {/* Other Categories */}
          {categories.map((category) => (
            <Link
              href={`/category/${category.id}`}
              key={category.id}
              className="flex flex-col items-center gap-2 min-w-[72px]"
            >
              <div className="w-[72px] h-[72px] relative">
                <div className="w-full h-full bg-gray-50 rounded-full overflow-hidden border-2 border-gray-100">
                  <Image
                    src={getImageUrl(category.logo)}
                    alt={category.name}
                    width={72}
                    height={72}
                    className="w-full h-full object-cover p-2"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-center text-gray-700 whitespace-nowrap">
                  {category.name}
                </span>
                <span className="text-xs text-gray-500">
                  {category.totalProducts || 0} items
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Banners */}
      <div className="mb-6">
        <div className="flex gap-3 overflow-x-auto pl-4 pb-2 no-scrollbar">
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-[280px] h-28 relative rounded-xl overflow-hidden">
              <Image src={banner.image || "/placeholder.svg"} alt={banner.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <h3 className="text-white font-medium p-4">{banner.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Items Section */}
      <div className="mb-6">
        <div className="px-4 flex justify-between items-center mb-4">
          <h2 className="font-medium">Popular Items</h2>
          <Link href="/category/popular" className="text-primary text-sm flex items-center">
            See all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pl-4 pb-2 no-scrollbar">
          {popularItems.map((item) => (
            <Link
              href={`/product/${item.id}`}
              key={item.id}
              className="min-w-[160px] bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={160}
                  height={120}
                  className="w-full h-28 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-white px-1.5 py-0.5 rounded text-xs font-medium flex items-center">
                  ★ {item.rating}
                </div>
              </div>
              <div className="p-2">
                <h3 className="font-medium text-sm">{item.name}</h3>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-primary text-sm font-medium">₹ {item.price}</p>
                  {cart.find((cartItem) => cartItem.id === item.id) ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromCart(item.id);
                        }}
                        className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm">
                        {cart.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(item);
                        }}
                        className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(item);
                      }}
                      className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended For You Section */}
      <div className="mb-6">
        <div className="px-4 flex justify-between items-center mb-4">
          <h2 className="font-medium">Recommended For You</h2>
          <Link href="/category/recommended" className="text-primary text-sm flex items-center">
            See all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pl-4 pb-2 no-scrollbar">
          {recommendedItems.map((item) => (
            <Link
              href={`/product/${item.id}`}
              key={item.id}
              className="min-w-[160px] bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={160}
                  height={120}
                  className="w-full h-28 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-white px-1.5 py-0.5 rounded text-xs font-medium flex items-center">
                  ★ {item.rating}
                </div>
              </div>
              <div className="p-2">
                <h3 className="font-medium text-sm">{item.name}</h3>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-primary text-sm font-medium">₹ {item.price}</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      addToCart(item)
                    }}
                    className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Food Items Grid (Original Design) */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">All Items</h2>
          <Link href="/category/all" className="text-primary text-sm flex items-center">
            See all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {foodItems.map((item) => (
            <Link href={`/product/${item.id}`} key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="w-full h-36 object-cover"
                />
              </div>
              <div className="p-3 flex flex-col gap-1">
                <h3 className="font-medium">{item.name}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-primary font-medium">₹ {item.price}</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      addToCart(item)
                    }}
                    className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {item.pieces && <p className="text-xs text-gray-500">{item.pieces} pieces</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-4 border-t flex justify-between items-center shadow-lg">
          <div>
            <p className="text-sm text-gray-500">{totalItems} items</p>
            <p className="text-primary font-medium">₹ {totalAmount}</p>
          </div>
          <Link href="/cart">
            <button className="bg-primary text-white px-6 py-2 rounded-full">
              View Cart
            </button>
          </Link>
        </div>
      )}
    </main>
  )
}

