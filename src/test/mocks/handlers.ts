import { http, HttpResponse } from 'msw'
import { mockEvents } from './data'

export const handlers = [
  // Get all events
  http.get('/api/events', () => {
    return HttpResponse.json(mockEvents)
  }),

  // Get events by category
  http.get('/api/events/category/:category', ({ params }) => {
    const { category } = params
    const filteredEvents = mockEvents.filter(event => 
      event.category.toLowerCase() === (category as string).toLowerCase()
    )
    return HttpResponse.json(filteredEvents)
  }),

  // Create event
  http.post('/api/events', async ({ request }) => {
    const newEvent = await request.json() as any
    const event = {
      id: `event-${Date.now()}`,
      ...newEvent,
      date: new Date(newEvent.date),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    return HttpResponse.json(event, { status: 201 })
  }),

  // Update event
  http.put('/api/events/:id', async ({ params, request }) => {
    const { id } = params
    const updates = await request.json() as any
    const existingEvent = mockEvents.find(e => e.id === id)
    
    if (!existingEvent) {
      return new HttpResponse(null, { status: 404 })
    }

    const updatedEvent = {
      ...existingEvent,
      ...updates,
      updatedAt: new Date(),
    }
    
    return HttpResponse.json(updatedEvent)
  }),

  // Delete event
  http.delete('/api/events/:id', ({ params }) => {
    const { id } = params
    const eventExists = mockEvents.some(e => e.id === id)
    
    if (!eventExists) {
      return new HttpResponse(null, { status: 404 })
    }

    return new HttpResponse(null, { status: 204 })
  }),

  // User login
  http.post('/api/users/login', async ({ request }) => {
    const { username, password } = await request.json() as any
    
    if (username === 'testuser' && password === 'password') {
      return HttpResponse.json({
        id: 'user-1',
        username: 'testuser',
        isNewUser: false,
      })
    }
    
    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    )
  }),

  // User registration
  http.post('/api/users/register', async ({ request }) => {
    const { username, password } = await request.json() as any
    
    if (username === 'existinguser') {
      return HttpResponse.json(
        { message: 'Username already exists' },
        { status: 400 }
      )
    }
    
    return HttpResponse.json({
      id: `user-${Date.now()}`,
      username,
      isNewUser: true,
    }, { status: 201 })
  }),

  // Check username availability
  http.get('/api/users/check-username/:username', ({ params }) => {
    const { username } = params
    const available = username !== 'existinguser'
    return HttpResponse.json({ available })
  }),
]
