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

// Define interface for contact message data
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  dateReceived: string;
  isRead: boolean;
}

// Mock data for contact messages
const initialMessages: ContactMessage[] = [
  {
    id: '1',
    name: 'রফিকুল ইসলাম',
    email: 'rafiqul@example.com',
    phone: '+880 1712-345678',
    message: 'আমি আপনাদের ফাউন্ডেশনের কাজে অবদান রাখতে চাই। কীভাবে যোগাযোগ করতে পারি?',
    dateReceived: '2023-09-28',
    isRead: false,
  },
  {
    id: '2',
    name: 'সালমা বেগম',
    email: 'salma@example.com',
    phone: '+880 1812-987654',
    message: 'আমাদের এলাকায় দরিদ্র মানুষদের জন্য একটি মেডিকেল ক্যাম্প আয়োজন করতে চাই। এ ব্যাপারে আপনাদের সহযোগিতা চাই।',
    dateReceived: '2023-09-25',
    isRead: false,
  },
  {
    id: '3',
    name: 'কামরুল হাসান',
    email: 'kamrul@example.com',
    message: 'আপনাদের পরবর্তী কর্মসূচি সম্পর্কে জানতে চাই। কোন তারিখে কোথায় অনুষ্ঠিত হবে?',
    dateReceived: '2023-09-20',
    isRead: true,
  },
  {
    id: '4',
    name: 'নাসরিন আক্তার',
    email: 'nasrin@example.com',
    phone: '+880 1912-223344',
    message: 'আমি একজন শিক্ষক। আমাদের স্কুলে আপনাদের ফাউন্ডেশনের পক্ষ থেকে বই বিতরণ কর্মসূচি করতে চাই।',
    dateReceived: '2023-09-15',
    isRead: true,
  },
  {
    id: '5',
    name: 'আব্দুল্লাহ আল মামুন',
    email: 'mamun@example.com',
    phone: '+880 1612-112233',
    message: 'আমি আপনাদের ফাউন্ডেশনের সাথে একটি প্রোজেক্টে কাজ করতে আগ্রহী। আমার সিভি পাঠাতে চাই। কোথায় পাঠাতে পারি?',
    dateReceived: '2023-09-10',
    isRead: false,
  }
];

export default function MessagesManagement() {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [filterUnread, setFilterUnread] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter messages based on search query and read/unread filter
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
      message.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesReadFilter = filterUnread ? !message.isRead : true;
    
    return matchesSearch && matchesReadFilter;
  });
  
  // Sort messages by date (most recent first) and unread first
  const sortedMessages = [...filteredMessages].sort((a, b) => {
    // Unread messages first
    if (a.isRead !== b.isRead) {
      return a.isRead ? 1 : -1;
    }
    
    // Then by date (most recent first)
    return new Date(b.dateReceived).getTime() - new Date(a.dateReceived).getTime();
  });

  const handleBackToAdmin = () => {
    router.back();
  };

  const handleViewMessage = (message: ContactMessage) => {
    // Mark message as read
    if (!message.isRead) {
      const updatedMessages = messages.map(msg => {
        if (msg.id === message.id) {
          return { ...msg, isRead: true };
        }
        return msg;
      });
      
      setMessages(updatedMessages);
    }
    
    setSelectedMessage(message);
    setMessageModalVisible(true);
  };

  const handleReplyToMessage = () => {
    setMessageModalVisible(false);
    setReplyModalVisible(true);
    setReplyText('');
  };

  const handleSendReply = () => {
    if (replyText.trim() === '') {
      Alert.alert('Error', 'Reply message cannot be empty');
      return;
    }
    
    // In a real app, this would send an email or save the reply
    Alert.alert(
      'Reply Sent',
      `Your reply to ${selectedMessage?.name} has been sent successfully.`
    );
    
    setReplyModalVisible(false);
    setReplyText('');
  };

  const handleDeleteMessage = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this message?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedMessages = messages.filter(message => message.id !== id);
            setMessages(updatedMessages);
            
            if (selectedMessage?.id === id) {
              setMessageModalVisible(false);
              setSelectedMessage(null);
            }
            
            Alert.alert('Success', 'Message deleted successfully!');
          },
        },
      ]
    );
  };

  const handleMarkAsRead = (id: string) => {
    const updatedMessages = messages.map(message => {
      if (message.id === id) {
        return { ...message, isRead: true };
      }
      return message;
    });
    
    setMessages(updatedMessages);
  };

  const handleMarkAsUnread = (id: string) => {
    const updatedMessages = messages.map(message => {
      if (message.id === id) {
        return { ...message, isRead: false };
      }
      return message;
    });
    
    setMessages(updatedMessages);
  };

  const getUnreadCount = () => {
    return messages.filter(message => !message.isRead).length;
  };

  const renderMessageItem = ({ item }: { item: ContactMessage }) => (
    <TouchableOpacity
      style={[
        tw`bg-white rounded-xl p-4 mb-4 shadow-md`,
        !item.isRead && tw`border-l-4 border-primary`
      ]}
      onPress={() => handleViewMessage(item)}
    >
      <View style={tw`flex-row justify-between items-start mb-2`}>
        <View>
          <Text style={tw`text-lg font-bold text-neutral-800`}>{item.name}</Text>
          <Text style={tw`text-neutral-500 text-sm`}>{item.email}</Text>
          {item.phone && (
            <Text style={tw`text-neutral-500 text-sm`}>{item.phone}</Text>
          )}
        </View>
        <View style={tw`flex-row items-center`}>
          {!item.isRead && (
            <View style={tw`bg-primary rounded-full w-3 h-3 mr-2`} />
          )}
          <Text style={tw`text-neutral-500 text-sm`}>{item.dateReceived}</Text>
        </View>
      </View>
      
      <Text 
        style={tw`text-neutral-700 mt-1`}
        numberOfLines={2}
      >
        {item.message}
      </Text>
      
      <View style={tw`flex-row justify-end mt-3`}>
        {item.isRead ? (
          <TouchableOpacity
            style={tw`flex-row items-center px-3 py-2 bg-neutral-200 rounded-lg mr-2`}
            onPress={() => handleMarkAsUnread(item.id)}
          >
            <FontAwesome5 name="envelope" size={14} color="#555" style={tw`mr-2`} />
            <Text style={tw`text-neutral-700`}>Mark as Unread</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={tw`flex-row items-center px-3 py-2 bg-neutral-200 rounded-lg mr-2`}
            onPress={() => handleMarkAsRead(item.id)}
          >
            <FontAwesome5 name="envelope-open" size={14} color="#555" style={tw`mr-2`} />
            <Text style={tw`text-neutral-700`}>Mark as Read</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={tw`flex-row items-center px-3 py-2 bg-red-500 rounded-lg`}
          onPress={() => handleDeleteMessage(item.id)}
        >
          <FontAwesome5 name="trash" size={14} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white`}>Delete</Text>
        </TouchableOpacity>
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
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity
            style={tw`mr-4`}
            onPress={handleBackToAdmin}
          >
            <FontAwesome5 name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <View>
            <Text style={tw`text-white text-2xl font-bold`}>Contact Messages</Text>
            <Text style={tw`text-white opacity-80`}>
              {getUnreadCount()} unread messages
            </Text>
          </View>
        </View>
      </LinearGradient>
      
      {/* Search & Filter Bar */}
      <View style={tw`px-4 py-3 bg-white shadow-sm`}>
        <View style={tw`flex-row items-center bg-neutral-100 px-3 py-2 rounded-lg mb-3`}>
          <FontAwesome5 name="search" size={16} color="#666" style={tw`mr-2`} />
          <TextInput
            style={tw`flex-1 text-neutral-800`}
            placeholder="Search messages..."
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
          style={tw`flex-row items-center`}
          onPress={() => setFilterUnread(!filterUnread)}
        >
          <FontAwesome5 
            name={filterUnread ? "check-square" : "square"} 
            size={18} 
            color="#0A5F52"
            style={tw`mr-2`}
          />
          <Text style={tw`text-neutral-700`}>Show only unread messages</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={tw`flex-1`} 
        contentContainerStyle={tw`p-4 pb-20`}
        showsVerticalScrollIndicator={false}
      >
        {sortedMessages.length > 0 ? (
          <FlatList
            data={sortedMessages}
            renderItem={renderMessageItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        ) : (
          <View style={tw`py-10 items-center justify-center`}>
            <FontAwesome5 name="envelope-open" size={48} color="#ccc" />
            <Text style={tw`text-neutral-500 mt-4 text-center`}>
              {searchQuery || filterUnread
                ? 'No messages match your criteria'
                : 'No messages available'}
            </Text>
          </View>
        )}
      </ScrollView>
      
      {/* Message View Modal */}
      <Modal
        visible={messageModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMessageModalVisible(false)}
      >
        <View style={tw`flex-1 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl shadow-lg p-4 h-4/5`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-bold text-neutral-800`}>
                Message Details
              </Text>
              <TouchableOpacity onPress={() => setMessageModalVisible(false)}>
                <FontAwesome5 name="times" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            
            {selectedMessage && (
              <>
                <View style={tw`p-4 bg-neutral-100 rounded-xl mb-4`}>
                  <View style={tw`flex-row justify-between mb-2`}>
                    <Text style={tw`text-lg font-bold text-neutral-800`}>{selectedMessage.name}</Text>
                    <Text style={tw`text-neutral-500`}>{selectedMessage.dateReceived}</Text>
                  </View>
                  
                  <Text style={tw`text-neutral-600 mb-1`}>{selectedMessage.email}</Text>
                  {selectedMessage.phone && (
                    <Text style={tw`text-neutral-600 mb-3`}>{selectedMessage.phone}</Text>
                  )}
                </View>
                
                <View style={tw`mb-6`}>
                  <Text style={tw`text-neutral-600 mb-2 font-bold`}>Message:</Text>
                  <ScrollView style={tw`bg-neutral-50 p-3 rounded-lg max-h-48`}>
                    <Text style={tw`text-neutral-800 leading-5`}>
                      {selectedMessage.message}
                    </Text>
                  </ScrollView>
                </View>
                
                <View style={tw`flex-row justify-end`}>
                  <TouchableOpacity
                    style={tw`flex-row items-center px-3 py-2 bg-neutral-200 rounded-lg mr-3`}
                    onPress={() => handleDeleteMessage(selectedMessage.id)}
                  >
                    <FontAwesome5 name="trash" size={14} color="#555" style={tw`mr-2`} />
                    <Text style={tw`text-neutral-700`}>Delete</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={tw`flex-row items-center px-3 py-2 bg-primary rounded-lg`}
                    onPress={handleReplyToMessage}
                  >
                    <FontAwesome5 name="reply" size={14} color="white" style={tw`mr-2`} />
                    <Text style={tw`text-white`}>Reply</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      
      {/* Reply Modal */}
      <Modal
        visible={replyModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setReplyModalVisible(false)}
      >
        <View style={tw`flex-1 justify-end`}>
          <View style={tw`bg-white rounded-t-3xl shadow-lg p-4 h-4/5`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-bold text-neutral-800`}>
                Reply to {selectedMessage?.name}
              </Text>
              <TouchableOpacity onPress={() => setReplyModalVisible(false)}>
                <FontAwesome5 name="times" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={tw`p-4 bg-neutral-100 rounded-xl mb-4`}>
              <Text style={tw`text-neutral-600 font-bold mb-1`}>Original Message:</Text>
              <Text style={tw`text-neutral-700`} numberOfLines={3}>
                {selectedMessage?.message}
              </Text>
            </View>
            
            <View style={tw`mb-4`}>
              <Text style={tw`text-neutral-600 font-bold mb-2`}>Your Reply:</Text>
              <TextInput
                style={tw`bg-neutral-100 p-3 rounded-lg text-neutral-800 min-h-[150px]`}
                value={replyText}
                onChangeText={setReplyText}
                multiline={true}
                textAlignVertical="top"
                placeholder="Type your reply here..."
              />
            </View>
            
            <View style={tw`flex-row justify-end`}>
              <TouchableOpacity
                style={tw`bg-neutral-300 py-2 px-4 rounded-lg mr-3`}
                onPress={() => setReplyModalVisible(false)}
              >
                <Text style={tw`font-bold text-neutral-700`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-primary py-2 px-4 rounded-lg`}
                onPress={handleSendReply}
              >
                <Text style={tw`font-bold text-white`}>Send Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
} 