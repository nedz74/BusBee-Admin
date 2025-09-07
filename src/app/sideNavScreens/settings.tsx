import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Profile Settings',
          description: 'Manage your personal information',
          icon: 'person',
          type: 'navigate',
        },
        {
          id: 'password',
          title: 'Change Password',
          description: 'Update your account password',
          icon: 'lock-closed',
          type: 'navigate',
        },
        {
          id: 'notifications',
          title: 'Notification Settings',
          description: 'Manage notification preferences',
          icon: 'notifications',
          type: 'navigate',
        },
      ],
    },
    {
      title: 'Bus Management',
      items: [
        {
          id: 'bus-registration',
          title: 'Bus Registration',
          description: 'Register new buses',
          icon: 'bus',
          type: 'navigate',
        },
        {
          id: 'route-management',
          title: 'Route Management',
          description: 'Manage bus routes',
          icon: 'map',
          type: 'navigate',
        },
        {
          id: 'driver-management',
          title: 'Driver Management',
          description: 'Manage driver information',
          icon: 'person-circle',
          type: 'navigate',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'theme',
          title: 'Dark Mode',
          description: 'Switch between light and dark themes',
          icon: 'moon',
          type: 'toggle',
          value: false,
        },
        {
          id: 'language',
          title: 'Language',
          description: 'English',
          icon: 'language',
          type: 'navigate',
        },
        {
          id: 'currency',
          title: 'Currency',
          description: 'Indian Rupee (₹)',
          icon: 'cash',
          type: 'navigate',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help Center',
          description: 'Get help and support',
          icon: 'help-circle',
          type: 'navigate',
        },
        {
          id: 'contact',
          title: 'Contact Us',
          description: 'Reach out to our support team',
          icon: 'mail',
          type: 'navigate',
        },
        {
          id: 'about',
          title: 'About App',
          description: 'Version 1.0.0',
          icon: 'information-circle',
          type: 'navigate',
        },
      ],
    },
  ];

  const handleSettingPress = (item: any) => {
    // Add navigation logic here
  };

  const handleToggle = (itemId: string, value: boolean) => {
    // Add toggle logic here
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <View style={styles.content}>
          {settingsSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionContent}>
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.settingItem,
                      itemIndex === section.items.length - 1 && styles.lastItem,
                    ]}
                    onPress={() => handleSettingPress(item)}
                    disabled={item.type === 'toggle'}
                  >
                    <View style={styles.settingLeft}>
                      <View style={styles.settingIcon}>
                        <Ionicons name={item.icon as any} size={20} color="#6B46C1" />
                      </View>
                      <View style={styles.settingInfo}>
                        <Text style={styles.settingTitle}>{item.title}</Text>
                        <Text style={styles.settingDescription}>{item.description}</Text>
                      </View>
                    </View>
                    <View style={styles.settingRight}>
                      {item.type === 'toggle' ? (
                        <Switch
                          value={item.value}
                          onValueChange={(value) => handleToggle(item.id, value)}
                          trackColor={{ false: '#E5E7EB', true: '#6B46C1' }}
                          thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
                        />
                      ) : (
                        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#6B46C1',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingRight: {
    marginLeft: 12,
  },
});
