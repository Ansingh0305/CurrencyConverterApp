import axios from 'axios';

// Replace with your actual API key
const API_KEY = '41c01bd8fd1b4e7e72bd2f6d';  // API key from ExchangeRate-API
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

// Function to fetch the exchange rate
export const fetchExchangeRate = async (baseCurrency, targetCurrency) => {
  try {
    // Make the API request using axios
    const response = await axios.get(`${BASE_URL}/${baseCurrency}`);
    
    // Extract the conversion rates from the API response
    const rates = response.data.conversion_rates;

    // Return the exchange rate for the target currency
    return rates[targetCurrency];
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error fetching exchange rates", error);
    throw error;
  }
};
