import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../test/test-utils'
import Header from '../components/Header'

// Mock wouter
const mockLocation = vi.fn()
vi.mock('wouter', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid={`mock-link-${href}`}>
      {children}
    </a>
  ),
  useLocation: () => [mockLocation(), vi.fn()],
}))

describe('Header', () => {
  it('renders brand logo and title', () => {
    render(<Header isAuthenticated={false} />)
    
    const homeLink = screen.getByTestId('link-home')
    expect(homeLink).toBeInTheDocument()
    expect(screen.getByText('Events')).toBeInTheDocument()
    
    // Check for Calendar icon (svg element)
    const calendarIcon = homeLink.querySelector('svg')
    expect(calendarIcon).toBeInTheDocument()
  })

  it('does not show navigation when not authenticated', () => {
    render(<Header isAuthenticated={false} />)
    
    expect(screen.queryByTestId('link-events')).not.toBeInTheDocument()
    expect(screen.queryByTestId('link-create')).not.toBeInTheDocument()
    expect(screen.queryByTestId('button-logout')).not.toBeInTheDocument()
  })

  it('shows navigation when authenticated', () => {
    render(<Header isAuthenticated={true} />)
    
    expect(screen.getByTestId('link-events')).toBeInTheDocument()
    expect(screen.getByTestId('link-create')).toBeInTheDocument()
    expect(screen.getByTestId('button-logout')).toBeInTheDocument()
  })

  it('calls onLogout when logout button is clicked', () => {
    const mockOnLogout = vi.fn()
    render(<Header isAuthenticated={true} onLogout={mockOnLogout} />)
    
    const logoutButton = screen.getByTestId('button-logout')
    fireEvent.click(logoutButton)
    
    expect(mockOnLogout).toHaveBeenCalledOnce()
  })

  it('displays Create Event button with plus icon', () => {
    render(<Header isAuthenticated={true} />)
    
    const createButton = screen.getByTestId('link-create')
    expect(createButton).toHaveTextContent('Create Event')
    
    // Check for Plus icon
    const plusIcon = createButton.querySelector('svg')
    expect(plusIcon).toBeInTheDocument()
  })

  it('displays logout button with logout icon', () => {
    render(<Header isAuthenticated={true} />)
    
    const logoutButton = screen.getByTestId('button-logout')
    
    // Check for LogOut icon
    const logoutIcon = logoutButton.querySelector('svg')
    expect(logoutIcon).toBeInTheDocument()
  })

  it('highlights active navigation item based on location', () => {
    mockLocation.mockReturnValue('/events')
    
    render(<Header isAuthenticated={true} />)
    
    const eventsButton = screen.getByTestId('link-events')
    const createButton = screen.getByTestId('link-create')
    
    // Events button should have secondary variant (active)
    expect(eventsButton).toHaveClass('bg-secondary')
    
    // Create button should have ghost variant (inactive)
    expect(createButton).not.toHaveClass('bg-secondary')
  })

  it('highlights create page when on create route', () => {
    mockLocation.mockReturnValue('/create')
    
    render(<Header isAuthenticated={true} />)
    
    const eventsButton = screen.getByTestId('link-events')
    const createButton = screen.getByTestId('link-create')
    
    // Create button should have secondary variant (active)
    expect(createButton).toHaveClass('bg-secondary')
    
    // Events button should have ghost variant (inactive)
    expect(eventsButton).not.toHaveClass('bg-secondary')
  })

  it('has correct styling classes', () => {
    render(<Header isAuthenticated={false} />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass(
      'sticky',
      'top-0',
      'z-50',
      'border-b',
      'border-border',
      'bg-background/95',
      'backdrop-blur-md'
    )
  })

  it('home link has hover effect classes', () => {
    render(<Header isAuthenticated={false} />)
    
    const homeLink = screen.getByTestId('link-home')
    expect(homeLink).toHaveClass(
      'hover-elevate',
      'px-3',
      'py-2',
      'rounded-md',
      'transition-all'
    )
  })

  it('handles missing onLogout prop gracefully', () => {
    render(<Header isAuthenticated={true} />)
    
    const logoutButton = screen.getByTestId('button-logout')
    
    // Should not throw error when clicked without onLogout prop
    expect(() => fireEvent.click(logoutButton)).not.toThrow()
  })

  it('renders correct link hrefs', () => {
    render(<Header isAuthenticated={true} />)
    
    // Check that mock links receive correct href props
    expect(screen.getByTestId('mock-link-/')).toBeInTheDocument()
    expect(screen.getByTestId('mock-link-/events')).toBeInTheDocument()
    expect(screen.getByTestId('mock-link-/create')).toBeInTheDocument()
  })
})
