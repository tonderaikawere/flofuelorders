import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Dummy client data based on the provided details
const clients = [
  {
    id: '1',
    name: "CURE Children's Hospital",
    totalFuel: 5000,
    fuelDeposited: 5000,
    fuelWithdrawn: 145,
    remainingFuel: 4855,
    status: 'OK',
    email: 'mathiassbnd@gmail.com',
    thresholdPercentage: null,
  },
  {
    id: '2',
    name: 'Gas Man (Private) Limited',
    totalFuel: 5000,
    fuelDeposited: 5000,
    fuelWithdrawn: 552.4,
    remainingFuel: 4447.6,
    status: 'OK',
    email: 'mathiassbnd@gmail.com',
    thresholdPercentage: null,
  },
  {
    id: '3',
    name: 'Blueridge Logistics',
    totalFuel: 5000,
    fuelDeposited: 5000,
    fuelWithdrawn: 600,
    remainingFuel: 4400,
    status: 'OK',
    email: 'mathiassbnd@gmail.com',
    thresholdPercentage: 34,
  },
  {
    id: '4',
    name: 'JK Motors (Pvt) Ltd',
    totalFuel: 5000,
    fuelDeposited: 5000,
    fuelWithdrawn: 375,
    remainingFuel: 4625,
    status: 'OK',
    email: 'mathiassbnd@gmail.com',
    thresholdPercentage: 20,
  },
  {
    id: '5',
    name: 'King George VI Centre',
    totalFuel: 10000,
    fuelDeposited: 10000,
    fuelWithdrawn: 4500,
    remainingFuel: 5500,
    status: 'OK',
    email: 'mathiassbnd@gmail.com',
    thresholdPercentage: null,
  },
  {
    id: '6',
    name: 'Ndlovu Global',
    totalFuel: 15000,
    fuelDeposited: 24000,
    fuelWithdrawn: 3000,
    remainingFuel: 21000,
    status: 'OK',
    email: 'mathiassbnd@gmail.com',
    thresholdPercentage: 50,
  },
  {
    id: '7',
    name: 'Openview Aluminium',
    totalFuel: 5000,
    fuelDeposited: 5000,
    fuelWithdrawn: 314,
    remainingFuel: 4686,
    status: 'OK',
    email: 'mathiassbnd@gmail.com',
    thresholdPercentage: 15,
  },
  {
    id: '8',
    name: 'Three Choirs t/a Tortoise',
    totalFuel: 22000,
    fuelDeposited: 22000,
    fuelWithdrawn: 26680,
    remainingFuel: -4680,
    status: 'RED FLAG 🚩',
    email: 'mathiassbnd@gmail.com',
    thresholdPercentage: null,
  },
  {
    id: '9',
    name: 'Heraut Marketing (Pvt) Ltd t/a',
    totalFuel: 5000,
    fuelDeposited: 5000,
    fuelWithdrawn: 150,
    remainingFuel: 4850,
    status: 'OK',
    email: 'mathiassbnd@gmail.com',
    thresholdPercentage: 25,
  },
];

const ClientList: React.FC = () => {
  const renderClient = ({ item }: { item: any }) => {
    const fuelStatusColor = item.remainingFuel <= 0 ? '#FF4C4C' : item.remainingFuel < 1000 ? '#FF9800' : '#6A0DAD'; // Purple for sufficient fuel, green for low/no fuel
    const thresholdColor = item.thresholdPercentage ? (item.thresholdPercentage >= 50 ? '#6A0DAD' : '#FF9800') : '#FF4C4C';

    return (
      <View style={[styles.clientItem, { backgroundColor: fuelStatusColor }]}>
        <View style={styles.textContainer}>
          <Text style={styles.clientName}>{item.name}</Text>
          <Text style={styles.fuelDetails}>Remaining Fuel: ${item.remainingFuel.toFixed(2)}</Text>
          <Text style={styles.fuelDetails}>Threshold: {item.thresholdPercentage || 'N/A'}%</Text>
          <Text style={styles.status}>Status: {item.status}</Text>
          <Text style={styles.email}>Email: {item.email}</Text>
        </View>
        <View style={[styles.thresholdBadge, { backgroundColor: thresholdColor }]}>
          <Text style={styles.thresholdText}>{item.thresholdPercentage || 'N/A'}%</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Client Fuel Status</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={clients}
        keyExtractor={(item) => item.id}
        renderItem={renderClient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#6A0DAD', // Purple background for the header
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  listContent: {
    paddingTop: 80, // Added padding to push the list below the header
    paddingHorizontal: 15, // Added padding to the sides of the list
  },
  clientItem: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  fuelDetails: {
    fontSize: 16,
    color: 'white',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  email: {
    fontSize: 14,
    color: '#D3D3D3',
  },
  thresholdBadge: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thresholdText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ClientList;
