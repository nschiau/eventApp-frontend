import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import EventCard from '../components/EventCard'
import { Event } from '@shared/schema'

const mockEvent: Event = {
  id: 'test-event-1',
  title: 'Test Concert',
  description: 'A fantastic test concert with amazing artists',
  date: new Date('2024-12-25T20:00:00'),
  location: 'Test Venue, Test City',
  category: 'concerts',
  imageUrl: '/test-image.jpg',
  createdById: 'user-1',
  createdAt: new Date('2024-01-01'),
}

const mockEventNoImage: Event = {
  ...mockEvent,
  id: 'test-event-2',
  title: 'Theatre Show',
  imageUrl: null,
  category: 'theatre',
}

describe('EventCard', () => {
  it('renders event information correctly', () => {
    render(<EventCard event={mockEventNoImage} />)
    
    expect(screen.getByTestId('text-title-test-event-1')).toHaveTextContent('Test Concert')
    expect(screen.getByTestId('text-description-test-event-1')).toHaveTextContent('A fantastic test concert with amazing artists')
    expect(screen.getByTestId('text-location-test-event-1')).toHaveTextContent('Test Venue, Test City')
    expect(screen.getByTestId('text-date-test-event-1')).toHaveTextContent('December 25th, 2024 at 8:00 PM')
  })

  it('displays event image when imageUrl is provided', () => {
    render(<EventCard event={mockEvent} />)
    
    const image = screen.getByTestId('img-event-test-event-1')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
    expect(image).toHaveAttribute('alt', 'Test Concert')
  })

  it('does not display image when imageUrl is null', () => {
    render(<EventCard event={mockEventNoImage} />)
    
    expect(screen.queryByTestId('img-event-test-event-2')).not.toBeInTheDocument()
  })

  it('has correct card data-testid', () => {
    render(<EventCard event={mockEvent} />)
    
    expect(screen.getByTestId('card-event-test-event-1')).toBeInTheDocument()
  })

  it('displays category badge', () => {
    render(<EventCard event={mockEvent} />)
    
    // CategoryBadge should render the category
    expect(screen.getByText('concerts')).toBeInTheDocument()
  })

  it('applies hover effect classes', () => {
    render(<EventCard event={mockEvent} />)
    
    const card = screen.getByTestId('card-event-test-event-1')
    expect(card).toHaveClass('hover-elevate', 'transition-all', 'duration-200', 'group')
  })

  it('formats date correctly for different times', () => {
    const morningEvent: Event = {
      ...mockEvent,
      id: 'morning-event',
      date: new Date('2024-06-15T09:30:00'),
    }
    
    render(<EventCard event={morningEvent} />)
    
    expect(screen.getByTestId('text-date-morning-event')).toHaveTextContent('June 15th, 2024 at 9:30 AM')
  })

  it('handles long titles with line clamp', () => {
    const longTitleEvent: Event = {
      ...mockEvent,
      id: 'long-title-event',
      title: 'This is a very long event title that should be clamped to two lines and show ellipsis when it exceeds the available space',
    }
    
    render(<EventCard event={longTitleEvent} />)
    
    const titleElement = screen.getByTestId('text-title-long-title-event')
    expect(titleElement).toHaveClass('line-clamp-2')
    expect(titleElement).toHaveTextContent(longTitleEvent.title)
  })

  it('handles long descriptions with line clamp', () => {
    const longDescEvent: Event = {
      ...mockEvent,
      id: 'long-desc-event',
      description: 'This is a very long event description that should be clamped to two lines and show ellipsis when it exceeds the available space in the card layout',
    }
    
    render(<EventCard event={longDescEvent} />)
    
    const descElement = screen.getByTestId('text-description-long-desc-event')
    expect(descElement).toHaveClass('line-clamp-2')
    expect(descElement).toHaveTextContent(longDescEvent.description)
  })
})
