import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming
} from 'react-native-reanimated';
import apiService from '../services/api';

// Constants
const MENU_ITEMS = [
  { id: 'my-buses', title: 'My Buses', icon: 'bus', route: '/sideNavScreens/my-buses' },
  { id: 'schedule', title: 'Schedule', icon: 'calendar', route: '/sideNavScreens/schedule' },
  { id: 'passengers', title: 'Passengers', icon: 'people', route: '/sideNavScreens/passengers' },
  { id: 'payments', title: 'Payments', icon: 'card', route: '/sideNavScreens/payments' },
  { id: 'reports', title: 'Reports', icon: 'analytics', route: '/sideNavScreens/reports' },
  { id: 'settings', title: 'Settings', icon: 'settings', route: '/sideNavScreens/settings' },
  { id: 'help', title: 'Help & Support', icon: 'help-circle', route: '/sideNavScreens/help-support' },
] as const;

const BUS_DATA = [
  { id: 'KB-01', route: 'Kochi → Bangalore', status: 'active', passengers: 45, revenue: '₹12,500' },
  { id: 'KB-02', route: 'Kochi → Chennai', status: 'maintenance', passengers: 0, revenue: '₹0' },
  { id: 'KB-03', route: 'Bangalore → Kochi', status: 'active', passengers: 38, revenue: '₹9,800' },
] as const;

interface BusOwnerDetails {
  busOwnerName: string;
  busName: string;
  busNumber: string;
  rcBookNumber: string;
  hasCompletedOnboarding: boolean;
}

// Custom hook for side navigation animation
const useSideNavAnimation = () => {
  const translateX = useSharedValue(300);
  const opacity = useSharedValue(0);
  const backgroundOpacity = useSharedValue(0);

  const animate = useCallback((isOpen: boolean) => {
    translateX.value = withTiming(isOpen ? 0 : 300, { duration: 300 });
    opacity.value = withTiming(isOpen ? 1 : 0, { duration: 300 });
    backgroundOpacity.value = withTiming(isOpen ? 1 : 0, { duration: 200 });
  }, [translateX, opacity, backgroundOpacity]);

  const sideNavStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }));

  return { animate, sideNavStyle, backgroundStyle };
};

// Custom hook for bus owner data
const useBusOwnerData = () => {
  const [data, setData] = useState<BusOwnerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await apiService.getCurrentUser();
        
        if (response.success && response.data?.user?.profile) {
          const profile = response.data.user.profile;
          const hasCompletedOnboarding = profile.has_completed_onboarding || false;
          
          setData({
            busOwnerName: profile.bus_owner_name || '',
            busName: profile.bus_name || '',
            busNumber: profile.bus_number || '',
            rcBookNumber: profile.rc_book_number || '',
            hasCompletedOnboarding,
          });

          if (hasCompletedOnboarding && 
              profile.bus_owner_name && 
              profile.bus_name && 
              profile.bus_number && 
              profile.rc_book_number && 
              !profile.has_seen_verification_modal) {
            setShowModal(true);
          }
        }
      } catch (error) {
        console.error('Error loading bus owner details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const closeModal = useCallback(async () => {
    try {
      await apiService.markVerificationModalSeen();
    } catch (error) {
      console.error('Error marking verification modal as seen:', error);
    }
    setShowModal(false);
  }, []);

  return { data, loading, showModal, closeModal };
};

export default function Dashboard() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const { data: busOwnerDetails, loading: isLoadingDetails, showModal: showVerificationModal, closeModal: handleCloseVerificationModal } = useBusOwnerData();
  const { animate: animateSideNav, sideNavStyle: sideNavAnimatedStyle, backgroundStyle: backgroundAnimatedStyle } = useSideNavAnimation();

  const toggleSideNav = useCallback(() => {
    const newState = !isSideNavOpen;
    setIsSideNavOpen(newState);
    animateSideNav(newState);
  }, [isSideNavOpen, animateSideNav]);

  const closeSideNav = useCallback(() => {
    setIsSideNavOpen(false);
    animateSideNav(false);
  }, [animateSideNav]);

  const navigateToScreen = useCallback((route: string, closeNav = true) => {
    if (closeNav) closeSideNav();
    router.push(route);
  }, [closeSideNav]);

  const navigateToBusDetails = useCallback((busId: string) => {
    navigateToScreen(`/sideNavScreens/bus-details/${busId}`, false);
  }, [navigateToScreen]);

  const handleLogout = useCallback(async () => {
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
  }, []);

  // Render functions
  const renderMenuItem = useCallback((item: typeof MENU_ITEMS[number]) => (
    <TouchableOpacity
      key={item.id}
      style={styles.sideNavItem}
      onPress={() => navigateToScreen(item.route)}
    >
      <Ionicons name={item.icon as any} size={20} color="#6B46C1" />
      <Text style={styles.sideNavItemText}>{item.title}</Text>
    </TouchableOpacity>
  ), [navigateToScreen]);

  const renderBusCard = useCallback((bus: typeof BUS_DATA[number]) => (
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
  ), [navigateToBusDetails]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6B46C1" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={toggleSideNav} style={styles.menuButton}>
            <Ionicons name="menu" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications" size={24} color="#FFFFFF" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.greeting}>
            Hi, {isLoadingDetails ? 'Loading...' : (busOwnerDetails?.busOwnerName || 'Owner')}!
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Revenue Card */}
        <TouchableOpacity style={styles.revenueCard} onPress={() => navigateToScreen('/sideNavScreens/revenue-details', false)}>
          <Text style={styles.cardTitle}>Revenue Live Update</Text>
          <Text style={styles.revenueAmount}>₹12,350</Text>
          <Text style={styles.revenueSubtitle}>Total Revenue Today</Text>
          <View style={styles.revenueCardFooter}>
            <Text style={styles.revenueCardFooterText}>Tap to view details</Text>
            <Ionicons name="chevron-forward" size={16} color="#E0E7FF" />
          </View>
        </TouchableOpacity>

        {/* Bus Owner Details */}
        {busOwnerDetails && (
          <View style={styles.busOwnerCard}>
            <View style={styles.busOwnerHeader}>
              <Ionicons name="person-circle" size={24} color="#6B46C1" />
              <Text style={styles.busOwnerTitle}>Your Details</Text>
            </View>
            <View style={styles.busOwnerInfo}>
              <View style={styles.busOwnerRow}>
                <Text style={styles.busOwnerLabel}>Owner Name:</Text>
                <Text style={styles.busOwnerValue}>{busOwnerDetails.busOwnerName}</Text>
              </View>
              <View style={styles.busOwnerRow}>
                <Text style={styles.busOwnerLabel}>Bus Name:</Text>
                <Text style={styles.busOwnerValue}>{busOwnerDetails.busName}</Text>
              </View>
              <View style={styles.busOwnerRow}>
                <Text style={styles.busOwnerLabel}>Bus Number:</Text>
                <Text style={styles.busOwnerValue}>{busOwnerDetails.busNumber}</Text>
              </View>
              <View style={styles.busOwnerRow}>
                <Text style={styles.busOwnerLabel}>RC Book:</Text>
                <Text style={styles.busOwnerValue}>{busOwnerDetails.rcBookNumber}</Text>
              </View>
            </View>
          </View>
        )}

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

        {/* Notifications */}
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

      {/* Side Navigation Modal */}
      <Modal
        visible={isSideNavOpen}
        transparent={true}
        animationType="none"
        onRequestClose={closeSideNav}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.blurBackground, backgroundAnimatedStyle]}>
            <TouchableOpacity style={styles.modalBackground} onPress={closeSideNav} />
          </Animated.View>
          <Animated.View style={[styles.sideNav, sideNavAnimatedStyle]}>
            <View style={styles.sideNavHeader}>
              <View>
                <Text style={styles.sideNavTitle}>Menu</Text>
                {busOwnerDetails?.busOwnerName && (
                  <Text style={styles.sideNavSubtitle}>{busOwnerDetails.busOwnerName}</Text>
                )}
              </View>
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
          </Animated.View>
        </View>
      </Modal>

      {/* Verification Modal */}
      <Modal
        visible={showVerificationModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseVerificationModal}
      >
        <View style={styles.verificationModalOverlay}>
          <View style={styles.verificationModalContainer}>
            <View style={styles.verificationModalContent}>
              <View style={styles.verificationIconContainer}>
                <Ionicons name="checkmark-circle" size={60} color="#10B981" />
              </View>
              
              <Text style={styles.verificationTitle}>Information Submitted Successfully!</Text>
              
              <Text style={styles.verificationMessage}>
                Thank you for completing your profile setup. Your provided information has been submitted for verification to the relevant authorities.
              </Text>
              
              <Text style={styles.verificationSubMessage}>
                You will be notified once the verification process is complete. In the meantime, you can explore the dashboard and manage your bus operations.
              </Text>
              
              <TouchableOpacity
                style={styles.verificationCloseButton}
                onPress={handleCloseVerificationModal}
              >
                <Text style={styles.verificationCloseButtonText}>Got it, thanks!</Text>
              </TouchableOpacity>
            </View>
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
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  menuButton: { marginRight: 15 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  iconButton: { marginRight: 15, position: 'relative' },
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
  sideNavSubtitle: { fontSize: 14, color: '#E0E7FF', marginTop: 2, fontFamily: 'Arquitecta' },
  closeButton: { padding: 5 },
  sideNavContent: { flex: 1, paddingTop: 20 },
  sideNavItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  sideNavItemText: { fontSize: 16, color: '#374151', marginLeft: 15, fontWeight: '500' },
  logoutItem: { marginTop: 20, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  logoutText: { color: '#EF4444' },
  busOwnerCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  busOwnerHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  busOwnerTitle: { fontSize: 18, fontWeight: 'bold', color: '#374151', marginLeft: 8, fontFamily: 'ArquitectaBold' },
  busOwnerInfo: { gap: 8 },
  busOwnerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  busOwnerLabel: { fontSize: 14, color: '#6B7280', fontWeight: '500', fontFamily: 'ArquitectaMedium' },
  busOwnerValue: { fontSize: 14, color: '#374151', fontWeight: '600', fontFamily: 'ArquitectaBold' },
  verificationModalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  verificationModalContainer: { backgroundColor: '#FFFFFF', borderRadius: 20, width: '100%', maxWidth: 400, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 10 },
  verificationModalContent: { padding: 30, alignItems: 'center' },
  verificationIconContainer: { marginBottom: 20 },
  verificationTitle: { fontSize: 22, fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginBottom: 16, fontFamily: 'ArquitectaBold' },
  verificationMessage: { fontSize: 16, color: '#374151', textAlign: 'center', lineHeight: 24, marginBottom: 12, fontFamily: 'Arquitecta' },
  verificationSubMessage: { fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 20, marginBottom: 24, fontFamily: 'Arquitecta' },
  verificationCloseButton: { backgroundColor: '#6B46C1', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 32, minWidth: 160 },
  verificationCloseButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', textAlign: 'center', fontFamily: 'ArquitectaBold' },
});