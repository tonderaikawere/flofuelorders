import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Rating } from 'react-native-ratings';

const FeedbackScreen = () => {
  const [rating, setRating] = useState(0); // Rating state
  const [comment, setComment] = useState(''); // Comment state

  // Function to handle rating submission
  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please provide a rating');
      return;
    }
    if (!comment.trim()) {
      Alert.alert('Error', 'Please provide some feedback');
      return;
    }
    // Submit feedback logic
    Alert.alert('Success', 'Thank you for your feedback!');
    // Clear the fields after submission
    setRating(0);
    setComment('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>We Value Your Feedback</Text>
      <Text style={styles.subHeader}>Please rate your experience</Text>

      {/* Rating Component */}
      <View style={styles.ratingContainer}>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={40}
          onFinishRating={(value: number) => setRating(value)} // Explicitly typing 'value' as 'number'
          style={styles.rating}
        />
      </View>

      {/* Comment Section */}
      <TextInput
        style={styles.textInput}
        placeholder="Your feedback or suggestions"
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={5}
      />

      {/* Submit and Cancel Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => setComment('')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  ratingContainer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    paddingVertical: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#6A0DAD',
    padding: 15,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;
