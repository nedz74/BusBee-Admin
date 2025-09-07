import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentsScreen() {
  const payments = [
    {
      id: 1,
      amount: 250,
      passenger: 'John Doe',
      route: 'Kochi ↔ Thrissur',
      date: '2024-01-15',
      status: 'Completed',
      method: 'UPI',
    },
    {
      id: 2,
      amount: 180,
      passenger: 'Jane Smith',
      route: 'Ernakulam ↔ Aluva',
      date: '2024-01-15',
      status: 'Pending',
      method: 'Card',
    },
    {
      id: 3,
      amount: 320,
      passenger: 'Mike Johnson',
      route: 'Kochi ↔ Kottayam',
      date: '2024-01-14',
      status: 'Completed',
      method: 'Cash',
    },
    {
      id: 4,
      amount: 150,
      passenger: 'Sarah Wilson',
      route: 'Thrissur ↔ Palakkad',
      date: '2024-01-14',
      status: 'Failed',
      method: 'UPI',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#10B981';
      case 'Pending':
        return '#F59E0B';
      case 'Failed':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'UPI':
        return 'phone-portrait';
      case 'Card':
        return 'card';
      case 'Cash':
        return 'cash';
      default:
        return 'wallet';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Payments</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>₹12,350</Text>
            <Text style={styles.statLabel}>Total Revenue</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>₹8,900</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Transactions</Text>
          </View>
        </View>

        <View style={styles.content}>
          {payments.map((payment) => (
            <View key={payment.id} style={styles.paymentCard}>
              <View style={styles.paymentHeader}>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentAmount}>₹{payment.amount}</Text>
                  <Text style={styles.paymentPassenger}>{payment.passenger}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(payment.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(payment.status) }]}>
                    {payment.status}
                  </Text>
                </View>
              </View>
              
              <View style={styles.paymentDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="bus" size={16} color="#6B46C1" />
                  <Text style={styles.detailText}>{payment.route}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="calendar" size={16} color="#6B46C1" />
                  <Text style={styles.detailText}>{payment.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name={getMethodIcon(payment.method) as any} size={16} color="#6B46C1" />
                  <Text style={styles.detailText}>{payment.method}</Text>
                </View>
              </View>
              
              <View style={styles.paymentActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="receipt" size={16} color="#6B46C1" />
                  <Text style={styles.actionText}>Receipt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="refresh" size={16} color="#6B46C1" />
                  <Text style={styles.actionText}>Retry</Text>
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
    fontSize: 18,
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
  paymentCard: {
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
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  paymentPassenger: {
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
  paymentDetails: {
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
  paymentActions: {
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
