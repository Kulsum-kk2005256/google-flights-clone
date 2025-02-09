import { useState } from 'react'
import { Header } from './components/Layout/Header'
import { AirportInput } from './components/SearchForm/AirportInput'
import { DatePickerInput } from './components/SearchForm/DatePicker'
import { PassengerSelector } from './components/SearchForm/PassengerSelector'
import { FlightCard } from './components/FlightList/FlightCard'
import { FiArrowRight } from 'react-icons/fi'
import { searchFlights } from './services/api'

export default function App() {
  const [flights, setFlights] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    origin: null,
    destination: null,
    departureDate: new Date(),
    passengers: 1,
    cabinClass: 'ECONOMY'
  })

  // Update the handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.origin || !formData.destination) {
    alert('Please select both origin and destination airports');
    return;
  }

  setIsLoading(true);
  try {
    const params = {
      originSkyId: formData.origin.skyId,
      destinationSkyId: formData.destination.skyId,
      originEntityId: formData.origin.entityId,
      destinationEntityId: formData.destination.entityId,
      date: formData.departureDate.toISOString().split('T')[0],
      adults: formData.passengers,
      cabinClass: formData.cabinClass
    };

    const results = await searchFlights(params);
    console.log('API Response:', results); // Add debug logging
    setFlights(results);
  } catch (error) {
    console.error('Search failed:', error);
    alert('Failed to search flights. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-3">
              <AirportInput
                label="Leaving from"
                value={formData.origin}
                onChange={(val) => setFormData({...formData, origin: val})}
              />
            </div>
            <div className="md:col-span-3">
              <AirportInput
                label="Going to"
                value={formData.destination}
                onChange={(val) => setFormData({...formData, destination: val})}
              />
            </div>
            <div className="md:col-span-3">
              <DatePickerInput
                selected={formData.departureDate}
                onChange={(date) => setFormData({...formData, departureDate: date})}
              />
            </div>
            <div className="md:col-span-3">
              <PassengerSelector
                value={formData.passengers}
                onChange={(val) => setFormData({...formData, passengers: val})}
              />
            </div>
            <div className="md:col-span-12">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-google-blue text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FiArrowRight className="text-lg" />
                    Search flights
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-4">
          {flights.length > 0 ? (
            flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              {isLoading ? 'Searching for flights...' : 'Enter your search criteria to find flights'}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}