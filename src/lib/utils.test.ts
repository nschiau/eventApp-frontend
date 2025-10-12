import { describe, it, expect } from 'vitest'
import { cn } from '../lib/utils'

describe('Utils', () => {
  describe('cn function', () => {
    it('combines multiple class names', () => {
      const result = cn('class1', 'class2', 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('handles conditional classes', () => {
      const isActive = true
      const isDisabled = false
      
      const result = cn(
        'base-class',
        isActive && 'active-class',
        isDisabled && 'disabled-class'
      )
      
      expect(result).toBe('base-class active-class')
    })

    it('merges conflicting Tailwind classes', () => {
      const result = cn('px-4 px-6')
      expect(result).toBe('px-6') // Later class should win
    })

    it('handles arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('handles objects with conditional classes', () => {
      const result = cn('base', {
        'active': true,
        'disabled': false,
        'highlighted': true
      })
      
      expect(result).toBe('base active highlighted')
    })

    it('handles undefined and null values', () => {
      const result = cn('base', null, undefined, 'final')
      expect(result).toBe('base final')
    })

    it('handles empty strings', () => {
      const result = cn('base', '', 'final')
      expect(result).toBe('base final')
    })

    it('merges complex Tailwind class conflicts', () => {
      const result = cn(
        'bg-red-500 text-white',
        'bg-blue-500', // Should override bg-red-500
        'text-black'   // Should override text-white
      )
      
      expect(result).toBe('bg-blue-500 text-black')
    })

    it('handles spacing class conflicts', () => {
      const result = cn('p-4 px-6 py-8')
      expect(result).toBe('p-4 px-6 py-8') // More specific classes win
    })

    it('works with complex class combinations', () => {
      const variant: 'primary' | 'secondary' = 'primary'
      const size: 'lg' | 'sm' = 'lg'
      const disabled = false
      
      const result = cn(
        'btn',
        {
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
          'btn-lg': size === 'lg',
          'btn-sm': size === 'sm',
          'btn-disabled': disabled
        },
        'transition-all duration-200'
      )
      
      expect(result).toBe('btn btn-primary btn-lg transition-all duration-200')
    })

    it('handles empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('properly merges responsive classes', () => {
      const result = cn(
        'w-full md:w-1/2',
        'w-1/3 lg:w-1/4'
      )
      
      expect(result).toBe('md:w-1/2 w-1/3 lg:w-1/4')
    })

    it('merges hover and focus states correctly', () => {
      const result = cn(
        'hover:bg-blue-500 focus:bg-blue-600',
        'hover:bg-green-500'
      )
      
      expect(result).toBe('focus:bg-blue-600 hover:bg-green-500')
    })
  })
})
