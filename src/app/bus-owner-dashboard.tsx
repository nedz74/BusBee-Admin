import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import apiService from '../services/api';

// DRY: Menu items configuration
const MENU_ITEMS = [
  { id: 'my-buses', title: 'My Buses', icon: 'bus', route: '/sideNavScreens/my-buses' },
  { id: 'schedule', title: 'Schedule', icon: 'calendar', route: '/sideNavScreens/schedule' },
  { id: 'passengers', title: 'Passengers', icon: 'people', route: '/sideNavScreens/passengers' },
  { id: 'payments', title: 'Payments', icon: 'card', route: '/sideNavScreens/payments' },
  { id: 'reports', title: 'Reports', icon: 'analytics', route: '/sideNavScreens/reports' },
  { id: 'settings', title: 'Settings', icon: 'settings', route: '/sideNavScreens/settings' },
  { id: 'help', title: 'Help & Support', icon: 'help-circle', route: '/sideNavScreens/help-support' },
] as const;

// DRY: Bus data configuration
const BUS_DATA = [
  { id: 'KB-01', route: 'Kochi → Bangalore', status: 'active', passengers: 45, revenue: '₹12,500' },
  { id: 'KB-02', route: 'Kochi → Chennai', status: 'maintenance', passengers: 0, revenue: '₹0' },
  { id: 'KB-03', route: 'Bangalore → Kochi', status: 'active', passengers: 38, revenue: '₹9,800' },
] as const;

export default function Dashboard() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const closeSideNav = () => {
    setIsSideNavOpen(false);
  };

  // DRY: Generic navigation handler
  const navigateToScreen = (route: string, closeNav = true) => {
    if (closeNav) closeSideNav();
    router.push(route);
  };

  const navigateToBusDetails = (busId: string) => {
    navigateToScreen(`/sideNavScreens/bus-details/${busId}`, false);
  };

  // DRY: Reusable components
  const renderMenuItem = (item: (typeof MENU_ITEMS)[number]) => (
    <TouchableOpacity
      key={item.id}
      style={styles.sideNavItem}
      onPress={() => navigateToScreen(item.route)}
    >
      <Ionicons name={item.icon as any} size={20} color="#6B46C1" />
      <Text style={styles.sideNavItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderBusCard = (bus: (typeof BUS_DATA)[number]) => (
    <TouchableOpacity
      key={bus.id}
      style={styles.tripItem}
      onPress={() => navigateToBusDetails(bus.id)}
      activeOpacity={0.7}
    >
      <View style={styles.tripIcon}>
        <Ionicons name="bus" size={20} color="#FFFFFF" />
      </View>
      <View style={styles.tripDetails}>
        <Text style={styles.tripBusName}>Bus {bus.id}</Text>
        <Text style={styles.tripRoute}>{bus.route}</Text>
      </View>
      <View style={styles.tripStatus}>
        <View style={[
          styles.statusIndicator,
          { backgroundColor: bus.status === 'active' ? '#10B981' : '#EF4444' }
        ]} />
        <Text style={styles.tripStatusText}>{bus.status}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: async () => {
            try {
              await apiService.logout();
              router.replace('/(auth)');
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <TouchableOpacity style={styles.revenueCard} onPress={() => navigateToScreen('/sideNavScreens/revenue-details', false)}>
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
            {BUS_DATA.map(renderBusCard)}
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
              
              {MENU_ITEMS.map(renderMenuItem)}
              
              <TouchableOpacity style={[styles.sideNavItem, styles.logoutItem]} onPress={handleLogout}>
                <Ionicons name="log-out" size={20} color="#EF4444" />
                <Text style={[styles.sideNavItemText, styles.logoutText]}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>
      </View>
        </View>
      </Modal>
    </SafeAreaView>
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
