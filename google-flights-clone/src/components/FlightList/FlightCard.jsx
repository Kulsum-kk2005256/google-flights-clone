export const FlightCard = ({ flight }) => {
  // Add null checks and proper formatting
  if (!flight) return null;

  const formatTime = (dateString) => {
    if (!dateString) return '--:--';
    try {
      return new Date(dateString).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return '--:--';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Airline Info */}
        <div className="col-span-2">
          <div className="font-medium">
            {flight.airline?.name || 'Unknown Airline'}
          </div>
          <div className="text-sm text-gray-500">
            {flight.flightNumber || 'N/A'}
          </div>
        </div>

        {/* Departure Info */}
        <div className="col-span-3">
          <div className="font-medium">
            {formatTime(flight.departure?.time)}
          </div>
          <div className="text-sm text-gray-500">
            {flight.origin?.code || 'N/A'}
          </div>
        </div>

        {/* Duration */}
        <div className="col-span-1 text-center">
          <div className="flex items-center justify-center text-gray-500">
            <FiClock className="mr-1" />
            {flight.duration || 'N/A'}
          </div>
        </div>

        {/* Arrival Info */}
        <div className="col-span-3">
          <div className="font-medium">
            {formatTime(flight.arrival?.time)}
          </div>
          <div className="text-sm text-gray-500">
            {flight.destination?.code || 'N/A'}
          </div>
        </div>

        {/* Price */}
        <div className="col-span-3 text-right">
          <div className="text-2xl font-bold text-google-blue">
            ${flight.price?.total || 'N/A'}
          </div>
          <div className="text-sm text-gray-500">
            {flight.price?.currency || 'USD'}
          </div>
        </div>
      </div>
    </div>
  );
};