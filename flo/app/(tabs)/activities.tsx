import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Activity {
  id: number;
  client: string;
  action: string;
  timestamp: string;
}

const ActivitiesScreen = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch client activities from the backend
  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/activities');
      setActivities(response.data); // Assuming the response contains an array of activities
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Render individual activity
  const renderItem = ({ item }: { item: Activity }) => (
    <View style={styles.activityContainer}>
      <Text style={styles.activityText}>
        {item.client} - {item.action} ({item.timestamp})
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Client Activities</Text>

      {/* Loading Spinner */}
      {loading ? (
        <ActivityIndicator size="large" color="#6A0DAD" />
      ) : (
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

      {/* Refresh Button */}
      <Button title="Refresh Activities" onPress={fetchActivities} color="#6A0DAD" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 20,
  },
  activityContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activityText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ActivitiesScreen;
