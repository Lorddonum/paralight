import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Plus, Trash2, LogOut, Package, ChevronRight, Upload, Settings, Edit2, X, Image as ImageIcon, FileText, Ruler, Search, ChevronDown, Check } from "lucide-react";

const THEME_BG = "bg-[#1a2332]";

interface Product {
  id: number;
  name: string;
  modelNumber: string;
  description: string;
  series: string;
  brand: string;
  application?: string | null;
  finish?: string | null;
  material?: string | null;
  wattage: string | null;
  dimensions: string | null;
  voltage: string | null;
  color: string | null;
  cri: string | null;
  cct: string | null;
  beamAngle: string | null;
  image?: string | null;
  images?: string[] | null;
  catalogueUrl?: string | null;
  technicalDrawingUrl?: string | null;
  technicalDrawings?: string[] | null;
  // Paralight-specific fields
  subSeries?: string | null;
  standardLength?: string | null;
  diffuserFinish?: string | null;
  accessories?: string | null;
  ledStripSize?: string | null;
  installationMethod?: string | null;
  packagingMethodADesc?: string | null;
  packagingMethodASpec?: string | null;
  packagingMethodBDesc?: string | null;
  packagingMethodBSpec?: string | null;
  accessoriesSpec?: string | null;
  diffuserMaterial?: string | null;
  // Maglinear-specific fields
  mountingTrack?: string | null;
  conductionMethod?: string | null;
  maglinearName?: string | null;
  inputVoltage?: string | null;
  outputVoltage?: string | null;
  // Technical Specifications (JSON string for table data)
  technicalSpecs?: string | null;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [adminSearchQuery, setAdminSearchQuery] = useState("");
  const [, setLocation] = useLocation();
  const [showSeriesDropdown, setShowSeriesDropdown] = useState(false);
  const [seriesFilter, setSeriesFilter] = useState("");
  const [adminBrandFilter, setAdminBrandFilter] = useState<"All" | "Paralight" | "Maglinear">("All");
  const [adminSeriesFilter, setAdminSeriesFilter] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    modelNumber: "",
    description: "",
    series: "",
    brand: "Paralight",
    application: "",
    finish: "",
    material: "",
    wattage: "",
    dimensions: "",
    voltage: "",
    color: "",
    cri: "",
    cct: "",
    beamAngle: "",
    image: "",
    images: [] as string[],
    catalogueUrl: "",
    technicalDrawingUrl: "",
    technicalDrawings: [] as string[],
    // Paralight-specific fields
    subSeries: "",
    standardLength: "",
    diffuserFinish: "",
    accessories: "",
    ledStripSize: "",
    installationMethod: "",
    packagingMethodADesc: "",
    packagingMethodASpec: "",
    packagingMethodBDesc: "",
    packagingMethodBSpec: "",
    accessoriesSpec: "",
    diffuserMaterial: "",
    mountingTrack: "",
    conductionMethod: "",
    maglinearName: "",
    inputVoltage: "",
    outputVoltage: "",
    technicalSpecs: ""
  });

  const existingSeries = Array.from(new Set(products.map(p => p.series).filter(Boolean))).sort();
  const filteredSeries = existingSeries.filter(s => 
    s.toLowerCase().includes((seriesFilter || formData.series).toLowerCase())
  );

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      fetchProducts();
    }
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username === "admin_t" && password === "pass321") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      fetchProducts();
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
    setLocation("/");
  };

  const [compressing, setCompressing] = useState(false);

  const compressImage = async (base64: string, maxWidth = 800, quality = 70): Promise<string> => {
    try {
      const response = await fetch('/api/compress-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, maxWidth, quality })
      });
      if (!response.ok) throw new Error('Compression failed');
      const data = await response.json();
      console.log(`Compressed: ${Math.round(data.originalSize/1024)}KB → ${Math.round(data.newSize/1024)}KB (${data.savings} saved)`);
      return data.image;
    } catch (error) {
      console.error('Compression error:', error);
      return base64;
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, field: 'image' | 'catalogueUrl' | 'technicalDrawingUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        if (field !== 'catalogueUrl' && base64.startsWith('data:image')) {
          setCompressing(true);
          const compressed = await compressImage(base64);
          setCompressing(false);
          setFormData(prev => ({ ...prev, [field]: compressed }));
        } else {
          setFormData(prev => ({ ...prev, [field]: base64 }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleFileChange = async (e: ChangeEvent<HTMLInputElement>, field: 'images' | 'technicalDrawings') => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setCompressing(true);
      const promises = Array.from(files).map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64 = reader.result as string;
            if (base64.startsWith('data:image')) {
              const compressed = await compressImage(base64, 1200, 75);
              resolve(compressed);
            } else {
              resolve(base64);
            }
          };
          reader.readAsDataURL(file);
        });
      });
      Promise.all(promises).then(results => {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], ...results] }));
        setCompressing(false);
      });
    }
  };

  const removeFromArray = (field: 'images' | 'technicalDrawings', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingId) {
        const res = await fetch(`/api/products/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          await fetchProducts();
          resetForm();
          alert("Product updated successfully!");
        }
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          await fetchProducts();
          resetForm();
          alert("Product added successfully!");
        }
      }
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Failed to save product");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      modelNumber: "",
      description: "",
      series: "",
      brand: "Paralight",
      application: "",
      finish: "",
      material: "",
      wattage: "",
      dimensions: "",
      voltage: "",
      color: "",
      cri: "",
      cct: "",
      beamAngle: "",
      image: "",
      images: [],
      catalogueUrl: "",
      technicalDrawingUrl: "",
      technicalDrawings: [],
      subSeries: "",
      standardLength: "",
      diffuserFinish: "",
      diffuserMaterial: "",
      accessories: "",
      ledStripSize: "",
      installationMethod: "",
      packagingMethodADesc: "",
      packagingMethodASpec: "",
      packagingMethodBDesc: "",
      packagingMethodBSpec: "",
      accessoriesSpec: "",
      mountingTrack: "",
      conductionMethod: "",
      maglinearName: "",
      inputVoltage: "",
      outputVoltage: "",
      technicalSpecs: ""
    });
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      modelNumber: product.modelNumber,
      description: product.description,
      series: product.series,
      brand: product.brand,
      application: product.application || "",
      finish: product.finish || "",
      material: product.material || "",
      wattage: product.wattage || "",
      dimensions: product.dimensions || "",
      voltage: product.voltage || "",
      color: product.color || "",
      cri: product.cri || "",
      cct: product.cct || "",
      beamAngle: product.beamAngle || "",
      image: product.image || "",
      images: product.images || [],
      catalogueUrl: product.catalogueUrl || "",
      technicalDrawingUrl: product.technicalDrawingUrl || "",
      technicalDrawings: product.technicalDrawings || [],
      subSeries: product.subSeries || "",
      standardLength: product.standardLength || "",
      diffuserFinish: product.diffuserFinish || "",
      diffuserMaterial: product.diffuserMaterial || "",
      accessories: product.accessories || "",
      ledStripSize: product.ledStripSize || "",
      installationMethod: product.installationMethod || "",
      packagingMethodADesc: product.packagingMethodADesc || "",
      packagingMethodASpec: product.packagingMethodASpec || "",
      packagingMethodBDesc: product.packagingMethodBDesc || "",
      packagingMethodBSpec: product.packagingMethodBSpec || "",
      accessoriesSpec: product.accessoriesSpec || "",
      mountingTrack: product.mountingTrack || "",
      conductionMethod: product.conductionMethod || "",
      maglinearName: product.maglinearName || "",
      inputVoltage: product.inputVoltage || "",
      outputVoltage: product.outputVoltage || "",
      technicalSpecs: product.technicalSpecs || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
        if (res.ok) {
          await fetchProducts();
          if (editingId === id) resetForm();
        }
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product");
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-8 tracking-tighter uppercase">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Username</label>
              <input 
                type="text" 
                data-testid="input-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8]/20 transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Password</label>
              <input 
                type="password" 
                data-testid="input-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8]/20 transition-colors"
                required
              />
            </div>
            <button 
              type="submit"
              data-testid="button-login"
              className="w-full py-4 bg-[#00A8E8] text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-[#00C4E8] transition-colors"
            >
              Enter Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-[#00A8E8] selection:text-white font-sans">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className="w-full lg:w-64 space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold mb-2 uppercase tracking-tighter text-gray-900">Control</h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Management Dashboard</p>
              </div>
              <div className="space-y-2">
                <button 
                  onClick={resetForm}
                  data-testid="button-add-product"
                  className={`w-full flex items-center justify-between p-4 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg ${!editingId ? 'bg-gradient-to-r from-[#00A8E8] to-[#0090C8] text-white shadow-lg shadow-[#00A8E8]/20' : 'bg-white border border-gray-200 text-gray-700 hover:border-[#00A8E8] hover:text-[#00A8E8]'}`}
                >
                  Add Product <Plus className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 text-gray-700 text-[10px] font-bold uppercase tracking-widest hover:border-[#ECAA00] hover:text-[#ECAA00] transition-colors rounded-lg">
                  Product List <Package className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleLogout}
                  data-testid="button-logout"
                  className="w-full flex items-center justify-between p-4 bg-white border border-red-200 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 hover:border-red-300 transition-colors rounded-lg"
                >
                  Logout <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 space-y-12">
              <section className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 relative shadow-sm">
                <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[#00A8E8]/20 -mt-2 -mr-2 pointer-events-none rounded-tr-xl" />
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-display font-bold uppercase tracking-widest flex items-center gap-4 text-gray-900">
                    {editingId ? <Edit2 className="w-5 h-5 text-[#ECAA00]" /> : <Plus className="w-5 h-5 text-[#00A8E8]" />}
                    {editingId ? "Edit Lighting System" : "Add New Lighting System"}
                  </h3>
                  {editingId && (
                    <button onClick={resetForm} className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#00A8E8] flex items-center gap-2">
                      <X className="w-3 h-3" /> Cancel Edit
                    </button>
                  )}
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Product Name *</label>
                      <input 
                        type="text" 
                        required
                        data-testid="input-name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8]/20 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Model Number *</label>
                      <input 
                        type="text" 
                        required
                        data-testid="input-model"
                        value={formData.modelNumber}
                        onChange={(e) => setFormData({...formData, modelNumber: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8]/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Series *</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          required
                          data-testid="input-series"
                          value={formData.series}
                          onChange={(e) => {
                            setFormData({...formData, series: e.target.value});
                            setSeriesFilter(e.target.value);
                            setShowSeriesDropdown(true);
                          }}
                          onFocus={() => setShowSeriesDropdown(true)}
                          onBlur={() => setTimeout(() => setShowSeriesDropdown(false), 200)}
                          placeholder="Type or select a series..."
                          className="w-full bg-gray-50 border border-gray-200 px-4 py-3 pr-10 text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8]/20 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSeriesDropdown(!showSeriesDropdown)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${showSeriesDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showSeriesDropdown && filteredSeries.length > 0 && (
                          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                            {filteredSeries.map((series) => (
                              <button
                                key={series}
                                type="button"
                                onClick={() => {
                                  setFormData({...formData, series});
                                  setShowSeriesDropdown(false);
                                  setSeriesFilter("");
                                }}
                                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-[#00A8E8]/10 hover:text-[#00A8E8] flex items-center justify-between transition-colors"
                              >
                                <span>{series}</span>
                                {formData.series === series && <Check className="w-4 h-4 text-[#00A8E8]" />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Brand *</label>
                      <select 
                        required
                        data-testid="select-brand"
                        value={formData.brand}
                        onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8]/20 transition-colors"
                      >
                        <option value="Paralight">Paralight</option>
                        <option value="Maglinear">Maglinear</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500">Sub Series</label>
                      <input 
                        type="text" 
                        data-testid="input-sub-series"
                        value={formData.subSeries}
                        onChange={(e) => setFormData({...formData, subSeries: e.target.value})}
                        placeholder="e.g. Premium, Standard"
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8]/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-200">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Product Image (Auto-Compressed)</label>
                      <div className="relative group">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'image')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />
                        <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors min-h-[140px] flex flex-col justify-center items-center ${formData.image ? 'bg-[#00A8E8]/5 border-[#00A8E8]/30' : 'border-gray-300 hover:border-[#00A8E8]'}`}>
                          {compressing ? (
                            <div className="py-4">
                              <div className="w-8 h-8 border-2 border-[#00A8E8] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                              <p className="text-[10px] text-[#00A8E8] font-medium">Compressing image...</p>
                            </div>
                          ) : formData.image ? (
                            <div className="flex items-center gap-4 w-full">
                              <img 
                                src={formData.image} 
                                alt="Preview" 
                                className="w-20 h-20 object-contain border border-gray-200 rounded-lg bg-white"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                              />
                              <div className="flex-1 text-left">
                                <p className="text-xs text-green-600 font-medium">Image Ready (Compressed)</p>
                                <p className="text-[10px] text-gray-500">{Math.round(formData.image.length / 1024)} KB</p>
                                <button 
                                  type="button" 
                                  onClick={(e) => { e.stopPropagation(); setFormData({...formData, image: ''}); }}
                                  className="text-[10px] text-red-500 hover:underline mt-1 relative z-30"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="py-4">
                              <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2 group-hover:text-[#00A8E8] transition-colors" />
                              <p className="text-[10px] text-gray-500 group-hover:text-gray-700">Click to upload image</p>
                              <p className="text-[8px] text-gray-400 mt-1">Images auto-compressed to ~20-50KB</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Catalogue PDF</label>
                      <div className="relative group">
                        <input 
                          type="file" 
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, 'catalogueUrl')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />
                        <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors h-48 flex flex-col justify-center items-center ${formData.catalogueUrl ? 'bg-[#ECAA00]/5 border-[#ECAA00]/30' : 'border-gray-300 hover:border-[#ECAA00]'}`}>
                          {formData.catalogueUrl ? (
                            <div className="flex flex-col items-center gap-2 text-blue-400">
                              <FileText className="w-8 h-8 mx-auto mb-2" />
                              <p className="text-[10px] font-bold uppercase tracking-widest">PDF Ready</p>
                              <p className="text-[8px] uppercase tracking-widest text-gray-500 italic">Click to replace PDF</p>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-gray-500 mx-auto mb-4 group-hover:text-white transition-colors" />
                              <p className="text-xs text-gray-500 uppercase tracking-widest">Catalogue PDF</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Additional Product Images</label>
                    <div className="flex flex-wrap gap-3">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative w-20 h-20 border border-gray-200 rounded-lg group">
                          <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeFromArray('images', index)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <div className="relative w-20 h-20 border-2 border-dashed border-gray-300 hover:border-[#00A8E8] transition-colors flex items-center justify-center cursor-pointer rounded-lg">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleMultipleFileChange(e, 'images')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Plus className="w-6 h-6 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Technical Drawing (Multiple)</label>
                    <div className="flex flex-wrap gap-3">
                      {formData.technicalDrawings.map((drawing, index) => (
                        <div key={index} className="relative w-24 h-24 border border-amber-500/20 bg-amber-500/5 group">
                          <img src={drawing} alt={`Drawing ${index + 1}`} className="w-full h-full object-contain p-1" />
                          <button
                            type="button"
                            onClick={() => removeFromArray('technicalDrawings', index)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <div className="relative w-24 h-24 border-2 border-dashed border-gray-300 hover:border-[#ECAA00] transition-colors flex items-center justify-center cursor-pointer rounded-lg">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleMultipleFileChange(e, 'technicalDrawings')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Ruler className="w-6 h-6 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Description *</label>
                    <textarea 
                      required
                      rows={4}
                      data-testid="input-description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8]/20 transition-colors resize-none"
                    />
                  </div>
                  <div className="space-y-6 pt-6 border-t border-gray-200">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#00A8E8] font-bold">Technical Specifications</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {formData.brand !== "Paralight" && (
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500">Wattage</label>
                          <input type="text" value={formData.wattage} onChange={e => setFormData({...formData, wattage: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. 5W" />
                        </div>
                      )}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500">Application</label>
                        <input type="text" value={formData.application} onChange={e => setFormData({...formData, application: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. Retail, Office" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500">Finish</label>
                        <input type="text" value={formData.finish} onChange={e => setFormData({...formData, finish: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. Sand White" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500">Material</label>
                        <input type="text" value={formData.material} onChange={e => setFormData({...formData, material: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. Aluminum" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500">Dimensions</label>
                        <input type="text" value={formData.dimensions} onChange={e => setFormData({...formData, dimensions: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. D60" />
                      </div>
                      {formData.brand !== "Paralight" && (
                        <>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Voltage</label>
                            <input type="text" value={formData.voltage} onChange={e => setFormData({...formData, voltage: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. DC24V" />
                          </div>
                        </>
                      )}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500">Color</label>
                        <input type="text" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. Sand White" />
                      </div>
                      {formData.brand !== "Paralight" && (
                        <>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">CRI</label>
                            <input type="text" value={formData.cri} onChange={e => setFormData({...formData, cri: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. Ra≥90" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">CCT</label>
                            <input type="text" value={formData.cct} onChange={e => setFormData({...formData, cct: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. 3000K" />
                          </div>
                        </>
                      )}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500">Beam Angle</label>
                        <input type="text" value={formData.beamAngle} onChange={e => setFormData({...formData, beamAngle: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. 270°" />
                      </div>
                      {formData.brand === "Paralight" && (
                        <>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Standard Length</label>
                            <input type="text" value={formData.standardLength} onChange={e => setFormData({...formData, standardLength: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. 2M/3M" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Diffuser Finish</label>
                            <input type="text" value={formData.diffuserFinish} onChange={e => setFormData({...formData, diffuserFinish: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. Opal/Clear" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Diffuser Material</label>
                            <input type="text" value={formData.diffuserMaterial} onChange={e => setFormData({...formData, diffuserMaterial: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. PC/PMMA" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Accessories</label>
                            <input type="text" value={formData.accessories} onChange={e => setFormData({...formData, accessories: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. End caps, Clips" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">LED Strip Size</label>
                            <input type="text" value={formData.ledStripSize} onChange={e => setFormData({...formData, ledStripSize: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. 8mm/10mm" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Installation Method</label>
                            <input type="text" value={formData.installationMethod} onChange={e => setFormData({...formData, installationMethod: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. Recessed/Surface" />
                          </div>
                        </>
                      )}
                      {formData.brand === "Maglinear" && (
                        <>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Name</label>
                            <input type="text" value={formData.maglinearName} onChange={e => setFormData({...formData, maglinearName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#ECAA00]" placeholder="e.g. Product display name" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Mounting Track</label>
                            <input type="text" value={formData.mountingTrack} onChange={e => setFormData({...formData, mountingTrack: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#ECAA00]" placeholder="e.g. Standard Track, Recessed Track" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Conduction Method</label>
                            <input type="text" value={formData.conductionMethod} onChange={e => setFormData({...formData, conductionMethod: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#ECAA00]" placeholder="e.g. Magnetic, Direct wire" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Input Voltage</label>
                            <input type="text" value={formData.inputVoltage} onChange={e => setFormData({...formData, inputVoltage: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#ECAA00]" placeholder="e.g. AC 100-240V" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Output Voltage</label>
                            <input type="text" value={formData.outputVoltage} onChange={e => setFormData({...formData, outputVoltage: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#ECAA00]" placeholder="e.g. DC 48V" />
                          </div>
                        </>
                      )}
                    </div>

                  </div>

                  {/* Additional Specification Rows */}
                  {formData.technicalSpecs && JSON.parse(formData.technicalSpecs || '[]').length > 0 && (
                    JSON.parse(formData.technicalSpecs || '[]').map((specRow: { model?: string; wattage?: string; application?: string; finish?: string; material?: string; dimensions?: string; voltage?: string; color?: string; cri?: string; cct?: string; beamAngle?: string; mountingTrack?: string; diffuserMaterial?: string; accessories?: string; ledStripSize?: string; installationMethod?: string; conductionMethod?: string; maglinearName?: string; inputVoltage?: string; outputVoltage?: string }, rowIndex: number) => (
                      <div key={rowIndex} className="space-y-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#00A8E8] font-bold">Technical Specifications Row {rowIndex + 2}</h4>
                          <button
                            type="button"
                            onClick={() => {
                              const specs = JSON.parse(formData.technicalSpecs || '[]');
                              specs.splice(rowIndex, 1);
                              setFormData({...formData, technicalSpecs: specs.length > 0 ? JSON.stringify(specs) : ''});
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 text-[10px] uppercase tracking-widest text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-3 h-3" /> Remove Row
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Model</label>
                            <input type="text" value={specRow.model || ''} onChange={e => {
                              const specs = JSON.parse(formData.technicalSpecs || '[]');
                              specs[rowIndex].model = e.target.value;
                              setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                            }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8] font-medium" placeholder="e.g. PL-D60-001" />
                          </div>
                          {formData.brand !== "Paralight" && (
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-widest text-gray-500">Wattage</label>
                              <input type="text" value={specRow.wattage || ''} onChange={e => {
                                const specs = JSON.parse(formData.technicalSpecs || '[]');
                                specs[rowIndex].wattage = e.target.value;
                                setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                              }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. 5W" />
                            </div>
                          )}
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Application</label>
                            <input type="text" value={specRow.application || ''} onChange={e => {
                              const specs = JSON.parse(formData.technicalSpecs || '[]');
                              specs[rowIndex].application = e.target.value;
                              setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                            }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. Retail, Office" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Finish</label>
                            <input type="text" value={specRow.finish || ''} onChange={e => {
                              const specs = JSON.parse(formData.technicalSpecs || '[]');
                              specs[rowIndex].finish = e.target.value;
                              setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                            }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. Sand White" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Material</label>
                            <input type="text" value={specRow.material || ''} onChange={e => {
                              const specs = JSON.parse(formData.technicalSpecs || '[]');
                              specs[rowIndex].material = e.target.value;
                              setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                            }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. Aluminum" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Dimensions</label>
                            <input type="text" value={specRow.dimensions || ''} onChange={e => {
                              const specs = JSON.parse(formData.technicalSpecs || '[]');
                              specs[rowIndex].dimensions = e.target.value;
                              setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                            }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. D60" />
                          </div>
                          {formData.brand !== "Paralight" && (
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-widest text-gray-500">Voltage</label>
                              <input type="text" value={specRow.voltage || ''} onChange={e => {
                                const specs = JSON.parse(formData.technicalSpecs || '[]');
                                specs[rowIndex].voltage = e.target.value;
                                setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                              }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. DC24V" />
                            </div>
                          )}
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500">Color</label>
                            <input type="text" value={specRow.color || ''} onChange={e => {
                              const specs = JSON.parse(formData.technicalSpecs || '[]');
                              specs[rowIndex].color = e.target.value;
                              setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                            }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. Sand White" />
                          </div>
                          {formData.brand !== "Paralight" && (
                            <>
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500">CRI</label>
                                <input type="text" value={specRow.cri || ''} onChange={e => {
                                  const specs = JSON.parse(formData.technicalSpecs || '[]');
                                  specs[rowIndex].cri = e.target.value;
                                  setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                                }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. Ra≥90" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500">CCT</label>
                                <input type="text" value={specRow.cct || ''} onChange={e => {
                                  const specs = JSON.parse(formData.technicalSpecs || '[]');
                                  specs[rowIndex].cct = e.target.value;
                                  setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                                }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. 3000K" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500">Beam Angle</label>
                                <input type="text" value={specRow.beamAngle || ''} onChange={e => {
                                  const specs = JSON.parse(formData.technicalSpecs || '[]');
                                  specs[rowIndex].beamAngle = e.target.value;
                                  setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                                }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. 270°" />
                              </div>
                            </>
                          )}
                          {formData.brand === "Maglinear" && (
                            <>
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500">Name</label>
                                <input type="text" value={specRow.maglinearName || ''} onChange={e => {
                                  const specs = JSON.parse(formData.technicalSpecs || '[]');
                                  specs[rowIndex].maglinearName = e.target.value;
                                  setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                                }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#ECAA00]" placeholder="e.g. Product name" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500">Mounting Track</label>
                                <input type="text" value={specRow.mountingTrack || ''} onChange={e => {
                                  const specs = JSON.parse(formData.technicalSpecs || '[]');
                                  specs[rowIndex].mountingTrack = e.target.value;
                                  setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                                }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#ECAA00]" placeholder="e.g. Standard Track" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500">Conduction Method</label>
                                <input type="text" value={specRow.conductionMethod || ''} onChange={e => {
                                  const specs = JSON.parse(formData.technicalSpecs || '[]');
                                  specs[rowIndex].conductionMethod = e.target.value;
                                  setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                                }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#ECAA00]" placeholder="e.g. Magnetic, Direct wire" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500">Input Voltage</label>
                                <input type="text" value={specRow.inputVoltage || ''} onChange={e => {
                                  const specs = JSON.parse(formData.technicalSpecs || '[]');
                                  specs[rowIndex].inputVoltage = e.target.value;
                                  setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                                }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#ECAA00]" placeholder="e.g. AC 100-240V" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500">Output Voltage</label>
                                <input type="text" value={specRow.outputVoltage || ''} onChange={e => {
                                  const specs = JSON.parse(formData.technicalSpecs || '[]');
                                  specs[rowIndex].outputVoltage = e.target.value;
                                  setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                                }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#ECAA00]" placeholder="e.g. DC 48V" />
                              </div>
                            </>
                          )}
                          {/* Paralight-specific fields in additional rows */}
                          {formData.brand === "Paralight" && (
                            <>
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500">Diffuser Material</label>
                                <input type="text" value={specRow.diffuserMaterial || ''} onChange={e => {
                                  const specs = JSON.parse(formData.technicalSpecs || '[]');
                                  specs[rowIndex].diffuserMaterial = e.target.value;
                                  setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                                }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. Frosted PC" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500">Accessories</label>
                                <input type="text" value={specRow.accessories || ''} onChange={e => {
                                  const specs = JSON.parse(formData.technicalSpecs || '[]');
                                  specs[rowIndex].accessories = e.target.value;
                                  setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                                }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. End Caps, Mounting Clips" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500">LED Strip Size</label>
                                <input type="text" value={specRow.ledStripSize || ''} onChange={e => {
                                  const specs = JSON.parse(formData.technicalSpecs || '[]');
                                  specs[rowIndex].ledStripSize = e.target.value;
                                  setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                                }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. 10mm, 12mm" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500">Installation Method</label>
                                <input type="text" value={specRow.installationMethod || ''} onChange={e => {
                                  const specs = JSON.parse(formData.technicalSpecs || '[]');
                                  specs[rowIndex].installationMethod = e.target.value;
                                  setFormData({...formData, technicalSpecs: JSON.stringify(specs)});
                                }} className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. Recessed/Surface" />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}

                  {/* Add Specification Row Button */}
                  <div className="pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => {
                        const currentSpecs = formData.technicalSpecs ? JSON.parse(formData.technicalSpecs) : [];
                        const newRow = { wattage: '', application: '', finish: '', material: '', dimensions: '', voltage: '', color: '', cri: '', cct: '', beamAngle: '', mountingTrack: '', conductionMethod: '', maglinearName: '', inputVoltage: '', outputVoltage: '' };
                        setFormData({...formData, technicalSpecs: JSON.stringify([...currentSpecs, newRow])});
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 text-[10px] uppercase tracking-widest text-[#00A8E8] border border-[#00A8E8] hover:bg-[#00A8E8]/5 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Add Another Specification Row
                    </button>
                  </div>

                  {formData.brand === "Paralight" && (
                    <div className="space-y-6 pt-6 border-t border-gray-200">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#00A8E8] font-bold">Packaging Information</h4>
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                          <h5 className="text-[10px] uppercase tracking-widest text-gray-700 font-bold mb-3">Method A</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-widest text-gray-500">Description</label>
                              <textarea rows={2} value={formData.packagingMethodADesc} onChange={e => setFormData({...formData, packagingMethodADesc: e.target.value})} className="w-full bg-white border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8] resize-none" placeholder="e.g. Aluminum profiles, PC covers, and accessories are bulk packed together..." />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-widest text-gray-500">Specifications</label>
                              <input type="text" value={formData.packagingMethodASpec} onChange={e => setFormData({...formData, packagingMethodASpec: e.target.value})} className="w-full bg-white border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. 100Pcs / 2050*190*90" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                          <h5 className="text-[10px] uppercase tracking-widest text-gray-700 font-bold mb-3">Method B (Additional Fee)</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-widest text-gray-500">Description</label>
                              <textarea rows={2} value={formData.packagingMethodBDesc} onChange={e => setFormData({...formData, packagingMethodBDesc: e.target.value})} className="w-full bg-white border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8] resize-none" placeholder="e.g. Aluminum profiles, PC covers, and accessories are packed together in individual bags..." />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-widest text-gray-500">Specifications</label>
                              <input type="text" value={formData.packagingMethodBSpec} onChange={e => setFormData({...formData, packagingMethodBSpec: e.target.value})} className="w-full bg-white border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]" placeholder="e.g. 100Pcs / 3150*170*140" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.brand === "Paralight" && (
                    <div className="space-y-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#00A8E8] font-bold">Accessories Specification</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const currentSpec = formData.accessoriesSpec ? JSON.parse(formData.accessoriesSpec) : [];
                            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                            const regularItems = currentSpec.filter((item: {no?: string}) => item.no?.toLowerCase() !== 'application');
                            const nextLetter = letters[regularItems.length] || (regularItems.length + 1).toString();
                            const newSpec = [...currentSpec.filter((item: {no?: string}) => item.no?.toLowerCase() !== 'application'), { no: nextLetter, specification: '', qty: '', remarks: '' }];
                            const appItem = currentSpec.find((item: {no?: string}) => item.no?.toLowerCase() === 'application');
                            if (appItem) newSpec.push(appItem);
                            setFormData({...formData, accessoriesSpec: JSON.stringify(newSpec)});
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white bg-[#00A8E8] hover:bg-[#0090c8] rounded transition-colors"
                        >
                          <Plus className="w-3 h-3" /> Add Row
                        </button>
                      </div>
                      
                      {(!formData.accessoriesSpec || JSON.parse(formData.accessoriesSpec || '[]').filter((item: {no?: string}) => item.no?.toLowerCase() !== 'application').length === 0) ? (
                        <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center">
                          <p className="text-[10px] uppercase tracking-widest text-gray-400">No accessories added yet</p>
                          <p className="text-[10px] text-gray-400 mt-1">Click "Add Row" to start adding accessories</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="grid grid-cols-[60px_1fr_80px_1fr_40px] gap-2 px-2">
                            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">NO.</span>
                            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Specification</span>
                            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">QTY</span>
                            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Remarks</span>
                            <span></span>
                          </div>
                          {JSON.parse(formData.accessoriesSpec || '[]')
                            .filter((item: {no?: string}) => item.no?.toLowerCase() !== 'application')
                            .map((item: {no?: string; specification?: string; qty?: string; remarks?: string}, index: number) => (
                            <div key={index} className="grid grid-cols-[60px_1fr_80px_1fr_40px] gap-2 items-center">
                              <input
                                type="text"
                                value={item.no || ''}
                                onChange={(e) => {
                                  const spec = JSON.parse(formData.accessoriesSpec || '[]');
                                  const regularItems = spec.filter((i: {no?: string}) => i.no?.toLowerCase() !== 'application');
                                  const appItem = spec.find((i: {no?: string}) => i.no?.toLowerCase() === 'application');
                                  regularItems[index] = {...regularItems[index], no: e.target.value};
                                  const newSpec = appItem ? [...regularItems, appItem] : regularItems;
                                  setFormData({...formData, accessoriesSpec: JSON.stringify(newSpec)});
                                }}
                                className="bg-gray-50 border border-gray-200 px-2 py-2 text-sm text-gray-900 rounded focus:outline-none focus:border-[#00A8E8] text-center font-medium"
                                placeholder="A"
                              />
                              <input
                                type="text"
                                value={item.specification || ''}
                                onChange={(e) => {
                                  const spec = JSON.parse(formData.accessoriesSpec || '[]');
                                  const regularItems = spec.filter((i: {no?: string}) => i.no?.toLowerCase() !== 'application');
                                  const appItem = spec.find((i: {no?: string}) => i.no?.toLowerCase() === 'application');
                                  regularItems[index] = {...regularItems[index], specification: e.target.value};
                                  const newSpec = appItem ? [...regularItems, appItem] : regularItems;
                                  setFormData({...formData, accessoriesSpec: JSON.stringify(newSpec)});
                                }}
                                className="bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-900 rounded focus:outline-none focus:border-[#00A8E8]"
                                placeholder="e.g. Profile"
                              />
                              <input
                                type="text"
                                value={item.qty || ''}
                                onChange={(e) => {
                                  const spec = JSON.parse(formData.accessoriesSpec || '[]');
                                  const regularItems = spec.filter((i: {no?: string}) => i.no?.toLowerCase() !== 'application');
                                  const appItem = spec.find((i: {no?: string}) => i.no?.toLowerCase() === 'application');
                                  regularItems[index] = {...regularItems[index], qty: e.target.value};
                                  const newSpec = appItem ? [...regularItems, appItem] : regularItems;
                                  setFormData({...formData, accessoriesSpec: JSON.stringify(newSpec)});
                                }}
                                className="bg-gray-50 border border-gray-200 px-2 py-2 text-sm text-gray-900 rounded focus:outline-none focus:border-[#00A8E8] text-center"
                                placeholder="1"
                              />
                              <input
                                type="text"
                                value={item.remarks || ''}
                                onChange={(e) => {
                                  const spec = JSON.parse(formData.accessoriesSpec || '[]');
                                  const regularItems = spec.filter((i: {no?: string}) => i.no?.toLowerCase() !== 'application');
                                  const appItem = spec.find((i: {no?: string}) => i.no?.toLowerCase() === 'application');
                                  regularItems[index] = {...regularItems[index], remarks: e.target.value};
                                  const newSpec = appItem ? [...regularItems, appItem] : regularItems;
                                  setFormData({...formData, accessoriesSpec: JSON.stringify(newSpec)});
                                }}
                                className="bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-900 rounded focus:outline-none focus:border-[#00A8E8]"
                                placeholder="e.g. 2M/3M"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const spec = JSON.parse(formData.accessoriesSpec || '[]');
                                  const regularItems = spec.filter((i: {no?: string}) => i.no?.toLowerCase() !== 'application');
                                  const appItem = spec.find((i: {no?: string}) => i.no?.toLowerCase() === 'application');
                                  regularItems.splice(index, 1);
                                  const newSpec = appItem ? [...regularItems, appItem] : regularItems;
                                  setFormData({...formData, accessoriesSpec: newSpec.length > 0 ? JSON.stringify(newSpec) : ''});
                                }}
                                className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="pt-4 border-t border-gray-100">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Application</label>
                          <input
                            type="text"
                            value={(() => {
                              try {
                                const spec = JSON.parse(formData.accessoriesSpec || '[]');
                                const appItem = spec.find((i: {no?: string}) => i.no?.toLowerCase() === 'application');
                                return appItem?.specification || '';
                              } catch { return ''; }
                            })()}
                            onChange={(e) => {
                              let spec = [];
                              try { spec = JSON.parse(formData.accessoriesSpec || '[]'); } catch { spec = []; }
                              const regularItems = spec.filter((i: {no?: string}) => i.no?.toLowerCase() !== 'application');
                              if (e.target.value) {
                                regularItems.push({ no: 'Application', specification: e.target.value, qty: '', remarks: '' });
                              }
                              setFormData({...formData, accessoriesSpec: regularItems.length > 0 ? JSON.stringify(regularItems) : ''});
                            }}
                            className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8]"
                            placeholder="e.g. Commercial lighting/Office lighting/Home lighting"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isLoading}
                    data-testid="button-submit"
                    className="w-full py-5 bg-white text-black font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-gray-200 transition-colors shadow-2xl disabled:opacity-50"
                  >
                    {isLoading ? "Saving..." : (editingId ? "Update Product" : "Publish Product")}
                  </button>
                </form>
              </section>
              <section className="space-y-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-display font-bold uppercase tracking-widest text-gray-900">
                      Live Products 
                      <span className="text-gray-400 font-normal ml-2">
                        ({products.filter(p => 
                          (adminBrandFilter === "All" || p.brand === adminBrandFilter) &&
                          (adminSeriesFilter === "All" || p.series === adminSeriesFilter) &&
                          (!adminSearchQuery.trim() || 
                            p.name.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
                            p.modelNumber.toLowerCase().includes(adminSearchQuery.toLowerCase())
                          )
                        ).length} of {products.length})
                      </span>
                    </h3>
                  </div>
                  
                  {/* Filter Bar */}
                  <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={adminSearchQuery}
                        onChange={(e) => setAdminSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 text-gray-900 rounded-lg placeholder-gray-400 focus:outline-none focus:border-[#00A8E8] transition-colors"
                      />
                    </div>
                    
                    {/* Brand Filter */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Brand:</span>
                      <div className="flex rounded-lg overflow-hidden border border-gray-200">
                        {(["All", "Paralight", "Maglinear"] as const).map((brand) => (
                          <button
                            key={brand}
                            type="button"
                            onClick={() => setAdminBrandFilter(brand)}
                            className={`px-3 py-2 text-[10px] uppercase tracking-widest font-bold transition-colors ${
                              adminBrandFilter === brand 
                                ? brand === "Paralight" ? 'bg-[#00A8E8] text-white' 
                                  : brand === "Maglinear" ? 'bg-[#ECAA00] text-white' 
                                  : 'bg-gray-800 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Series Filter */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Series:</span>
                      <select
                        value={adminSeriesFilter}
                        onChange={(e) => setAdminSeriesFilter(e.target.value)}
                        className="px-3 py-2 text-sm bg-white border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-[#00A8E8] transition-colors"
                      >
                        <option value="All">All Series</option>
                        {Array.from(new Set(products.map(p => p.series).filter(Boolean))).sort().map((series) => (
                          <option key={series} value={series}>{series}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Clear Filters */}
                    {(adminSearchQuery || adminBrandFilter !== "All" || adminSeriesFilter !== "All") && (
                      <button
                        type="button"
                        onClick={() => {
                          setAdminSearchQuery("");
                          setAdminBrandFilter("All");
                          setAdminSeriesFilter("All");
                        }}
                        className="px-3 py-2 text-[10px] uppercase tracking-widest font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {products
                    .filter(product => {
                      // Brand filter
                      if (adminBrandFilter !== "All" && product.brand !== adminBrandFilter) return false;
                      // Series filter
                      if (adminSeriesFilter !== "All" && product.series !== adminSeriesFilter) return false;
                      // Search filter
                      if (!adminSearchQuery.trim()) return true;
                      const query = adminSearchQuery.toLowerCase();
                      return (
                        product.name.toLowerCase().includes(query) ||
                        product.modelNumber.toLowerCase().includes(query) ||
                        product.brand.toLowerCase().includes(query) ||
                        product.series.toLowerCase().includes(query)
                      );
                    })
                    .map((product) => (
                    <div key={product.id} data-testid={`product-item-${product.id}`} className={`rounded-xl p-6 flex justify-between items-center group transition-all ${editingId === product.id ? 'bg-[#00A8E8]/5 border-2 border-[#00A8E8] shadow-lg shadow-[#00A8E8]/10' : 'bg-white border border-gray-200 hover:border-[#00A8E8]/50 hover:shadow-md'}`}>
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                          ) : (
                            <Package className="w-6 h-6 text-gray-300" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold uppercase tracking-widest mb-1">{product.name}</h4>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">{product.modelNumber}</p>
                          <div className="flex gap-2 mt-2">
                            <span className={`text-[8px] px-2 py-1 uppercase tracking-widest rounded-full ${product.brand === 'Paralight' ? 'bg-[#00A8E8]/10 text-[#00A8E8]' : 'bg-[#ECAA00]/10 text-[#ECAA00]'}`}>{product.brand}</span>
                            <span className="text-[8px] bg-gray-100 text-gray-600 px-2 py-1 uppercase tracking-widest rounded-full">{product.series}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          data-testid={`button-edit-${product.id}`}
                          className={`p-3 transition-colors rounded-lg flex items-center gap-2 ${editingId === product.id ? 'bg-[#00A8E8] text-white' : 'bg-gray-100 border border-gray-200 hover:bg-[#00A8E8]/10 hover:border-[#00A8E8]'}`}
                        >
                          <Edit2 className="w-4 h-4" />
                          {editingId === product.id && <span className="text-xs font-bold uppercase tracking-wider">Editing</span>}
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          data-testid={`button-delete-${product.id}`}
                          className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {products.length === 0 && (
                    <div className="text-center py-20 border border-gray-200 bg-gray-50/50 rounded-xl">
                      <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-sm text-gray-500 uppercase tracking-[0.3em]">No products yet</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
