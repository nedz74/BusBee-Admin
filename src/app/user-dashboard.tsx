import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import apiService from '../services/api';

export default function UserDashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUserData = await apiService.getStoredUserData();
      setUserData(storedUserData);
    } catch (error) {
      // Silently handle error - user data will be null
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6B46C1" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
            <Ionicons name="log-out" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.greeting}>Hello, {userData?.name || 'User'}! 👋</Text>
          <Text style={styles.subGreeting}>Welcome to BusBee</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.userIcon}>
            <Ionicons name="person" size={40} color="#6B46C1" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userData?.name || 'User'}</Text>
            <Text style={styles.userPhone}>{userData?.phoneNumber}</Text>
            <Text style={styles.userType}>Regular User</Text>
          </View>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.featureGrid}>
            <TouchableOpacity style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name="search" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.featureTitle}>Find Buses</Text>
              <Text style={styles.featureSubtitle}>Search for bus routes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name="ticket" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.featureTitle}>My Bookings</Text>
              <Text style={styles.featureSubtitle}>View your tickets</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name="location" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.featureTitle}>Track Bus</Text>
              <Text style={styles.featureSubtitle}>Live bus tracking</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name="card" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.featureTitle}>Payments</Text>
              <Text style={styles.featureSubtitle}>Payment history</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="time" size={16} color="#6B7280" />
              </View>
              <Text style={styles.activityText}>Welcome to BusBee! Start by exploring available bus routes.</Text>
            </View>
          </View>
        </View>

        {/* Help Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need Help?</Text>
          <TouchableOpacity style={styles.helpCard}>
            <View style={styles.helpIcon}>
              <Ionicons name="help-circle" size={24} color="#6B46C1" />
            </View>
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Contact Support</Text>
              <Text style={styles.helpSubtitle}>Get help with your account or bookings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  centered: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, color: '#6B7280' },
  header: { 
    backgroundColor: '#6B46C1', 
    paddingTop: 50, 
    paddingBottom: 20, 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerRight: { flex: 1, alignItems: 'flex-end' },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  subGreeting: { fontSize: 14, color: '#E0E7FF' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginRight: 15, padding: 8 },
  scrollView: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  userIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  userPhone: { fontSize: 14, color: '#6B7280', marginBottom: 2 },
  userType: { fontSize: 12, color: '#6B46C1', fontWeight: '500' },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  verifiedText: { fontSize: 12, color: '#10B981', marginLeft: 4, fontWeight: '500' },
  
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  
  featureGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6B46C1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: { fontSize: 14, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  featureSubtitle: { fontSize: 12, color: '#6B7280' },
  
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityItem: { flexDirection: 'row', alignItems: 'center' },
  activityIcon: { marginRight: 12 },
  activityText: { fontSize: 14, color: '#374151', flex: 1 },
  
  helpCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  helpIcon: { marginRight: 16 },
  helpContent: { flex: 1 },
  helpTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 2 },
  helpSubtitle: { fontSize: 14, color: '#6B7280' },
});
