

export type PropertyType = 'sale' | 'rent';

// Added Property interface to resolve compilation errors
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
  listingType: string;
  image: string;
  description: string;
  amenities: string[];
  sellerId: string;
  featured?: boolean;
}

export interface ListingCardDTO {
  id: number;
  name: string;
  address: string;
  offerPrice: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  type: string;
  imageUrl: string;
}

export interface ListingResponseDTO {
  id: number;
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  discountPrice: number;
  bedrooms: number;
  bathrooms: number;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  imageUrls: string[];
  city: string;
  state: string;
  pincode: string;
  amenities: string[];
  size: number;
  ownerName: string;
  ownerEmail: string;
}

export interface ListingRequestDTO {
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  offerPrice: number;
  bedrooms: number;
  bathrooms: number;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  imageUrls: string[];
  city: string;
  state: string;
  pincode: string;
  amenities: string[];
  size: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'seller' | 'admin';
  avatar: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}