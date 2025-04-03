import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
  Modal,
  Switch,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import tw from '@/utils/tw';

// Define interface for announcement data
interface Announcement {
  id: string;
  text: string;
  isActive: boolean;
  dateAdded: string;
  expiryDate?: string;
}

// Mock data for announcements
const initialAnnouncements: Announcement[] = [
  {
    id: '1',
    text: 'সম্প্রতি আমরা পাচটি নতুন এলাকায় কাজ শরু করেছি!',
    isActive: true,
    dateAdded: '2023-05-15',
    expiryDate: '2023-12-31',
  },
  {
    id: '2',
    text: 'আমাদের ফাউন্ডেশনের সদস্য হতে আবেদন করন',
    isActive: true,
    dateAdded: '2023-06-10',
  },
  {
    id: '3',
    text: 'আগামী মাসে বিশেষ সাংস্কৃতিক অনুষ্ঠান আয়োজন করা হবে',
    isActive: false,
    dateAdded: '2023-07-05',
    expiryDate: '2023-09-15',
  },
  {
    id: '4',
    text: 'দরিদ্রদের মাঝে শীতবস্ত্র বিতরণ কর্মসূচি শুরু হবে আগামী সপ্তাহে',
    isActive: false,
    dateAdded: '2023-08-01',
    expiryDate: '2023-10-30',
  },
  {
    id: '5',
    text: 'ফাউন্ডেশনের বার্ষিক সভা অনুষ্ঠিত হবে ডিসেম্বর মাসে',
    isActive: true,
    dateAdded: '2023-09-10',
    expiryDate: '2023-12-10',
  }
];

export default function AnnouncementsManagement() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [editingText, setEditingText] = useState('');
  const [editingActive, setEditingActive] = useState(false);
  const [editingExpiryDate, setEditingExpiryDate] = useState('');
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter announcements based on search query and active filter
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesActiveFilter = showOnlyActive ? announcement.isActive : true;
    return matchesSearch && matchesActiveFilter;
  });

  const handleBackToAdmin = () => {
    router.back();
  };

  const handleAddAnnouncement = () => {
    setEditingText('');
    setEditingActive(true);
    setEditingExpiryDate('');
    setAddModalVisible(true);
  };

  const handleEditAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setEditingText(announcement.text);
    setEditingActive(announcement.isActive);
    setEditingExpiryDate(announcement.expiryDate || '');
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (!selectedAnnouncement) return;

    // Update the announcement
    const updatedAnnouncements = announcements.map(announcement => {
      if (announcement.id === selectedAnnouncement.id) {
        return {
          ...announcement,
          text: editingText,
          isActive: editingActive,
          expiryDate: editingExpiryDate || undefined,
        };
      }
      return announcement;
    });

    setAnnouncements(updatedAnnouncements);
    setEditModalVisible(false);
    setSelectedAnnouncement(null);
    
    // Show success message
    Alert.alert('Success', 'Announcement updated successfully!');
  };

  const handleSaveNew = () => {
    if (editingText.trim() === '') {
      Alert.alert('Error', 'Announcement text cannot be empty');
      return;
    }

    // Create new announcement
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      text: editingText,
      isActive: editingActive,
      dateAdded: new Date().toISOString().split('T')[0],
      expiryDate: editingExpiryDate || undefined,
    };

    // Add the new announcement to the list
    setAnnouncements([newAnnouncement, ...announcements]);
    setAddModalVisible(false);
    
    // Show success message
    Alert.alert('Success', 'New announcement added successfully!');
  };

  const handleToggleActive = (id: string) => {
    // Toggle the active status of an announcement
    const updatedAnnouncements = announcements.map(announcement => {
      if (announcement.id === id) {
        return {
          ...announcement,
          isActive: !announcement.isActive,
        };
      }
      return announcement;
    });

    setAnnouncements(updatedAnnouncements);
  };

  const handleDeleteAnnouncement = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this announcement?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Delete the announcement
            const updatedAnnouncements = announcements.filter(
              announcement => announcement.id !== id
            );
            setAnnouncements(updatedAnnouncements);
            Alert.alert('Success', 'Announcement deleted successfully!');
          },
        },
      ]
    );
  };

  const renderAnnouncementItem = ({ item }: { item: Announcement }) => (
    <View style={tw`bg-white rounded-xl p-4 mb-4 shadow-md`}>
      <View style={tw`flex-row justify-between items-start mb-2`}>
        <View style={tw`flex-1 mr-2`}>
          <Text style={tw`text-lg font-bold text-neutral-800`}>{item.text}</Text>
          <View style={tw`flex-row mt-2`}>
            <Text style={tw`text-neutral-500 text-sm mr-4`}>Added: {item.dateAdded}</Text>
            {item.expiryDate && (
              <Text style={tw`text-neutral-500 text-sm`}>Expires: {item.expiryDate}</Text>
            )}
          </View>
        </View>
        <View style={tw`flex-row items-center`}>
          <View style={tw`flex-row items-center mr-2`}>
            <Text style={tw`text-neutral-500 text-sm mr-1`}>
              {item.isActive ? 'Active' : 'Inactive'}
            </Text>
            <Switch
              value={item.isActive}
              onValueChange={() => handleToggleActive(item.id)}
              trackColor={{ false: '#ddd', true: '#0A5F52' }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </View>
      
      <View style={tw`flex-row justify-end mt-2`}>
        <TouchableOpacity
          style={tw`flex-row items-center px-3 py-2 bg-neutral-200 rounded-lg mr-2`}
          onPress={() => handleEditAnnouncement(item)}
        >
          <FontAwesome5 name="edit" size={14} color="#555" style={tw`mr-2`} />
          <Text style={tw`text-neutral-700`}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center px-3 py-2 bg-red-500 rounded-lg`}
          onPress={() => handleDeleteAnnouncement(item.id)}
        >
          <FontAwesome5 name="trash" size={14} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white`}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
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
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity
            style={tw`mr-4`}
            onPress={handleBackToAdmin}
          >
            <FontAwesome5 name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <View>
            <Text style={tw`text-white text-2xl font-bold`}>Announcements</Text>
            <Text style={tw`text-white opacity-80`}>
              Manage homepage announcements
            </Text>
          </View>
        </View>
      </LinearGradient>
      
      {/* Search & Filter Bar */}
      <View style={tw`px-4 py-3 bg-white shadow-sm`}>
        <View style={tw`flex-row mb-3`}>
          <View style={tw`flex-row items-center flex-1 bg-neutral-100 px-3 py-2 rounded-lg mr-2`}>
            <FontAwesome5 name="search" size={16} color="#666" style={tw`mr-2`} />
            <TextInput
              style={tw`flex-1 text-neutral-800`}
              placeholder="Search announcements..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <FontAwesome5 name="times" size={16} color="#666" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={tw`bg-primary py-2 px-4 rounded-lg flex-row items-center`}
            onPress={handleAddAnnouncement}
          >
            <FontAwesome5 name="plus" size={14} color="white" style={tw`mr-2`} />
            <Text style={tw`text-white font-bold`}>Add</Text>
          </TouchableOpacity>
        </View>
        
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-neutral-600 mr-2`}>Show only active</Text>
          <Switch
            value={showOnlyActive}
            onValueChange={setShowOnlyActive}
            trackColor={{ false: '#ddd', true: '#0A5F52' }}
            thumbColor="#fff"
          />
        </View>
      </View>
      
      <ScrollView 
        style={tw`flex-1`} 
        contentContainerStyle={tw`p-4 pb-20`}
        showsVerticalScrollIndicator={false}
      >
        {filteredAnnouncements.length > 0 ? (
          <FlatList
            data={filteredAnnouncements}
            renderItem={renderAnnouncementItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        ) : (
          <View style={tw`py-10 items-center justify-center`}>
            <FontAwesome5 name="bullhorn" size={48} color="#ccc" />
            <Text style={tw`text-neutral-500 mt-4 text-center`}>
              {searchQuery
                ? 'No announcements match your search'
                : 'No announcements available'}
            </Text>
          </View>
        )}
      </ScrollView>
      
      {/* Edit Announcement Modal */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={tw`flex-1 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl shadow-lg p-4 h-3/5`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-bold text-neutral-800`}>
                Edit Announcement
              </Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <FontAwesome5 name="times" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={tw`mb-4`}>
              <Text style={tw`text-neutral-600 mb-2`}>Announcement Text</Text>
              <TextInput
                style={tw`bg-neutral-100 p-3 rounded-lg text-neutral-800 min-h-[100px]`}
                value={editingText}
                onChangeText={setEditingText}
                multiline={true}
                textAlignVertical="top"
              />
            </View>
            
            <View style={tw`mb-4`}>
              <Text style={tw`text-neutral-600 mb-2`}>Expiry Date (YYYY-MM-DD)</Text>
              <TextInput
                style={tw`bg-neutral-100 p-3 rounded-lg text-neutral-800`}
                value={editingExpiryDate}
                onChangeText={setEditingExpiryDate}
                placeholder="Optional expiry date (YYYY-MM-DD)"
              />
            </View>
            
            <View style={tw`flex-row items-center mb-4`}>
              <Text style={tw`text-neutral-600 mr-2`}>Active</Text>
              <Switch
                value={editingActive}
                onValueChange={setEditingActive}
                trackColor={{ false: '#ddd', true: '#0A5F52' }}
                thumbColor="#fff"
              />
            </View>
            
            <View style={tw`flex-row justify-end`}>
              <TouchableOpacity
                style={tw`bg-neutral-300 py-2 px-4 rounded-lg mr-3`}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={tw`font-bold text-neutral-700`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-primary py-2 px-4 rounded-lg`}
                onPress={handleSaveEdit}
              >
                <Text style={tw`font-bold text-white`}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Add Announcement Modal */}
      <Modal
        visible={addModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={tw`flex-1 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl shadow-lg p-4 h-3/5`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-bold text-neutral-800`}>
                Add New Announcement
              </Text>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <FontAwesome5 name="times" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={tw`mb-4`}>
              <Text style={tw`text-neutral-600 mb-2`}>Announcement Text</Text>
              <TextInput
                style={tw`bg-neutral-100 p-3 rounded-lg text-neutral-800 min-h-[100px]`}
                value={editingText}
                onChangeText={setEditingText}
                multiline={true}
                textAlignVertical="top"
                placeholder="Enter announcement text in Bengali"
              />
            </View>
            
            <View style={tw`mb-4`}>
              <Text style={tw`text-neutral-600 mb-2`}>Expiry Date (YYYY-MM-DD)</Text>
              <TextInput
                style={tw`bg-neutral-100 p-3 rounded-lg text-neutral-800`}
                value={editingExpiryDate}
                onChangeText={setEditingExpiryDate}
                placeholder="Optional expiry date (YYYY-MM-DD)"
              />
            </View>
            
            <View style={tw`flex-row items-center mb-4`}>
              <Text style={tw`text-neutral-600 mr-2`}>Active</Text>
              <Switch
                value={editingActive}
                onValueChange={setEditingActive}
                trackColor={{ false: '#ddd', true: '#0A5F52' }}
                thumbColor="#fff"
              />
            </View>
            
            <View style={tw`flex-row justify-end`}>
              <TouchableOpacity
                style={tw`bg-neutral-300 py-2 px-4 rounded-lg mr-3`}
                onPress={() => setAddModalVisible(false)}
              >
                <Text style={tw`font-bold text-neutral-700`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-primary py-2 px-4 rounded-lg`}
                onPress={handleSaveNew}
              >
                <Text style={tw`font-bold text-white`}>Add Announcement</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
} 