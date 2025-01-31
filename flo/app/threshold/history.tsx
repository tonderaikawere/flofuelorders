import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Button, TouchableOpacity, Modal, TextInput, FlatList, Alert 
} from 'react-native';

interface Client {
  id: string;
  name: string;
  registration: string;
  totalFuelPurchased: number;
  fuelDeposited: number;
  fuelWithdrawn: number;
  remainingFuel: number;
  status: string;
  email: string;
  thresholdPercentage: number;
  balance: number;
}

const clientsData: Client[] = [
  { id: '1', name: 'CURE Children\'s Hospital', registration: 'XYZ123', totalFuelPurchased: 500, fuelDeposited: 300, fuelWithdrawn: 200, remainingFuel: 100, status: 'Active', email: 'hospital@example.com', thresholdPercentage: 10, balance: 5905.00 },
  { id: '2', name: 'Gas Man (Private) Limited', registration: 'ABC987', totalFuelPurchased: 400, fuelDeposited: 250, fuelWithdrawn: 150, remainingFuel: 100, status: 'Active', email: 'gasman@example.com', thresholdPercentage: 12, balance: 4447.60 },
  { id: '3', name: 'Blueridge Logistics', registration: 'GHI456', totalFuelPurchased: 300, fuelDeposited: 150, fuelWithdrawn: 100, remainingFuel: 50, status: 'Inactive', email: 'blueridge@example.com', thresholdPercentage: 8, balance: 5449.73 },
  { id: '4', name: 'JK Motors (Pvt) Ltd', registration: 'JKL321', totalFuelPurchased: 450, fuelDeposited: 200, fuelWithdrawn: 250, remainingFuel: 0, status: 'Active', email: 'jkmotors@example.com', thresholdPercentage: 15, balance: 4625.00 },
  { id: '5', name: 'King George VI Centre', registration: 'MNO567', totalFuelPurchased: 600, fuelDeposited: 350, fuelWithdrawn: 200, remainingFuel: 150, status: 'Active', email: 'kinggeorge@example.com', thresholdPercentage: 5, balance: 5500.00 },
  { id: '6', name: 'Ndlovu Global', registration: 'PQR789', totalFuelPurchased: 700, fuelDeposited: 500, fuelWithdrawn: 100, remainingFuel: 400, status: 'Inactive', email: 'ndlovu@example.com', thresholdPercentage: 20, balance: 24000.00 },
  { id: '7', name: 'Openview Aluminium', registration: 'STU234', totalFuelPurchased: 250, fuelDeposited: 100, fuelWithdrawn: 150, remainingFuel: 0, status: 'Active', email: 'openview@example.com', thresholdPercentage: 10, balance: 4686.00 },
  { id: '8', name: 'Three Choirs t/a Tortoise', registration: 'VWX345', totalFuelPurchased: 350, fuelDeposited: 250, fuelWithdrawn: 100, remainingFuel: 50, status: 'Active', email: 'threechoirs@example.com', thresholdPercentage: 7, balance: 22000.00 },
  { id: '9', name: 'Heraut Marketing (Pvt) Ltd t/a', registration: 'YZA876', totalFuelPurchased: 500, fuelDeposited: 300, fuelWithdrawn: 200, remainingFuel: 100, status: 'Active', email: 'heraut@example.com', thresholdPercentage: 9, balance: 4850.00 }
];

const Transactions: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [invoiceCarReg, setInvoiceCarReg] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');

  const handleInvoice = (client: Client) => {
    if (!invoiceAmount || !invoiceCarReg || !invoiceNumber) {
      Alert.alert('Missing Fields', 'Please fill out all fields before submitting the invoice.');
      return;
    }

    const amount = parseFloat(invoiceAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    const thresholdDeduction = (client.thresholdPercentage / 100) * amount; // Percentage Deduction
    const finalAmount = amount - thresholdDeduction; // Final amount after deduction

    if (client.balance >= finalAmount) {
      client.balance -= finalAmount; // Deduct from client's balance
      Alert.alert('Invoice Created', `Invoice for $${finalAmount.toFixed(2)} (after ${client.thresholdPercentage}% deduction) created successfully for ${client.name}`);
      setShowInvoiceModal(false); // Close the modal after the invoice is created
    } else {
      Alert.alert('Insufficient Funds', `Client ${client.name} does not have enough funds.`);
    }
  };

  const handleClientClick = (clientId: string) => {
    setSelectedClientId(prevId => (prevId === clientId ? null : clientId));
  };

  const filterClients = () => {
    return clientsData.filter(client =>
      client.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const renderClientItem = ({ item }: { item: Client }) => (
    <View>
      <TouchableOpacity
        onPress={() => handleClientClick(item.id)}
        style={[styles.clientItem, item.remainingFuel <= 50 && styles.lowFuel]}>
        <Text style={styles.clientName}>{item.name}</Text>
        <Text style={styles.clientBalance}>${item.balance.toFixed(2)}</Text>
      </TouchableOpacity>

      {/* Client Details (Slide Down) */}
      {selectedClientId === item.id && (
        <View style={styles.clientDetails}>
          <Text style={styles.clientDetailText}>Car Registration: {item.registration}</Text>
          <Text style={styles.clientDetailText}>Total Fuel Purchased: ${item.totalFuelPurchased}</Text>
          <Text style={styles.clientDetailText}>Fuel Deposited: ${item.fuelDeposited}</Text>
          <Text style={styles.clientDetailText}>Fuel Withdrawn: ${item.fuelWithdrawn}</Text>
          <Text style={styles.clientDetailText}>Remaining Fuel: ${item.remainingFuel}</Text>
          <Text style={styles.clientDetailText}>Status: {item.status}</Text>
          <Text style={styles.clientDetailText}>Email: {item.email}</Text>
          <Text style={styles.clientDetailText}>Threshold Percentage: {item.thresholdPercentage}%</Text>
          <Text style={styles.clientDetailText}>Balance: ${item.balance.toFixed(2)}</Text>
          <TouchableOpacity style={styles.invoiceButton} onPress={() => setShowInvoiceModal(true)}>
            <Text style={styles.invoiceButtonText}>Generate Invoice</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <Text style={styles.subtitle}>Click on a client to view their details and manage transactions</Text>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Client List */}
      <FlatList
        data={filterClients()}
        keyExtractor={client => client.id}
        renderItem={renderClientItem}
      />

      {/* Invoice Modal */}
      <Modal
        visible={showInvoiceModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowInvoiceModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Invoice Details</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Amount"
              keyboardType="numeric"
              value={invoiceAmount}
              onChangeText={setInvoiceAmount}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Car Registration"
              value={invoiceCarReg}
              onChangeText={setInvoiceCarReg}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Invoice Number"
              value={invoiceNumber}
              onChangeText={setInvoiceNumber}
            />
            <TouchableOpacity
              style={[styles.modalButton, styles.modalConfirmButton]}
              onPress={() => handleInvoice(clientsData.find(client => client.id === selectedClientId)!)}>
              <Text style={styles.modalButtonText}>Generate Invoice</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={() => setShowInvoiceModal(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  clientItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  lowFuel: {
    backgroundColor: '#f8d7da',
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A0DAD',
  },
  clientBalance: {
    fontSize: 14,
    color: '#888',
  },
  clientDetails: {
    marginTop: 10,
  },
  clientDetailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  invoiceButton: {
    backgroundColor: '#6A0DAD',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  invoiceButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6A0DAD',
  },
  modalInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalConfirmButton: {
    backgroundColor: '#6A0DAD',
  },
  modalCancelButton: {
    backgroundColor: '#ccc',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Transactions;
