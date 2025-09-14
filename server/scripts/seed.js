require('dotenv').config()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Accommodation = require('../models/accommodation')
const RoomType = require('../models/roomType')
const Restaurant = require('../models/restaurant')
const Activity = require('../models/activity')

const users = [
  {
    firstName: 'Winifred',
    lastName: 'Walker',
    email: 'wwalker@traveler.com',
    password: 'traveler'
  },
  {
    firstName: 'Patricia',
    lastName: 'Dixon',
    email: 'pdixon@traveler.com',
    password: 'traveler'
  },
  {
    firstName: 'William',
    lastName: 'Krom',
    email: 'wkrom@traveler.com',
    password: 'traveler'
  },
  {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sjohnson@traveler.com',
    password: 'traveler'
  },
  {
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'mchen@traveler.com',
    password: 'traveler'
  },
  {
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'erodriguez@traveler.com',
    password: 'traveler'
  }
]

const accommodations = [
  {
    name: 'Leilani Royal Resort',
    description: 'Premier resort offering spacious suites, spa services, and direct access to Merriton Landing for dining and entertainment.',
    location: '120 Paragon Way, Merriton Landing, Taniti',
    contactEmail: 'info@leilaniroyal.com',
    contactPhone: '+690-555-0101',
    rating: 5,
    imageURL: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
    amenities: ['Spa Services', 'Spacious Suites', 'Merriton Landing Access', 'Fine Dining', 'Pool', 'Concierge', 'Entertainment'],
    checkInTime: '15:00:00',
    checkOutTime: '11:00:00'
  },
  {
    name: 'Yellow Leaf Bay Grand Resort',
    description: 'Surrounded by rainforest overlooking Yellow Leaf Bay, this resort offers a natural paradise with hiking trails and traditional Tanitian villas.',
    location: '570 Bay Circle, Yellow Leaf Bay, Taniti',
    contactEmail: 'reservations@yellowleafbay.com',
    contactPhone: '+690-555-0102',
    rating: 4,
    imageURL: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    amenities: ['Rainforest Setting', 'Hiking Trails', 'Traditional Villas', 'Bay Views', 'Nature Tours', 'Restaurant'],
    checkInTime: '14:00:00',
    checkOutTime: '11:00:00'
  },
  {
    name: 'Seaside Villas',
    description: 'Private beachfront and ocean villas offer a romantic, adult-only escape. Each villa features ocean views, direct beach access, and authentic Tanitian architecture.',
    location: '821 Pacific Drive, Taniti Sandbar, Taniti',
    contactEmail: 'info@seasidevillas.com',
    contactPhone: '+690-555-0103',
    rating: 4,
    imageURL: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
    amenities: ['Adult Only', 'Private Villas', 'Direct Beach Access', 'Ocean Views', 'Traditional Architecture', 'Romantic Setting'],
    checkInTime: '15:00:00',
    checkOutTime: '11:00:00'
  },
  {
    name: 'Taniti City Harbor Hotel',
    description: 'Modern boutique hotel in downtown Taniti City with harbor views and easy access to nightlife.',
    location: 'Taniti City Harbor, Taniti',
    contactEmail: 'hello@harbourhotel.com',
    contactPhone: '+690-555-0104',
    rating: 3,
    imageURL: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
    amenities: ['Harbor Views', 'Rooftop Bar', 'City Center', 'Modern Design', 'Concierge', 'Business Center'],
    checkInTime: '15:00:00',
    checkOutTime: '12:00:00'
  },
  {
    name: 'Palm Grove Inn',
    description: 'Intimate boutique inn surrounded by coconut palms with authentic island hospitality.',
    location: 'Palm Grove, Taniti',
    contactEmail: 'stay@palmgrove.com',
    contactPhone: '+690-555-0105',
    rating: 3,
    imageURL: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    amenities: ['Coconut Grove', 'Garden Pool', 'Local Cuisine', 'Island Tours', 'Hammock Garden'],
    checkInTime: '14:00:00',
    checkOutTime: '11:00:00'
  }
]

const roomTypes = [
  // Leilani Royal Resort
  {
    accommodationID: 1,
    name: 'Garden View Room',
    maxGuests: 2,
    pricePerNight: 189.00,
    totalRooms: 35,
    availableRooms: 35,
    amenities: ['Queen Bed (1)', 'Garden Views', 'Daily Housekeeping', 'Turndown Service']
  },
  {
    accommodationID: 1,
    name: 'City View Room',
    maxGuests: 2,
    pricePerNight: 189.00,
    totalRooms: 35,
    availableRooms: 35,
    amenities: ['Queen Bed (1)', 'Daily Housekeeping', 'Turndown Service', 'City Views', 'Modern Furnishings', 'Smart TV']
  },
  {
    accommodationID: 1,
    name: 'Ocean View Room',
    maxGuests: 2,
    pricePerNight: 329.00,
    totalRooms: 40,
    availableRooms: 40,
    amenities: ['King Bed (1)', 'Daily Housekeeping', 'Turndown Service', 'Modern Furnishings', 'Smart TV', 'Ocean Views', 'Mini Bar', 'Spa Access', 'Private Balcony', 'Premium Linens']
  },
  {
    accommodationID: 1,
    name: 'Junior Ocean Suite',
    maxGuests: 6,
    pricePerNight: 442.00,
    totalRooms: 25,
    availableRooms: 25,
    amenities: ['King Bed (2)', 'Daily Housekeeping', 'Turndown Service', 'Modern Furnishings', 'Smart TV', 'Ocean Views', 'Mini Bar', 'Spa Access', 'Private Balcony', 'Premium Linens', 'Spacious Living Area', 'Two Bedrooms', 'Two Bathrooms', 'Merriton Landing Views', 'Butler Service', 'Welcome Champagne', 'Priority Reservations']
  },
  {
    accommodationID: 1,
    name: 'Royal Ocean Suite',
    maxGuests: 6,
    pricePerNight: 649.00,
    totalRooms: 25,
    availableRooms: 25,
    amenities: ['King Bed (2)', 'Queen Bed (1)', 'Daily Housekeeping', 'Turndown Service', 'Modern Furnishings', 'Smart TV', 'Ocean Views', 'Mini Bar', 'Spa Access', 'Private Balcony', 'Premium Linens', 'Spacious Living Area', 'Two Bedrooms', 'Two Bathrooms', 'Merriton Landing Views', 'Butler Service', 'Welcome Champagne', 'Priority Reservations']
  },
  
  // Yellow Leaf Bay Grand Resort
  {
    accommodationID: 2,
    name: 'Bay View Room - Single',
    maxGuests: 2,
    pricePerNight: 249.00,
    totalRooms: 30,
    availableRooms: 30,
    amenities: ['King Bed (1)', 'Yellow Leaf Bay Views', 'Traditional Decor', 'Trail Access', 'Nature Guidebook']
  },
  {
    accommodationID: 2,
    name: 'Bay View Room - Double',
    maxGuests: 4,
    pricePerNight: 249.00,
    totalRooms: 30,
    availableRooms: 30,
    amenities: ['Queen Bed (2)', 'Yellow Leaf Bay Views', 'Traditional Decor', 'Trail Access', 'Nature Guidebook']
  },
  {
    accommodationID: 2,
    name: 'Rainforest Suite',
    maxGuests: 4,
    pricePerNight: 429.00,
    totalRooms: 20,
    availableRooms: 20,
    amenities: ['King Bed (2)', 'Traditional Decor', 'Trail Access', 'Nature Guidebook', 'Rainforest Views', 'Private Balcony', 'Mini Kitchen', 'Living Area', 'Binoculars']
  },
  {
    accommodationID: 2,
    name: 'Heart of the Rainforest Villa',
    maxGuests: 6,
    pricePerNight: 659.00,
    totalRooms: 15,
    availableRooms: 15,
    amenities: ['King Bed (2)', 'Queen Bed (1)', 'Traditional Decor', 'Trail Access', 'Nature Guidebook', 'Private Balcony', 'Mini Kitchen', 'Living Area', 'Binoculars', 'Traditional Architecture', 'Two Bedrooms', 'Full Kitchen', 'Bay Views', 'Private Garden', 'Welcome Fruit Basket']
  },
  
  // Seaside Villas
  {
    accommodationID: 3,
    name: 'Private Beach Villa',
    maxGuests: 2,
    pricePerNight: 449.00,
    totalRooms: 20,
    availableRooms: 20,
    amenities: ['King Bed (1)', 'Private Beach Access', 'Ocean Views', 'Outdoor Shower', 'Adult Only', 'Traditional Architecture', 'Mini Bar', 'Beach Chairs', 'Snorkeling Gear']
  },
  {
    accommodationID: 3,
    name: 'Romantic Oceanfront Villa',
    maxGuests: 2,
    pricePerNight: 649.00,
    totalRooms: 12,
    availableRooms: 12,
    amenities: ['California King Bed (1)', 'Private Beach Access', 'Ocean Views', 'Outdoor Shower', 'Adult Only', 'Traditional Architecture', 'Mini Bar', 'Beach Chairs', 'Snorkeling Gear', 'Outdoor Tub', 'Champagne Service', 'Couples Massage Setup', 'Romantic Lighting', 'Premium Amenities', 'Private Dining Setup', 'Sunset Views']
  },
  {
    accommodationID: 3,
    name: 'Ocean Villa',
    maxGuests: 4,
    pricePerNight: 1299.00,
    totalRooms: 10,
    availableRooms: 10,
    amenities: ['California King Bed (2)', 'Two Bedrooms', 'Two Bathrooms', 'Ocean Views', 'Outdoor Shower', 'Adult Only', 'Traditional Architecture', 'Mini Bar', 'Beach Chairs', 'Snorkeling Gear', 'California King Bed', 'Outdoor Tub', 'Infinity Pool', 'Champagne Service', 'Premium Amenities', 'Private Dining Setup', 'Sunset Views']
  },
  
  // Taniti City Harbor Hotel
  {
    accommodationID: 4,
    name: 'City View Room - Single',
    maxGuests: 2,
    pricePerNight: 149.00,
    totalRooms: 20,
    availableRooms: 20,
    amenities: ['King Bed (1)', 'City Views', 'Modern Design', 'Smart TV', 'Coffee Maker', 'Work Desk']
  },
  {
    accommodationID: 4,
    name: 'City View Room - Double',
    maxGuests: 4,
    pricePerNight: 179.00,
    totalRooms: 20,
    availableRooms: 20,
    amenities: ['Queen Bed (2)', 'City Views', 'Modern Design', 'Smart TV', 'Coffee Maker', 'Work Desk', 'Extra Space', 'Sofa Seating']
  },
  {
    accommodationID: 4,
    name: 'Harbor View Room - Single',
    maxGuests: 2,
    pricePerNight: 229.00,
    totalRooms: 20,
    availableRooms: 20,
    amenities: ['King Bed (1)', 'Modern Design', 'Smart TV', 'Coffee Maker', 'Work Desk', 'Harbor Views', 'Premium Location', 'Rooftop Bar Access', 'Mini Fridge', 'Premium Bedding']
  },
  {
    accommodationID: 4,
    name: 'Harbor View Room - Double',
    maxGuests: 4,
    pricePerNight: 259.00,
    totalRooms: 20,
    availableRooms: 20,
    amenities: ['Queen Bed (2)', 'Modern Design', 'Smart TV', 'Coffee Maker', 'Work Desk', 'Harbor Views', 'Premium Location', 'Rooftop Bar Access', 'Mini Fridge', 'Premium Bedding', 'Extra Space', 'Sofa Seating']
  },
  {
    accommodationID: 4,
    name: 'Penthouse Suite',
    maxGuests: 6,
    pricePerNight: 599.00,
    totalRooms: 10,
    availableRooms: 10,
    amenities: ['King Bed (2)', 'Queen Bed (1)', 'Modern Design', 'Smart TV', 'Coffee Maker', 'Work Desk', 'Harbor Views', 'Premium Location', 'Rooftop Bar Access', 'Mini Fridge', 'Premium Bedding', 'Panoramic Views', 'Loft Design', 'Two Bedrooms', 'Two Bathrooms', 'Full Kitchen', 'Private Elevator', 'Large Balcony', 'Concierge Service', 'Premium Amenities', 'Welcome Bottle Service', 'Daily Fruit Service']
  },
  
  // Palm Grove Inn
  {
    accommodationID: 5,
    name: 'Palm Cottage',
    maxGuests: 3,
    pricePerNight: 112.00,
    totalRooms: 12,
    availableRooms: 12,
    amenities: ['Queen Bed (1)', 'Sleeper Sofa', 'Coconut Grove Views', 'Local Art', 'Hammock', 'Garden Access', 'Authentic Decor', 'Peaceful Setting', 'Complimentary Island Coffee']
  }
]

const restaurants = [
  {
    name: 'The Volcano Grill',
    description: 'Upscale restaurant featuring volcanic stone-grilled meats and fresh island seafood with spectacular crater views.',
    location: 'Mount Taniti, Taniti',
    contactEmail: 'info@volcanogrill.com',
    contactPhone: '+690-555-0201',
    rating: 5,
    imageURL: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    cuisineType: 'Pacific Fusion',
    priceRange: '$$$',
    operatingDays: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    openTime: '17:00:00',
    closeTime: '23:00:00',
    maxCapacity: 80
  },
  {
    name: 'Coral Reef Sushi',
    description: 'Fresh sushi and sashimi featuring local catch-of-the-day with panoramic ocean views.',
    location: 'Coral Bay, Taniti',
    contactEmail: 'reservations@coralreefsushi.com',
    contactPhone: '+690-555-0202',
    rating: 4,
    imageURL: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351',
    cuisineType: 'Japanese-Polynesian',
    priceRange: '$$',
    operatingDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    openTime: '18:00:00',
    closeTime: '22:00:00',
    maxCapacity: 60
  },
  {
    name: 'Island Sunrise Cafe',
    description: 'Beachfront breakfast spot serving tropical fruit bowls, local coffee, and traditional Tanitian dishes.',
    location: 'Sunset Beach, Taniti',
    contactEmail: 'hello@islandsunrise.com',
    contactPhone: '+690-555-0203',
    rating: 4,
    imageURL: 'https://images.unsplash.com/photo-1694087450396-f6b1031b37d7',
    cuisineType: 'Island Breakfast',
    priceRange: '$',
    operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    openTime: '06:00:00',
    closeTime: '14:00:00',
    maxCapacity: 50
  },
  {
    name: 'Spice Market Kitchen',
    description: 'Authentic island spice-infused dishes with curry specialties and vegetarian options using local herbs.',
    location: 'Taniti City Market District, Taniti',
    contactEmail: 'info@spicemarket.com',
    contactPhone: '+690-555-0204',
    rating: 4,
    imageURL: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe',
    cuisineType: 'Traditional Tanitian',
    priceRange: '$$',
    operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    openTime: '11:30:00',
    closeTime: '22:00:00',
    maxCapacity: 70
  },
  {
    name: 'Tiki Bar & Grill',
    description: 'Lively beachside tiki bar with grilled seafood, tropical cocktails, and live island music every night.',
    location: 'Taniti City Beach, Taniti',
    contactEmail: 'aloha@tikibar.com',
    contactPhone: '+690-555-0205',
    rating: 4,
    imageURL: 'https://images.unsplash.com/photo-1736040891921-849833b78339',
    cuisineType: 'Tropical BBQ',
    priceRange: '$$',
    operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],    
    openTime: '16:00:00',
    closeTime: '01:00:00',
    maxCapacity: 120
  },
  {
    name: 'Salt & Stone',
    description: 'Elevated fine dining featuring contemporary Pacific cuisine with locally sourced ingredients.',
    location: 'Leilani Royal Resort, Merriton Landing, Taniti',
    contactEmail: 'reservations@saltandstone.com',
    contactPhone: '+690-555-0201',
    rating: 5,
    imageURL: 'https://images.unsplash.com/photo-1676664778856-b48a7d87d831',
    cuisineType: 'Contemporary Pacific',
    priceRange: '$$$',
    operatingDays: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
    openTime: '17:00:00',
    closeTime: '23:00:00',
    maxCapacity: 80
  }
]

const activities = [
  {
    name: 'Volcano Crater Hiking Tour',
    description: 'Guided hike to Mount Taniti crater with stunning vistas, geological insights, and photography opportunities.',
    location: 'Mount Taniti Summit, Taniti',
    contactEmail: 'tours@volcanotreks.com',
    contactPhone: '+690-555-0301',
    rating: 5,
    imageURL: 'https://images.unsplash.com/photo-1580807923007-4b09246b552e',
    companyName: 'Island Treks',
    durationMinutes: 360,
    pricePerPerson: 95.00,
    maxParticipants: 12,
    isRecurring: true,
    oneTimeDate: null,
    recurringDays: ['Tuesday', 'Thursday', 'Saturday'],
    recurringTime: '06:00:00',
    recurringStartDate: '2025-01-01',
    recurringEndDate: '2026-12-31'
  },
  {
    name: 'Island Helicopter Tour',
    description: 'Spectacular aerial tour of Taniti showcasing the volcano, beaches, and coral reefs from above.',
    location: 'Taniti City Airport, Taniti',
    contactEmail: 'fly@tanitihelitours.com',
    contactPhone: '+690-555-0302',
    rating: 5,
    imageURL: 'https://images.unsplash.com/photo-1698395852221-778c8b597ed7',
    companyName: 'Pacific Sky Tours',
    durationMinutes: 45,
    pricePerPerson: 189.00,
    maxParticipants: 6,
    isRecurring: true,
    oneTimeDate: null,
    recurringDays: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
    recurringTime: '09:00:00',
    recurringStartDate: '2025-01-01',
    recurringEndDate: '2026-12-31'
  },
  {
    name: 'Traditional Island Dance Show',
    description: 'Authentic Tanitian cultural performance with traditional fire dancing, music, and island feast.',
    location: 'Taniti City Cultural Center, Taniti',
    contactEmail: 'info@tanitivdance.com',
    contactPhone: '+690-555-0303',
    rating: 5,
    imageURL: 'https://images.unsplash.com/photo-1527862030717-9d8ff8a7dfbf',
    companyName: 'Taniti Cultural Society',
    durationMinutes: 180,
    pricePerPerson: 75.00,
    maxParticipants: 200,
    isRecurring: true,
    oneTimeDate: null,
    recurringDays: ['Friday', 'Saturday'],
    recurringTime: '19:00:00',
    recurringStartDate: '2025-01-01',
    recurringEndDate: '2026-12-31'
  },
  {
    name: 'Snorkeling & Coral Reef Adventure',
    description: 'Guided snorkeling tour to pristine coral reefs with tropical fish viewing and underwater photography.',
    location: 'Coral Bay Marina, Taniti',
    contactEmail: 'dive@coralreefadventures.com',
    contactPhone: '+690-555-0304',
    rating: 4,
    imageURL: 'https://images.unsplash.com/photo-1524482131769-b23c0f633d7c',
    companyName: 'Ocean Adventures',
    durationMinutes: 240,
    pricePerPerson: 65.00,
    maxParticipants: 16,
    isRecurring: true,
    oneTimeDate: null,
    recurringDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    recurringTime: '08:00:00',
    recurringStartDate: '2025-01-01',
    recurringEndDate: '2026-12-31'
  },
  {
    name: 'Taniti Cooking Class: Island Cuisine',
    description: 'Learn to prepare traditional Tanitian dishes using local ingredients with master island chef.',
    location: 'Island Spice Cooking School, Taniti',
    contactEmail: 'classes@islandspice.com',
    contactPhone: '+690-555-0305',
    rating: 4,
    imageURL: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',
    companyName: 'Island Spice Cooking School',
    durationMinutes: 180,
    pricePerPerson: 85.00,
    maxParticipants: 14,
    isRecurring: true,
    oneTimeDate: null,
    recurringDays: ['Tuesday', 'Thursday'],
    recurringTime: '15:00:00',
    recurringStartDate: '2025-01-01',
    recurringEndDate: '2026-12-31'
  },
  {
    name: 'Rainforest Canopy Zipline',
    description: 'Thrilling zipline adventure through Taniti rainforest canopy with wildlife spotting.',
    location: 'Taniti Rainforest, Taniti',
    contactEmail: 'adventure@canopyzipline.com',
    contactPhone: '+690-555-0306',
    rating: 5,
    imageURL: 'https://images.unsplash.com/photo-1712782516688-cbcbf93b1b7c',
    companyName: 'Canopy Adventures Taniti',
    durationMinutes: 150,
    pricePerPerson: 105.00,
    maxParticipants: 8,
    isRecurring: true,
    oneTimeDate: null,
    recurringDays: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
    recurringTime: '10:00:00',
    recurringStartDate: '2025-01-01',
    recurringEndDate: '2026-12-31'
  },
  {
    name: 'Sunset Sailing & Dolphin Watching',
    description: 'Sunset sail around Taniti with dolphin watching and tropical cocktails.',
    location: 'Sunset Beach Marina, Taniti',
    contactEmail: 'sail@sunsetsailing.com',
    contactPhone: '+690-555-0307',
    rating: 4,
    imageURL: 'https://images.unsplash.com/photo-1491986542380-fdf7aebad979',
    companyName: 'Ocean Adventures',
    durationMinutes: 180,
    pricePerPerson: 95.00,
    maxParticipants: 20,
    isRecurring: true,
    oneTimeDate: null,
    recurringDays: ['Thursday', 'Friday'],
    recurringTime: '17:00:00',
    recurringStartDate: '2025-01-01',
    recurringEndDate: '2026-12-31'
  },
  {
    name: 'Sunset Dinner Cruise',
    description: 'Romantic dinner cruise on Yellow Leaf Bay.',
    location: 'Yellow Leaf Bay, Taniti',
    contactEmail: 'cruise@yellowleafbay.com',
    contactPhone: '+690-555-0308',
    rating: 4,
    imageURL: 'https://images.unsplash.com/photo-1664487269780-4cefbdeb6fac',
    companyName: 'Blue Voyage',
    durationMinutes: 300,
    pricePerPerson: 65.00,
    maxParticipants: 25,
    isRecurring: true,
    oneTimeDate: null,
    recurringDays: ['Friday', 'Saturday'],
    recurringTime: '21:00:00',
    recurringStartDate: '2025-01-01',
    recurringEndDate: '2026-12-31'
  }
]

const seedDatabase = async () => {
  try {
    console.log('Seeding database..')
    console.log('Clearing existing data...')
    await RoomType.destroy({ where: {} })
    await User.destroy({ where: { role: 'traveler' } })
    await Accommodation.destroy({ where: {} })
    await Restaurant.destroy({ where: {} })
    await Activity.destroy({ where: {} })
    console.log('Hashing user passwords...')
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    )
    console.log('Creating users...')
    await User.bulkCreate(hashedUsers)
    console.log('Creating accommodations...')
    const createdAccommodations = await Accommodation.bulkCreate(accommodations, {
      returning: true
    })
    console.log('Creating room types...')
    const mappedRoomTypes = roomTypes.map(roomType => ({
      ...roomType,
      accommodationID: createdAccommodations[roomType.accommodationID - 1].id
    }))
    await RoomType.bulkCreate(mappedRoomTypes)
    console.log('Creating restaurants...')
    await Restaurant.bulkCreate(restaurants)
    console.log('Creating activities...')
    await Activity.bulkCreate(activities)
    console.log(`   - ${hashedUsers.length} users created`)
    console.log(`   - ${accommodations.length} accommodations created`)
    console.log(`   - ${roomTypes.length} room types created`)
    console.log(`   - ${restaurants.length} restaurants created`)
    console.log(`   - ${activities.length} activities created`)
  } catch (error) {
    console.log('Seeding failed:', error)
  } finally {
    process.exit(0)
  }
}

seedDatabase()