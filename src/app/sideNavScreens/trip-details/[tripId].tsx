import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert, Animated } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import StopForm from '../../../components/StopForm';

// Move bus stops data outside component to prevent recreation
const BUS_STOPS_DATA = [
  { id: 1, name: 'North Paravur', time: '06:00', passengers: 12, status: 'departed' },
  { id: 2, name: 'Civil Station', time: '06:05', passengers: 8, status: 'passed' },
  { id: 3, name: 'Namborichante aal', time: '06:08', passengers: 5, status: 'passed' },
  { id: 4, name: 'Municipal Junction', time: '06:12', passengers: 7, status: 'passed' },
  { id: 5, name: 'KMK Junction', time: '06:15', passengers: 6, status: 'passed' },
  { id: 6, name: 'Prabhus', time: '06:18', passengers: 4, status: 'passed' },
  { id: 7, name: 'Perumpadanna', time: '06:22', passengers: 9, status: 'passed' },
  { id: 8, name: 'Perumpadanna Bridge', time: '06:25', passengers: 3, status: 'passed' },
  { id: 9, name: 'Cherai Bridge', time: '06:28', passengers: 6, status: 'passed' },
  { id: 10, name: 'Palli', time: '06:32', passengers: 8, status: 'passed' },
  { id: 11, name: 'Devaswam Nada', time: '06:35', passengers: 5, status: 'passed' },
  { id: 12, name: 'Gowreeswaram', time: '06:38', passengers: 7, status: 'passed' },
  { id: 13, name: 'Ramavarma', time: '06:42', passengers: 4, status: 'passed' },
  { id: 14, name: 'Ayyampilly', time: '06:45', passengers: 6, status: 'passed' },
  { id: 15, name: 'Janatha', time: '06:48', passengers: 8, status: 'passed' },
  { id: 16, name: 'Vadakekkara', time: '06:52', passengers: 5, status: 'passed' },
  { id: 17, name: 'Palli Hospital', time: '06:55', passengers: 7, status: 'passed' },
  { id: 18, name: 'Cheruvaippu Junction', time: '06:58', passengers: 4, status: 'passed' },
  { id: 19, name: 'Pallathamkulangara', time: '07:02', passengers: 6, status: 'passed' },
  { id: 20, name: 'Kuzhuppilly Vadakekkara', time: '07:05', passengers: 8, status: 'passed' },
  { id: 21, name: 'Kuzhuppilly', time: '07:08', passengers: 5, status: 'passed' },
  { id: 22, name: 'Illathupadi', time: '07:12', passengers: 7, status: 'passed' },
  { id: 23, name: 'Vaachakkal', time: '07:15', passengers: 4, status: 'passed' },
  { id: 24, name: 'Pazhangad', time: '07:18', passengers: 6, status: 'passed' },
  { id: 25, name: 'AEO Office', time: '07:22', passengers: 8, status: 'passed' },
  { id: 26, name: 'KPMHS', time: '07:25', passengers: 5, status: 'passed' },
  { id: 27, name: 'Edavanakad Palli', time: '07:28', passengers: 7, status: 'passed' },
  { id: 28, name: 'Aniyal', time: '07:32', passengers: 4, status: 'passed' },
  { id: 29, name: 'Nayarambalam', time: '07:35', passengers: 6, status: 'passed' },
  { id: 30, name: 'CT Office', time: '07:38', passengers: 8, status: 'passed' },
  { id: 31, name: 'ATH', time: '07:42', passengers: 5, status: 'passed' },
  { id: 32, name: 'Kochambalam', time: '07:45', passengers: 7, status: 'passed' },
  { id: 33, name: 'Kudungasseri', time: '07:48', passengers: 4, status: 'passed' },
  { id: 34, name: 'Veliyatham Parambu', time: '07:52', passengers: 6, status: 'passed' },
  { id: 35, name: 'Maanattuparambu', time: '07:55', passengers: 8, status: 'passed' },
  { id: 36, name: 'Mampilly', time: '07:58', passengers: 5, status: 'passed' },
  { id: 37, name: 'Njarackal', time: '08:02', passengers: 7, status: 'passed' },
  { id: 38, name: 'Hospital Junction', time: '08:05', passengers: 4, status: 'passed' },
  { id: 39, name: 'Perumpilly', time: '08:08', passengers: 6, status: 'passed' },
  { id: 40, name: 'Elamkunnapuzha', time: '08:12', passengers: 8, status: 'passed' },
  { id: 41, name: 'Perumalppadi', time: '08:15', passengers: 5, status: 'passed' },
  { id: 42, name: 'Malippuram', time: '08:18', passengers: 7, status: 'passed' },
  { id: 43, name: 'Malippuram Paalam', time: '08:22', passengers: 4, status: 'passed' },
  { id: 44, name: 'Valappu', time: '08:25', passengers: 6, status: 'passed' },
  { id: 45, name: 'School Muttam', time: '08:28', passengers: 8, status: 'passed' },
  { id: 46, name: 'Puthuvype', time: '08:32', passengers: 5, status: 'passed' },
  { id: 47, name: 'Company Peedika', time: '08:35', passengers: 7, status: 'passed' },
  { id: 48, name: 'Thekkan Malippuram', time: '08:38', passengers: 4, status: 'passed' },
  { id: 49, name: 'Murikkumpaadam', time: '08:42', passengers: 6, status: 'passed' },
  { id: 50, name: 'Sea Food', time: '08:45', passengers: 8, status: 'passed' },
  { id: 51, name: 'Goshree Junction', time: '08:48', passengers: 5, status: 'passed' },
  { id: 52, name: 'Panikkaru Padi', time: '08:52', passengers: 7, status: 'passed' },
  { id: 53, name: 'Vypin', time: '08:55', passengers: 4, status: 'passed' },
  { id: 54, name: 'Vallarpadam', time: '08:58', passengers: 6, status: 'passed' },
  { id: 55, name: 'Vallarpadam Junction', time: '09:02', passengers: 8, status: 'passed' },
  { id: 56, name: 'Bolgatty', time: '09:05', passengers: 5, status: 'passed' },
  { id: 57, name: 'High Court', time: '09:08', passengers: 0, status: 'arrived' }
];

// Constants moved outside component for better performance
const STATUS_COLORS = {
  'completed': '#10B981',
  'scheduled': '#6B7280',
  'in-progress': '#F59E0B',
  'cancelled': '#EF4444'
} as const;

const STOP_STATUS_COLORS = {
  'departed': '#10B981',
  'passed': '#6B7280',
  'arrived': '#3B82F6'
} as const;

const STOP_STATUS_ICONS = {
  'departed': 'play-circle' as const,
  'passed': 'checkmark-circle' as const,
  'arrived': 'flag' as const
} as const;

const TripDetails = React.memo(() => {
  const { tripId, busId, tripData } = useLocalSearchParams();
  
  // Parse trip data from JSON string
  const tripInfo = useMemo(() => {
    try {
      return tripData ? JSON.parse(tripData as string) : {};
    } catch {
      return {};
    }
  }, [tripData]);
  
  const { time, arrival, route, passengers: passengerCount, revenue, driver, status } = tripInfo;
  
  const [expandedStop, setExpandedStop] = useState<number | null>(null);
  const [showStopForm, setShowStopForm] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedStop, setSelectedStop] = useState<any>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const swipeAnimationsRef = useRef<{[key: number]: Animated.Value}>({});

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      // Clean up animations when component unmounts
      Object.values(swipeAnimationsRef.current).forEach(animation => {
        animation.stopAnimation();
      });
    };
  }, []);

  // Memoized utility functions to prevent recreation on every render
  const getStatusColor = useCallback((status: string) => {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || '#6B7280';
  }, []);

  const getStopStatusColor = useCallback((status: string) => {
    return STOP_STATUS_COLORS[status as keyof typeof STOP_STATUS_COLORS] || '#6B7280';
  }, []);

  const getStopStatusIcon = useCallback((status: string): keyof typeof Ionicons.glyphMap => {
    return STOP_STATUS_ICONS[status as keyof typeof STOP_STATUS_ICONS] || 'time';
  }, []);



  // Memoized swipe animation functions using ref to avoid setState during render
  const getSwipeAnimation = useCallback((stopId: number) => {
    if (!swipeAnimationsRef.current[stopId]) {
      swipeAnimationsRef.current[stopId] = new Animated.Value(0);
    }
    return swipeAnimationsRef.current[stopId];
  }, []);

  const handleSwipeGesture = useCallback((stopId: number, event: PanGestureHandlerGestureEvent) => {
    const { translationX, translationY } = event.nativeEvent;
    const animatedValue = getSwipeAnimation(stopId);
    
    if (Math.abs(translationX) > Math.abs(translationY) && translationX < 0) {
      animatedValue.setValue(translationX);
    }
  }, [getSwipeAnimation]);

  const handleSwipeEnd = useCallback((stopId: number, event: PanGestureHandlerGestureEvent) => {
    const { translationX, translationY, velocityX } = event.nativeEvent;
    const animatedValue = getSwipeAnimation(stopId);
    
    if (Math.abs(translationX) > Math.abs(translationY)) {
      const shouldShowDelete = translationX < -100 || velocityX < -500;
      Animated.spring(animatedValue, {
        toValue: shouldShowDelete ? -80 : 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [getSwipeAnimation]);

  // Memoized event handlers
  const handleDeleteStop = useCallback((stopId: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    Alert.alert(
      'Delete Stop',
      'Are you sure you want to delete this stop?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Stop deleted successfully!');
            const animatedValue = getSwipeAnimation(stopId);
            Animated.spring(animatedValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        }
      ]
    );
  }, [getSwipeAnimation]);

  const handleStopPress = useCallback((stopId: number) => {
    setExpandedStop(prev => prev === stopId ? null : stopId);
  }, []);

  const scrollToForm = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 350, animated: true });
  }, []);

  const handleDropdownAction = useCallback((action: string, stopId: number) => {
    const stop = BUS_STOPS_DATA.find(s => s.id === stopId);
    
    if (action === 'Edit Stop') {
      setFormMode('edit');
      setSelectedStop(stop);
      setShowStopForm(true);
      setExpandedStop(null);
      setTimeout(scrollToForm, 100);
    } else if (action === 'Add Stop') {
      setFormMode('add');
      setSelectedStop(null);
      setShowStopForm(true);
      setExpandedStop(null);
      setTimeout(scrollToForm, 100);
    }
  }, [scrollToForm]);

  const handleSaveStop = useCallback((stopData: { name: string; time: string }) => {
    if (formMode === 'add') {
      Alert.alert('Success', `New stop "${stopData.name}" added successfully!`);
    } else {
      Alert.alert('Success', `Stop "${stopData.name}" updated successfully!`);
    }
    setShowStopForm(false);
    setSelectedStop(null);
  }, [formMode]);

  const handleCancelStopForm = useCallback(() => {
    setShowStopForm(false);
    setSelectedStop(null);
  }, []);

  // Memoized calculations for trip summary
  const tripSummary = useMemo(() => {
    const totalPassengers = BUS_STOPS_DATA.reduce((sum, stop) => sum + stop.passengers, 0);
    const averageFare = totalPassengers > 0 ? Math.round(Number(revenue) / totalPassengers) : 0;
    
    return {
      totalStops: BUS_STOPS_DATA.length,
      totalPassengers,
      totalRevenue: revenue,
      averageFare
    };
  }, [revenue]);

  // Memoized Swipeable Stop Item Component
  const SwipeableStopItem = React.memo(({ stop }: { stop: any }) => {
    const animatedValue = getSwipeAnimation(stop.id);
    
    return (
      <View style={styles.stopItemWrapper}>
        <View style={styles.swipeContainer}>
          {/* Delete Button Background */}
          <View style={styles.deleteBackground}>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => handleDeleteStop(stop.id)}
            >
              <Ionicons name="trash" size={20} color="#FFFFFF" />
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
          
          {/* Main Stop Item */}
          <PanGestureHandler
            onGestureEvent={(event) => handleSwipeGesture(stop.id, event)}
            onHandlerStateChange={(event) => handleSwipeEnd(stop.id, event)}
            activeOffsetX={[-10, 10]}
            failOffsetY={[-5, 5]}
            shouldCancelWhenOutside={true}
          >
            <Animated.View 
              style={[
                styles.stopItem,
                {
                  transform: [{ translateX: animatedValue }]
                }
              ]}
            >
               <TouchableOpacity 
                 style={styles.stopItemContent}
                 onPress={() => handleStopPress(stop.id)}
                 activeOpacity={0.7}
               >
                 <View style={styles.stopLeft}>
                   <View style={[styles.stopIcon, { backgroundColor: getStopStatusColor(stop.status) }]}>
                     <Ionicons 
                       name={getStopStatusIcon(stop.status)} 
                       size={16} 
                       color="#FFFFFF" 
                     />
                   </View>
                   <View style={styles.stopDetails}>
                     <Text style={styles.stopName}>{stop.name}</Text>
                     <Text style={styles.stopTime}>{stop.time}</Text>
                     {stop.passengers > 0 && (
                       <Text style={styles.stopPassengers}>
                         {stop.passengers} passengers boarded
                       </Text>
                     )}
                   </View>
                 </View>
                 <View style={styles.stopRight}>
                   <Ionicons 
                     name={expandedStop === stop.id ? "chevron-up" : "chevron-down"} 
                     size={20} 
                     color="#6B7280" 
                   />
                 </View>
               </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        </View>
        
        {/* Dropdown Menu - Outside swipeable area */}
        {expandedStop === stop.id && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity 
              style={styles.dropdownItem}
              onPress={() => handleDropdownAction('Edit Stop', stop.id)}
            >
              <Ionicons name="create-outline" size={16} color="#9CA3AF" />
              <Text style={styles.dropdownText}>Edit Stop</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.dropdownItem}
              onPress={() => handleDropdownAction('Add Stop', stop.id)}
            >
              <Ionicons name="add-outline" size={16} color="#9CA3AF" />
              <Text style={styles.dropdownText}>Add Stop</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  });


  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6B46C1" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Details</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView ref={scrollViewRef} style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Trip Overview Card */}
        <View style={styles.overviewCard}>
          <View style={styles.tripHeader}>
            <View style={styles.tripIcon}>
              <Ionicons name="bus" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.tripInfo}>
              <Text style={styles.busNumber}>Bus {busId}</Text>
              <Text style={styles.tripRoute}>{route}</Text>
            </View>
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(status as string) }]} />
              <Text style={[styles.statusText, { color: getStatusColor(status as string) }]}>
                {status?.toString().charAt(0).toUpperCase() + status?.toString().slice(1)}
              </Text>
            </View>
          </View>
          
          <View style={styles.tripDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="time" size={20} color="#6B46C1" />
              <Text style={styles.detailLabel}>Departure:</Text>
              <Text style={styles.detailValue}>{time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="time" size={20} color="#6B46C1" />
              <Text style={styles.detailLabel}>Arrival:</Text>
              <Text style={styles.detailValue}>{arrival}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="people" size={20} color="#6B46C1" />
              <Text style={styles.detailLabel}>Passengers:</Text>
              <Text style={styles.detailValue}>{passengerCount || 0}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="card" size={20} color="#6B46C1" />
              <Text style={styles.detailLabel}>Revenue:</Text>
              <Text style={styles.detailValue}>₹{revenue}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="person" size={20} color="#6B46C1" />
              <Text style={styles.detailLabel}>Driver:</Text>
              <Text style={styles.detailValue}>{driver}</Text>
            </View>
          </View>
        </View>



        {/* Stop Form */}
        {showStopForm && (
          <StopForm
            mode={formMode}
            stop={selectedStop}
            onSave={handleSaveStop}
            onCancel={handleCancelStopForm}
          />
        )}

        {/* Bus Stops */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Route Stops</Text>
          <View style={styles.stopsCard}>
            {BUS_STOPS_DATA.map((stop: any, index: number) => (
              <SwipeableStopItem key={stop.id} stop={stop} />
            ))}
          </View>
        </View>

        {/* Trip Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Stops</Text>
              <Text style={styles.summaryValue}>{tripSummary.totalStops}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Passengers</Text>
              <Text style={styles.summaryValue}>{tripSummary.totalPassengers}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Revenue</Text>
              <Text style={styles.summaryValue}>₹{tripSummary.totalRevenue}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Average Fare</Text>
              <Text style={styles.summaryValue}>₹{tripSummary.averageFare}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
});

export default TripDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { backgroundColor: '#6B46C1', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  shareButton: { padding: 5 },
  scrollView: { flex: 1, paddingHorizontal: 20 },
  overviewCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginVertical: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  tripHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  tripIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#6B46C1', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  tripInfo: { flex: 1 },
  busNumber: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  tripRoute: { fontSize: 16, color: '#6B7280' },
  statusContainer: { alignItems: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginBottom: 4 },
  statusText: { fontSize: 12, fontWeight: '500', textTransform: 'uppercase' },
  tripDetails: { marginTop: 16 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  detailLabel: { fontSize: 14, color: '#6B7280', marginLeft: 8, marginRight: 8, minWidth: 80 },
  detailValue: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  stopsCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  stopItemWrapper: { marginBottom: 0 },
  swipeContainer: { position: 'relative', overflow: 'hidden' },
  deleteBackground: { position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  deleteButton: { justifyContent: 'center', alignItems: 'center', flex: 1, width: '100%' },
  deleteText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600', marginTop: 4 },
  stopItem: { backgroundColor: '#FFFFFF', zIndex: 2 },
  stopItemContent: { position: 'relative', paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', flexDirection: 'row', alignItems: 'center' },
  stopLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  stopIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  stopDetails: { flex: 1 },
  stopName: { fontSize: 16, fontWeight: '500', color: '#1F2937', marginBottom: 2 },
  stopTime: { fontSize: 14, color: '#6B7280', marginBottom: 2 },
  stopPassengers: { fontSize: 12, color: '#6B46C1', fontWeight: '500' },
  stopRight: { alignItems: 'center', justifyContent: 'center', paddingLeft: 12 },
  stopStatus: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase' },
  dropdownMenu: { backgroundColor: '#F8FAFC', borderTopColor: '#E5E7EB', paddingVertical: 0 },
  dropdownItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  dropdownText: { fontSize: 14, color: '#374151', marginLeft: 12, fontWeight: '500' },
  summaryCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  summaryLabel: { fontSize: 14, color: '#6B7280' },
  summaryValue: { fontSize: 16, fontWeight: '600', color: '#1F2937' }
});