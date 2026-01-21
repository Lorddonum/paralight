import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Plus, Trash2, LogOut, Package, ChevronRight, Upload, Settings, Edit2, X, Image as ImageIcon, FileText } from "lucide-react";

interface Product {
  id: number;
  name: string;
  modelNumber: string;
  description: string;
  series: string;
  brand: "Paralight" | "Maglinear";
  wattage: string;
  dimensions: string;
  voltage: string;
  color: string;
  cri: string;
  cct: string;
  beamAngle: string;
  image?: string;
  catalogueUrl?: string;
}

const STORAGE_KEY = "paralight_products";

const getProducts = (): Product[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveProduct = (product: Product | Omit<Product, 'id'>): Product[] => {
  const products = getProducts();
  let updated;
  if ('id' in product) {
    updated = products.map(p => p.id === product.id ? product as Product : p);
  } else {
    updated = [...products, { ...product, id: Date.now() }];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

const deleteProduct = (id: number): Product[] => {
  const products = getProducts();
  const updated = products.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [, setLocation] = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    modelNumber: "",
    description: "",
    series: "",
    brand: "Paralight" as const,
    wattage: "",
    dimensions: "",
    voltage: "",
    color: "",
    cri: "",
    cct: "",
    beamAngle: "",
    image: "",
    catalogueUrl: ""
  });

  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      setProducts(getProducts());
    }
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username === "admin_t" && password === "pass321") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setProducts(getProducts());
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
    setLocation("/");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: 'image' | 'catalogueUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const productData = editingId ? { ...formData, id: editingId } : formData;
    const updated = saveProduct(productData);
    setProducts(updated);
    resetForm();
    alert(editingId ? "Product updated successfully!" : "Product added successfully!");
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      modelNumber: "",
      description: "",
      series: "",
      brand: "Paralight",
      wattage: "",
      dimensions: "",
      voltage: "",
      color: "",
      cri: "",
      cct: "",
      beamAngle: "",
      image: "",
      catalogueUrl: ""
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
      wattage: product.wattage,
      dimensions: product.dimensions,
      voltage: product.voltage,
      color: product.color,
      cri: product.cri,
      cct: product.cct,
      beamAngle: product.beamAngle,
      image: product.image || "",
      catalogueUrl: product.catalogueUrl || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updated = deleteProduct(id);
      setProducts(updated);
      if (editingId === id) resetForm();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-zinc-950 border border-white/10 p-8"
        >
          <h1 className="text-3xl font-display font-bold text-white mb-8 tracking-tighter uppercase">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-gray-200 transition-colors"
            >
              Enter Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className="w-full lg:w-64 space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold mb-2 uppercase tracking-tighter">Control</h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Management Dashboard</p>
              </div>
              <div className="space-y-2">
                <button 
                  onClick={resetForm}
                  className={`w-full flex items-center justify-between p-4 text-[10px] font-bold uppercase tracking-widest transition-all ${!editingId ? 'bg-white text-black' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
                >
                  Add Product <Plus className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                  Product List <Package className="w-4 h-4 text-gray-500" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-colors"
                >
                  Logout <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 space-y-12">
              <section className="bg-zinc-950 border border-white/10 p-8 md:p-12 relative">
                <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-white/20 -mt-2 -mr-2 pointer-events-none" />
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-display font-bold uppercase tracking-widest flex items-center gap-4">
                    {editingId ? <Edit2 className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
                    {editingId ? "Edit Lighting System" : "Add New Lighting System"}
                  </h3>
                  {editingId && (
                    <button onClick={resetForm} className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white flex items-center gap-2">
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
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Model Number *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.modelNumber}
                        onChange={(e) => setFormData({...formData, modelNumber: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Series *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.series}
                        onChange={(e) => setFormData({...formData, series: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Brand *</label>
                      <select 
                        required
                        value={formData.brand}
                        onChange={(e) => setFormData({...formData, brand: e.target.value as "Paralight" | "Maglinear"})}
                        className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                      >
                        <option value="Paralight">Paralight</option>
                        <option value="Maglinear">Maglinear</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
                    {/* Image Upload Area */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Product Image</label>
                      <div className="relative group">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'image')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />
                        <div className={`border-2 border-dashed border-white/10 p-8 text-center transition-colors h-48 flex flex-col justify-center items-center ${formData.image ? 'bg-white/5' : 'hover:border-white/20'}`}>
                          {formData.image ? (
                            <div className="flex flex-col items-center gap-2">
                              <img src={formData.image} alt="Preview" className="w-24 h-24 object-contain border border-white/10" />
                              <p className="text-[8px] uppercase tracking-widest text-gray-500 italic">Click to replace image</p>
                            </div>
                          ) : (
                            <>
                              <ImageIcon className="w-8 h-8 text-gray-500 mx-auto mb-4 group-hover:text-white transition-colors" />
                              <p className="text-xs text-gray-500 uppercase tracking-widest">Product Picture</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Catalogue PDF Area */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Catalogue PDF</label>
                      <div className="relative group">
                        <input 
                          type="file" 
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, 'catalogueUrl')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />
                        <div className={`border-2 border-dashed border-white/10 p-8 text-center transition-colors h-48 flex flex-col justify-center items-center ${formData.catalogueUrl ? 'bg-blue-500/5 border-blue-500/20' : 'hover:border-white/20'}`}>
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

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Description *</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors resize-none"
                    />
                  </div>
                  <div className="space-y-6 pt-6 border-t border-white/10">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-white font-bold">Technical Specifications</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500">Wattage</label>
                        <input type="text" value={formData.wattage} onChange={e => setFormData({...formData, wattage: e.target.value})} className="w-full bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-white/40" placeholder="e.g. 5W" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500">Dimensions</label>
                        <input type="text" value={formData.dimensions} onChange={e => setFormData({...formData, dimensions: e.target.value})} className="w-full bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-white/40" placeholder="e.g. D60" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500">Voltage</label>
                        <input type="text" value={formData.voltage} onChange={e => setFormData({...formData, voltage: e.target.value})} className="w-full bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-white/40" placeholder="e.g. DC24V" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500">Color</label>
                        <input type="text" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="w-full bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-white/40" placeholder="e.g. Sand White" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500">CRI</label>
                        <input type="text" value={formData.cri} onChange={e => setFormData({...formData, cri: e.target.value})} className="w-full bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-white/40" placeholder="e.g. Ra≥90" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500">CCT</label>
                        <input type="text" value={formData.cct} onChange={e => setFormData({...formData, cct: e.target.value})} className="w-full bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-white/40" placeholder="e.g. 3000K" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500">Beam Angle</label>
                        <input type="text" value={formData.beamAngle} onChange={e => setFormData({...formData, beamAngle: e.target.value})} className="w-full bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-white/40" placeholder="e.g. 270°" />
                      </div>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-5 bg-white text-black font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-gray-200 transition-colors shadow-2xl"
                  >
                    {editingId ? "Update Product" : "Publish Product"}
                  </button>
                </form>
              </section>
              <section className="space-y-6">
                <div className="flex justify-between items-end">
                  <h3 className="text-xl font-display font-bold uppercase tracking-widest">Live Products ({products.length})</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="bg-zinc-950 border border-white/10 p-6 flex justify-between items-center group hover:border-white/30 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest">{product.name}</h4>
                          <div className="flex gap-4 mt-1">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">{product.modelNumber}</p>
                            <span className="text-[10px] text-zinc-600 uppercase tracking-widest border-l border-white/10 pl-4">{product.brand} - {product.series}</span>
                            {product.catalogueUrl && (
                              <span className="text-[8px] text-blue-500 uppercase tracking-widest border-l border-white/10 pl-4">Catalogue Attached</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="p-3 text-gray-500 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
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
