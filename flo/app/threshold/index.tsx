import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Custom icons as React components
const LowFuelIcon = () => (
  <View style={styles.icon}>
    <Text style={styles.iconText}>⚠️</Text> {/* Warning icon for low fuel */}
  </View>
);

const FullFuelIcon = () => (
  <View style={styles.icon}>
    <Text style={styles.iconText}>✔️</Text> {/* Check mark for full fuel */}
  </View>
);

const EmptyFuelIcon = () => (
  <View style={styles.icon}>
    <Text style={styles.iconText}>❌</Text> {/* Cross mark for empty fuel */}
  </View>
);

// Dummy data for customer list and notifications
const customers = [
  { id: '1', name: 'John Doe', fuelStatus: 'Low', fuelAmount: 30, lastRefill: '2025-01-15', nextRefill: '2025-02-15', notes: 'Needs refill soon' },
  { id: '2', name: 'Jane Smith', fuelStatus: 'Full', fuelAmount: 100, lastRefill: '2025-01-10', nextRefill: '2025-02-10', notes: 'No issues' },
  { id: '3', name: 'Samuel Jackson', fuelStatus: 'Empty', fuelAmount: 0, lastRefill: '2025-01-20', nextRefill: '2025-01-25', notes: 'Urgent refill needed' },
];

const notifications = [
  { id: '1', message: 'Reminder: Client John Doe needs a refill.' },
  { id: '2', message: 'New task assigned: Check on fuel levels.' },
  { id: '3', message: 'Emergency: Fuel delivery for Samuel Jackson is urgent.' },
];

// Receivables list data
const receivables = [
  { id: 'AACSHBEL', name: 'Cash USD Sales Belmont', country: 'Zimbabwe', phone: '', fax: '', email: '' },
  { id: 'AACSHBS', name: 'Cash USD Sales Burnside', country: 'Zimbabwe', phone: '', fax: '', email: '' },
  // Add the rest of your receivables data here
];

const ThresholdHome: React.FC = () => {
  const [thresholdName] = useState('Threshold 1');
  const [latestNotifications] = useState(notifications);
  const [customerList] = useState(customers);
  const [receivablesList] = useState(receivables);

  const getCustomerStyle = (fuelStatus: string) => {
    switch (fuelStatus) {
      case 'Low':
        return styles.lowFuel;
      case 'Full':
        return styles.fullFuel;
      case 'Empty':
        return styles.emptyFuel;
      default:
        return styles.defaultFuel;
    }
  };

  const renderNotification = ({ item }: { item: { id: string, message: string } }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionText}>Mark as Read</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCustomerItem = ({ item }: { item: typeof customers[0] }) => (
    <View style={[styles.customerItem, getCustomerStyle(item.fuelStatus)]}>
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{item.name}</Text>
        <Text style={styles.customerStatus}>{item.fuelStatus} Fuel</Text>
        <Text style={styles.fuelAmount}>${item.fuelAmount.toFixed(2)}</Text>
        <Text style={styles.lastRefill}>Last Refill: {item.lastRefill}</Text>
        <Text style={styles.nextRefill}>Next Refill: {item.nextRefill}</Text>
        <Text style={styles.notes}>Notes: {item.notes}</Text>
      </View>
      <View style={styles.iconContainer}>
        {item.fuelStatus === 'Low' && <LowFuelIcon />}
        {item.fuelStatus === 'Full' && <FullFuelIcon />}
        {item.fuelStatus === 'Empty' && <EmptyFuelIcon />}
      </View>
    </View>
  );

  const renderReceivableItem = ({ item }: { item: typeof receivables[0] }) => (
    <View style={styles.receivableItem}>
      <Text style={styles.receivableText}>{item.id}</Text>
      <Text style={styles.receivableText}>{item.name}</Text>
      <Text style={styles.receivableText}>{item.country}</Text>
      {/* Add more fields as needed */}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{thresholdName} Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Customer List</Text>
          <FlatList
            data={customerList}
            keyExtractor={(item) => item.id}
            renderItem={renderCustomerItem}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Latest Notifications</Text>
          <FlatList
            data={latestNotifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotification}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Receivables List</Text>
          <FlatList
            data={receivablesList}
            keyExtractor={(item) => item.id}
            renderItem={renderReceivableItem}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  headerContainer: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    zIndex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#6A0DAD', // Brand color
  },
  title: { fontSize: 32, fontWeight: 'bold', color: '#6A0DAD', textAlign: 'center' },
  scrollContent: { paddingTop: 20, paddingHorizontal: 20 },
  sectionContainer: { marginBottom: 30 },
  sectionTitle: { fontSize: 22, fontWeight: '600', color: '#6A0DAD', marginBottom: 10 },
  customerItem: { flexDirection: 'row', padding: 15, marginBottom: 10, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5, alignItems: 'center' },
  lowFuel: { backgroundColor: '#6A0DAD' },
  fullFuel: { backgroundColor: '#28a745' },
  emptyFuel: { backgroundColor: '#dc3545' },
  defaultFuel: { backgroundColor: '#FFFFFF' },
  customerInfo: { flex: 1 },
  customerName: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  customerStatus: { fontSize: 14, color: '#fff', marginTop: 5 },
  fuelAmount: { fontSize: 16, color: '#fff', marginTop: 5 },
  lastRefill: { fontSize: 14, color: '#fff', marginTop: 5 },
  nextRefill: { fontSize: 14, color: '#fff', marginTop: 5 },
  notes: { fontSize: 12, color: '#fff', marginTop: 5 },
  iconContainer: { marginLeft: 15, justifyContent: 'center', alignItems: 'center' },
  icon: { backgroundColor: 'transparent' },
  iconText: { fontSize: 30, color: '#fff' },
  notificationItem: { backgroundColor: '#FFF3F7', padding: 15, marginBottom: 10, borderRadius: 10, borderLeftWidth: 5, borderLeftColor: '#6A0DAD' },
  notificationMessage: { fontSize: 16, color: '#333' },
  actionButton: { marginTop: 10, backgroundColor: '#6A0DAD', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5 },
  actionText: { color: '#fff', fontWeight: 'bold' },
  receivableItem: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#DDD' },
  receivableText: { fontSize: 14, color: '#333', marginRight: 10 },
});

export default ThresholdHome;
