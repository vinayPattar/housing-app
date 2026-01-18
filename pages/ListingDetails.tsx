
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, BedDouble, Bath, Square, ChevronLeft,
  Share2, Heart, CheckCircle2, Phone, Mail, MessageSquare, TrendingUp
} from 'lucide-react';
import { listingApi } from '../api';
import { Button, Badge } from '../components/UI';
import { ListingResponseDTO } from '../types';
import { toast } from 'react-hot-toast';

const ListingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<ListingResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        const response = await listingApi.getPublicDetails(id);
        setProperty(response.data || response);
      } catch (error) {
        console.error("Error fetching details:", error);
        toast.error("Could not load property details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="pt-40 text-center uppercase font-bold tracking-widest text-gray-400">Loading Portfolio...</div>;
  if (!property) return <div className="pt-40 text-center uppercase font-bold tracking-widest text-red-400">Asset Not Found</div>;

  return (
    <div className="pt-32 pb-40 bg-white px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 animate-fade-up">
          <div>
            <Link to="/browse" className="inline-flex items-center text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest mb-6 transition-colors">
              <ChevronLeft size={14} className="mr-2" />
              Return to Portfolio
            </Link>
            <div className="flex items-center space-x-4 mb-4">
              <Badge>{property.type}</Badge>
              {property.offer && <Badge variant="light">Limited Offer</Badge>}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter leading-none">{property.name}</h1>
            <div className="flex items-center text-gray-500 mt-4 text-sm font-medium">
              <MapPin size={18} className="mr-2 text-black" />
              {property.address}, {property.city}, {property.state} {property.pincode}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right mr-8">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Asking Price</p>
              <p className="text-4xl font-black text-black">
                ${property.offer ? property.discountPrice.toLocaleString() : property.regularPrice.toLocaleString()}
              </p>
            </div>
            <button className="p-4 rounded-full border border-gray-100 hover:bg-black hover:text-white transition-all">
              <Share2 size={20} />
            </button>
            <button className="p-4 rounded-full border border-gray-100 hover:bg-black hover:text-white transition-all">
              <Heart size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-8 h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
            <img src={property.imageUrls?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'} alt={property.name} className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-4 grid grid-rows-2 gap-8">
            <div className="rounded-[3rem] overflow-hidden shadow-lg h-full grayscale hover:grayscale-0 transition-all duration-700">
              <img src={property.imageUrls?.[1] || 'https://images.unsplash.com/photo-1493809842364-78817add7ffb'} alt="Detail 1" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-[3rem] overflow-hidden shadow-lg h-full relative group">
              <img src={property.imageUrls?.[2] || 'https://images.unsplash.com/photo-1484154218962-a197022b5858'} alt="Detail 2" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-[3rem]">
              {[
                { label: 'Beds', value: property.bedrooms },
                { label: 'Baths', value: property.bathrooms },
                { label: 'SQFT', value: property.size.toLocaleString() },
                { label: 'Status', value: property.furnished ? 'Furnished' : 'Unfurnished' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-8 bg-white rounded-[2.5rem] shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
                  <span className="text-lg font-black text-black mt-1">{item.value}</span>
                </div>
              ))}
            </div>

            <section>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Narrative</h2>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                {property.description}
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">Asset Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {property.amenities?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex items-center text-black font-bold">
                      <CheckCircle2 size={18} className="mr-3" />
                      <span>{item}</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-300 uppercase">Verified</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-black/5 border border-gray-100">
                <h3 className="text-xl font-bold text-black uppercase tracking-tight mb-8">Secure Access</h3>
                <div className="flex items-center space-x-4 mb-10">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-black font-bold">
                    {property.ownerName?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-black uppercase text-sm tracking-tight">{property.ownerName}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Portfolio Representative</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button fullWidth className="py-5">
                    <MessageSquare size={18} className="mr-3" />
                    Initiate Inquiry
                  </Button>
                  <div className="grid grid-cols-1 gap-4">
                    <Button variant="outline" fullWidth className="py-4 text-xs">
                      <Mail size={14} className="mr-2" /> Contact via Secure Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
