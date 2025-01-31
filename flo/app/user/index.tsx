import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const receipts = [
    { id: 'INV-001', fuel: '20L', date: '2025-01-25', time: '10:00 AM' },
    { id: 'INV-002', fuel: '15L', date: '2025-01-24', time: '02:30 PM' },
    { id: 'INV-003', fuel: '10L', date: '2025-01-23', time: '08:45 AM' },
  ];

  // Filter receipts by invoice number
  const filteredReceipts = receipts.filter((receipt) =>
    receipt.id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      <Text style={styles.header}>Welcome Back!</Text>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Total Fuel Purchased: 100L</Text>
        <Text style={styles.statText}>Fuel Used: 70L</Text>
        <Text style={styles.statText}>Fuel Left: 30L</Text>
      </View>

      {/* Search Section */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Receipts by Invoice Number"
        placeholderTextColor="#aaa"
        onChangeText={(text) => setSearchText(text)}
      />

      {/* Receipts Section */}
      <ScrollView contentContainerStyle={styles.receiptsContainer}>
        {filteredReceipts.map((receipt) => (
          <View key={receipt.id} style={styles.receiptCard}>
            <View>
              <Text style={styles.receiptText}>Invoice: {receipt.id}</Text>
              <Text style={styles.receiptText}>Fuel: {receipt.fuel}</Text>
              <Text style={styles.receiptText}>
                Date: {receipt.date} - {receipt.time}
              </Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="file-download" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
        {filteredReceipts.length === 0 && (
          <Text style={styles.noResultText}>No Receipts Found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', position: 'relative' },
  circle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    backgroundColor: '#7E57C2',
    borderRadius: 150,
    top: -100,
    left: -50,
    opacity: 0.4,
  },
  circle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: '#9575CD',
    borderRadius: 100,
    bottom: -80,
    right: -50,
    opacity: 0.4,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 60,
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: '#7E57C2',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: '#9500ff',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
    elevation: 8,
  },
  statText: { fontSize: 16, color: '#FFF', marginVertical: 5 },
  searchInput: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 5,
  },
  receiptsContainer: { paddingHorizontal: 20, paddingTop: 20 },
  receiptCard: {
    backgroundColor: '#FFF', // Changed to white
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#9500ff',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  receiptText: { fontSize: 16, color: '#333' }, // Changed text color to black
  noResultText: { textAlign: 'center', fontSize: 16, color: '#555' },
});

export default HomeScreen;
