import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const BASE_URL = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
  }
});

export const searchAirports = async (query) => {
  try {
    const { data } = await api.get('/searchAirport', { params: { query } });
    return data.data || [];
  } catch (error) {
    console.error('Airport search error:', error);
    return [];
  }
};

// Update the searchFlights function to match API requirements
export const searchFlights = async (params) => {
  try {
    const response = await api.get('/searchFlights', { 
      params: {
        originSkyId: params.originSkyId,
        destinationSkyId: params.destinationSkyId,
        originEntityId: params.originEntityId,
        destinationEntityId: params.destinationEntityId,
        date: params.date,
        adults: params.adults || 1,
        cabinClass: params.cabinClass || 'ECONOMY',
        currency: 'USD',
        market: 'US',
        countryCode: 'US'
      }
    });
    return response.data.data?.itineraries || [];
  } catch (error) {
    console.error('Flight search error:', error);
    return [];
  }
};