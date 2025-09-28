const request = require('supertest')
const app = require('../app')
const Restaurant = require('../models/restaurant')
const Booking = require('../models/booking')
const User = require('../models/user')

describe('Restaurants Controller', () => {
  let restaurant

  beforeEach(async () => {
    await Restaurant.destroy({ where: {} })
    await Booking.destroy({ where: {} })
    await User.destroy({ where: {} })

    restaurant = await Restaurant.create({ 
      name: 'Test Restaurant', 
      description: 'Test Description',
      location: 'Test Location', 
      operatingDays: ['Friday', 'Saturday'], 
      openTime: '12:00:00', 
      closeTime: '22:00:00', 
      maxCapacity: 40 
    })
  })

  describe('GET /api/restaurants/:id/availability', () => {
    test('should return available time slots for restaurant on operating days', async () => {
      const response = await request(app)
        .get(`/api/restaurants/${restaurant.id}/availability`)
        .query({ date: '2025-10-03' }) // friday
        .expect(200)
      expect(response.body.availableSlots).toBeDefined()
      expect(Array.isArray(response.body.availableSlots)).toBe(true)
      if (response.body.availableSlots.length > 0) {
        const slot = response.body.availableSlots[0]
        expect(slot.time).toBeDefined()
        expect(slot.available).toBeDefined()
        expect(typeof slot.available).toBe('number')
        expect(slot.available).toBeGreaterThanOrEqual(0)
        const restaurantsResponse = await request(app)
          .get(`/api/restaurants`)
          .query({ id: restaurant.id })
          .expect(200)
        const maxCapacity = restaurantsResponse.body.restaurants[0].maxCapacity
        expect(slot.available).toBeLessThanOrEqual(maxCapacity)
      }
    })

    test('should return slots within open and close times', async () => {
      const response = await request(app)
        .get(`/api/restaurants/${restaurant.id}/availability`)
        .query({ date: '2025-10-03' }) // friday
        .expect(200)
      const slots = response.body.availableSlots
      expect(slots.every(s => s.time >= '12:00' && s.time <= '22:00')).toBe(true)
    })

    test('should not include a fully booked slot', async () => {
      const user = await User.create({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password',
        role: 'traveler'
      })
      await Booking.create({ 
        bookingType: 'restaurant', 
        bookableID: restaurant.id, 
        userID: user.id,
        startDate: '2025-10-03', 
        endDate: '2025-10-03', 
        startTime: '14:00:00', 
        quantity: 40
      })
      const response = await request(app)
        .get(`/api/restaurants/${restaurant.id}/availability`)
        .query({ date: '2025-10-03' }) // friday
        .expect(200)
      const slots = response.body.availableSlots
      expect(slots).toContainEqual(
        expect.objectContaining({ time: '13:00' })
      )
      expect(slots).not.toContainEqual(
        expect.objectContaining({ time: '14:00' })
      )
      expect(slots).toContainEqual(
        expect.objectContaining({ time: '15:00' })
      )
    })

    test('should return empty array for past dates', async () => {
      const response = await request(app)
        .get(`/api/restaurants/${restaurant.id}/availability`)
        .query({ date: '2023-01-01' })
        .expect(200)
      expect(response.body.availableSlots).toEqual([])
    })

    test('should return empty array for non-operating days', async () => {
      const response = await request(app)
        .get(`/api/restaurants/${restaurant.id}/availability`)
        .query({ date: '2025-09-28' }) // NOT friday or saturday
        .expect(200)
      expect(response.body.availableSlots).toEqual([])
    })

    test('should return 400 when date is missing', async () => {
      await request(app)
        .get(`/api/restaurants/${restaurant.id}/availability`)
        .expect(400)
    })

    test('should return 404 for non-existent restaurant', async () => {
      await request(app)
        .get('/api/restaurants/0/availability')
        .query({ date: '2024-03-15' })
        .expect(404)
    })
  })
})