
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Square, Heart, ArrowUpRight } from 'lucide-react';
import { Property } from '../types';
import { Badge } from './UI';

interface ListingCardProps {
  property: Property;
}

const ListingCard: React.FC<ListingCardProps> = ({ property }) => {
  const isRent = property.listingType === 'Rent';

  return (
    <Link
      to={`/listing/${property.id}`}
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute top-6 left-6 z-10">
          <Badge>{property.type}</Badge>
        </div>
        <button className="absolute top-6 right-6 z-10 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all duration-300">
          <Heart size={18} />
        </button>
        <div className="absolute bottom-6 right-6 bg-white p-3 rounded-full translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl">
          <ArrowUpRight size={20} className="text-black" />
        </div>
      </div>

      <div className="p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-black group-hover:opacity-60 transition-opacity truncate tracking-tight">
            {property.title}
          </h3>
        </div>

        <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
          <MapPin size={14} className="mr-2 text-black" />
          <span className="truncate">{property.location}</span>
        </div>

        <div className="flex items-center space-x-6 py-4 border-t border-gray-50 mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">Beds</span>
            <span className="text-sm font-bold text-black">{property.bedrooms}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">Baths</span>
            <span className="text-sm font-bold text-black">{property.bathrooms}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">Size</span>
            <span className="text-sm font-bold text-black">{property.sqft} sqft</span>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">Price</span>
            <div className="flex items-baseline">
              <span className="text-2xl font-black text-black">
                ${property.price}
              </span>
              {isRent && <span className="text-xs text-gray-500 font-bold ml-1 uppercase">/ mo</span>}
            </div>
          </div>
          <Badge variant="light">{property.type}</Badge>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
