import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const transactions = [
  { id: 'TRX-001', fuel: '$15', date: '2025-01-25', time: '10:00 AM' },
  { id: 'TRX-002', fuel: '$10', date: '2025-01-24', time: '02:30 PM' },
  { id: 'TRX-003', fuel: '$5', date: '2025-01-23', time: '08:45 AM' },
  { id: 'TRX-004', fuel: '$10', date: '2025-01-22', time: '12:05 AM' },
  { id: 'TRX-005', fuel: '$5', date: '2025-01-21', time: '09:45 AM' },
];

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <Text style={styles.header}>Transactions</Text>
      <ScrollView contentContainerStyle={styles.transactionsContainer}>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <Text style={styles.transactionText}>Transaction: {transaction.id}</Text>
            <Text style={styles.transactionText}>Amount: {transaction.fuel}</Text>
            <Text style={styles.transactionDetail}>
              Date: {transaction.date} - {transaction.time}
            </Text>
          </View>
        ))}
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
  transactionsContainer: { paddingHorizontal: 20, paddingTop: 20 },
  transactionCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#9500ff',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
    elevation: 8,
  },
  transactionText: { fontSize: 16, color: '#333', marginBottom: 10 },
  transactionDetail: { fontSize: 14, color: '#D1C4E9' },
});

export default ExploreScreen;
