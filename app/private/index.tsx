import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import tw from '@/utils/tw';

// Admin panel menu items - simplified to focus on content management
const adminMenuItems = [
  {
    id: '1',
    title: 'Content Management',
    icon: 'edit',
    description: 'Manage website content and pages',
    count: '7 Pages',
    color: '#6B8F71',
    route: '/private/content'
  },
  {
    id: '2',
    title: 'Gallery Management',
    icon: 'images',
    description: 'Upload and organize images for the gallery section',
    count: '24 Images',
    color: '#B86B77',
    route: '/private/gallery'
  },
  {
    id: '3',
    title: 'Volunteer Applications',
    icon: 'hands-helping',
    description: 'Review and respond to volunteer applications',
    count: '12 Pending',
    color: '#8E6AAB',
    route: '/private/volunteers'
  },
  {
    id: '4',
    title: 'Contact Messages',
    icon: 'envelope',
    description: 'View and respond to messages from the contact form',
    count: '5 Unread',
    color: '#5BA8A0',
    route: '/private/messages'
  },
  {
    id: '5',
    title: 'Announcements',
    icon: 'bullhorn',
    description: 'Manage homepage announcements and news',
    count: '2 Active',
    color: '#C7A05E',
    route: '/private/announcements'
  }
];

// Recent activities for the activity feed
const recentActivities = [
  { id: '1', action: 'New volunteer application received', time: '10 minutes ago' },
  { id: '2', action: 'Content updated in About page', time: '2 hours ago' },
  { id: '3', action: 'New image uploaded to gallery', time: '5 hours ago' },
  { id: '4', action: 'New contact message received', time: 'Yesterday' },
  { id: '5', action: 'Announcement updated', time: 'Yesterday' },
];

export default function AdminDashboard() {
  const [userName, setUserName] = useState('মারুফ হাসান মাসুম');
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => router.replace('/public'),
        },
      ]
    );
  };
  
  const handleMenuItemPress = (item: any) => {
    // Navigate to the specific admin section
    if (item.route) {
      router.push(item.route);
    } else {
      Alert.alert(`${item.title}`, `This feature is not yet implemented`);
    }
  };
  
  const renderMenuItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={tw`bg-white rounded-xl p-4 mb-4 shadow-md`}
      onPress={() => handleMenuItemPress(item)}
    >
      <View style={tw`flex-row items-start`}>
        <View style={[tw`rounded-full p-3 mr-4`, { backgroundColor: item.color }]}>
          <FontAwesome5 name={item.icon} size={24} color="white" />
        </View>
        <View style={tw`flex-1`}>
          <View style={tw`flex-row justify-between items-center mb-1`}>
            <Text style={tw`text-lg font-bold text-neutral-800`}>{item.title}</Text>
            {item.count ? (
              <Text style={tw`text-sm text-neutral-500`}>{item.count}</Text>
            ) : null}
          </View>
          <Text style={tw`text-neutral-600`}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
 
  return (
    <View style={tw`flex-1 bg-neutral-100`}>
      <StatusBar style="light" />
      
      {/* Header */}
      <LinearGradient
        colors={['#0A5F52', '#0E8573']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={tw`pt-14 pb-6 px-4`}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <View>
            <Text style={tw`text-white text-2xl font-bold`}>Admin Dashboard</Text>
            <Text style={tw`text-white opacity-80`}>Welcome back, {userName}</Text>
          </View>
          
          <TouchableOpacity
            style={tw`bg-white bg-opacity-20 p-3 rounded-full`}
            onPress={handleLogout}
          >
            <FontAwesome5 name="sign-out-alt" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView 
        style={tw`flex-1`} 
        contentContainerStyle={tw`p-4 pb-20`}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Stats */}
        <View style={tw`flex-row mb-6`}>
          <View style={tw`flex-1 bg-white rounded-xl p-4 mr-2 shadow-sm`}>
            <View style={tw`flex-row items-center justify-between mb-2`}>
              <Text style={tw`text-neutral-600`}>Unread Messages</Text>
              <FontAwesome5 name="envelope" size={16} color="#0A5F52" />
            </View>
            <Text style={tw`text-2xl font-bold text-neutral-800`}>5</Text>
          </View>
          
          <View style={tw`flex-1 bg-white rounded-xl p-4 ml-2 shadow-sm`}>
            <View style={tw`flex-row items-center justify-between mb-2`}>
              <Text style={tw`text-neutral-600`}>Pending Applications</Text>
              <FontAwesome5 name="hands-helping" size={16} color="#0A5F52" />
            </View>
            <Text style={tw`text-2xl font-bold text-neutral-800`}>12</Text>
          </View>
        </View>
        
        {/* Admin Menu */}
        <Text style={tw`text-xl font-bold text-neutral-800 mb-4`}>Management Options</Text>
        <FlatList
          data={adminMenuItems}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
        
  
        
        {/* Back to Site Button */}
        <TouchableOpacity
          style={tw`mt-6 bg-primary py-3 rounded-lg flex-row items-center justify-center`}
          onPress={() => router.replace('/public')}
        >
          <FontAwesome5 name="home" size={16} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white font-bold`}>Return to Website</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
} 