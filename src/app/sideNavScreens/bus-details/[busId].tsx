import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

export default function BusDetails() {
  const { busId } = useLocalSearchParams();

  // Sample bus schedule data with North Paravur to High Court route and proper timing
  const busSchedule = {
    today: [
      { id: 1, time: '06:00', arrival: '06:45', route: 'North Paravur – High Court', type: 'trip', status: 'completed', passengers: 12, revenue: 180, driver: 'Rajesh Kumar' },
      { id: 2, time: '07:00', arrival: '07:45', route: 'High Court – North Paravur', type: 'trip', status: 'completed', passengers: 8, revenue: 120, driver: 'Suresh Nair' },
      { id: 3, time: '08:00', arrival: '08:45', route: 'North Paravur – High Court', type: 'trip', status: 'completed', passengers: 15, revenue: 225, driver: 'Rajesh Kumar' },
      { id: 4, time: '09:00', arrival: '09:45', route: 'High Court – North Paravur', type: 'trip', status: 'completed', passengers: 10, revenue: 150, driver: 'Suresh Nair' },
      { id: 5, time: '10:00', arrival: '10:45', route: 'North Paravur – High Court', type: 'trip', status: 'completed', passengers: 18, revenue: 270, driver: 'Rajesh Kumar' },
      { id: 6, time: '11:00', arrival: '11:45', route: 'High Court – North Paravur', type: 'trip', status: 'completed', passengers: 14, revenue: 210, driver: 'Suresh Nair' },
      { id: 7, time: '12:00', arrival: '12:45', route: 'North Paravur – High Court', type: 'trip', status: 'completed', passengers: 16, revenue: 240, driver: 'Rajesh Kumar' },
      { id: 8, time: '13:00', arrival: '13:45', route: 'High Court – North Paravur', type: 'trip', status: 'completed', passengers: 11, revenue: 165, driver: 'Suresh Nair' },
      { id: 9, time: '14:00', arrival: '14:45', route: 'North Paravur – High Court', type: 'trip', status: 'completed', passengers: 13, revenue: 195, driver: 'Rajesh Kumar' },
      { id: 10, time: '15:00', arrival: '15:45', route: 'High Court – North Paravur', type: 'trip', status: 'completed', passengers: 9, revenue: 135, driver: 'Suresh Nair' },
      { id: 11, time: '16:00', arrival: '16:45', route: 'North Paravur – High Court', type: 'trip', status: 'completed', passengers: 17, revenue: 255, driver: 'Rajesh Kumar' },
      { id: 12, time: '17:00', arrival: '17:45', route: 'High Court – North Paravur', type: 'trip', status: 'completed', passengers: 12, revenue: 180, driver: 'Suresh Nair' },
      { id: 13, time: '18:00', arrival: '18:45', route: 'North Paravur – High Court', type: 'trip', status: 'completed', passengers: 20, revenue: 300, driver: 'Rajesh Kumar' },
      { id: 14, time: '19:00', arrival: '19:45', route: 'High Court – North Paravur', type: 'trip', status: 'completed', passengers: 15, revenue: 225, driver: 'Suresh Nair' },
      { id: 15, time: '20:00', arrival: '20:45', route: 'North Paravur – High Court', type: 'trip', status: 'completed', passengers: 18, revenue: 270, driver: 'Rajesh Kumar' },
      { id: 16, time: '21:00', arrival: '21:45', route: 'High Court – North Paravur', type: 'trip', status: 'completed', passengers: 14, revenue: 210, driver: 'Suresh Nair' },
      { id: 17, time: '22:00', route: 'End of Service', type: 'end', status: 'completed', passengers: 0, revenue: 0, driver: '' }
    ]
  };

  const currentSchedule = busSchedule.today;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'scheduled': return '#6B7280';
      case 'in-progress': return '#F59E0B';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trip': return 'bus';
      case 'break': return 'restaurant';
      case 'maintenance': return 'construct';
      case 'end': return 'home';
      default: return 'time';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trip': return '#6B46C1';
      case 'break': return '#F59E0B';
      case 'maintenance': return '#EF4444';
      case 'end': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const navigateToTripDetails = (trip: any) => {
    if (trip.type === 'trip') {
      router.push({
        pathname: '/sideNavScreens/trip-details/[tripId]',
        params: {
          tripId: trip.id,
          busId: busId,
          time: trip.time,
          arrival: trip.arrival,
          route: trip.route,
          passengers: trip.passengers,
          revenue: trip.revenue,
          driver: trip.driver,
          status: trip.status
        }
      });
    }
  };

  const calculateStats = () => {
    const trips = currentSchedule.filter(item => item.type === 'trip' && item.status === 'completed');
    const totalPassengers = trips.reduce((sum, trip) => sum + trip.passengers, 0);
    const totalRevenue = trips.reduce((sum, trip) => sum + trip.revenue, 0);
    const completedTrips = trips.length;
    const totalScheduledTrips = currentSchedule.filter(item => item.type === 'trip').length;
    
    return { totalPassengers, totalRevenue, completedTrips, totalScheduledTrips };
  };

  const stats = calculateStats();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6B46C1" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bus {busId} Schedule</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Today Section */}
        <View style={styles.todaySection}>
          <Text style={styles.todayText}>Today</Text>
          <Text style={styles.todayDate}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.completedTrips}/{stats.totalScheduledTrips}</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalPassengers}</Text>
            <Text style={styles.statLabel}>Passengers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>₹{stats.totalRevenue}</Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>
        </View>

        {/* Schedule List */}
        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleTitle}>Daily Schedule</Text>
          {currentSchedule.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.scheduleItem} 
              onPress={() => navigateToTripDetails(item)}
              activeOpacity={item.type === 'trip' ? 0.7 : 1}
            >
              <View style={styles.scheduleLeft}>
                <View style={[styles.scheduleIcon, { backgroundColor: getTypeColor(item.type) }]}>
                  <Ionicons 
                    name={getTypeIcon(item.type)} 
                    size={16} 
                    color="#FFFFFF" 
                  />
                </View>
                <View style={styles.scheduleDetails}>
                  <Text style={styles.scheduleTime}>
                    {item.time} {item.arrival ? `- ${item.arrival}` : ''}
                  </Text>
                  <Text style={styles.scheduleRoute}>{item.route}</Text>
                  {item.type === 'trip' && item.status === 'completed' && (
                    <Text style={styles.scheduleInfo}>
                      {item.passengers} passengers • ₹{item.revenue}
                    </Text>
                  )}
                  {item.type === 'trip' && item.driver && (
                    <Text style={styles.driverInfo}>
                      Driver: {item.driver}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.scheduleRight}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
              {item.type === 'trip' && (
                <Ionicons name="chevron-forward" size={16} color="#6B7280" style={styles.chevronIcon} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { 
    backgroundColor: '#6B46C1', 
    paddingTop: 50, 
    paddingBottom: 20, 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  shareButton: { padding: 5 },
  scrollView: { flex: 1, paddingHorizontal: 20 },
  
  // Today Section
  todaySection: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    padding: 16, 
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  todayText: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  todayDate: { fontSize: 14, color: '#6B7280' },
  
  // Stats
  statsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 24 
  },
  statCard: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    padding: 16, 
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#6B7280' },
  
  // Schedule
  scheduleContainer: { marginBottom: 24 },
  scheduleTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  scheduleItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    position: 'relative'
  },
  scheduleLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  scheduleIcon: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  scheduleDetails: { flex: 1 },
  scheduleTime: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 2 },
  scheduleRoute: { fontSize: 14, color: '#374151', marginBottom: 2 },
  scheduleInfo: { fontSize: 12, color: '#6B7280' },
  driverInfo: { fontSize: 11, color: '#6B46C1', fontWeight: '500', marginTop: 2 },
  scheduleRight: { alignItems: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginBottom: 4 },
  statusText: { fontSize: 11, fontWeight: '500', textTransform: 'uppercase' },
  chevronIcon: { 
    position: 'absolute',
    bottom: 12,
    right: 12
  }
});
