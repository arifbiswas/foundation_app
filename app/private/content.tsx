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

// Define page structure for content management
interface ContentSection {
  id: string;
  title: string;
  content: string;
  translationKey?: string;
}

interface PageContent {
  id: string;
  name: string;
  route: string;
  icon: string;
  lastUpdated: string;
  sections: ContentSection[];
}

// Mock data for page content
const pagesContent: PageContent[] = [
  {
    id: '1',
    name: 'Home Page',
    route: '/public/index',
    icon: 'home',
    lastUpdated: '2 hours ago',
    sections: [
      {
        id: '101',
        title: 'Headline',
        content: 'শোষণহীন সমাজ গড়তে আমরা সবাই একসাথে কাজ করছি',
        translationKey: 'homeHeadline'
      },
      {
        id: '102',
        title: 'Subheadline',
        content: 'কী করছি আমরা',
        translationKey: 'homeSubheadline'
      },
      {
        id: '103',
        title: 'Carousel Title',
        content: 'যারা আমরা',
        translationKey: 'carouselTitle'
      },
      {
        id: '104',
        title: 'Scrolling Announcements',
        content: 'সম্প্রতি আমরা পাচটি নতুন এলাকায় কাজ শরু করেছি! | আমাদের ফাউন্ডেশনের সদস্য হতে আবেদন করন',
        translationKey: 'scrollingAnnouncements'
      }
    ]
  },
  {
    id: '2',
    name: 'About Page',
    route: '/public/about',
    icon: 'info-circle',
    lastUpdated: '2 days ago',
    sections: [
      {
        id: '201',
        title: 'Mission',
        content: 'আমাদের মিশন হচ্ছে সমাজের অবহেলিত মানুষদের পাশে দাঁড়ানো এবং তাদের জীবনমান উন্নয়নে কাজ করা।',
        translationKey: 'mission'
      },
      {
        id: '202',
        title: 'Vision',
        content: 'আমরা একটি এমন সমাজ কল্পনা করি যেখানে প্রত্যেকটি মানুষের মৌলিক চাহিদাগুলি পূরণ হয় এবং তারা সম্মানের সাথে বাঁচতে পারে।',
        translationKey: 'vision'
      },
      {
        id: '203',
        title: 'Values',
        content: 'সততা, সহমর্মিতা, সেবা, অংশগ্রহণ',
        translationKey: 'values'
      }
    ]
  },
  {
    id: '3',
    name: 'Gallery Page',
    route: '/public/gallery',
    icon: 'images',
    lastUpdated: '5 hours ago',
    sections: [
      {
        id: '301',
        title: 'Gallery Headline',
        content: 'আমাদের কার্যক্রমের ছবি',
        translationKey: 'galleryHeadline'
      },
      {
        id: '302',
        title: 'Gallery Subheadline',
        content: 'আমাদের সম্প্রতি কার্যক্রম',
        translationKey: 'gallerySubheadline'
      }
    ]
  },
  {
    id: '4',
    name: 'Volunteer Page',
    route: '/public/volunteer',
    icon: 'hands-helping',
    lastUpdated: '1 week ago',
    sections: [
      {
        id: '401',
        title: 'Volunteer Headline',
        content: 'আমাদের সাথে যোগ দিন',
        translationKey: 'volunteerHeadline'
      },
      {
        id: '402',
        title: 'Volunteer Introduction',
        content: 'আমাদের সাথে কাজ করতে এবং সমাজ পরিবর্তনে অংশ নিতে আগ্রহী? আমাদের ফাউন্ডেশনে স্বেচ্ছাসেবক হিসেবে যোগ দিন।',
        translationKey: 'volunteerIntro'
      },
      {
        id: '403',
        title: 'Application Headline',
        content: 'আবেদন ফর্ম',
        translationKey: 'applicationHeadline'
      }
    ]
  },
  {
    id: '5',
    name: 'Politics Page',
    route: '/public/politics',
    icon: 'landmark',
    lastUpdated: '3 weeks ago',
    sections: [
      {
        id: '501',
        title: 'Politics Headline',
        content: 'রাজনৈতিক দর্শন',
        translationKey: 'politicsHeadline'
      },
      {
        id: '502',
        title: 'Politics Introduction',
        content: 'আমাদের রাজনৈতিক দর্শন সম্পর্কে তথ্য',
        translationKey: 'politicsIntro'
      }
    ]
  },
  {
    id: '6',
    name: 'My Info Page',
    route: '/public/myinfo',
    icon: 'user-alt',
    lastUpdated: '1 month ago',
    sections: [
      {
        id: '601',
        title: 'Personal Info Headline',
        content: 'আমার সম্পর্কে',
        translationKey: 'myInfoHeadline'
      },
      {
        id: '602',
        title: 'Biography',
        content: 'মারুফ হাসান মাসুম একজন সমাজকর্মী যিনি পিছিয়ে পড়া মানুষদের কল্যাণে কাজ করছেন।',
        translationKey: 'biographyContent'
      }
    ]
  },
  {
    id: '7',
    name: 'Contact Page',
    route: '/public/contact',
    icon: 'envelope',
    lastUpdated: '2 weeks ago',
    sections: [
      {
        id: '701',
        title: 'Contact Headline',
        content: 'যোগাযোগ করুন',
        translationKey: 'contactHeadline'
      },
      {
        id: '702',
        title: 'Contact Introduction',
        content: 'আমাদের সাথে যোগাযোগ করতে নিম্নের ফর্মটি পূরণ করুন।',
        translationKey: 'contactIntro'
      },
      {
        id: '703',
        title: 'Address',
        content: 'ঢাকা, বাংলাদেশ',
        translationKey: 'address'
      },
      {
        id: '704', 
        title: 'Email',
        content: 'info@example.com',
        translationKey: 'email'
      },
      {
        id: '705',
        title: 'Phone',
        content: '+880 1234 567890',
        translationKey: 'phone'
      }
    ]
  }
];

export default function ContentManagement() {
  const [pages, setPages] = useState<PageContent[]>(pagesContent);
  const [selectedPage, setSelectedPage] = useState<PageContent | null>(null);
  const [selectedSection, setSelectedSection] = useState<ContentSection | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingContent, setEditingContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter pages based on search query
  const filteredPages = pages.filter(page => 
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBackToAdmin = () => {
    router.back();
  };

  const handleSelectPage = (page: PageContent) => {
    setSelectedPage(page);
  };

  const handleBackToPages = () => {
    setSelectedPage(null);
  };

  const handleEditSection = (section: ContentSection) => {
    setSelectedSection(section);
    setEditingContent(section.content);
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (!selectedSection || !selectedPage) return;

    // Update the section content
    const updatedPages = pages.map(page => {
      if (page.id === selectedPage.id) {
        return {
          ...page,
          lastUpdated: 'Just now',
          sections: page.sections.map(section => {
            if (section.id === selectedSection.id) {
              return {
                ...section,
                content: editingContent
              };
            }
            return section;
          })
        };
      }
      return page;
    });

    setPages(updatedPages);
    
    // Update the selected page
    const updatedPage = updatedPages.find(p => p.id === selectedPage.id);
    if (updatedPage) {
      setSelectedPage(updatedPage);
    }

    // Close the modal
    setEditModalVisible(false);
    setSelectedSection(null);
    
    // Show success message
    Alert.alert('Success', 'Content updated successfully!');
  };

  const renderPageItem = ({ item }: { item: PageContent }) => (
    <TouchableOpacity
      style={tw`bg-white rounded-xl p-4 mb-4 shadow-md`}
      onPress={() => handleSelectPage(item)}
    >
      <View style={tw`flex-row items-center`}>
        <View style={tw`w-12 h-12 bg-primary rounded-full items-center justify-center mr-4`}>
          <FontAwesome5 name={item.icon} size={20} color="white" />
        </View>
        <View style={tw`flex-1`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-lg font-bold text-neutral-800`}>{item.name}</Text>
            <Text style={tw`text-sm text-neutral-500`}>
              {item.sections.length} {item.sections.length === 1 ? 'section' : 'sections'}
            </Text>
          </View>
          <Text style={tw`text-neutral-500 text-sm`}>Last updated: {item.lastUpdated}</Text>
        </View>
        <FontAwesome5 name="chevron-right" size={16} color="#0A5F52" />
      </View>
    </TouchableOpacity>
  );

  const renderSectionItem = ({ item }: { item: ContentSection }) => (
    <View style={tw`bg-white rounded-xl p-4 mb-4 shadow-md`}>
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <Text style={tw`text-lg font-bold text-neutral-800`}>{item.title}</Text>
        <TouchableOpacity
          style={tw`bg-primary py-1 px-3 rounded-lg`}
          onPress={() => handleEditSection(item)}
        >
          <Text style={tw`text-white font-bold`}>Edit</Text>
        </TouchableOpacity>
      </View>
      
      {item.translationKey && (
        <Text style={tw`text-neutral-500 text-sm mb-2`}>Translation Key: {item.translationKey}</Text>
      )}
      
      <Text style={tw`text-neutral-700`}>
        {item.content.length > 100
          ? `${item.content.substring(0, 100)}...`
          : item.content}
      </Text>
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
            onPress={selectedPage ? handleBackToPages : handleBackToAdmin}
          >
            <FontAwesome5 name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <View>
            <Text style={tw`text-white text-2xl font-bold`}>
              {selectedPage ? selectedPage.name : 'Content Management'}
            </Text>
            <Text style={tw`text-white opacity-80`}>
              {selectedPage ? `${selectedPage.sections.length} sections to edit` : 'Edit website content'}
            </Text>
          </View>
        </View>
      </LinearGradient>
      
      {/* Search Bar */}
      {!selectedPage && (
        <View style={tw`px-4 py-3 bg-white shadow-sm`}>
          <View style={tw`flex-row items-center bg-neutral-100 px-3 py-2 rounded-lg`}>
            <FontAwesome5 name="search" size={16} color="#666" style={tw`mr-2`} />
            <TextInput
              style={tw`flex-1 text-neutral-800`}
              placeholder="Search pages..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <FontAwesome5 name="times" size={16} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      
      <ScrollView 
        style={tw`flex-1`} 
        contentContainerStyle={tw`p-4 pb-20`}
        showsVerticalScrollIndicator={false}
      >
        {selectedPage ? (
          <>
            <FlatList
              data={selectedPage.sections}
              renderItem={renderSectionItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </>
        ) : (
          <>
            <FlatList
              data={filteredPages}
              renderItem={renderPageItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </>
        )}
      </ScrollView>
      
      {/* Edit Content Modal */}
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
                {selectedSection?.title}
              </Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <FontAwesome5 name="times" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            
            {selectedSection?.translationKey && (
              <Text style={tw`text-neutral-500 text-sm mb-4`}>
                Translation Key: {selectedSection.translationKey}
              </Text>
            )}
            
            <TextInput
              style={tw`flex-1 bg-neutral-100 p-3 rounded-lg mb-4 text-neutral-800`}
              value={editingContent}
              onChangeText={setEditingContent}
              multiline={true}
              textAlignVertical="top"
            />
            
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
    </View>
  );
} 