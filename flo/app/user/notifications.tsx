import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const notifications = [
  { id: 1, message: 'Your fuel refill is successful.', date: '2025-01-27', time: '08:45 AM', from: 'Flo Petroleum' },
  { id: 2, message: 'New fuel prices have been announced.', date: '2025-01-26', time: '01:30 PM', from: 'Flo Petroleum' },
  { id: 3, message: 'Your monthly fuel report is ready.', date: '2025-01-25', time: '06:00 PM', from: 'Flo Petroleum' },
];

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <Text style={styles.header}>Notifications</Text>
      <ScrollView contentContainerStyle={styles.notificationsContainer}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationCard}>
            <Text style={styles.notificationText}>{notification.message}</Text>
            <Text style={styles.notificationDetail}>
              {notification.date} at {notification.time}
            </Text>
            <Text style={styles.notificationDetail}>From: {notification.from}</Text>
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
  notificationsContainer: { paddingHorizontal: 20, paddingTop: 20 },
  notificationCard: {
    backgroundColor: '#FFF', // Changed to white
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#9500ff',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
    elevation: 8,
  },
  notificationText: { fontSize: 16, color: '#333', marginBottom: 10 }, // Changed text color to black
  notificationDetail: { fontSize: 14, color: '#333' }, // Changed text color to black for details
});

export default NotificationScreen;
