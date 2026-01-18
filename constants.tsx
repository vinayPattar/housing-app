
import React from 'react';
import { Property } from './types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Skyline Terrace Apartment',
    location: 'Manhattan, New York',
    price: 4500,
    sqft: 1200,
    bedrooms: 2,
    bathrooms: 2,
    type: 'Apartment',
    listingType: 'Rent',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    description: 'A luxurious apartment with floor-to-ceiling windows offering a panoramic view of the city skyline.',
    amenities: ['Gym', 'Pool', '24/7 Security', 'Parking'],
    sellerId: 's1'
  },
  {
    id: '2',
    title: 'Modern Minimalist Villa',
    location: 'Beverly Hills, CA',
    price: 12500000,
    sqft: 4500,
    bedrooms: 5,
    bathrooms: 4,
    type: 'Villa',
    listingType: 'Buy',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    description: 'Experience the pinnacle of luxury living in this architectural masterpiece located in the heart of Beverly Hills.',
    amenities: ['Home Cinema', 'Wine Cellar', 'Smart Home', 'Infinity Pool'],
    sellerId: 's1',
    featured: true
  },
  {
    id: '3',
    title: 'Cozy Townhouse',
    location: 'Austin, Texas',
    price: 650000,
    sqft: 2200,
    bedrooms: 3,
    bathrooms: 2.5,
    type: 'Townhouse',
    listingType: 'Buy',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    description: 'Perfect for a growing family, this townhouse combines modern convenience with southern charm.',
    amenities: ['Backyard', 'Garage', 'Pet Friendly'],
    sellerId: 's2'
  },
  {
    id: '4',
    title: 'Seaside Sanctuary',
    location: 'Miami, Florida',
    price: 3800,
    sqft: 950,
    bedrooms: 1,
    bathrooms: 1,
    type: 'Condo',
    listingType: 'Rent',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    description: 'Wake up to the sound of waves in this beautiful beachfront condo.',
    amenities: ['Beach Access', 'Balcony', 'Rooftop Lounge'],
    sellerId: 's1'
  },
  {
    id: '5',
    title: 'The Glass House',
    location: 'Seattle, WA',
    price: 3200000,
    sqft: 3100,
    bedrooms: 4,
    bathrooms: 3,
    type: 'House',
    listingType: 'Buy',
    image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=800',
    description: 'An eco-friendly modern house nestled in the lush forests of Washington.',
    amenities: ['Solar Panels', 'Garden', 'Workshop'],
    sellerId: 's2',
    featured: true
  },
  {
    id: '6',
    title: 'Urban Loft',
    location: 'Chicago, IL',
    price: 2800,
    sqft: 850,
    bedrooms: 1,
    bathrooms: 1,
    type: 'Apartment',
    listingType: 'Rent',
    image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=800',
    description: 'Industrial chic loft with exposed brick and soaring ceilings in the Loop.',
    amenities: ['Laundry In-unit', 'High Ceilings', 'Roof Access'],
    sellerId: 's1'
  }
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Browse', path: '/browse' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];
