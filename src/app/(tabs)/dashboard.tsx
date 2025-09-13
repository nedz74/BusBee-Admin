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
    closeSideNav();
    router.push('/sideNavScreens/my-buses');
  };

  const navigateToSchedule = () => {
    closeSideNav();
    router.push('/sideNavScreens/schedule');
  };

  const navigateToPassengers = () => {
    closeSideNav();
    router.push('/sideNavScreens/passengers');
  };

  const navigateToPayments = () => {
    closeSideNav();
    router.push('/sideNavScreens/payments');
  };

  const navigateToReports = () => {
    closeSideNav();
    router.push('/sideNavScreens/reports');
  };

  const navigateToSettings = () => {
    closeSideNav();
    router.push('/sideNavScreens/settings');
  };

  const navigateToHelpSupport = () => {
    closeSideNav();
    router.push('/sideNavScreens/help-support');
  };

  const navigateToRevenueDetails = () => {
    router.push('/sideNavScreens/revenue-details');
  };

  const navigateToBusDetails = (busId: string) => {
    router.push(`/sideNavScreens/bus-details/${busId}`);
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
        <TouchableOpacity style={styles.revenueCard} onPress={navigateToRevenueDetails}>
          <Text style={styles.cardTitle}>Revenue Live Update</Text>
          <Text style={styles.revenueAmount}>₹12,350</Text>
          <Text style={styles.revenueSubtitle}>Total Revenue Today</Text>
          <View style={styles.revenueCardFooter}>
            <Text style={styles.revenueCardFooterText}>Tap to view details</Text>
            <Ionicons name="chevron-forward" size={16} color="#E0E7FF" />
          </View>
        </TouchableOpacity>


        {/* Today's Trips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Trips</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tripCard}>
            <TouchableOpacity style={styles.tripItem} onPress={() => navigateToBusDetails('KB-01')} activeOpacity={0.7}>
              <View style={styles.tripIcon}>
                <Ionicons name="bus" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.tripDetails}>
                <Text style={styles.tripBusName}>Bus KB-01</Text>
                <Text style={styles.tripRoute}>North Paravur – High Court</Text>
              </View>
              <View style={styles.tripStatus}>
                <View style={[styles.statusIndicator, { backgroundColor: '#10B981' }]} />
                <Text style={styles.tripStatusText}>Active</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tripItem} onPress={() => navigateToBusDetails('KB-02')} activeOpacity={0.7}>
              <View style={styles.tripIcon}>
                <Ionicons name="bus" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.tripDetails}>
                <Text style={styles.tripBusName}>Bus KB-02</Text>
                <Text style={styles.tripRoute}>High Court – Kakkanad</Text>
              </View>
              <View style={styles.tripStatus}>
                <View style={[styles.statusIndicator, { backgroundColor: '#10B981' }]} />
                <Text style={styles.tripStatusText}>Active</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tripItem} onPress={() => navigateToBusDetails('KB-03')} activeOpacity={0.7}>
              <View style={styles.tripIcon}>
                <Ionicons name="bus" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.tripDetails}>
                <Text style={styles.tripBusName}>Bus KB-03</Text>
                <Text style={styles.tripRoute}>Cheranallor – Edappally</Text>
              </View>
              <View style={styles.tripStatus}>
                <View style={[styles.statusIndicator, { backgroundColor: '#EF4444' }]} />
                <Text style={styles.tripStatusText}>Inactive</Text>
              </View>
            </TouchableOpacity>
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
        animationType="slide"
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
              
              <TouchableOpacity style={styles.sideNavItem} onPress={navigateToSchedule}>
                <Ionicons name="calendar" size={20} color="#6B46C1" />
                <Text style={styles.sideNavItemText}>Schedule</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sideNavItem} onPress={navigateToPassengers}>
                <Ionicons name="people" size={20} color="#6B46C1" />
                <Text style={styles.sideNavItemText}>Passengers</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sideNavItem} onPress={navigateToPayments}>
                <Ionicons name="card" size={20} color="#6B46C1" />
                <Text style={styles.sideNavItemText}>Payments</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sideNavItem} onPress={navigateToReports}>
                <Ionicons name="analytics" size={20} color="#6B46C1" />
                <Text style={styles.sideNavItemText}>Reports</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sideNavItem} onPress={navigateToSettings}>
                <Ionicons name="settings" size={20} color="#6B46C1" />
                <Text style={styles.sideNavItemText}>Settings</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sideNavItem} onPress={navigateToHelpSupport}>
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
  revenueCardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.2)' },
  revenueCardFooterText: { fontSize: 14, color: '#E0E7FF', marginRight: 8 },
  cardTitle: { fontSize: 16, color: '#E0E7FF', marginBottom: 8 },
  revenueAmount: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  revenueSubtitle: { fontSize: 14, color: '#E0E7FF', marginBottom: 20 },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  seeAllText: { fontSize: 14, color: '#6B46C1', fontWeight: '500' },
  tripCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  tripItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  tripIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#6B46C1', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  tripDetails: { flex: 1 },
  tripBusName: { fontSize: 14, fontWeight: '700', color: '#6B46C1', marginBottom: 2 },
  tripRoute: { fontSize: 16, fontWeight: '400', color: '#1F2937' },
  tripStatus: { alignItems: 'center', justifyContent: 'flex-end', minWidth: 60 },
  statusIndicator: { width: 8, height: 8, borderRadius: 4, marginBottom: 2 },
  tripStatusText: { fontSize: 9, fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: 0.5 },
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
