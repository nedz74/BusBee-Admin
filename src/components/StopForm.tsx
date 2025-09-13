import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

interface StopFormProps {
  mode: 'add' | 'edit';
  stop?: {
    id: number;
    name: string;
    time: string;
    status: string;
  };
  onSave: (stopData: { name: string; time: string }) => void;
  onCancel: () => void;
}

const StopForm: React.FC<StopFormProps> = ({ mode, stop, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: stop?.name || '',
    time: stop?.time || ''
  });
  const [showTimePicker, setShowTimePicker] = useState(false);

  const openTimePicker = () => {
    setShowTimePicker(true);
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const timeString = selectedTime.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
      setFormData({ ...formData, time: timeString });
    }
  };

  const handleSave = () => {
    if (formData.name.trim() && formData.time) {
      onSave(formData);
    }
  };

  const isFormValid = formData.name.trim() && formData.time;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {mode === 'add' ? 'Add New Stop' : 'Edit Stop Details'}
        </Text>
        <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
          <Ionicons name="close" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Stop Name</Text>
          <TextInput
            style={styles.textInput}
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
            placeholder="Enter stop name"
            autoFocus={true}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Time</Text>
          <TouchableOpacity style={styles.timeInputContainer} onPress={openTimePicker}>
            <Text style={[styles.timeInputText, formData.time ? styles.timeInputTextFilled : styles.timeInputTextPlaceholder]}>
              {formData.time || 'HH:MM'}
            </Text>
            <Ionicons name="time-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]} 
            onPress={handleSave}
            disabled={!isFormValid}
          >
            <Text style={[styles.saveButtonText, !isFormValid && styles.saveButtonTextDisabled]}>
              {mode === 'add' ? 'Add Stop' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937'
  },
  closeButton: {
    padding: 4,
    borderRadius: 4
  },
  form: {
    padding: 16
  },
  inputGroup: {
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF'
  },
  timeInputContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  timeInputText: {
    fontSize: 16,
    color: '#1F2937'
  },
  timeInputTextFilled: {
    color: '#1F2937'
  },
  timeInputTextPlaceholder: {
    color: '#9CA3AF'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center'
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600'
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center'
  },
  saveButtonDisabled: {
    backgroundColor: '#E5E7EB'
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  saveButtonTextDisabled: {
    color: '#9CA3AF'
  }
});

export default StopForm;
