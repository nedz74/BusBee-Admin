import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface BusOwnerOnboardingScreenProps {
  onComplete: (data: BusOwnerDetails) => void;
  onSkip?: () => void;
  isLoading?: boolean;
}

export interface BusOwnerDetails {
  busOwnerName: string;
  busName: string;
  busNumber: string;
  rcBookNumber: string;
}

export default function BusOwnerOnboardingScreen({
  onComplete,
  onSkip,
  isLoading = false,
}: BusOwnerOnboardingScreenProps) {
  const [formData, setFormData] = useState<BusOwnerDetails>({
    busOwnerName: '',
    busName: '',
    busNumber: '',
    rcBookNumber: '',
  });

  const [errors, setErrors] = useState<Partial<BusOwnerDetails>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<BusOwnerDetails> = {};

    if (!formData.busOwnerName.trim()) {
      newErrors.busOwnerName = 'Bus owner name is required';
    }

    if (!formData.busName.trim()) {
      newErrors.busName = 'Bus name is required';
    }

    if (!formData.busNumber.trim()) {
      newErrors.busNumber = 'Bus number is required';
    } else if (!/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/.test(formData.busNumber.toUpperCase())) {
      newErrors.busNumber = 'Invalid bus number format (e.g., KA01AB1234)';
    }

    if (!formData.rcBookNumber.trim()) {
      newErrors.rcBookNumber = 'RC book number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onComplete({
        ...formData,
        busNumber: formData.busNumber.toUpperCase(),
      });
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Onboarding',
      'Are you sure you want to skip? You can complete this later in your profile settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Skip', style: 'destructive', onPress: onSkip },
      ]
    );
  };

  const updateField = (field: keyof BusOwnerDetails, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="bus" size={32} color="#6B46C1" />
            </View>
            <Text style={styles.title}>Complete Your Profile</Text>
            <Text style={styles.subtitle}>
              Help us set up your bus management account with these essential details
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Bus Owner Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bus Owner Name *</Text>
              <TextInput
                style={[styles.input, errors.busOwnerName && styles.inputError]}
                placeholder="Enter your full name"
                value={formData.busOwnerName}
                onChangeText={(value) => updateField('busOwnerName', value)}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.busOwnerName && (
                <Text style={styles.errorText}>{errors.busOwnerName}</Text>
              )}
            </View>

            {/* Bus Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bus Name *</Text>
              <TextInput
                style={[styles.input, errors.busName && styles.inputError]}
                placeholder="Enter your bus name (e.g., City Express)"
                value={formData.busName}
                onChangeText={(value) => updateField('busName', value)}
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.busName && (
                <Text style={styles.errorText}>{errors.busName}</Text>
              )}
            </View>

            {/* Bus Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bus Number *</Text>
              <TextInput
                style={[styles.input, errors.busNumber && styles.inputError]}
                placeholder="Enter bus number (e.g., KA01AB1234)"
                value={formData.busNumber}
                onChangeText={(value) => updateField('busNumber', value.toUpperCase())}
                autoCapitalize="characters"
                autoCorrect={false}
                maxLength={10}
              />
              {errors.busNumber && (
                <Text style={styles.errorText}>{errors.busNumber}</Text>
              )}
            </View>

            {/* RC Book Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>RC Book Number *</Text>
              <TextInput
                style={[styles.input, errors.rcBookNumber && styles.inputError]}
                placeholder="Enter RC book number"
                value={formData.rcBookNumber}
                onChangeText={(value) => updateField('rcBookNumber', value)}
                autoCapitalize="characters"
                autoCorrect={false}
              />
              {errors.rcBookNumber && (
                <Text style={styles.errorText}>{errors.rcBookNumber}</Text>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={styles.primaryButtonText}>
                {isLoading ? 'Saving...' : 'Complete Setup'}
              </Text>
            </TouchableOpacity>

            {onSkip && (
              <TouchableOpacity
                style={styles.skipButton}
                onPress={handleSkip}
                disabled={isLoading}
              >
                <Text style={styles.skipButtonText}>Skip for Now</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'ArquitectaBold',
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Arquitecta',
  },
  form: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
    fontFamily: 'ArquitectaMedium',
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#3a3a3a',
    fontFamily: 'Arquitecta',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Arquitecta',
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingBottom: 20,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#6B46C1',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ArquitectaBold',
  },
  skipButton: {
    backgroundColor: 'transparent',
  },
  skipButtonText: {
    color: '#a0a0a0',
    fontSize: 16,
    fontFamily: 'Arquitecta',
  },
});
