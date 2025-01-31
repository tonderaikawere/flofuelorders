import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, TextInput, Modal, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import if you are using AsyncStorage

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [username, setUsername] = useState('User123'); // Replace with actual username logic

  const router = useRouter();  // Using useRouter from expo-router

  const handleChangePassword = () => {
    if (newPassword.trim()) {
      setShowChangePasswordModal(false);
      Alert.alert('Success', 'Password changed successfully!');
    } else {
      Alert.alert('Error', 'Please enter a valid password.');
    }
  };

  // Logout Functionality
  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            // Clear any saved data or tokens
            await AsyncStorage.removeItem('userToken'); // If using AsyncStorage to store the token
            // Optionally clear any other session-related data
            await AsyncStorage.removeItem('userData'); // For example, user info

            // Redirect to the SignIn screen
            router.push('../signin');
          } catch (error) {
            console.error('Error clearing session data:', error);
            Alert.alert('Error', 'Failed to log out');
          }
        },
      },
    ]);
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
  };

  useEffect(() => {
    if (darkMode) {
      // Here you can adjust additional styles or state logic if necessary
    }
  }, [darkMode]);

  return (
    <ScrollView style={[styles.container, darkMode && styles.darkMode]}>
      <Text style={[styles.header, darkMode && styles.darkModeText]}>Settings</Text>

      {/* Profile Section */}
      <View style={[styles.sectionCard, darkMode && styles.darkModeCard]}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkModeText]}>Profile Settings</Text>
        <Text style={[styles.optionText, darkMode && styles.darkModeText]}>{`Username: ${username}`}</Text>
      </View>

      {/* App Settings Section */}
      <View style={[styles.sectionCard, darkMode && styles.darkModeCard]}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkModeText]}>App Settings</Text>
        <View style={styles.option}>
          <Text style={[styles.optionText, darkMode && styles.darkModeText]}>Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
        <View style={styles.option}>
          <Text style={[styles.optionText, darkMode && styles.darkModeText]}>Language</Text>
          <TextInput
            style={[styles.input, darkMode && styles.darkModeInput]}
            value={language}
            onChangeText={handleLanguageChange}
          />
        </View>
        <View style={styles.option}>
          <Text style={[styles.optionText, darkMode && styles.darkModeText]}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>

      {/* T&Cs Section */}
      <View style={[styles.sectionCard, darkMode && styles.darkModeCard]}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkModeText]}>Terms & Conditions</Text>
        <TouchableOpacity style={styles.option} onPress={() => Alert.alert('T&Cs', 'Terms and Conditions...')}>
          <Text style={[styles.optionText, darkMode && styles.darkModeText]}>View Terms & Conditions</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={[styles.logoutButton, darkMode && styles.darkModeButton]} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Change Password Modal */}
      <Modal visible={showChangePasswordModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowChangePasswordModal(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', padding: 20 },
  darkMode: { backgroundColor: '#333' },
  header: { fontSize: 28, fontWeight: 'bold', color: '#6A0DAD', marginBottom: 20 },
  darkModeText: { color: '#FFF' },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 4,
  },
  darkModeCard: { backgroundColor: '#444' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  option: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  optionText: { fontSize: 16, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '60%',
    fontSize: 16,
  },
  darkModeInput: { backgroundColor: '#555', color: '#FFF' },
  logoutButton: {
    backgroundColor: '#6A0DAD',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  darkModeButton: { backgroundColor: '#222' },
  logoutButtonText: { color: '#fff', fontSize: 18 },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  modalButton: {
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  saveButton: { backgroundColor: '#6A0DAD' },
  cancelButton: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default Settings;
