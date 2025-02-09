import { FiClock, FiArrowRight } from 'react-icons/fi';

export const FlightCard = ({ flight }) => {
  if (!flight || !flight.legs?.[0]) return null;

  const mainLeg = flight.legs[0];
  const airline = mainLeg.carriers?.marketing?.[0];
  const stops = mainLeg.stopCount;
  const durationHours = Math.floor(mainLeg.durationInMinutes / 60);
  const durationMinutes = mainLeg.durationInMinutes % 60;

  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '--:--';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow mb-4 border border-gray-100">
      {/* Top Section */}
      <div className="flex justify-between items-start mb-6">
        {/* Airline Info */}
        <div className="flex items-center">
          {airline?.logoUrl && (
            <img 
              src={airline.logoUrl} 
              alt={airline.name}
              className="h-10 w-10 mr-3 object-contain border rounded-full p-1.5"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{airline?.name}</h3>
            <p className="text-sm text-gray-500">
              Flight {mainLeg.segments[0]?.flightNumber}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          <div className="text-2xl font-bold text-google-blue">
            {flight.price?.formatted}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {stops === 0 ? 'Non-stop' : `${stops} stop${stops > 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Flight Details */}
      <div className="grid grid-cols-9 items-center gap-4">
        {/* Departure */}
        <div className="col-span-3">
          <div className="text-xl font-medium text-gray-900">
            {formatTime(mainLeg.departure)}
          </div>
          <div className="text-sm text-gray-600">
            {mainLeg.origin?.displayCode} • {mainLeg.origin?.city}
          </div>
        </div>

        {/* Duration */}
        <div className="col-span-3 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <FiClock className="text-lg" />
            <span>{durationHours}h {durationMinutes}m</span>
          </div>
          <div className="mt-1 h-px bg-gray-200 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-white px-2 text-sm text-gray-500">
              <FiArrowRight className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Arrival */}
        <div className="col-span-3">
          <div className="text-xl font-medium text-gray-900">
            {formatTime(mainLeg.arrival)}
          </div>
          <div className="text-sm text-gray-600">
            {mainLeg.destination?.displayCode} • {mainLeg.destination?.city}
          </div>
        </div>
      </div>

      {/* Date */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">
          {new Date(mainLeg.departure).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>
    </div>
  );
};