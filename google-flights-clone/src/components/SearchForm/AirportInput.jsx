import { useState, useEffect } from 'react'
import { FiChevronDown, FiX, FiMapPin } from 'react-icons/fi'
import { searchAirports } from '../../services/api'

export const AirportInput = ({ label, value, onChange }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchAirports = async () => {
      if (query.length > 2) {
        try {
          const results = await searchAirports(query)
          setSuggestions(results)
        } catch (error) {
          console.error('Failed to fetch airports:', error)
          setSuggestions([])
        }
      }
    }
    
    const debounceTimer = setTimeout(fetchAirports, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          className="w-full pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-google-blue focus:outline-none"
          placeholder="Search airports"
          value={value?.presentation?.title || query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        <FiMapPin className="absolute left-3 top-3 text-gray-400" />
        
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange(null)
              setQuery('')
            }}
            className="absolute right-8 top-3 text-gray-400 hover:text-gray-600"
          >
            <FiX />
          </button>
        )}
        
        <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((airport) => (
            <div
              key={airport.skyId}
              className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
              onMouseDown={() => {
                onChange(airport)
                setIsOpen(false)
              }}
            >
              <FiMapPin className="text-gray-400 mr-2" />
              <div>
                <div className="font-medium">{airport.presentation.title}</div>
                <div className="text-sm text-gray-500">
                  {airport.presentation.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}