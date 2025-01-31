import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';

// Define Message Type
interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

// Setup backend API and Socket.io URL
const SERVER_URL = 'http://localhost:5000'; // Change to your backend URL
const socket = io(SERVER_URL);

const ThresholdScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch stored messages from the backend when the page loads
  useEffect(() => {
    axios.get(`${SERVER_URL}/messages`)
      .then((response) => {
        setMessages(response.data); // Set initial messages from backend
      })
      .catch((error) => console.error('Error fetching messages:', error));

    // Listen for new messages via Socket.io
    socket.on('loadMessages', (loadedMessages: Message[]) => {
      setMessages(loadedMessages);
    });

    socket.on('newMessage', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('loadMessages');
      socket.off('newMessage');
    };
  }, []);

  // Function to send message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'threshold',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMsg]);
    socket.emit('newMessage', newMsg); // Emit to backend to store
    axios.post(`${SERVER_URL}/messages`, newMsg) // Send to backend API
      .catch((error) => console.error('Error sending message:', error));

    setNewMessage(''); // Clear input after sending
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Threshold Chat</Text>

      {/* Chat Messages List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === 'threshold' ? styles.sentMessage : styles.receivedMessage]}>
            <Text style={styles.messageSender}>{item.sender}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        )}
      />

      {/* Message Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ThresholdScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6A0DAD',
    textAlign: 'center',
    marginBottom: 20,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '75%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  messageSender: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
