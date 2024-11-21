import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchExchangeRate } from './services/apiService'; 
import CurrencyPicker from './components/CurrencyPicker'; 

const App = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);
  const [lastUsed, setLastUsed] = useState('');

  const currencies = [
    'USD', 'EUR', 'INR', 'GBP', 'AUD', 'CAD', 'JPY', 'CHF', 'CNY', 'SEK',
    'NZD', 'MXN', 'SGD', 'HKD', 'NOK', 'KRW', 'TRY', 'RUB', 'ZAR', 'BRL',
    'MYR', 'THB', 'IDR', 'PHP', 'PLN', 'CZK', 'ILS', 'SAR', 'EGP', 'HUF',
    'CLP', 'COP', 'KES', 'LKR', 'BHD', 'KWD', 'OMR', 'QAR', 'MAD', 'LKR',
    'PEN', 'DKK', 'VND', 'BGN', 'RON', 'HRK', 'TWD', 'TRY', 'AED', 'CUP',
    'VEB', 'KZT', 'JOD', 'AMD', 'MDL', 'MMK', 'UZS', 'GHS', 'AFN', 'TMT'
  ];

  // Save data to AsyncStorage
  const saveData = async () => {
    try {
      await AsyncStorage.setItem('baseCurrency', baseCurrency);
      await AsyncStorage.setItem('targetCurrency', targetCurrency);
      await AsyncStorage.setItem('amount', amount);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  // Load data from AsyncStorage
  const loadData = async () => {
    try {
      const savedBaseCurrency = await AsyncStorage.getItem('baseCurrency');
      const savedTargetCurrency = await AsyncStorage.getItem('targetCurrency');
      const savedAmount = await AsyncStorage.getItem('amount');

      if (savedBaseCurrency && savedTargetCurrency) {
        setBaseCurrency(savedBaseCurrency);
        setTargetCurrency(savedTargetCurrency);
        setLastUsed(`Last used: ${savedBaseCurrency} → ${savedTargetCurrency}`);
      } else {
        setLastUsed('');
      }

      if (savedAmount) setAmount(savedAmount);
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadData(); // Load saved data when the app starts
  }, []);

  const handleConvert = async () => {
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid number');
      return;
    }

    setError(null); // Reset error state
    try {
      const rate = await fetchExchangeRate(baseCurrency, targetCurrency);
      if (!rate) {
        setError('Unable to get the exchange rate.');
        return;
      }

      const converted = parseFloat(amount) * rate;
      setConvertedAmount(converted.toFixed(2)); // Show converted result

      // Update the "Last used" message when conversion is done
      setLastUsed(`Last used: ${baseCurrency} → ${targetCurrency}`);

      // Save data to AsyncStorage when conversion happens
      saveData();

    } catch (err) {
      console.error('Error fetching exchange rates', err);
      setError('Failed to fetch exchange rates. Please try again later.');
    }
  };

  useEffect(() => {
    setConvertedAmount(null);  // Reset result on currency change
  }, [baseCurrency, targetCurrency]);

  useEffect(() => {
    setConvertedAmount(null);  // Reset result on amount change
  }, [amount]);

  const handleSwap = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.heading}>Currency Converter</Text>

          {/* Show Last Used Currencies only if valid data is available */}
          {lastUsed ? <Text style={styles.lastUsed}>{lastUsed}</Text> : null}

          {/* Amount Input */}
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={(text) => setAmount(text)}
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor="#aaa"
          />

          {/* Base Currency Picker */}
          <Text style={styles.label}>From Currency</Text>
          <CurrencyPicker
            selectedCurrency={baseCurrency}
            onCurrencyChange={setBaseCurrency}
            currencies={currencies}
          />

          {/* Target Currency Picker */}
          <Text style={styles.label}>To Currency</Text>
          <CurrencyPicker
            selectedCurrency={targetCurrency}
            onCurrencyChange={setTargetCurrency}
            currencies={currencies}
          />

          {/* Swap Button */}
          <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
            <Text style={styles.swapButtonText}>Swap</Text>
          </TouchableOpacity>

          {/* Convert Button */}
          <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
            <Text style={styles.convertButtonText}>Convert</Text>
          </TouchableOpacity>

          {/* Display Converted Amount */}
          {convertedAmount && (
            <Text style={styles.result}>
              {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
            </Text>
          )}

          {/* Display Error Message */}
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingTop: 75,
  },
  scrollContainer: {
    flexGrow: 0,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  innerContainer: {
    backgroundColor: '#333333',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 450,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
   
  
  },
  heading: {
    fontSize: 35,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontFamily: 'Courier New',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  lastUsed: {
    fontSize: 14,
    color: '#AAAAAA',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  input: {
    height: 50,
    backgroundColor: '#444444',
    borderColor: '#555555',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  convertButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  convertButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  swapButton: {
    backgroundColor: '#666666',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  swapButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  result: {
    fontSize: 22,
    fontWeight: '700',
    color: '#16A085',
    textAlign: 'center',
    marginTop: 30,
  },
  error: {
    fontSize: 16,
    color: '#E74C3C',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;
