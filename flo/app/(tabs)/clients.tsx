import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import axios from 'axios';

type Client = {
  id: string;
  name: string;
  contactPerson: string;
  address: string;
  telephone: string;
  cellPhone: string;
  email: string;
  vatNumber: string;
  tinNumber: string;
  threshold: string;
  username: string;
  password: string;
  carRegNumber: string;
  orderNumber: string;
  receiptNumber: string;
  litresDrawn: number;
  pumpPrice: number;
  totalValue: number;
  balance: number;
};

const AdminClient = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newClient, setNewClient] = useState<Client>({
    id: '',
    name: '',
    contactPerson: '',
    address: '',
    telephone: '',
    cellPhone: '',
    email: '',
    vatNumber: '',
    tinNumber: '',
    threshold: '',
    username: '',
    password: '',
    carRegNumber: '',
    orderNumber: '',
    receiptNumber: '',
    litresDrawn: 0,
    pumpPrice: 0,
    totalValue: 0,
    balance: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch Clients from API
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/clients'); // Your backend API URL
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  // Generate random password
  const generatePassword = () => {
    return Math.random().toString(36).slice(-8); // Generates an 8-character password
  };

  // Add New Client
  const handleAddClient = async () => {
    if (!newClient.name || !newClient.email || !newClient.telephone || !newClient.cellPhone) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const generatedPassword = generatePassword();
    const newClientData: Client = {
      ...newClient,
      username: newClient.email, // Using email as username
      password: generatedPassword,
    };

    try {
      const response = await axios.post('http://localhost:5000/clients', newClientData);
      setClients([...clients, response.data]);
      Alert.alert('Success', `Client added!\nUsername: ${newClientData.username}\nPassword: ${generatedPassword}`);
      setModalVisible(false);
      setNewClient({
        id: '',
        name: '',
        contactPerson: '',
        address: '',
        telephone: '',
        cellPhone: '',
        email: '',
        vatNumber: '',
        tinNumber: '',
        threshold: '',
        username: '',
        password: '',
        carRegNumber: '',
        orderNumber: '',
        receiptNumber: '',
        litresDrawn: 0,
        pumpPrice: 0,
        totalValue: 0,
        balance: 0,
      });
    } catch (error) {
      console.error('Error adding client:', error);
      Alert.alert('Error', 'Could not add client.');
    }
  };

  // Delete Client
  const handleDelete = async (clientId: string) => {
    Alert.alert('Delete Client', 'Are you sure you want to delete this client?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`http://localhost:5000/clients/${clientId}`);
            setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
            Alert.alert('Success', 'Client deleted successfully.');
          } catch (error) {
            console.error('Error deleting client:', error);
            Alert.alert('Error', 'Could not delete client.');
          }
        },
      },
    ]);
  };

  // Filtered Clients based on search query
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clients Management</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.input}
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Add New Client Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add New Client</Text>
      </TouchableOpacity>

      {/* Client List */}
      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.clientItem}>
            <View>
              <Text style={styles.clientName}>{item.name}</Text>
              <Text style={styles.clientEmail}>Email: {item.email}</Text>
              <Text style={styles.clientPhone}>Phone: {item.telephone}</Text>
              <Text style={styles.clientFuel}>Fuel Left: {item.litresDrawn} L</Text>
              <Text>Car Reg Number: {item.carRegNumber}</Text>
              <Text>Order Number: {item.orderNumber}</Text>
              <Text>Receipt Number: {item.receiptNumber}</Text>
              <Text>Total Value: {item.totalValue}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Add Client Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Client</Text>
            <TextInput
              style={styles.input}
              placeholder="Customer Name"
              value={newClient.name}
              onChangeText={(text) => setNewClient({ ...newClient, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Person"
              value={newClient.contactPerson}
              onChangeText={(text) => setNewClient({ ...newClient, contactPerson: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={newClient.address}
              onChangeText={(text) => setNewClient({ ...newClient, address: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Telephone"
              value={newClient.telephone}
              onChangeText={(text) => setNewClient({ ...newClient, telephone: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Cell Phone"
              value={newClient.cellPhone}
              onChangeText={(text) => setNewClient({ ...newClient, cellPhone: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={newClient.email}
              onChangeText={(text) => setNewClient({ ...newClient, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="VAT Number"
              value={newClient.vatNumber}
              onChangeText={(text) => setNewClient({ ...newClient, vatNumber: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="TIN Number"
              value={newClient.tinNumber}
              onChangeText={(text) => setNewClient({ ...newClient, tinNumber: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Threshold"
              value={newClient.threshold}
              onChangeText={(text) => setNewClient({ ...newClient, threshold: text })}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleAddClient}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6A0DAD',
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#6A0DAD',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  clientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clientEmail: {
    fontSize: 16,
    color: '#555',
  },
  clientPhone: {
    fontSize: 16,
    color: '#555',
  },
  clientFuel: {
    fontSize: 16,
    color: '#555',
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6A0DAD',
  },
  saveButton: {
    backgroundColor: '#6A0DAD',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default AdminClient;
