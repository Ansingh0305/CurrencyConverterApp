import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType="numeric"
      placeholder="Enter amount"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 18,
  },
});

export default InputField;
