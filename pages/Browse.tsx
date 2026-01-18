
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid, Search as SearchIcon } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import { Input, Select, Button } from '../components/UI';
import { Property } from '../types';

const MOCK_DATA: Property[] = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "123 Main St, Seattle, WA",
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
    listingType: "Sell",
    type: "Residential"
  },
  {
    id: 2,
    title: "Luxury Oceanfront Villa",
    location: "456 Coastal Hwy, Malibu, CA",
    price: 2500000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3500,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    listingType: "Sell",
    type: "Residential"
  },
  {
    id: 3,
    title: "Cozy City Studio",
    location: "789 Pine St, San Francisco, CA",
    price: 3200,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1000&q=80",
    listingType: "Rent",
    type: "Residential"
  },
  {
    id: 4,
    title: "Spacious Family Home",
    location: "321 Oak Ave, Austin, TX",
    price: 650000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2200,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80",
    listingType: "Sell",
    type: "Residential"
  },
  {
    id: 5,
    title: "High-Rise Penthouse",
    location: "555 Skyline Dr, Chicago, IL",
    price: 5500,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2800,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
    listingType: "Rent",
    type: "Residential"
  },
  {
    id: 6,
    title: "Historic Brownstone",
    location: "101 Beacon St, Boston, MA",
    price: 1200000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2600,
    image: "https://images.unsplash.com/photo-1513584685908-95c9e2d013e1?auto=format&fit=crop&w=1000&q=80",
    listingType: "Sell",
    type: "Residential"
  }
];

const Browse: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState<Property[]>(MOCK_DATA);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('keyword') || '');
  const [filterType, setFilterType] = useState(searchParams.get('type') || 'all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [minBeds, setMinBeds] = useState('any');

  useEffect(() => {
    const keyword = searchParams.get('keyword') || '';
    const type = searchParams.get('type') || 'all';

    setSearchQuery(keyword);
    setFilterType(type);
  }, [searchParams]);

  const filteredListings = useMemo(() => {
    return listings.filter(property => {
      // Filter by Keyword (Client-side search)
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        if (!property.title.toLowerCase().includes(lowerQuery) &&
          !property.location.toLowerCase().includes(lowerQuery)) {
          return false;
        }
      }

      // Filter by Type (Rent/Sell)
      if (filterType !== 'all' && property.listingType?.toLowerCase() !== filterType.toLowerCase()) {
        return false;
      }
      // Filter by Price
      if (priceRange.min && property.price < Number(priceRange.min)) return false;
      if (priceRange.max && property.price > Number(priceRange.max)) return false;

      // Filter by Beds
      if (minBeds !== 'any' && property.bedrooms < Number(minBeds)) return false;

      return true;
    });
  }, [listings, filterType, priceRange, minBeds, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ keyword: searchQuery, type: filterType });
  };

  return (
    <div className="pt-32 pb-24 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-black uppercase tracking-tighter mb-6">Discover Portfolio</h1>

          <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative w-full lg:flex-grow">
              <Input
                placeholder="Search by city, type, or architectural style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<SearchIcon size={20} />}
                className="!bg-white shadow-sm"
              />
            </div>
            <Button type="submit">Execute Search</Button>
          </form>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-10 animate-fade-up">
          <div className="flex items-center gap-2 mb-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
            <SlidersHorizontal size={14} />
            <span>Refine Results</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-50 border-transparent hover:bg-gray-100 transition-colors"
            >
              <option value="all">All Listing Types</option>
              <option value="Rent">For Rent</option>
              <option value="Sell">For Sale</option>
            </Select>

            <Select
              value={minBeds}
              onChange={(e) => setMinBeds(e.target.value)}
              className="bg-gray-50 border-transparent hover:bg-gray-100 transition-colors"
            >
              <option value="any">Any Bedrooms</option>
              <option value="1">1+ Bedrooms</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
            </Select>

            <Input
              type="number"
              placeholder="Min Price"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              className="bg-gray-50 border-transparent hover:bg-gray-100 transition-colors"
            />

            <Input
              type="number"
              placeholder="Max Price"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              className="bg-gray-50 border-transparent hover:bg-gray-100 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Found <span className="text-black">{filteredListings.length}</span> Results
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-[450px] bg-gray-100 rounded-[2.5rem] animate-pulse" />)}
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map(property => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-white rounded-[3rem] border border-gray-100">
            <SearchIcon size={40} className="mx-auto text-gray-200 mb-6" />
            <h3 className="text-xl font-bold uppercase tracking-tighter">Zero matches found</h3>
            <p className="text-gray-400 font-medium mt-2">Try broader criteria for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
