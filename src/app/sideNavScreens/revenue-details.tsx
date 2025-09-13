import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function RevenueDetails() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const periods = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'year', label: 'This Year' }
  ];

  // Sample data - in real app, this would come from API
  const revenueData = {
    today: {
      total: 12350,
      bookings: 34,
      averageTicket: 363,
      growth: '+12.5%',
      busbeeGrowth: '+5.2%'
    },
    week: {
      total: 85600,
      bookings: 245,
      averageTicket: 349,
      growth: '+8.3%',
      busbeeGrowth: '+3.1%'
    },
    month: {
      total: 342000,
      bookings: 980,
      averageTicket: 349,
      growth: '+15.2%',
      busbeeGrowth: '+6.8%'
    },
    year: {
      total: 4100000,
      bookings: 11750,
      averageTicket: 349,
      growth: '+22.1%',
      busbeeGrowth: '+9.4%'
    }
  };

  const currentData = revenueData[selectedPeriod as keyof typeof revenueData];

  // Sample user transaction history
  const transactions = [
    { id: 1, userName: 'Rajesh Kumar', route: 'Vyttila – Edappally', amount: 25, status: 'completed', time: '10:30 AM' },
    { id: 2, userName: 'Priya Sharma', route: 'Kumbalam – Thoppumpady', amount: 15, status: 'completed', time: '11:15 AM' },
    { id: 3, userName: 'Amit Patel', route: 'Vyttila – Kakkanad', amount: 35, status: 'completed', time: '2:00 PM' },
    { id: 4, userName: 'Sunita Reddy', route: 'Mulanthuruthy – Vyttila', amount: 20, status: 'completed', time: '3:30 PM' },
    { id: 5, userName: 'Vikram Singh', route: 'Cheranallor – Edappally', amount: 18, status: 'pending', time: '5:00 PM' },
    { id: 6, userName: 'Anita Joshi', route: 'Panangad – Kaloor', amount: 12, status: 'completed', time: '6:30 PM' },
    { id: 7, userName: 'Ravi Nair', route: 'Chottanikara – Kaloor', amount: 28, status: 'completed', time: '7:15 PM' },
    { id: 8, userName: 'Deepa Menon', route: 'Ponekkara – Kaloor', amount: 22, status: 'completed', time: '8:00 PM' },
    { id: 9, userName: 'Suresh Kumar', route: 'Thuthiyoor – Ernakulam South', amount: 16, status: 'completed', time: '8:45 PM' },
    { id: 10, userName: 'Lakshmi Devi', route: 'Tripunithura – Puthencruz', amount: 30, status: 'completed', time: '9:30 PM' },
  ];

  // Revenue breakdown by route
  const routeBreakdown = [
    { route: 'Vyttila – Edappally', amount: 4500, percentage: 36.4, color: '#6B46C1' },
    { route: 'Kumbalam – Thoppumpady', amount: 3200, percentage: 25.9, color: '#10B981' },
    { route: 'Vyttila – Kakkanad', amount: 2800, percentage: 22.7, color: '#F59E0B' },
    { route: 'Mulanthuruthy – Vyttila', amount: 1850, percentage: 15.0, color: '#EF4444' },
    { route: 'Cheranallor – Edappally', amount: 1200, percentage: 9.7, color: '#8B5CF6' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return 'checkmark-circle';
      case 'pending': return 'time';
      case 'cancelled': return 'close-circle';
      default: return 'help-circle';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6B46C1" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Revenue Details</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                selectedPeriod === period.key && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period.key && styles.periodButtonTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Revenue Overview Cards */}
        <View style={styles.overviewCards}>
          <View style={styles.overviewCard}>
            <Text style={styles.overviewCardTitle}>Total Revenue</Text>
            <Text style={styles.overviewCardAmount}>₹{currentData.total.toLocaleString()}</Text>
            <View style={styles.growthContainer}>
              <Ionicons name="trending-up" size={16} color="#10B981" />
              <Text style={styles.growthText}>{currentData.growth}</Text>
            </View>
          </View>

          <View style={styles.overviewCard}>
            <Text style={styles.overviewCardTitle}>BusBee Profit</Text>
            <Text style={styles.overviewCardAmount}>₹{Math.round(currentData.total * 0.15).toLocaleString()}</Text>
            <View style={styles.growthContainer}>
              <Ionicons name="trending-up" size={16} color="#10B981" />
              <Text style={styles.growthText}>{currentData.busbeeGrowth}</Text>
            </View>
          </View>
        </View>

        {/* Revenue Breakdown Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue by Route</Text>
          <View style={styles.chartContainer}>
            {routeBreakdown.map((item, index) => (
              <View key={index} style={styles.chartItem}>
                <View style={styles.chartItemHeader}>
                  <View style={[styles.chartColorDot, { backgroundColor: item.color }]} />
                  <Text style={styles.chartRouteName}>{item.route}</Text>
                  <Text style={styles.chartAmount}>₹{item.amount.toLocaleString()}</Text>
                </View>
                <View style={styles.chartBarContainer}>
                  <View style={styles.chartBarBackground}>
                    <View 
                      style={[
                        styles.chartBar, 
                        { 
                          width: `${item.percentage}%`, 
                          backgroundColor: item.color 
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.chartPercentage}>{item.percentage}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Transaction History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transaction History</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transactionCard}>
            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={styles.transactionIcon}>
                    <Ionicons 
                      name={getStatusIcon(transaction.status)} 
                      size={20} 
                      color={getStatusColor(transaction.status)} 
                    />
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionUserName}>{transaction.userName}</Text>
                    <Text style={styles.transactionTime}>{transaction.time}</Text>
                    <Text style={styles.transactionRoute}>{transaction.route}</Text>
                  </View>
                </View>
                <View style={styles.transactionRight}>
                  <Text style={styles.transactionAmount}>₹{transaction.amount}</Text>
                  <Text style={[styles.transactionStatus, { color: getStatusColor(transaction.status) }]}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Revenue Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue Insights</Text>
          <View style={styles.insightsCard}>
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <Ionicons name="trending-up" size={24} color="#10B981" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Peak Hours</Text>
                <Text style={styles.insightDescription}>10:00 AM - 12:00 PM & 6:00 PM - 8:00 PM</Text>
              </View>
            </View>
            
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <Ionicons name="bus" size={24} color="#6B46C1" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Most Profitable Route</Text>
                <Text style={styles.insightDescription}>Kochi ↔ Thrissur (₹4,500)</Text>
              </View>
            </View>
            
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <Ionicons name="people" size={24} color="#F59E0B" />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Average Occupancy</Text>
                <Text style={styles.insightDescription}>78% across all routes</Text>
              </View>
            </View>
          </View>
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
  
  // Period Selector
  periodSelector: { 
    flexDirection: 'row', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    padding: 4, 
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  periodButton: { 
    flex: 1, 
    paddingVertical: 12, 
    alignItems: 'center', 
    borderRadius: 8 
  },
  periodButtonActive: { backgroundColor: '#6B46C1' },
  periodButtonText: { fontSize: 14, fontWeight: '500', color: '#6B7280' },
  periodButtonTextActive: { color: '#FFFFFF' },
  
  // Overview Cards
  overviewCards: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 24 
  },
  overviewCard: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    padding: 20, 
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  overviewCardTitle: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  overviewCardAmount: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  growthContainer: { flexDirection: 'row', alignItems: 'center' },
  growthText: { fontSize: 12, color: '#10B981', marginLeft: 4, fontWeight: '500' },
  
  // Section
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  seeAllText: { fontSize: 14, color: '#6B46C1', fontWeight: '500' },
  
  // Chart
  chartContainer: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  chartItem: { marginBottom: 16 },
  chartItemHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  chartColorDot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  chartRouteName: { flex: 1, fontSize: 14, fontWeight: '500', color: '#1F2937' },
  chartAmount: { fontSize: 14, fontWeight: 'bold', color: '#1F2937' },
  chartBarContainer: { flexDirection: 'row', alignItems: 'center' },
  chartBarBackground: { flex: 1, height: 8, backgroundColor: '#F3F4F6', borderRadius: 4, marginRight: 8 },
  chartBar: { height: 8, borderRadius: 4 },
  chartPercentage: { fontSize: 12, color: '#6B7280', fontWeight: '500' },
  
  // Transactions
  transactionCard: { backgroundColor: '#FFFFFF', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  transactionItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 16, 
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  transactionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  transactionIcon: { marginRight: 12 },
  transactionDetails: { flex: 1 },
  transactionUserName: { fontSize: 16, fontWeight: '500', color: '#1F2937', marginBottom: 2 },
  transactionTime: { fontSize: 14, color: '#6B7280', marginBottom: 2 },
  transactionRoute: { fontSize: 14, color: '#6B46C1', fontWeight: '500' },
  transactionRight: { alignItems: 'flex-end' },
  transactionAmount: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 2 },
  transactionStatus: { fontSize: 12, fontWeight: '500' },
  
  // Insights
  insightsCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  insightItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  insightIcon: { marginRight: 16 },
  insightContent: { flex: 1 },
  insightTitle: { fontSize: 16, fontWeight: '500', color: '#1F2937', marginBottom: 2 },
  insightDescription: { fontSize: 14, color: '#6B7280' }
});
