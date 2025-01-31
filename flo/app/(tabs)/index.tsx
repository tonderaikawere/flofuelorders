import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AdminHome = () => {
  const router = useRouter();
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [dieselPurchases, setDieselPurchases] = useState(0);
  const [petrolPurchases, setPetrolPurchases] = useState(0);
  const [fuelLeft, setFuelLeft] = useState(0);
  const [lowFuelClients, setLowFuelClients] = useState(0);
  const [adminEmail, setAdminEmail] = useState('');

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load admin email from storage
        const email = await AsyncStorage.getItem('adminEmail');
        if (email) setAdminEmail(email);

        // Fetch Data from API
        const response = await axios.get('http://your-api-url.com/dashboard');
        setTotalCustomers(response.data.totalCustomers);
        setDieselPurchases(response.data.dieselPurchases);
        setPetrolPurchases(response.data.petrolPurchases);
        setFuelLeft(response.data.fuelLeft);
        setLowFuelClients(response.data.lowFuelClients);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.adminEmail}>Welcome, {adminEmail || 'Admin'}</Text>

      {/* Dashboard Metrics */}
      <View style={styles.metricsContainer}>
        <Text style={styles.metricText}>Total Customers: {totalCustomers}</Text>
        <Text style={styles.metricText}>Diesel Purchases: ${dieselPurchases}</Text>
        <Text style={styles.metricText}>Petrol Purchases: ${petrolPurchases}</Text>
        <Text style={styles.metricText}>Fuel Left: ${fuelLeft}</Text>
        <Text style={styles.lowFuelText}>Low Fuel Clients: {lowFuelClients}</Text>
      </View>

      {/* Navigation Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/clients')}>
        <Text style={styles.buttonText}>Manage Clients</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/threshold')}>
        <Text style={styles.buttonText}>Manage Threshold</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/activities')}>
        <Text style={styles.buttonText}>View Activities</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/settings')}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 10,
  },
  adminEmail: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  metricsContainer: {
    width: '100%',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  metricText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  lowFuelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red', // Display low fuel clients in red
    marginBottom: 5,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#6A0DAD',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AdminHome;
