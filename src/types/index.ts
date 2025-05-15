// User related types
export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

// Trip state enum
export enum TripState {
  IN_CREATION = 'IN_CREATION',
  WAITING_TO_START = 'WAITING_TO_START',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

// Trip model
export interface Trip {
  id: string;
  title: string;
  destinationRegion: string;
  startDate: string;
  endDate: string;
  budget?: number;
  description?: string;
  coverImage?: string;
  state: TripState;
  generalTransportation?: string;
  ownerId: string;
  collaborators: string[]; // List of user IDs
  createdAt: string;
  updatedAt: string;
}

// Location model - for activities and accommodations
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  name?: string;
}

// Accommodation model
export interface Accommodation {
  id: string;
  tripId: string;
  dayIndex: number; // 0-based index of the day in the trip
  name: string;
  location: Location;
  price?: number;
  url?: string;
  photos?: string[];
  isSelected: boolean; // True if this is the selected accommodation for this day (only one can be true after IN_CREATION state)
  createdAt: string;
  updatedAt: string;
}

// Activity model
export interface Activity {
  id: string;
  tripId: string;
  dayIndex: number;
  name: string;
  location: Location;
  startTime?: string; // ISO string format
  endTime?: string; // ISO string format
  price?: number;
  url?: string;
  photos?: string[];
  votes: string[]; // List of user IDs who voted for this activity
  createdAt: string;
  updatedAt: string;
}

// Daily transportation model
export interface DailyTransportation {
  id: string;
  tripId: string;
  dayIndex: number;
  type: string; // e.g., 'car', 'train', 'plane', 'bus', 'walk', etc.
  details?: string;
  createdAt: string;
  updatedAt: string;
}

// Comment model
export interface Comment {
  id: string;
  tripId: string;
  entityId: string; // ID of the entity being commented on (activity, accommodation)
  entityType: 'activity' | 'accommodation';
  text: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// Day model - combines accommodations, activities, and transportation for a day
export interface Day {
  index: number;
  date: string;
  accommodations: Accommodation[];
  activities: Activity[];
  transportation?: DailyTransportation;
}

// Complete trip with all related data
export interface FullTrip extends Trip {
  days: Day[];
  comments: Comment[];
} 
