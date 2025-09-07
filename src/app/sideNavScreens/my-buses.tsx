import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Bus {
  id: string;
  name: string;
  numberPlate: string;
  route: string;
  status: 'on-route' | 'parked' | 'maintenance' | 'idle';
  availableSeats: number;
  totalSeats: number;
  nextTrip: string;
  fuelLevel: number;
  nextService: string;
  driver: string;
  permitExpiry: string;
  insuranceExpiry: string;
  alerts: string[];
}

export default function MyBuses() {
  const [expandedBus, setExpandedBus] = useState<string | null>(null);
  const [showAddBus, setShowAddBus] = useState(false);

  const buses: Bus[] = [
    {
      id: '1',
      name: 'City Express 1',
      numberPlate: 'KL-01-AB-1234',
      route: 'Kochi ↔ Thrissur',
      status: 'on-route',
      availableSeats: 12,
      totalSeats: 40,
      nextTrip: 'Today, 2:30 PM',
      fuelLevel: 75,
      nextService: 'Oct 25, 2024',
      driver: 'Rajesh Kumar',
      permitExpiry: 'Dec 15, 2024',
      insuranceExpiry: 'Jan 20, 2025',
      alerts: ['Fuel level low', 'Permit renewal in 30 days']
    },
    {
      id: '2',
      name: 'Metro Shuttle 2',
      numberPlate: 'KL-02-CD-5678',
      route: 'Ernakulam ↔ Aluva',
      status: 'parked',
      availableSeats: 40,
      totalSeats: 40,
      nextTrip: 'Tomorrow, 6:00 AM',
      fuelLevel: 90,
      nextService: 'Nov 10, 2024',
      driver: 'Suresh Nair',
      permitExpiry: 'Mar 05, 2025',
      insuranceExpiry: 'Feb 28, 2025',
      alerts: []
    },
    {
      id: '3',
      name: 'Express Line 3',
      numberPlate: 'KL-03-EF-9012',
      route: 'Kochi ↔ Kottayam',
      status: 'maintenance',
      availableSeats: 0,
      totalSeats: 35,
      nextTrip: 'Under maintenance',
      fuelLevel: 45,
      nextService: 'Oct 20, 2024',
      driver: 'Unassigned',
      permitExpiry: 'Jan 10, 2025',
      insuranceExpiry: 'Dec 15, 2024',
      alerts: ['Maintenance overdue', 'Driver needed']
    },
    {
      id: '4',
      name: 'City Connect 4',
      numberPlate: 'KL-04-GH-3456',
      route: 'Thrissur ↔ Palakkad',
      status: 'idle',
      availableSeats: 35,
      totalSeats: 35,
      nextTrip: 'No trips scheduled',
      fuelLevel: 60,
      nextService: 'Dec 01, 2024',
      driver: 'Vijay Menon',
      permitExpiry: 'Feb 20, 2025',
      insuranceExpiry: 'Mar 10, 2025',
      alerts: ['Schedule trip needed']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-route': return '#10B981';
      case 'parked': return '#F59E0B';
      case 'maintenance': return '#EF4444';
      case 'idle': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-route': return 'car';
      case 'parked': return 'pause-circle';
      case 'maintenance': return 'construct';
      case 'idle': return 'stop-circle';
      default: return 'help-circle';
    }
  };

  const toggleBusDetails = (busId: string) => {
    setExpandedBus(expandedBus === busId ? null : busId);
  };

  const handleBusAction = (action: string, bus: Bus) => {
    Alert.alert(`${action} Bus`, `Action: ${action}\nBus: ${bus.name} (${bus.numberPlate})`);
  };

  const renderBusCard = (bus: Bus) => (
    <View key={bus.id} style={styles.busCard}>
      <TouchableOpacity onPress={() => toggleBusDetails(bus.id)} style={styles.busHeader}>
        <View style={styles.busInfo}>
          <View style={styles.busTitleRow}>
            <Text style={styles.busName}>{bus.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(bus.status) + '20' }]}>
              <Ionicons name={getStatusIcon(bus.status)} size={12} color={getStatusColor(bus.status)} />
              <Text style={[styles.statusText, { color: getStatusColor(bus.status) }]}>
                {bus.status.replace('-', ' ').toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.numberPlate}>{bus.numberPlate}</Text>
          <Text style={styles.route}>{bus.route}</Text>
        </View>
        <View style={styles.busStats}>
          <Text style={styles.seatsText}>{bus.availableSeats}/{bus.totalSeats} seats</Text>
          <Text style={styles.nextTripText}>{bus.nextTrip}</Text>
        </View>
        <Ionicons 
          name={expandedBus === bus.id ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color="#6B7280" 
        />
      </TouchableOpacity>

      {expandedBus === bus.id && (
        <View style={styles.busDetails}>
          <View style={styles.detailsSection}>
            <Text style={styles.detailsTitle}>Driver & Assignment</Text>
            <Text style={styles.detailsText}>Driver: {bus.driver}</Text>
            <Text style={styles.detailsText}>Fuel Level: {bus.fuelLevel}%</Text>
          </View>

          <View style={styles.detailsSection}>
            <Text style={styles.detailsTitle}>Documents & Compliance</Text>
            <Text style={styles.detailsText}>Permit Expiry: {bus.permitExpiry}</Text>
            <Text style={styles.detailsText}>Insurance Expiry: {bus.insuranceExpiry}</Text>
            <Text style={styles.detailsText}>Next Service: {bus.nextService}</Text>
          </View>

          {bus.alerts.length > 0 && (
            <View style={styles.alertsSection}>
              <Text style={styles.detailsTitle}>Alerts</Text>
              {bus.alerts.map((alert, index) => (
                <View key={index} style={styles.alertItem}>
                  <Ionicons name="warning" size={16} color="#F59E0B" />
                  <Text style={styles.alertText}>{alert}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]}
              onPress={() => handleBusAction('Edit', bus)}
            >
              <Ionicons name="create" size={16} color="#6B46C1" />
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.assignButton]}
              onPress={() => handleBusAction('Assign Driver', bus)}
            >
              <Ionicons name="person-add" size={16} color="#10B981" />
              <Text style={styles.actionButtonText}>Assign Driver</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.scheduleButton]}
              onPress={() => handleBusAction('Schedule Trip', bus)}
            >
              <Ionicons name="calendar" size={16} color="#F59E0B" />
              <Text style={styles.actionButtonText}>Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6B46C1" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>My Buses</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications" size={24} color="#FFFFFF" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Alerts Section */}
        <View style={styles.alertsCard}>
          <View style={styles.alertsHeader}>
            <Ionicons name="warning" size={20} color="#F59E0B" />
            <Text style={styles.alertsTitle}>Important Alerts</Text>
          </View>
          <View style={styles.alertItem}>
            <Ionicons name="construct" size={16} color="#EF4444" />
            <Text style={styles.alertText}>Express Line 3 - Maintenance overdue</Text>
          </View>
          <View style={styles.alertItem}>
            <Ionicons name="person" size={16} color="#F59E0B" />
            <Text style={styles.alertText}>Express Line 3 - Driver needed</Text>
          </View>
          <View style={styles.alertItem}>
            <Ionicons name="calendar" size={16} color="#6B46C1" />
            <Text style={styles.alertText}>City Connect 4 - Schedule trip needed</Text>
          </View>
        </View>

        {/* Bus List */}
        <View style={styles.busListSection}>
          <Text style={styles.sectionTitle}>Fleet Overview ({buses.length} buses)</Text>
          {buses.map(renderBusCard)}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setShowAddBus(true)}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Add Bus Modal */}
      <Modal
        visible={showAddBus}
        transparent={true}
        animationType="none"
        onRequestClose={() => setShowAddBus(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.addBusModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Bus</Text>
              <TouchableOpacity onPress={() => setShowAddBus(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalPlaceholder}>Add Bus Form Coming Soon...</Text>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setShowAddBus(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#6B46C1', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginLeft: 15, position: 'relative' },
  notificationDot: { position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' },
  scrollView: { flex: 1, paddingHorizontal: 20 },
  alertsCard: { backgroundColor: '#FEF3C7', borderRadius: 12, padding: 16, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#F59E0B' },
  alertsHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  alertsTitle: { fontSize: 16, fontWeight: 'bold', color: '#92400E', marginLeft: 8 },
  alertItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  alertText: { fontSize: 14, color: '#92400E', marginLeft: 8, flex: 1 },
  busListSection: { marginBottom: 100 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  busCard: { backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  busHeader: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  busInfo: { flex: 1 },
  busTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  busName: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 10, fontWeight: '600', marginLeft: 4 },
  numberPlate: { fontSize: 14, color: '#6B46C1', fontWeight: '500', marginBottom: 2 },
  route: { fontSize: 14, color: '#6B7280' },
  busStats: { alignItems: 'flex-end', marginRight: 8 },
  seatsText: { fontSize: 14, fontWeight: '500', color: '#10B981' },
  nextTripText: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  busDetails: { padding: 16, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  detailsSection: { marginBottom: 16 },
  detailsTitle: { fontSize: 14, fontWeight: 'bold', color: '#374151', marginBottom: 8 },
  detailsText: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
  alertsSection: { marginBottom: 16 },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-around' },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, flex: 1, marginHorizontal: 4 },
  editButton: { backgroundColor: '#F3F4F6' },
  assignButton: { backgroundColor: '#ECFDF5' },
  scheduleButton: { backgroundColor: '#FEF3C7' },
  actionButtonText: { fontSize: 12, fontWeight: '500', marginLeft: 4 },
  fab: { position: 'absolute', bottom: 20, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#6B46C1', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  addBusModal: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, width: '90%', maxWidth: 400 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  modalPlaceholder: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 20 },
  modalButton: { backgroundColor: '#6B46C1', paddingVertical: 12, borderRadius: 8 },
  modalButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', textAlign: 'center' },
});
