import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PassengersScreen() {
  const passengers = [
    {
      id: 1,
      name: 'John Doe',
      phone: '+91 98765 43210',
      seat: 'A1',
      route: 'Kochi ↔ Thrissur',
      status: 'Confirmed',
      bookingId: 'BK001',
    },
    {
      id: 2,
      name: 'Jane Smith',
      phone: '+91 98765 43211',
      seat: 'B2',
      route: 'Ernakulam ↔ Aluva',
      status: 'Pending',
      bookingId: 'BK002',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      phone: '+91 98765 43212',
      seat: 'C3',
      route: 'Kochi ↔ Kottayam',
      status: 'Confirmed',
      bookingId: 'BK003',
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      phone: '+91 98765 43213',
      seat: 'A4',
      route: 'Thrissur ↔ Palakkad',
      status: 'Cancelled',
      bookingId: 'BK004',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return '#10B981';
      case 'Pending':
        return '#F59E0B';
      case 'Cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Passengers</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>18</Text>
            <Text style={styles.statLabel}>Confirmed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        <View style={styles.content}>
          {passengers.map((passenger) => (
            <View key={passenger.id} style={styles.passengerCard}>
              <View style={styles.passengerHeader}>
                <View style={styles.passengerInfo}>
                  <Text style={styles.passengerName}>{passenger.name}</Text>
                  <Text style={styles.passengerPhone}>{passenger.phone}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(passenger.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(passenger.status) }]}>
                    {passenger.status}
                  </Text>
                </View>
              </View>
              
              <View style={styles.passengerDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="bus" size={16} color="#6B46C1" />
                  <Text style={styles.detailText}>{passenger.route}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="seat" size={16} color="#6B46C1" />
                  <Text style={styles.detailText}>Seat: {passenger.seat}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="receipt" size={16} color="#6B46C1" />
                  <Text style={styles.detailText}>ID: {passenger.bookingId}</Text>
                </View>
              </View>
              
              <View style={styles.passengerActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="call" size={16} color="#6B46C1" />
                  <Text style={styles.actionText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="mail" size={16} color="#6B46C1" />
                  <Text style={styles.actionText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="eye" size={16} color="#6B46C1" />
                  <Text style={styles.actionText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#6B46C1',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B46C1',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  passengerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  passengerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  passengerInfo: {
    flex: 1,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  passengerPhone: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  passengerDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  passengerActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#6B46C1',
    marginLeft: 6,
    fontWeight: '500',
  },
});
