import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import CategoryBadge from '../components/CategoryBadge'

describe('CategoryBadge', () => {
  it('renders Theatre category correctly', () => {
    render(<CategoryBadge category="Theatre" />)
    
    const badge = screen.getByTestId('badge-category-Theatre')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent('Theatre')
    expect(badge).toHaveClass('bg-purple-500/20', 'text-purple-300', 'border-purple-500/30')
  })

  it('renders Cinema category correctly', () => {
    render(<CategoryBadge category="Cinema" />)
    
    const badge = screen.getByTestId('badge-category-Cinema')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent('Cinema')
    expect(badge).toHaveClass('bg-blue-500/20', 'text-blue-300', 'border-blue-500/30')
  })

  it('renders Concerts category correctly', () => {
    render(<CategoryBadge category="Concerts" />)
    
    const badge = screen.getByTestId('badge-category-Concerts')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent('Concerts')
    expect(badge).toHaveClass('bg-pink-500/20', 'text-pink-300', 'border-pink-500/30')
  })

  it('renders Parties category correctly', () => {
    render(<CategoryBadge category="Parties" />)
    
    const badge = screen.getByTestId('badge-category-Parties')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent('Parties')
    expect(badge).toHaveClass('bg-orange-500/20', 'text-orange-300', 'border-orange-500/30')
  })

  it('renders unknown category with fallback styles', () => {
    // @ts-expect-error Testing unknown category
    render(<CategoryBadge category="Unknown" />)
    
    const badge = screen.getByTestId('badge-category-Unknown')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent('Unknown')
    expect(badge).toHaveClass('bg-gray-500/20', 'text-gray-300', 'border-gray-500/30')
  })

  it('has correct badge variant and common classes', () => {
    render(<CategoryBadge category="Theatre" />)
    
    const badge = screen.getByTestId('badge-category-Theatre')
    expect(badge).toHaveClass('gap-1')
  })

  it('contains the appropriate icon for each category', () => {
    const { rerender } = render(<CategoryBadge category="Theatre" />)
    
    // Theatre should contain Theater icon (svg)
    expect(screen.getByTestId('badge-category-Theatre').querySelector('svg')).toBeInTheDocument()
    
    // Test other categories
    rerender(<CategoryBadge category="Cinema" />)
    expect(screen.getByTestId('badge-category-Cinema').querySelector('svg')).toBeInTheDocument()
    
    rerender(<CategoryBadge category="Concerts" />)
    expect(screen.getByTestId('badge-category-Concerts').querySelector('svg')).toBeInTheDocument()
    
    rerender(<CategoryBadge category="Parties" />)
    expect(screen.getByTestId('badge-category-Parties').querySelector('svg')).toBeInTheDocument()
  })
})
