"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Upload, Trash2, Edit, Save, X, Plus } from "lucide-react"
import { toast } from "react-hot-toast"
import { axiosInstance } from "@/API/authapi"

interface Product {
  id: string;  // Changed to string as per your model
  name: string;
  price: number;
  logo: string | null;
  instock: string;
  type: 'veg' | 'non-veg';
  categoryId: string;
  category?: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  logo: string;
  totalProducts: number;
}

interface Banner {
  id: number;
  image: string;
  title: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<string>("company")

  const [companyInfo, setCompanyInfo] = useState({
    name: "Tasty Bites",
    logo: "/placeholder.svg?height=60&width=60",
    tagline: "Delicious food delivered to your doorstep",
  })

  const [banners, setBanners] = useState<Banner[]>([
    { id: 1, image: "/placeholder.svg?height=150&width=400", title: "50% OFF on first order" },
    { id: 2, image: "/placeholder.svg?height=150&width=400", title: "Free delivery on orders above ₹299" },
    { id: 3, image: "/placeholder.svg?height=150&width=400", title: "Try our new South Indian specials" },
  ])

  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const categoryImageRef = useRef<HTMLInputElement>(null)

  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)

  const [editingBanner, setEditingBanner] = useState<number | null>(null)

  const [newBanner, setNewBanner] = useState({ title: "", image: "/placeholder.svg?height=150&width=400" })
  const [newCategory, setNewCategory] = useState({ name: "", image: "/placeholder.svg?height=60&width=60" })
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "/placeholder.svg?height=200&width=200",
    featured: false,
    category: "",
  })

  const logoInputRef = useRef<HTMLInputElement>(null)
  const [tempLogoFile, setTempLogoFile] = useState<File | null>(null)

  const [tempBannerImage, setTempBannerImage] = useState<File | null>(null)
  const bannerImageRef = useRef<HTMLInputElement>(null)

  const [homeSections, setHomeSections] = useState<Record<string, string[]>>({
    popular: [],
    recommended: [],
    all: []
  });

  // Load initial data
  useEffect(() => {
    fetchHomeContent()
    fetchHomeSections()
  }, [])

  const fetchHomeContent = async () => {
    try {
      const response = await axiosInstance.get('/hotel/home')
      const { companyInfo, banners } = response.data
      
      if (companyInfo) {
        // Prepend base URL to logo path if it exists and is a relative path
        const updatedCompanyInfo = {
          ...companyInfo,
          logo: companyInfo.logo && !companyInfo.logo.startsWith('http') 
            ? `${process.env.NEXT_PUBLIC_API_URL||"http://localhost:3000"}${companyInfo.logo}`
            : companyInfo.logo
        }
        setCompanyInfo(updatedCompanyInfo)
      }
      if (banners) {
        // Also update banner images with base URL
        const updatedBanners = banners.map((banner: Banner) => ({
          ...banner,
          image: banner.image && !banner.image.startsWith('http')
            ? `${process.env.NEXT_PUBLIC_API_URL||"http://localhost:3000"}${banner.image}`
            : banner.image
        }))
        setBanners(updatedBanners)
      }
    } catch (error) {
      console.error('Error fetching home content:', error)
      toast.error('Failed to load content')
    }
  }

  const fetchHomeSections = async () => {
    try {
      const response = await axiosInstance.get('/hotel/home');
      const { popular = [], recommended = [], all = [] } = response.data;
      setHomeSections({
        popular: popular.map((p: { id: string }) => p.id),
        recommended: recommended.map((p: { id: string }) => p.id),
        all: all.map((p: { id: string }) => p.id)
      });
    } catch (error) {
      console.error('Error fetching home sections:', error);
      toast.error('Failed to load home sections');
    }
  };

  // Update company info with image upload
  const handleSaveCompanyInfo = async () => {
    try {
      const finalCompanyInfo = { ...companyInfo }

      // If there's a new logo file, upload it first
      if (tempLogoFile) {
        const formData = new FormData()
        formData.append('image', tempLogoFile)

        const uploadResponse = await axiosInstance.post('/hotel/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        finalCompanyInfo.logo = uploadResponse.data.url
      }

      // Update company info with the new logo URL
      await axiosInstance.put('/hotel/home/company', finalCompanyInfo)
      
      // Clear the temporary file
      setTempLogoFile(null)
      toast.success('Company information updated successfully')
    } catch (error) {
      console.error('Error updating company info:', error)
      toast.error('Failed to update company information')
    }
  }

  // Handle banner image selection
  const handleBannerImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Store the file temporarily
    setTempBannerImage(file)

    // Create a preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      // If editing an existing banner
      if (editingBanner) {
        setBanners(prev => prev.map(banner => 
          banner.id === editingBanner 
            ? { ...banner, image: reader.result as string }
            : banner
        ))
      } else {
        // For new banner
        setNewBanner(prev => ({ ...prev, image: reader.result as string }))
      }
    }
    reader.readAsDataURL(file)
  }

  // Update banner
  const handleSaveBanner = async (bannerId: number) => {
    try {
      const banner = banners.find(b => b.id === bannerId)
      if (!banner) return

      const finalBanner = { ...banner }

      // If there's a new image file, upload it first
      if (tempBannerImage) {
        const formData = new FormData()
        formData.append('image', tempBannerImage)

        const uploadResponse = await axiosInstance.post('/hotel/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        finalBanner.image = uploadResponse.data.url
      }

      // Update banner with new data
      await axiosInstance.put(`/hotel/home/banner/${bannerId}`, finalBanner)
      
      // Clear the temporary file
      setTempBannerImage(null)
      setEditingBanner(null)
      toast.success('Banner updated successfully')
      
      // Refresh banners
      fetchHomeContent()
    } catch (error) {
      console.error('Error updating banner:', error)
      toast.error('Failed to update banner')
    }
  }

  // Add new banner
  const handleAddBanner = async () => {
    if (!newBanner.title.trim()) {
      toast.error('Banner title is required')
      return
    }

    try {
      const finalBanner = { ...newBanner }

      // If there's an image file, upload it first
      if (tempBannerImage) {
        const formData = new FormData()
        formData.append('image', tempBannerImage)

        const uploadResponse = await axiosInstance.post('/hotel/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        finalBanner.image = uploadResponse.data.url
      }

      // Create new banner
      const response = await axiosInstance.post('/hotel/home/banner', finalBanner)
      
      // Clear form and temporary file
      setNewBanner({ title: "", image: "/placeholder.svg?height=150&width=400" })
      setTempBannerImage(null)
      toast.success('Banner added successfully')
      
      // Refresh banners
      fetchHomeContent()
    } catch (error) {
      console.error('Error adding banner:', error)
      toast.error('Failed to add banner')
    }
  }

  // Delete banner
  const handleDeleteBanner = async (id: number) => {
    try {
      await axiosInstance.delete(`/hotel/home/banner/${id}`)
      setBanners(prev => prev.filter(banner => banner.id !== id))
      toast.success('Banner deleted successfully')
    } catch (error) {
      console.error('Error deleting banner:', error)
      toast.error('Failed to delete banner')
    }
  }

  const handleCompanyInfoChange = (field: string, value: string) => {
    setCompanyInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleBannerChange = (id: number, field: string, value: string) => {
    setBanners((prev) => prev.map((banner) => (banner.id === id ? { ...banner, [field]: value } : banner)))
  }

  const handleCategoryChange = (id: string, field: string, value: string) => {
    setCategories((prev) => prev.map((category) => (category.id === id ? { ...category, [field]: value } : category)))
  }

  const handleProductChange = (id: string, field: string, value: any) => {
    setProducts((prev) => prev.map((product) => (product.id === id ? { ...product, [field]: value } : product)))
  }

  const addBanner = () => {
    if (newBanner.title.trim()) {
      setBanners((prev) => [...prev, { id: Date.now(), ...newBanner }])
      setNewBanner({ title: "", image: "/placeholder.svg?height=150&width=400" })
    }
  }

  const addCategory = () => {
    if (newCategory.name.trim()) {
      setCategories((prev) => [...prev, {
        id: Date.now().toString(),
        name: newCategory.name,
        logo: newCategory.image,
        totalProducts: 0
      }])
      setNewCategory({ name: "", image: "/placeholder.svg?height=60&width=60" })
    }
  }

  const deleteBanner = (id: number) => {
    setBanners(prev => prev.filter((banner) => banner.id !== id))
  }

  const deleteCategory = async (categoryId: string) => {
    try {
      await axiosInstance.delete(`/categories/${categoryId}`);
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))
  }

  // Handle logo file selection
  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Store the file temporarily
    setTempLogoFile(file)

    // Create a preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      handleCompanyInfoChange('logo', reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Update the Company Info section JSX
  const renderCompanyInfoSection = () => (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">Company Information</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
            <Image src={companyInfo.logo || "/placeholder.svg"} alt="Company Logo" fill className="object-cover" />
            <input
              type="file"
              ref={logoInputRef}
              onChange={handleLogoUpload}
              accept="image/*"
              className="hidden"
            />
            <button 
              onClick={() => logoInputRef.current?.click()}
              className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            >
              <Upload className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
            <p className="text-xs text-gray-500">Recommended size: 200x200px</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            value={companyInfo.name}
            onChange={(e) => handleCompanyInfoChange("name", e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
          <input
            type="text"
            value={companyInfo.tagline}
            onChange={(e) => handleCompanyInfoChange("tagline", e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button 
          onClick={handleSaveCompanyInfo}
          className="w-full bg-primary text-white py-2 rounded-lg mt-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  )

  // Update the Banners section JSX
  const renderBannersSection = () => (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">Manage Banners</h2>

      <div className="space-y-4">
        {banners.map((banner) => (
          <div key={banner.id} className="border rounded-lg overflow-hidden">
            <div className="relative h-32">
              <Image src={banner.image || "/placeholder.svg"} alt={banner.title} fill className="object-cover" />
              {editingBanner === banner.id && (
                <button 
                  onClick={() => bannerImageRef.current?.click()}
                  className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                >
                  <Upload className="h-6 w-6 text-white" />
                </button>
              )}
            </div>

            {editingBanner === banner.id ? (
              <div className="p-3 bg-gray-50">
                <input
                  type="text"
                  value={banner.title}
                  onChange={(e) => handleBannerChange(banner.id, "title", e.target.value)}
                  className="w-full p-2 border rounded-lg mb-2"
                  placeholder="Banner Title"
                />
                <input
                  type="file"
                  ref={bannerImageRef}
                  onChange={handleBannerImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => {
                      setEditingBanner(null)
                      setTempBannerImage(null)
                      fetchHomeContent() // Reset to original state
                    }} 
                    className="p-2 text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleSaveBanner(banner.id)} className="p-2 text-primary">
                    <Save className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 flex justify-between items-center">
                <p className="font-medium">{banner.title}</p>
                <div className="flex gap-2">
                  <button onClick={() => setEditingBanner(banner.id)} className="p-2 text-gray-500">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDeleteBanner(banner.id)} className="p-2 text-red-500">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add New Banner */}
        <div className="border rounded-lg overflow-hidden">
          <div className="relative h-32 bg-gray-100">
            <Image 
              src={newBanner.image} 
              alt="New Banner" 
              fill 
              className="object-cover" 
            />
            <button 
              onClick={() => bannerImageRef.current?.click()}
              className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            >
              <Upload className="h-8 w-8 text-white" />
            </button>
          </div>
          <div className="p-3 bg-gray-50">
            <input
              type="text"
              value={newBanner.title}
              onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Banner Title"
            />
            <input
              type="file"
              ref={bannerImageRef}
              onChange={handleBannerImageChange}
              accept="image/*"
              className="hidden"
            />
            <button onClick={handleAddBanner} className="w-full bg-primary text-white py-2 rounded-lg">
              Add Banner
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // Add this to your existing useEffect or create a new one
  useEffect(() => {
    if (activeSection === "products") {
      fetchProducts();
      fetchHomeSections();
    }
  }, [activeSection]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/product');  // Your RetrieveProduct endpoint
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axiosInstance.delete(`/product/${productId}`);  // Your DeleteProduct endpoint
      toast.success('Product deleted successfully');
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const updateHomeSection = async (sectionType: string, productIds: string[]) => {
    try {
      await axiosInstance.put('/hotel/home/section', {
        sectionType,
        productIds
      });
      toast.success(`${sectionType} section updated successfully`);
      setHomeSections(prev => ({
        ...prev,
        [sectionType]: productIds
      }));
    } catch (error) {
      console.error('Error updating section:', error);
      toast.error('Failed to update section');
    }
  };

  useEffect(() => {
    if (activeSection === "categories") {
      fetchCategories();
    }
  }, [activeSection]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const handleCategoryImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', newCategory.name);

    try {
      await axiosInstance.post('/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Category added successfully');
      fetchCategories();
      setNewCategory({ name: '', image: '' });
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Failed to add category');
    }
  };

  const handleUpdateCategory = async (categoryId: string) => {
    try {
      await axiosInstance.put(`/categories/${categoryId}`, {
        name: newCategory.name,
        logo: newCategory.image,
      });
      toast.success('Category updated successfully');
      fetchCategories();
      setEditingCategory(null);
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    }
  };

  return (
    <main className="pb-20">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Admin Dashboard</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 text-center ${activeSection === "company" ? "text-primary border-b-2 border-primary" : "text-gray-500"}`}
          onClick={() => setActiveSection("company")}
        >
          Company
        </button>
        <button
          className={`flex-1 py-3 text-center ${activeSection === "banners" ? "text-primary border-b-2 border-primary" : "text-gray-500"}`}
          onClick={() => setActiveSection("banners")}
        >
          Banners
        </button>
        <button
          className={`flex-1 py-3 text-center ${activeSection === "categories" ? "text-primary border-b-2 border-primary" : "text-gray-500"}`}
          onClick={() => setActiveSection("categories")}
        >
          Categories
        </button>
        <button
          className={`flex-1 py-3 text-center ${activeSection === "products" ? "text-primary border-b-2 border-primary" : "text-gray-500"}`}
          onClick={() => setActiveSection("products")}
        >
          Products
        </button>
      </div>

      {/* Content Sections */}
      {activeSection === "company" && renderCompanyInfoSection()}
      {activeSection === "banners" && renderBannersSection()}

      {/* Categories Section */}
      {activeSection === "categories" && (
        <div className="p-4">
          <h2 className="text-lg font-medium mb-4">Manage Categories</h2>

          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="border rounded-lg overflow-hidden">
                <div className="p-3 flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={category.logo ? `${BASE_URL}${category.logo}` : "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {editingCategory === category.id ? (
                    <div className="flex-1">
                      <input
                        type="text"
                        value={category.name}
                        onChange={(e) => handleCategoryChange(category.id, "name", e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Category Name"
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button onClick={() => setEditingCategory(null)} className="p-1 text-gray-500">
                          <X className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleUpdateCategory(category.id)} className="p-1 text-primary">
                          <Save className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1">
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-gray-500">
                          Total Products: {category.totalProducts || 0}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingCategory(category.id)} className="p-2 text-gray-500">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button onClick={() => deleteCategory(category.id)} className="p-2 text-red-500">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Add New Category */}
            <div className="border rounded-lg overflow-hidden">
              <div className="p-3 flex items-center gap-3">
                <div 
                  className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
                  onClick={() => categoryImageRef.current?.click()}
                >
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Category Name"
                  />
                  <input
                    type="file"
                    ref={categoryImageRef}
                    onChange={handleCategoryImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      {activeSection === "products" && (
        <div className="p-4">
          <h2 className="text-lg font-medium mb-4">Manage Products</h2>

          {/* Section Management */}
          <div className="mb-8 space-y-6">
            {/* Popular Products Section */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Popular Products</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <label key={product.id} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={homeSections.popular.includes(product.id)}
                      onChange={(e) => {
                        const newSelected = e.target.checked
                          ? [...homeSections.popular, product.id]
                          : homeSections.popular.filter(id => id !== product.id);
                        updateHomeSection('popular', newSelected);
                      }}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="text-sm truncate">{product.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Recommended Products Section */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Recommended Products</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <label key={product.id} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={homeSections.recommended.includes(product.id)}
                      onChange={(e) => {
                        const newSelected = e.target.checked
                          ? [...homeSections.recommended, product.id]
                          : homeSections.recommended.filter(id => id !== product.id);
                        updateHomeSection('recommended', newSelected);
                      }}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="text-sm truncate">{product.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* All Products Section */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Products in Home</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <label key={product.id} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={homeSections.all.includes(product.id)}
                      onChange={(e) => {
                        const newSelected = e.target.checked
                          ? [...homeSections.all, product.id]
                          : homeSections.all.filter(id => id !== product.id);
                        updateHomeSection('all', newSelected);
                      }}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="text-sm truncate">{product.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Existing product list */}
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                  <div className="relative h-48">
                    <Image
                      src={product.logo && !product.logo.startsWith('http')
                        ? `${BASE_URL}${product.logo}`
                        : product.logo || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute top-2 left-2 ${
                      product.type === 'veg' ? 'bg-green-500' : 'bg-red-500'
                    } text-white text-xs px-2 py-1 rounded`}>
                      {product.type === 'veg' ? 'Veg' : 'Non-Veg'}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category?.name}</p>
                        <p className="text-primary font-medium mt-1">₹{product.price}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          product.instock === 'In Stock' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.instock}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link 
                          href={`/admin/products/${product.id}`}
                          className="p-2 text-gray-500 hover:text-primary transition-colors"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Product Button */}
              <Link
                href="/admin/products/new"
                className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors h-full min-h-[300px]"
              >
                <Plus className="h-8 w-8 mb-2" />
                <span>Add New Product</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </main>
  )
}

