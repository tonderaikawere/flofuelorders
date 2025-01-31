import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';

const ClientProfile: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [client, setClient] = useState({
    name: 'CURE Children\'s Hospital',
    email: 'cure@example.com',
    carReg: 'ABC-1234',
    balance: '$5,905.00',
  });

  const [editedClient, setEditedClient] = useState(client);

  const handleSave = () => {
    setClient(editedClient);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Client Profile</Text>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Text style={styles.clientName}>{client.name}</Text>
        <Text style={styles.info}>Email: {client.email}</Text>
        <Text style={styles.info}>Car Registration: {client.carReg}</Text>
        <Text style={styles.balance}>Balance: {client.balance}</Text>

        <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Editing */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Client Profile</Text>

            <TextInput
              style={styles.input}
              placeholder="Client Name"
              value={editedClient.name}
              onChangeText={(text) => setEditedClient({ ...editedClient, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={editedClient.email}
              onChangeText={(text) => setEditedClient({ ...editedClient, email: text })}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Car Registration"
              value={editedClient.carReg}
              onChangeText={(text) => setEditedClient({ ...editedClient, carReg: text })}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// **Styles**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 20,
  },
  profileCard: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  clientName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  balance: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28A745',
    marginTop: 10,
  },
  editButton: {
    marginTop: 15,
    backgroundColor: '#6A0DAD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // **Modal Styles**
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: '#999',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ClientProfile;
