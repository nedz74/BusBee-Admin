import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HelpSupportScreen() {
  const helpSections = [
    {
      title: 'Quick Help',
      items: [
        {
          id: 'faq',
          title: 'Frequently Asked Questions',
          description: 'Find answers to common questions',
          icon: 'help-circle',
          action: 'navigate',
        },
        {
          id: 'tutorial',
          title: 'App Tutorial',
          description: 'Learn how to use the app',
          icon: 'play-circle',
          action: 'navigate',
        },
        {
          id: 'video-guide',
          title: 'Video Guides',
          description: 'Watch step-by-step tutorials',
          icon: 'videocam',
          action: 'navigate',
        },
      ],
    },
    {
      title: 'Contact Support',
      items: [
        {
          id: 'live-chat',
          title: 'Live Chat',
          description: 'Chat with our support team',
          icon: 'chatbubbles',
          action: 'chat',
        },
        {
          id: 'email',
          title: 'Email Support',
          description: 'support@busadmin.com',
          icon: 'mail',
          action: 'email',
        },
        {
          id: 'phone',
          title: 'Phone Support',
          description: '+91 98765 43210',
          icon: 'call',
          action: 'phone',
        },
      ],
    },
    {
      title: 'Resources',
      items: [
        {
          id: 'user-manual',
          title: 'User Manual',
          description: 'Complete user guide',
          icon: 'document-text',
          action: 'navigate',
        },
        {
          id: 'terms',
          title: 'Terms of Service',
          description: 'Read our terms and conditions',
          icon: 'document',
          action: 'navigate',
        },
        {
          id: 'privacy',
          title: 'Privacy Policy',
          description: 'How we protect your data',
          icon: 'shield-checkmark',
          action: 'navigate',
        },
      ],
    },
  ];

  const handleAction = (item: any) => {
    switch (item.action) {
      case 'chat':
        console.log('Opening live chat...');
        break;
      case 'email':
        Linking.openURL(`mailto:${item.description}`);
        break;
      case 'phone':
        Linking.openURL(`tel:${item.description}`);
        break;
      case 'navigate':
        console.log(`Navigating to ${item.title}...`);
        break;
      default:
        console.log(`Action: ${item.action}`);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Help & Support</Text>
        </View>

        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <Ionicons name="help-circle" size={48} color="#6B46C1" />
          </View>
          <Text style={styles.heroTitle}>How can we help you?</Text>
          <Text style={styles.heroDescription}>
            We're here to assist you with any questions or issues you might have.
          </Text>
        </View>

        <View style={styles.content}>
          {helpSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionContent}>
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.helpItem,
                      itemIndex === section.items.length - 1 && styles.lastItem,
                    ]}
                    onPress={() => handleAction(item)}
                  >
                    <View style={styles.helpLeft}>
                      <View style={styles.helpIcon}>
                        <Ionicons name={item.icon as any} size={20} color="#6B46C1" />
                      </View>
                      <View style={styles.helpInfo}>
                        <Text style={styles.helpTitle}>{item.title}</Text>
                        <Text style={styles.helpDescription}>{item.description}</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Can't find what you're looking for? Contact our support team.
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="mail" size={20} color="#FFFFFF" />
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
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
  heroSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  content: {
    paddingHorizontal: 20,
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
  helpItem: {
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
  helpLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  helpIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  helpInfo: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  helpDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B46C1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
