import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

const SERVER_URL = "http://192.168.1.100:5000"; // Replace with your actual backend IP

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Default users for testing
  const defaultUsers = [
    {
      email: 'admin@fuel.com',
      password: 'admin123',
      role: 'admin',
    },
    {
      email: 'client@fuel.com',
      password: 'client123',
      role: 'client',
    },
    {
      email: 'threshold@fuel.com',
      password: 'threshold123',
      role: 'threshold',
    },
  ];

  const handleLogin = async () => {
    console.log("Login Button Pressed!"); // Add this to see if the function is called
  
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
  
    const user = defaultUsers.find(
      (u) => u.email === email.trim() && u.password === password
    );
  
    if (user) {
      Alert.alert(`Welcome, ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}!`);
      if (user.role === 'admin') {
        router.push('/(tabs)');
      } else if (user.role === 'client') {
        router.push('/user');
      } else if (user.role === 'threshold') {
        router.push('/threshold');
      }
    } else {
      try {
        const response = await axios.post(`${SERVER_URL}/signin`, {
          email: email.trim(),
          password,
        });
  
        console.log(response.data); // Log the response to see if it's coming through
        const user = response.data;
  
        if (!user) {
          Alert.alert('Login Failed', 'Incorrect email or password.');
          return;
        }
  
        if (user.role === 'admin') {
          Alert.alert('Welcome, Admin!');
          router.push('/(tabs)');
        } else if (user.role === 'client') {
          Alert.alert('Welcome, Client!');
          router.push('/user');
        } else if (user.role === 'threshold') {
          Alert.alert('Welcome, Threshold User!');
          router.push('/threshold');
        }
      } catch (error) {
        console.error('Login Error:', error);
        Alert.alert('Error', 'An error occurred while logging in.');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#6A0DAD',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SignInScreen;
