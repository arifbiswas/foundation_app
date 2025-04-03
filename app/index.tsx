import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Marquee from 'react-native-marquee';
import { router } from 'expo-router';
import tw from '../utils/tw';
import { t, tObj } from "../utils/i18n";

const { width } = Dimensions.get('window');

// Define types for our data
interface CarouselItem {
  id: string;
  image: any;
}

interface GridItem {
  id: string;
  title: string;
  icon: string;
  iconType?: string;
  color?: string;
  customIcon?: any; // Add property for custom icon
}

// Enhanced carousel data with more images from the gallery directory
const carouselData: CarouselItem[] = [
  { id: '1', image: require('../assets/images/gallery/gallery (1).jpg') },
  { id: '2', image: require('../assets/images/gallery/gallery (8).jpg') },
  { id: '3', image: require('../assets/images/gallery/gallery (9).jpg') },
  { id: '4', image: require('../assets/images/gallery/gallery (11).jpg') },
  { id: '5', image: require('../assets/images/gallery/gallery (13).jpg') },
  { id: '6', image: require('../assets/images/gallery/gallery (3).jpeg') },
  { id: '7', image: require('../assets/images/gallery/gallery (10).jpeg') },
  { id: '8', image: require('../assets/images/gallery/gallery (15).jpeg') },
  { id: '9', image: require('../assets/images/gallery/gallery (25).jpeg') },
  { id: '10', image: require('../assets/images/gallery/gallery (31).jpeg') },
];

// Convert grid items from translation
const translatedGridItems = tObj('home.gridItems');
const gridData: GridItem[] = Array.isArray(translatedGridItems) ? 
  translatedGridItems.map((item: any, index: number) => ({
    id: String(index + 1),
    title: item.title,
    icon: item.icon || 'circle', // Provide fallback icon
    iconType: 'FontAwesome5',
    color: 'primary',
    customIcon: getCustomIconForId(String(index + 1))
  })) : 
  [
    { 
      id: '1', 
      title: 'আমাদের ফাউন্ডেশন', 
      icon: 'hand-holding-heart', 
      iconType: 'FontAwesome5', 
      color: 'primary',
      customIcon: require('../assets/icons/foundation.png')
    },
    { 
      id: '2', 
      title: 'ছবি গ্যালারি', 
      icon: 'images', 
      iconType: 'FontAwesome5', 
      color: 'primary',
      customIcon: require('../assets/icons/gallery.png')
    },
    { 
      id: '3', 
      title: 'রাজনৈতিক কার্যক্রম', 
      icon: 'landmark', 
      iconType: 'FontAwesome5', 
      color: 'primary',
      customIcon: require('../assets/icons/politics.png')
    },
    { 
      id: '4', 
      title: 'আমার তথ্য', 
      icon: 'user', 
      iconType: 'FontAwesome5', 
      color: 'primary',
      customIcon: require('../assets/icons/userInfo.png')
    },
    { 
      id: '5', 
      title: 'যোগাযোগ করুন', 
      icon: 'phone-alt', 
      iconType: 'FontAwesome5', 
      color: 'primary',
      customIcon: require('../assets/icons/contact.png')
    },
    { 
      id: '6', 
      title: 'স্বেচ্ছাসেবক হন', 
      icon: 'hands-helping', 
      iconType: 'FontAwesome5', 
      color: 'primary',
      customIcon: require('../assets/icons/volunteer.png')
    }
  ];

// Helper function to get custom icon based on ID
function getCustomIconForId(id: string) {
  switch(id) {
    case '1': return require('../assets/icons/foundation.png');
    case '2': return require('../assets/icons/gallery.png');
    case '3': return require('../assets/icons/politics.png');
    case '4': return require('../assets/icons/userInfo.png');
    case '5': return require('../assets/icons/contact.png');
    case '6': return require('../assets/icons/volunteer.png');
    default: return null;
  }
}

// Announcements for scrolling headline
const announcementsFromJson = tObj('home.announcements');
const announcements = Array.isArray(announcementsFromJson) && announcementsFromJson.length > 0 ?
  announcementsFromJson : 
  [
    'স্বাস্থ্যসেবা সংস্কার বিষয়ক আসন্ন টাউন হল মিটিংয়ে যোগ দিন - জুন ১৫',
    'আগামী সপ্তাহে নতুন শিক্ষা উদ্যোগ চালু হচ্ছে - স্থানীয় স্কুল সমর্থনে আমাদের সাহায্য করুন!'
  ];

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselHeight = 280;
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  // Cycle through announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement(prev => (prev + 1) % announcements.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Function to render carousel items with image only
  const renderCarouselItem = ({ index }: { index: number }) => {
    const item = carouselData[index];
    return (
      <View style={tw`w-full h-full rounded-xl overflow-hidden shadow-lg`}>
        <Image 
          source={item.image} 
          style={tw`w-full h-full`}
          resizeMode="cover"
        />
      </View>
    );
  };

  // Function to render dot indicators
  const renderDotIndicators = () => {
    return carouselData.map((_, index) => {
      return (
        <View
          key={index}
          style={[
            tw`w-2 h-2 rounded-full mx-1.5`,
            index === activeIndex ? tw`bg-primary w-5` : tw`bg-neutral-300`,
          ]}
        />
      );
    });
  };

  // Function to render the appropriate icon based on iconType
  const renderIcon = (item: GridItem) => {
    const size = 36;
    const color = tw.color(`${item.color}`) as string;

    switch (item.iconType) {
      case 'FontAwesome5':
        return <FontAwesome5 name={item.icon as any} size={size} color={color} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={item.icon as any} size={size} color={color} />;
      default:
        return <Ionicons name={item.icon as any} size={size} color={color} />;
    }
  };

  // Function to handle grid item press
  const handleGridItemPress = (item: GridItem) => {
    switch(item.id) {
      case '1': // Foundation
        router.push('/about');
        break;
      case '2': // Gallery
        router.push('/gallery');
        break;
      case '3': // Political Activities
        router.push('/politics');
        break;
      case '4': // My Information
        router.push('/myinfo');
        break;
      case '5': // Contact Us
        router.push('/contact');
        break;
      case '6': // Volunteer
        router.push('/volunteer');
        break;
      default:
        break;
    }
  };

  // Function to render grid items with custom icons
  const renderGridItem = ({ item }: { item: GridItem }) => {
    return (
      <TouchableOpacity 
        style={tw`flex-1 m-2 rounded-2xl overflow-hidden shadow-lg`}
        activeOpacity={0.7}
        onPress={() => handleGridItemPress(item)}
      >
        <View
          style={[tw`p-4 items-center justify-center h-40`, { backgroundColor: '#0A5F52' }]}
        >
          <View style={tw`w-20 h-20 mb-3 rounded-full bg-white items-center justify-center shadow-md`}>
            {item.customIcon ? (
              <Image 
                source={item.customIcon} 
                style={tw`w-18 h-18`} 
                resizeMode="contain"
              />
            ) : (
              <FontAwesome5 name={item.icon || 'circle'} size={24} color="#0A5F52" />
            )}
          </View>
          <Text style={tw`text-center font-bold text-white px-1`} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="light-content" backgroundColor="#0A5F52" />
      
      <ScrollView style={tw`flex-1 bg-neutral-100`} showsVerticalScrollIndicator={false}>
        {/* Announcement Bar with Marquee */}
        <View style={tw`bg-primary py-4 flex-row items-center px-3`}>
          <View style={tw`mr-3`}>
            <FontAwesome5 name="bullhorn" size={18} color="white" />
          </View>
          <View style={tw`flex-1`}>
            <Marquee
              style={tw`h-7`}
              speed={0.15}
              delay={1500}
              loop
              marqueeOnStart
            >
              <Text style={tw`text-white font-bold text-base`}>
                {announcements[currentAnnouncement]}
              </Text>
            </Marquee>
          </View>
        </View>

        {/* Carousel Section */}
        <View style={tw`w-full px-3 pt-4`}>
          <Carousel
            width={width - 24}
            height={carouselHeight}
            data={carouselData}
            renderItem={renderCarouselItem}
            loop
            autoPlay
            autoPlayInterval={4000}
            scrollAnimationDuration={1000}
            onSnapToItem={setActiveIndex}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
          />
          <View style={tw`flex-row justify-center my-3`}>
            {renderDotIndicators()}
          </View>
        </View>

        {/* Grid Section */}
        <View style={tw`flex-1 p-2 mt-2`}>
          <Text style={tw`text-xl font-bold mb-4 ml-2 text-primary`}>আমাদের সেবাসমূহ</Text>
          <FlatList
            data={gridData}
            renderItem={renderGridItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={tw`pb-8`}
          />
        </View>
      </ScrollView>
    </View>
  );
}
