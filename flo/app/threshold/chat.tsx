import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Connect to the backend server
const socket = io('http://localhost:5000');

const ChatScreen = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user ID from AsyncStorage (Assuming user is already authenticated)
    const fetchUserId = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserId(user.id);
      }
    };
    fetchUserId();

    // Listen for new messages from the server
    socket.on('new_message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('new_message');
    };
  }, []);

  // Send message to the admin
  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = { sender: userId || 'Unknown', text: message }; // Fix: Use `sender`

    // Emit the message to the server
    socket.emit('send_message', newMessage);

    // Update local chat history
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Clear input field
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === userId ? styles.sent : styles.received]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#F9F9F9' },
  messageBubble: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: '80%',
  },
  sent: { alignSelf: 'flex-end', backgroundColor: '#6A0DAD' },
  received: { alignSelf: 'flex-start', backgroundColor: '#E5E5EA' },
  messageText: { color: '#fff', fontSize: 16 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  sendButton: { backgroundColor: '#6A0DAD', padding: 10, borderRadius: 8 },
  sendButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default ChatScreen;
