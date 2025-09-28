const request = require('supertest')
const app = require('../app')
const Activity = require('../models/activity')
const Booking = require('../models/booking')
const User = require('../models/user')

describe('Activities Controller', () => {
  let user

  beforeEach(async () => {
    await Activity.destroy({ where: {} })
    await User.destroy({ where: {} })
    await Booking.destroy({ where: {} })
    
    user = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password',
      role: 'traveler'
    })
  })

  describe('GET /api/activities/:id/availability', () => {
    test('should return 400 when date parameter is missing', async () => {
      const activity = await Activity.create({
        name: 'Test Activity',
        description: 'Test Description',
        location: 'Test Location',
        maxParticipants: 10,
        isRecurring: false,
        oneTimeDate: new Date('2025-10-15')
      })
      await request(app)
        .get(`/api/activities/${activity.id}/availability`)
        .expect(400)
    })

    test('should return 404 for non-existent activity', async () => {
      await request(app)
        .get('/api/activities/0/availability')
        .query({ date: '2025-10-15' })
        .expect(404)
    })

    describe('One-time Activities', () => {
      let oneTimeActivity

      beforeEach(async () => {
        oneTimeActivity = await Activity.create({
          name: 'One-time Hiking Tour',
          description: 'Single day hiking experience',
          location: 'Mountain Trail',
          maxParticipants: 15,
          pricePerPerson: 75.00,
          durationMinutes: 240,
          isRecurring: false,
          oneTimeDate: new Date('2025-10-15T09:00:00')
        })
      })

      test('should return available slots on the correct date', async () => {
        const response = await request(app)
          .get(`/api/activities/${oneTimeActivity.id}/availability`)
          .query({ date: '2025-10-15' })
          .expect(200)

        expect(response.body.availableSlots).toBeDefined()
        expect(Array.isArray(response.body.availableSlots)).toBe(true)
        expect(response.body.availableSlots).toHaveLength(1)
      
        const slot = response.body.availableSlots[0]
        expect(slot.time).toBe('09:00')
        expect(slot.available).toBe(15)
      })

      test('should return empty array for wrong date', async () => {
        const response = await request(app)
          .get(`/api/activities/${oneTimeActivity.id}/availability`)
          .query({ date: '2025-10-16' })
          .expect(200)

        expect(response.body.availableSlots).toEqual([])
      })

      test('should reduce availability when bookings exist', async () => {
        await Booking.create({
          bookingType: 'activity',
          bookableID: oneTimeActivity.id,
          userID: user.id,
          startDate: '2025-10-15',
          endDate: '2025-10-15',
          quantity: 5,
          status: 'confirmed'
        })
        const response = await request(app)
          .get(`/api/activities/${oneTimeActivity.id}/availability`)
          .query({ date: '2025-10-15' })
          .expect(200)
        const slot = response.body.availableSlots[0]
        expect(slot.available).toBe(10)
      })

      test('should return empty array when fully booked', async () => {
        await Booking.create({
          bookingType: 'activity',
          bookableID: oneTimeActivity.id,
          userID: user.id,
          startDate: '2025-10-15',
          endDate: '2025-10-15',
          quantity: 15,
          status: 'confirmed'
        })
        const response = await request(app)
          .get(`/api/activities/${oneTimeActivity.id}/availability`)
          .query({ date: '2025-10-15' })
          .expect(200)
        expect(response.body.availableSlots).toEqual([])
      })

      test('should return empty array for past dates', async () => {
        const response = await request(app)
          .get(`/api/activities/${oneTimeActivity.id}/availability`)
          .query({ date: '2023-01-01' })
          .expect(200)
        expect(response.body.availableSlots).toEqual([])
      })
    })

    describe('Recurring Activities', () => {
      let recurringActivity

      beforeEach(async () => {
        recurringActivity = await Activity.create({
          name: 'Weekly Yoga Class',
          description: 'Regular yoga sessions',
          location: 'Beach Studio',
          maxParticipants: 20,
          pricePerPerson: 25.00,
          durationMinutes: 90,
          isRecurring: true,
          recurringDays: ['Monday', 'Wednesday', 'Friday'],
          recurringTime: '18:00',
          recurringStartDate: '2025-10-01',
          recurringEndDate: '2025-12-31'
        })
      })

      test('should return available slots on correct recurring days', async () => {
        const response = await request(app)
          .get(`/api/activities/${recurringActivity.id}/availability`)
          .query({ date: '2025-10-15' })
          .expect(200)
        expect(response.body.availableSlots).toBeDefined()
        expect(Array.isArray(response.body.availableSlots)).toBe(true)
        expect(response.body.availableSlots).toHaveLength(1)
        const slot = response.body.availableSlots[0]
        expect(slot.time).toBe('18:00')
        expect(slot.available).toBe(20)
      })

      test('should return empty array on non-recurring days', async () => {
        const response = await request(app)
          .get(`/api/activities/${recurringActivity.id}/availability`)
          .query({ date: '2025-10-14' })
          .expect(200)
        expect(response.body.availableSlots).toEqual([])
      })

      test('should return empty array before start date', async () => {
        const response = await request(app)
          .get(`/api/activities/${recurringActivity.id}/availability`)
          .query({ date: '2025-09-29' })
          .expect(200)
        expect(response.body.availableSlots).toEqual([])
      })

      test('should return empty array after end date', async () => {
        const response = await request(app)
          .get(`/api/activities/${recurringActivity.id}/availability`)
          .query({ date: '2026-01-01' })
          .expect(200)
        expect(response.body.availableSlots).toEqual([])
      })
    })
  })
})