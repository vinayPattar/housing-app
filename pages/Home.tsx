
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Shield, Zap, Award, Star, Quote, CheckCircle } from 'lucide-react';
import { listingApi } from '../api';
import ListingCard from '../components/ListingCard';
import { Button, Input, Select, Badge } from '../components/UI';
import { Property } from '../types';
import { MOCK_PROPERTIES } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'sale' | 'rent'>('sale');
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await listingApi.getPublicCards();
        const data = Array.isArray(response) ? response : response.data || [];

        const mappedListings: Property[] = data.slice(0, 3).map((item: any) => ({
          id: item.id,
          title: item.name,
          location: item.address,
          price: item.offerPrice,
          bedrooms: item.bedrooms,
          bathrooms: item.bathrooms,
          sqft: item.size,
          image: item.imageUrl,
          listingType: item.type,
          type: 'Residential'
        }));

        if (mappedListings.length > 0) {
          setListings(mappedListings);
        } else {
          setListings(MOCK_PROPERTIES.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings(MOCK_PROPERTIES.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Map the active tab to the backend expected types (Sell/Rent)
    const typeParam = activeTab === 'sale' ? 'Sell' : 'Rent';
    navigate(`/browse?type=${typeParam}&keyword=${searchQuery}`);
  };

  const principles = [
    { title: "Architectural Integrity", desc: "We only list properties that meet our strict design and structural standards." },
    { title: "Seller Verification", desc: "Every owner is vetted to ensure your transaction is as secure as it is premium." },
    { title: "Digital-First Experience", desc: "HD virtual tours and transparent data insights come standard with every listing." }
  ];

  return (
    <div className="relative bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-28 pb-12 overflow-hidden px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-10 animate-fade-up">
            <div className="space-y-6">
              <Badge variant="light">Global Benchmark in Real Estate</Badge>
              <h1 className="text-6xl lg:text-[100px] font-black text-black leading-[0.9] tracking-tighter uppercase">
                Redefining <br />
                The <span className="text-gray-300">Space.</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-xl leading-relaxed font-medium">
                HomiFy is not just a marketplace; it is an elite curation of global living. We bridge the gap between architectural art and everyday dwelling.
              </p>
            </div>

            <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 max-w-3xl">
              <div className="flex space-x-2 p-1 bg-gray-50 rounded-full w-fit mb-4 ml-2 mt-2">
                {['Sale', 'Rent'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase() as any)}
                    className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 ${activeTab === tab.toLowerCase() ? 'bg-black text-white shadow-xl shadow-black/20' : 'text-gray-400 hover:text-black'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
                <Input
                  placeholder="Search Location or Keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search size={18} />}
                />
                <Select>
                  <option value="">Any Class</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="villa">Villas</option>
                </Select>
                <Button type="submit" className="h-full">
                  Find Property
                </Button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="h-[700px] rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200"
                alt="Architecture"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section: What is HomiFy? */}
      <section className="py-32 bg-black text-white px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">The HomiFy Standard</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">Why We Are Different.</h3>
            <p className="text-lg text-gray-400 font-medium leading-relaxed mb-10">
              Unlike traditional listing sites that prioritize quantity over quality, HomiFy operates on a principle of curated excellence.
              We believe a home is an extension of identity, not just an asset. Every listing on our platform undergoes a rigorous
              architectural and legal audit, ensuring you only see the absolute best the market has to offer.
            </p>
            <div className="space-y-6">
              {principles.map((p, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-white">
                    <CheckCircle size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase text-xs tracking-widest mb-1">{p.title}</h4>
                    <p className="text-sm text-gray-500">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-[3rem] p-12 border border-white/10">
            <h4 className="text-2xl font-bold uppercase tracking-tight mb-6 italic">"HomiFy represents the future of real estate procurement—sleek, transparent, and undeniably premium."</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-800" />
              <div>
                <p className="font-bold uppercase tracking-widest text-xs">Marcus Thorne</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase">Lead Architect, Thorne & Co.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties (Real API Data) */}
      <section className="py-32 bg-white px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter">Recent Listings</h2>
            <Link to="/browse" className="text-xs font-black uppercase tracking-widest text-black border-b-2 border-black pb-1 hover:opacity-50 transition-opacity">
              View All <ArrowRight size={16} className="inline ml-2" />
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-10">
              {[1, 2, 3].map(i => <div key={i} className="h-96 bg-gray-100 rounded-[2.5rem] animate-pulse" />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {listings.map(property => (
                <ListingCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-gray-50 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-3xl font-black uppercase tracking-tighter">Voices of HomiFy</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", role: "Collector", text: "The transaction was silent, professional, and flawless." },
              { name: "David L.", role: "CEO", text: "HomiFy saved me months of searching through clutter." },
              { name: "Elena R.", role: "Designer", text: "Finally, a platform that understands aesthetic value." }
            ].map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex space-x-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="black" />)}
                </div>
                <p className="font-medium text-gray-600 mb-8 italic">"{t.text}"</p>
                <p className="text-[10px] font-bold uppercase tracking-widest">{t.name} — {t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
