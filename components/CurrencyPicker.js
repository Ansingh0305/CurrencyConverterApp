import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const currencyDetails = {
    'USD': { flag: '🇺🇸', name: 'US Dollar' },
    'EUR': { flag: '🇪🇺', name: 'Euro' },
    'INR': { flag: '🇮🇳', name: 'Indian Rupee' },
    'GBP': { flag: '🇬🇧', name: 'British Pound' },
    'AUD': { flag: '🇦🇺', name: 'Australian Dollar' },
    'CAD': { flag: '🇨🇦', name: 'Canadian Dollar' },
    'JPY': { flag: '🇯🇵', name: 'Japanese Yen' },
    'CHF': { flag: '🇨🇭', name: 'Swiss Franc' },
    'CNY': { flag: '🇨🇳', name: 'Chinese Yuan' },
    'SEK': { flag: '🇸🇪', name: 'Swedish Krona' },
    'NZD': { flag: '🇳🇿', name: 'New Zealand Dollar' },
    'MXN': { flag: '🇲🇽', name: 'Mexican Peso' },
    'SGD': { flag: '🇸🇬', name: 'Singapore Dollar' },
    'HKD': { flag: '🇭🇰', name: 'Hong Kong Dollar' },
    'NOK': { flag: '🇳🇴', name: 'Norwegian Krone' },
    'KRW': { flag: '🇰🇷', name: 'South Korean Won' },
    'TRY': { flag: '🇹🇷', name: 'Turkish Lira' },
    'RUB': { flag: '🇷🇺', name: 'Russian Ruble' },
    'ZAR': { flag: '🇿🇦', name: 'South African Rand' },
    'BRL': { flag: '🇧🇷', name: 'Brazilian Real' },
    'MYR': { flag: '🇲🇾', name: 'Malaysian Ringgit' },
    'THB': { flag: '🇹🇭', name: 'Thai Baht' },
    'IDR': { flag: '🇮🇩', name: 'Indonesian Rupiah' },
    'PHP': { flag: '🇵🇭', name: 'Philippine Peso' },
    'PLN': { flag: '🇵🇱', name: 'Polish Złoty' },
    'CZK': { flag: '🇨🇿', name: 'Czech Koruna' },
    'ILS': { flag: '🇮🇱', name: 'Israeli Shekel' },
    'SAR': { flag: '🇸🇦', name: 'Saudi Riyal' },
    'EGP': { flag: '🇪🇬', name: 'Egyptian Pound' },
    'HUF': { flag: '🇭🇺', name: 'Hungarian Forint' },
    'CLP': { flag: '🇨🇱', name: 'Chilean Peso' },
    'COP': { flag: '🇨🇴', name: 'Colombian Peso' },
    'KES': { flag: '🇰🇪', name: 'Kenyan Shilling' },
    'LKR': { flag: '🇱🇰', name: 'Sri Lankan Rupee' },
    'BHD': { flag: '🇧🇭', name: 'Bahraini Dinar' },
    'KWD': { flag: '🇰🇼', name: 'Kuwaiti Dinar' },
    'OMR': { flag: '🇴🇲', name: 'Omani Rial' },
    'QAR': { flag: '🇶🇦', name: 'Qatari Riyal' },
    'MAD': { flag: '🇲🇦', name: 'Moroccan Dirham' },
    'PEN': { flag: '🇵🇪', name: 'Peruvian Sol' },
    'DKK': { flag: '🇩🇰', name: 'Danish Krone' },
    'VND': { flag: '🇻🇳', name: 'Vietnamese Dong' },
    'BGN': { flag: '🇧🇬', name: 'Bulgarian Lev' },
    'RON': { flag: '🇷🇴', name: 'Romanian Leu' },
    'HRK': { flag: '🇭🇷', name: 'Croatian Kuna' },
    'TWD': { flag: '🇹🇼', name: 'Taiwan Dollar' },
    'AED': { flag: '🇦🇪', name: 'UAE Dirham' },
    'CUP': { flag: '🇨🇺', name: 'Cuban Peso' },
    'VEB': { flag: '🇻🇪', name: 'Venezuelan Bolívar' },
    'KZT': { flag: '🇰🇿', name: 'Kazakhstani Tenge' },
    'JOD': { flag: '🇯🇴', name: 'Jordanian Dinar' },
    'AMD': { flag: '🇦🇲', name: 'Armenian Dram' },
    'MDL': { flag: '🇲🇩', name: 'Moldovan Leu' },
    'MMK': { flag: '🇲🇲', name: 'Myanmar Kyat' },
    'UZS': { flag: '🇺🇿', name: 'Uzbekistani Som' },
    'GHS': { flag: '🇬🇭', name: 'Ghanaian Cedi' },
    'AFN': { flag: '🇦🇫', name: 'Afghan Afghani' },
    'TMT': { flag: '🇹🇲', name: 'Turkmenistan Manat' }
  };
const CurrencyPicker = ({ selectedCurrency, onCurrencyChange, currencies }) => {
    return (
        <View style={styles.pickerContainer}>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={selectedCurrency}
                    onValueChange={onCurrencyChange}
                    style={styles.picker}
                    dropdownIconColor="white"
                >
                    {currencies.map((currency, index) => (
                        <Picker.Item
                            key={index}
                            label={`${currencyDetails[currency]?.flag} ${currencyDetails[currency]?.name} (${currency}) `}
                            value={currency}
                            style={styles.pickerItem}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        width: 350, // Reduced width
        marginBottom: 20,
        alignSelf: 'flex-start', // Align to right
        marginRight: 10, // Add some right margin
    },
    pickerWrapper: {
        backgroundColor: '#1A1A1A',
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: 'orange',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50, // Reduced height
    },
    picker: {
        flex: 1,
        color: '#FFFFFF',
        height: 50, // Reduced height
        backgroundColor: 'transparent',
        minWidth: 150, // Minimum width
    },
    pickerItem: {
        fontSize: 14, // Reduced font size
        color: '#FFFFFF',
        backgroundColor: '#333333',
    }
});

export default CurrencyPicker;

// ${currencyDetails[currency]?.name}