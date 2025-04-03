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
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import tw from '@/utils/tw';

interface VolunteerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateSubmitted: string;
  status: 'pending' | 'approved' | 'rejected';
  interests: string[];
  availability: string;
  experience: string;
  message: string;
}

// Mock data for volunteer applications
const mockApplications: VolunteerApplication[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    dateSubmitted: '2023-08-15',
    status: 'pending',
    interests: ['Event Planning', 'Community Outreach'],
    availability: 'Weekends, Evenings',
    experience: 'I have volunteered for several community events in the past.',
    message: 'I am excited about the opportunity to contribute to the community.'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.j@example.com',
    phone: '(555) 987-6543',
    dateSubmitted: '2023-08-12',
    status: 'approved',
    interests: ['Social Media', 'Fundraising'],
    availability: 'Weekdays',
    experience: 'I have experience in social media management and fundraising campaigns.',
    message: 'Looking forward to helping with your social media presence.'
  },
  {
    id: '3',
    name: 'Michael Lee',
    email: 'michael.lee@example.com',
    phone: '(555) 456-7890',
    dateSubmitted: '2023-08-10',
    status: 'rejected',
    interests: ['Event Planning', 'Administration'],
    availability: 'Flexible',
    experience: 'I have organized several community events.',
    message: 'I believe I can contribute significantly to your organization.'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    phone: '(555) 234-5678',
    dateSubmitted: '2023-08-08',
    status: 'pending',
    interests: ['Community Outreach', 'Education'],
    availability: 'Weekends',
    experience: 'I am a teacher with experience in community education programs.',
    message: 'I would love to help with educational outreach programs.'
  },
  {
    id: '5',
    name: 'Robert Brown',
    email: 'robert.b@example.com',
    phone: '(555) 876-5432',
    dateSubmitted: '2023-08-05',
    status: 'approved',
    interests: ['Fundraising', 'Event Planning'],
    availability: 'Evenings, Weekends',
    experience: 'I have experience in fundraising and event coordination.',
    message: 'I am passionate about helping organizations raise funds for good causes.'
  }
];

export default function VolunteerManagement() {
  const [applications, setApplications] = useState<VolunteerApplication[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<VolunteerApplication | null>(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApplications = applications.filter(app => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleBackToAdmin = () => {
    router.back();
  };

  const handleViewApplication = (application: VolunteerApplication) => {
    setSelectedApplication(application);
    setIsViewModalVisible(true);
  };

  const handleUpdateStatus = (status: 'approved' | 'rejected') => {
    if (!selectedApplication) return;
    
    // Update the application status
    const updatedApplications = applications.map(app => 
      app.id === selectedApplication.id ? {...app, status} : app
    );
    
    setApplications(updatedApplications);
    setSelectedApplication({...selectedApplication, status});
    
    Alert.alert('Success', `Application ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
  };

  const getStatusBadgeStyle = (status: string) => {
    switch(status) {
      case 'pending':
        return tw`bg-yellow-100 text-yellow-800`;
      case 'approved':
        return tw`bg-green-100 text-green-800`;
      case 'rejected':
        return tw`bg-red-100 text-red-800`;
      default:
        return '';
    }
  };

  const renderApplicationItem = ({ item }: { item: VolunteerApplication }) => (
    <View style={tw`bg-white rounded-xl p-4 mb-4 shadow-sm border border-neutral-200`}>
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <Text style={tw`text-lg font-bold text-neutral-800`}>{item.name}</Text>
        <View style={tw`px-2 py-1 rounded-full ${getStatusBadgeStyle(item.status)}`}>
          <Text style={tw`text-xs font-medium capitalize`}>{item.status}</Text>
        </View>
      </View>
      
      <View style={tw`mb-3`}>
        <Text style={tw`text-neutral-600`}>{item.email}</Text>
        <Text style={tw`text-neutral-600`}>{item.phone}</Text>
        <Text style={tw`text-neutral-500 text-sm`}>
          Submitted: {item.dateSubmitted}
        </Text>
      </View>
      
      <View style={tw`mb-3`}>
        <Text style={tw`text-neutral-600 font-medium`}>Interests:</Text>
        <Text style={tw`text-neutral-600`}>{item.interests.join(', ')}</Text>
      </View>
      
      <TouchableOpacity
        style={tw`self-end flex-row items-center px-3 py-2 bg-primary rounded-lg`}
        onPress={() => handleViewApplication(item)}
      >
        <FontAwesome5 name="eye" size={14} color="white" style={tw`mr-2`} />
        <Text style={tw`text-white`}>View Details</Text>
      </TouchableOpacity>
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
            style={tw`p-2 mr-4`}
            onPress={handleBackToAdmin}
          >
            <FontAwesome5 name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-white text-2xl font-bold`}>Volunteer Applications</Text>
        </View>
      </LinearGradient>
      
      {/* Search bar */}
      <View style={tw`p-4 bg-white border-b border-neutral-200`}>
        <View style={tw`flex-row items-center bg-neutral-100 rounded-lg px-3 py-2 mb-3`}>
          <FontAwesome5 name="search" size={16} color="#777" style={tw`mr-2`} />
          <TextInput
            style={tw`flex-1`}
            placeholder="Search by name or email..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <FontAwesome5 name="times" size={16} color="#777" />
            </TouchableOpacity>
          ) : null}
        </View>
        
        {/* Status filter tabs */}
        <View style={tw`flex-row`}>
          <TouchableOpacity
            style={[
              tw`px-3 py-1 rounded-full mr-2`,
              statusFilter === 'all' ? tw`bg-primary` : tw`bg-neutral-200`
            ]}
            onPress={() => setStatusFilter('all')}
          >
            <Text
              style={[
                tw`text-sm`,
                statusFilter === 'all' ? tw`text-white` : tw`text-neutral-700`
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              tw`px-3 py-1 rounded-full mr-2`,
              statusFilter === 'pending' ? tw`bg-yellow-500` : tw`bg-neutral-200`
            ]}
            onPress={() => setStatusFilter('pending')}
          >
            <Text
              style={[
                tw`text-sm`,
                statusFilter === 'pending' ? tw`text-white` : tw`text-neutral-700`
              ]}
            >
              Pending
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              tw`px-3 py-1 rounded-full mr-2`,
              statusFilter === 'approved' ? tw`bg-green-500` : tw`bg-neutral-200`
            ]}
            onPress={() => setStatusFilter('approved')}
          >
            <Text
              style={[
                tw`text-sm`,
                statusFilter === 'approved' ? tw`text-white` : tw`text-neutral-700`
              ]}
            >
              Approved
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              tw`px-3 py-1 rounded-full`,
              statusFilter === 'rejected' ? tw`bg-red-500` : tw`bg-neutral-200`
            ]}
            onPress={() => setStatusFilter('rejected')}
          >
            <Text
              style={[
                tw`text-sm`,
                statusFilter === 'rejected' ? tw`text-white` : tw`text-neutral-700`
              ]}
            >
              Rejected
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Applications list */}
      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`p-4 pb-20`}
        showsVerticalScrollIndicator={false}
      >
        <Text style={tw`text-lg font-bold text-neutral-800 mb-4`}>
          {filteredApplications.length} Application{filteredApplications.length !== 1 ? 's' : ''}
        </Text>
        
        <FlatList
          data={filteredApplications}
          renderItem={renderApplicationItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={tw`py-8 items-center`}>
              <Text style={tw`text-neutral-500`}>No applications found</Text>
            </View>
          }
        />
      </ScrollView>
      
      {/* Application Detail Modal */}
      <Modal
        visible={isViewModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-center p-4`}>
          <View style={tw`bg-white rounded-xl p-5 shadow-xl max-h-[80%]`}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={tw`text-xl font-bold mb-4 text-neutral-800`}>Application Details</Text>
              
              {selectedApplication && (
                <>
                  <View style={tw`mb-4 flex-row justify-between items-center`}>
                    <Text style={tw`text-lg font-bold text-neutral-800`}>{selectedApplication.name}</Text>
                    <View style={tw`px-2 py-1 rounded-full ${getStatusBadgeStyle(selectedApplication.status)}`}>
                      <Text style={tw`text-xs font-medium capitalize`}>{selectedApplication.status}</Text>
                    </View>
                  </View>
                  
                  <View style={tw`mb-4`}>
                    <Text style={tw`text-neutral-500 font-medium`}>Contact Information:</Text>
                    <Text style={tw`text-neutral-700`}>Email: {selectedApplication.email}</Text>
                    <Text style={tw`text-neutral-700`}>Phone: {selectedApplication.phone}</Text>
                    <Text style={tw`text-neutral-700`}>
                      Submitted on: {selectedApplication.dateSubmitted}
                    </Text>
                  </View>
                  
                  <View style={tw`mb-4`}>
                    <Text style={tw`text-neutral-500 font-medium`}>Availability:</Text>
                    <Text style={tw`text-neutral-700`}>{selectedApplication.availability}</Text>
                  </View>
                  
                  <View style={tw`mb-4`}>
                    <Text style={tw`text-neutral-500 font-medium`}>Interests:</Text>
                    <Text style={tw`text-neutral-700`}>{selectedApplication.interests.join(', ')}</Text>
                  </View>
                  
                  <View style={tw`mb-4`}>
                    <Text style={tw`text-neutral-500 font-medium`}>Experience:</Text>
                    <Text style={tw`text-neutral-700`}>{selectedApplication.experience}</Text>
                  </View>
                  
                  <View style={tw`mb-6`}>
                    <Text style={tw`text-neutral-500 font-medium`}>Message:</Text>
                    <Text style={tw`text-neutral-700`}>{selectedApplication.message}</Text>
                  </View>
                  
                  {selectedApplication.status === 'pending' && (
                    <View style={tw`flex-row justify-end mt-4`}>
                      <TouchableOpacity
                        style={tw`flex-row items-center mr-3 px-4 py-2 bg-red-500 rounded-lg`}
                        onPress={() => handleUpdateStatus('rejected')}
                      >
                        <FontAwesome5 name="times-circle" size={14} color="white" style={tw`mr-2`} />
                        <Text style={tw`text-white font-medium`}>Reject</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={tw`flex-row items-center px-4 py-2 bg-green-500 rounded-lg`}
                        onPress={() => handleUpdateStatus('approved')}
                      >
                        <FontAwesome5 name="check-circle" size={14} color="white" style={tw`mr-2`} />
                        <Text style={tw`text-white font-medium`}>Approve</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
              
              <TouchableOpacity
                style={tw`mt-6 py-2 bg-neutral-200 rounded-lg items-center`}
                onPress={() => {
                  setIsViewModalVisible(false);
                  setSelectedApplication(null);
                }}
              >
                <Text style={tw`text-neutral-700 font-medium`}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
} 