import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ScheduleScreen() {
  const schedules = [
    {
      id: 1,
      route: 'Kochi ↔ Thrissur',
      departureTime: '06:00 AM',
      arrivalTime: '08:30 AM',
      status: 'On Time',
      busNumber: 'KL-01-AB-1234',
    },
    {
      id: 2,
      route: 'Ernakulam ↔ Aluva',
      departureTime: '10:30 AM',
      arrivalTime: '11:15 AM',
      status: 'Delayed',
      busNumber: 'KL-02-CD-5678',
    },
    {
      id: 3,
      route: 'Kochi ↔ Kottayam',
      departureTime: '02:00 PM',
      arrivalTime: '04:30 PM',
      status: 'On Time',
      busNumber: 'KL-03-EF-9012',
    },
    {
      id: 4,
      route: 'Thrissur ↔ Palakkad',
      departureTime: '06:00 PM',
      arrivalTime: '08:00 PM',
      status: 'On Time',
      busNumber: 'KL-04-GH-3456',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Time':
        return '#10B981';
      case 'Delayed':
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
          <Text style={styles.headerTitle}>Bus Schedule</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {schedules.map((schedule) => (
            <View key={schedule.id} style={styles.scheduleCard}>
              <View style={styles.scheduleHeader}>
                <Text style={styles.routeText}>{schedule.route}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(schedule.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(schedule.status) }]}>
                    {schedule.status}
                  </Text>
                </View>
              </View>
              
              <View style={styles.scheduleDetails}>
                <View style={styles.timeRow}>
                  <View style={styles.timeItem}>
                    <Ionicons name="time" size={16} color="#6B46C1" />
                    <Text style={styles.timeLabel}>Departure</Text>
                    <Text style={styles.timeValue}>{schedule.departureTime}</Text>
                  </View>
                  <View style={styles.timeItem}>
                    <Ionicons name="time" size={16} color="#6B46C1" />
                    <Text style={styles.timeLabel}>Arrival</Text>
                    <Text style={styles.timeValue}>{schedule.arrivalTime}</Text>
                  </View>
                </View>
                
                <View style={styles.busInfo}>
                  <Ionicons name="bus" size={16} color="#6B7280" />
                  <Text style={styles.busNumber}>{schedule.busNumber}</Text>
                </View>
              </View>
              
              <View style={styles.scheduleActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="create" size={16} color="#6B46C1" />
                  <Text style={styles.actionText}>Edit</Text>
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
  content: {
    padding: 20,
  },
  scheduleCard: {
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
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
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
  scheduleDetails: {
    marginBottom: 16,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timeItem: {
    flex: 1,
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 2,
  },
  busInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  busNumber: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  scheduleActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#6B46C1',
    marginLeft: 6,
    fontWeight: '500',
  },
});
