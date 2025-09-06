import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Dashboard() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const closeSideNav = () => {
    setIsSideNavOpen(false);
  };

  const navigateToMyBuses = () => {
    // Close side nav first, then navigate after a brief delay
    closeSideNav();
    setTimeout(() => {
      router.push('/(tabs)/my-buses');
    }, 100); // Small delay to let the modal close animation complete
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6B46C1" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Hello, Bus Owner!</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications" size={24} color="#FFFFFF" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSideNav} style={styles.menuButton}>
            <Ionicons name="menu" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Revenue Live Update Card */}
        <View style={styles.revenueCard}>
          <Text style={styles.cardTitle}>Revenue Live Update</Text>
          <Text style={styles.revenueAmount}>₹12,350</Text>
          <Text style={styles.revenueSubtitle}>Total Revenue Today</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>34</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>20</Text>
              <Text style={styles.statLabel}>Seats Available</Text>
            </View>
          </View>
        </View>

        {/* Buses Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Buses Overview</Text>
          <View style={styles.busCard}>
            <View style={styles.busStatusRow}>
              <View style={styles.statusBadge}>
                <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.statusText}>On Route</Text>
              </View>
              <View style={styles.statusBadge}>
                <View style={[styles.statusDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={styles.statusText}>Parked</Text>
              </View>
              <View style={styles.statusBadge}>
                <View style={[styles.statusDot, { backgroundColor: '#EF4444' }]} />
                <Text style={styles.statusText}>Maintenance</Text>
              </View>
            </View>
            <View style={styles.busInfoRow}>
              <View style={styles.busInfoItem}>
                <Ionicons name="car" size={20} color="#6B46C1" />
                <Text style={styles.busInfoText}>Fuel: 75%</Text>
              </View>
              <View style={styles.busInfoItem}>
                <Ionicons name="construct" size={20} color="#6B46C1" />
                <Text style={styles.busInfoText}>Next Service: Oct 25</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Today's Trips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Trips</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tripCard}>
            <View style={styles.tripItem}>
              <View style={styles.tripIcon}>
                <Ionicons name="bus" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.tripDetails}>
                <Text style={styles.tripRoute}>Kochi ↔ Thrissur</Text>
                <Text style={styles.tripTime}>10:30 AM</Text>
              </View>
              <Text style={styles.tripSeats}>Seats 12</Text>
            </View>
            <View style={styles.tripItem}>
              <View style={styles.tripIcon}>
                <Ionicons name="bus" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.tripDetails}>
                <Text style={styles.tripRoute}>Ernakulam ↔ Aluva</Text>
                <Text style={styles.tripTime}>2:00 PM</Text>
              </View>
              <Text style={styles.tripSeats}>Seats 5</Text>
            </View>
          </View>
        </View>

        {/* Notifications & Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Notifications & Alerts</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.notificationCard}>
            <View style={styles.notificationItem}>
              <View style={styles.notificationIcon}>
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              </View>
              <Text style={styles.notificationText}>New booking received</Text>
            </View>
            <View style={styles.notificationItem}>
              <View style={styles.notificationIcon}>
                <Ionicons name="warning" size={20} color="#F59E0B" />
              </View>
              <Text style={styles.notificationText}>Permit renewal due in 3 days</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Side Navigation */}
      <Modal
        visible={isSideNavOpen}
        transparent={true}
        animationType="none"
        onRequestClose={closeSideNav}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.blurBackground}>
            <TouchableOpacity style={styles.modalBackground} onPress={closeSideNav} />
          </View>
          <View style={styles.sideNav}>
            <View style={styles.sideNavHeader}>
              <Text style={styles.sideNavTitle}>Menu</Text>
              <TouchableOpacity onPress={closeSideNav} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.sideNavContent}>
              <TouchableOpacity style={styles.sideNavItem}>
                <Ionicons name="home" size={20} color="#6B46C1" />
                <Text style={styles.sideNavItemText}>Dashboard</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sideNavItem} onPress={navigateToMyBuses}>
                <Ionicons name="bus" size={20} color="#6B46C1" />
                <Text style={styles.sideNavItemText}>My Buses</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sideNavItem}>
                <Ionicons name="calendar" size={20} color="#6B46C1" />
                <Text style={styles.sideNavItemText}>Schedule</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sideNavItem}>
                <Ionicons name="people" size={20} color="#6B46C1" />
                <Text style={styles.sideNavItemText}>Passengers</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sideNavItem}>
                <Ionicons name="card" size={20} color="#6B46C1" />
                <Text style={styles.sideNavItemText}>Payments</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sideNavItem}>
                <Ionicons name="analytics" size={20} color="#6B46C1" />
                <Text style={styles.sideNavItemText}>Reports</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sideNavItem}>
                <Ionicons name="settings" size={20} color="#6B46C1" />
                <Text style={styles.sideNavItemText}>Settings</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sideNavItem}>
                <Ionicons name="help-circle" size={20} color="#6B46C1" />
                <Text style={styles.sideNavItemText}>Help & Support</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.sideNavItem, styles.logoutItem]}>
                <Ionicons name="log-out" size={20} color="#EF4444" />
                <Text style={[styles.sideNavItemText, styles.logoutText]}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>
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
  menuButton: { marginLeft: 15 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginLeft: 15, position: 'relative' },
  notificationDot: { position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' },
  scrollView: { flex: 1, paddingHorizontal: 20 },
  revenueCard: { backgroundColor: '#6B46C1', borderRadius: 16, padding: 24, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  cardTitle: { fontSize: 16, color: '#E0E7FF', marginBottom: 8 },
  revenueAmount: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  revenueSubtitle: { fontSize: 14, color: '#E0E7FF', marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  statLabel: { fontSize: 12, color: '#E0E7FF', marginTop: 4 },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  seeAllText: { fontSize: 14, color: '#6B46C1', fontWeight: '500' },
  busCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  busStatusRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusText: { fontSize: 12, fontWeight: '500', color: '#374151' },
  busInfoRow: { flexDirection: 'row', justifyContent: 'space-around' },
  busInfoItem: { flexDirection: 'row', alignItems: 'center' },
  busInfoText: { fontSize: 14, color: '#6B7280', marginLeft: 6 },
  tripCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  tripItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  tripIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#6B46C1', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  tripDetails: { flex: 1 },
  tripRoute: { fontSize: 16, fontWeight: '500', color: '#1F2937' },
  tripTime: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  tripSeats: { fontSize: 14, fontWeight: '500', color: '#6B46C1' },
  notificationCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  notificationItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  notificationIcon: { marginRight: 12 },
  notificationText: { fontSize: 14, color: '#374151', flex: 1 },
  modalOverlay: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' },
  blurBackground: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' },
  modalBackground: { flex: 1 },
  sideNav: { width: 300, height: '100%', backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: -2, height: 0 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 8 },
  sideNavHeader: { backgroundColor: '#6B46C1', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sideNavTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  closeButton: { padding: 5 },
  sideNavContent: { flex: 1, paddingTop: 20 },
  sideNavItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  sideNavItemText: { fontSize: 16, color: '#374151', marginLeft: 15, fontWeight: '500' },
  logoutItem: { marginTop: 20, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  logoutText: { color: '#EF4444' },
});
