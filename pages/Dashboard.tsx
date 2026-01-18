

import React, { useState, useEffect } from 'react';
// Added Link import from react-router-dom
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home as HomeIcon, 
  Heart, 
  Settings, 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink,
  MessageSquare,
  X,
  MapPin,
  TrendingUp,
  Briefcase,
  Image as ImageIcon
} from 'lucide-react';
import { User, ListingCardDTO, ListingRequestDTO } from '../types';
import { listingApi } from '../api';
import { Button, Input, Select, Badge } from '../components/UI';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('listings');
  const [myListings, setMyListings] = useState<ListingCardDTO[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<ListingRequestDTO>();

  const fetchMyListings = async () => {
    try {
      const response = await listingApi.getMyListings();
      setMyListings(response.data);
    } catch (error) {
      console.error("Error fetching my listings:", error);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  const onAddListing = async (data: any) => {
    setLoading(true);
    try {
      // Basic transformations for the DTO
      const payload = {
        ...data,
        regularPrice: Number(data.regularPrice),
        offerPrice: Number(data.offerPrice),
        bedrooms: Number(data.bedrooms),
        bathrooms: Number(data.bathrooms),
        size: Number(data.size),
        furnished: data.furnished === 'true',
        parking: data.parking === 'true',
        offer: data.offer === 'true',
        // Mocking images as the backend needs a list
        imageUrls: [data.mainImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'],
        amenities: data.amenitiesString ? data.amenitiesString.split(',').map((s: string) => s.trim()) : []
      };
      
      await listingApi.createListing(payload);
      toast.success('Listing published to market');
      setIsAddModalOpen(false);
      reset();
      fetchMyListings();
    } catch (error) {
      toast.error('Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Permanently remove this asset?')) {
      try {
        await listingApi.deleteListing(id);
        toast.success('Asset removed');
        fetchMyListings();
      } catch (error) {
        toast.error('Deletion failed');
      }
    }
  };

  return (
    <div className="pt-32 pb-24 bg-gray-50/50 min-h-screen px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-32">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-black/5 border border-gray-100 text-center">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 p-1">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-black uppercase tracking-tighter">{user.name}</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{user.role} Account</p>
              
              <nav className="mt-10 space-y-1">
                {[
                  { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Market Overview' },
                  { id: 'listings', icon: <HomeIcon size={18} />, label: 'Asset Portfolio' },
                  { id: 'messages', icon: <MessageSquare size={18} />, label: 'Inquiries' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-black text-white shadow-xl shadow-black/20' : 'text-gray-400 hover:bg-gray-50'}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-9 space-y-8">
            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-xl shadow-black/5 border border-gray-100 min-h-[600px]">
              {activeTab === 'listings' ? (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                    <div>
                      <h1 className="text-3xl font-black text-black uppercase tracking-tighter">Your Portfolio</h1>
                      <p className="text-gray-400 font-medium mt-2">Managing {myListings.length} premium listings.</p>
                    </div>
                    <Button onClick={() => setIsAddModalOpen(true)}>
                      <Plus size={18} className="mr-2" /> New Asset
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {myListings.length > 0 ? (
                      myListings.map((property) => (
                        <div key={property.id} className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-[2rem] border border-gray-50 hover:bg-gray-50 transition-all group">
                          <div className="w-full md:w-56 h-40 rounded-3xl overflow-hidden shrink-0">
                            <img src={property.imageUrl} alt={property.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                          </div>
                          <div className="flex-grow space-y-2">
                            <Badge>{property.type}</Badge>
                            <h3 className="text-2xl font-bold text-black uppercase tracking-tight">{property.name}</h3>
                            <div className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center">
                              <MapPin size={12} className="mr-2" /> {property.address}
                            </div>
                            <div className="pt-4 flex items-baseline">
                              <span className="text-2xl font-black text-black">${property.offerPrice.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 shrink-0">
                            <button 
                              onClick={() => handleDelete(property.id)}
                              className="p-4 bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-red-500 rounded-2xl transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                            <Link to={`/listing/${property.id}`} className="p-4 bg-black text-white rounded-2xl shadow-xl shadow-black/10 hover:scale-105 transition-all">
                              <ExternalLink size={18} />
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-24 text-center">
                        <HomeIcon size={48} className="mx-auto text-gray-200 mb-6" />
                        <h3 className="text-xl font-bold text-black uppercase tracking-tighter">Empty Portfolio</h3>
                        <Button variant="outline" className="mt-8" onClick={() => setIsAddModalOpen(true)}>Create First Listing</Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[500px] text-center">
                   <LayoutDashboard size={40} className="text-gray-200 mb-4" />
                   <h2 className="text-2xl font-black text-black uppercase tracking-tighter">{activeTab} Interface</h2>
                   <p className="text-gray-400 font-medium">Coming soon to HomiFy Dashboard.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in">
           <div className="bg-white w-full max-w-4xl rounded-[3rem] p-10 overflow-y-auto max-h-[90vh] shadow-2xl relative">
              <button onClick={() => setIsAddModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black">
                 <X size={24} />
              </button>
              <h2 className="text-3xl font-black text-black uppercase tracking-tighter mb-10">Publish Premium Asset</h2>
              
              <form onSubmit={handleSubmit(onAddListing)} className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <Input label="Property Name" placeholder="The Diamond Penthouse" {...register('name', { required: true })} />
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-1">Narrative Description</label>
                      <textarea 
                        className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm font-medium focus:ring-4 focus:ring-black/5 focus:border-black focus:bg-white outline-none min-h-[120px]"
                        {...register('description')}
                        placeholder="Detailed architecture narrative..."
                      />
                    </div>
                    <Input label="Full Address" placeholder="123 Luxury Ave" {...register('address', { required: true })} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="City" {...register('city')} />
                      <Input label="State" {...register('state')} />
                    </div>
                    <Input label="Zip/Pincode" {...register('pincode')} />
                 </div>
                 
                 <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                       <Input label="Base Price ($)" type="number" {...register('regularPrice')} />
                       <Input label="Offer Price ($)" type="number" {...register('offerPrice')} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                       <Input label="Beds" type="number" {...register('bedrooms')} />
                       <Input label="Baths" type="number" {...register('bathrooms')} />
                       <Input label="SQFT" type="number" {...register('size')} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Select label="Type" {...register('type')}>
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                      </Select>
                      <Select label="Furnished" {...register('furnished')}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Select>
                    </div>
                    <Input label="Amenities (comma separated)" placeholder="Pool, Gym, Concierge" {...register('amenitiesString' as any)} />
                    <Input label="Main Image URL" icon={<ImageIcon size={14}/>} placeholder="https://..." {...register('mainImage' as any)} />
                 </div>

                 <div className="md:col-span-2 flex justify-end gap-4 mt-8">
                    <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                    <Button type="submit" loading={loading}>Finalize & Publish</Button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;