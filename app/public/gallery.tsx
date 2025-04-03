import React, { useState, useRef } from "react";
import { 
  Text, 
  View, 
  Image, 
  FlatList, 
  TouchableOpacity, 
  Modal, 
  Dimensions,
  StatusBar,
  SafeAreaView
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import tw from "@/utils/tw";
import { t, tObj } from "@/utils/i18n";

const { width, height } = Dimensions.get('window');

// Define the gallery image type
interface GalleryImage {
  id: string;
  image: any; // Using any for image source is common in React Native
  title: string;
}

// Gallery images data with Bengali titles using images from assets/images/gallery
const galleryImages: GalleryImage[] = [
  { id: '1', image: require('@/assets/images/gallery/1.jpg'), title: 'সম্প্রদায় অনুষ্ঠান' },
  { id: '2', image: require('@/assets/images/gallery/2.jpg'), title: 'রাজনৈতিক সমাবেশ' },
  { id: '3', image: require('@/assets/images/gallery/3.jpg'), title: 'ফাউন্ডেশন সভা' },
  { id: '4', image: require('@/assets/images/gallery/4.jpg'), title: 'শিক্ষামূলক কর্মসূচি' },
  { id: '5', image: require('@/assets/images/gallery/5.jpg'), title: 'জনসম্মুখে বক্তব্য' },
  { id: '6', image: require('@/assets/images/gallery/6.jpg'), title: 'ফাউন্ডেশন কার্যক্রম' },
  { id: '7', image: require('@/assets/images/gallery/7.jpg'), title: 'দল গঠন' },
  { id: '8', image: require('@/assets/images/gallery/8.jpg'), title: 'স্বাস্থ্য প্রচারণা' },
  { id: '9', image: require('@/assets/images/gallery/9.jpg'), title: 'স্বেচ্ছাসেবক কর্মসূচি' },
  { id: '10', image: require('@/assets/images/gallery/10.jpg'), title: 'দাতব্য অনুষ্ঠান' },
  { id: '11', image: require('@/assets/images/gallery/11.jpg'), title: 'রাজনৈতিক সম্মেলন' },
  { id: '12', image: require('@/assets/images/gallery/12.jpg'), title: 'সম্প্রদায় সহায়তা' },
  { id: '13', image: require('@/assets/images/gallery/13.jpg'), title: 'শিশু শিক্ষা কর্মসূচি' },
  { id: '14', image: require('@/assets/images/gallery/14.jpg'), title: 'নারী উন্নয়ন প্রকল্প' },
  { id: '15', image: require('@/assets/images/gallery/15.jpg'), title: 'গ্রামীণ উন্নয়ন কর্মসূচি' },
  { id: '16', image: require('@/assets/images/gallery/16.jpg'), title: 'স্বাস্থ্য শিবির' },
  { id: '17', image: require('@/assets/images/gallery/17.jpg'), title: 'খেলাধুলা প্রতিযোগিতা' },
  { id: '18', image: require('@/assets/images/gallery/18.jpg'), title: 'সাংস্কৃতিক অনুষ্ঠান' },
  { id: '19', image: require('@/assets/images/gallery/19.jpg'), title: 'বৃক্ষরোপণ কর্মসূচি' },
  { id: '20', image: require('@/assets/images/gallery/20.jpg'), title: 'পরিবেশ সংরক্ষণ' },
  { id: '21', image: require('@/assets/images/gallery/21.jpg'), title: 'যুব উন্নয়ন কর্মসূচি' },
  { id: '22', image: require('@/assets/images/gallery/22.jpg'), title: 'দারিদ্র্য বিমোচন' },
  { id: '23', image: require('@/assets/images/gallery/23.jpg'), title: 'সেমিনার ও ওয়ার্কশপ' },
  { id: '24', image: require('@/assets/images/gallery/24.jpg'), title: 'সম্প্রদায় সচেতনতা' },
];


export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const carouselRef = useRef<ICarouselInstance>(null);

  // Get translations with fallbacks
  const galleryTitle = t('drawer.gallery') || 'গ্যালারি';
  const gallerySubtitle = t('gallery.subtitle') || 'আমাদের মুহূর্তগুলি ছবিতে ধারণ করা হয়েছে';

  // Filtered images based on selected category (for now just showing all)
  const filteredImages = galleryImages;


  const renderGalleryItem = ({ item, index }: { item: GalleryImage; index: number }) => {
    return (
      <TouchableOpacity 
        style={tw`m-1`}
        onPress={() => {
          setSelectedImageIndex(index);
          setModalVisible(true);
        }}
      >
        <View style={[tw`rounded-xl overflow-hidden bg-primary`, { width: (width - 36) / 3, height: (width - 36) / 3 }]}>
          <Image 
            source={item.image} 
            style={tw`w-full h-full`}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderCarouselItem = ({ item }: { item: GalleryImage }) => {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Image
          source={item.image}
          style={tw`w-full h-2/3`}
          resizeMode="contain"
        />
        {/* <View style={tw`mt-6 px-5`}>
          <Text style={tw`text-white text-xl font-bold text-center`}>
            {item.title}
          </Text>
        </View> */}
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={tw`flex-1`}>
      <View style={tw`flex-1 bg-neutral-50`}>
        {/* Header */}
        <LinearGradient
          colors={[String(tw.color('primary-700')), String(tw.color('primary'))]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={tw`pt-5 pb-5 px-5`}
        >
          <Text style={tw`text-white text-4xl font-bold`}>{galleryTitle}</Text>
          <Text style={tw`text-white text-base mt-2 opacity-90`}>{gallerySubtitle}</Text>
        </LinearGradient>

        

        {/* Gallery Grid */}
        <FlatList
          data={filteredImages}
          renderItem={renderGalleryItem}
          keyExtractor={item => item.id}
          numColumns={3}
          contentContainerStyle={tw`p-3 pt-5`}
          showsVerticalScrollIndicator={false}
        />

        {/* Image Viewer Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={tw`flex-1 bg-black bg-opacity-95`}>
            <SafeAreaView style={tw`flex-1`}>
              <StatusBar barStyle="light-content" />
              
              {/* Close button */}
              <TouchableOpacity
                style={tw`absolute top-10 right-5 z-20 w-10 h-10 rounded-full bg-black bg-opacity-50 items-center justify-center`}
                onPress={() => setModalVisible(false)}
              >
                <FontAwesome5 name="times" size={20} color="white" />
              </TouchableOpacity>
              
              {/* Swipeable carousel */}
              <Carousel
                ref={carouselRef}
                data={filteredImages}
                renderItem={renderCarouselItem}
                width={width}
                height={height}
                defaultIndex={selectedImageIndex}
                onSnapToItem={(index) => setSelectedImageIndex(index)}
                mode="parallax"
                modeConfig={{
                  parallaxScrollingScale: 0.9,
                  parallaxScrollingOffset: 50,
                }}
              />
              
              {/* Image counter indicator */}
              <View style={tw`absolute bottom-5 w-full items-center`}>
                <Text style={tw`text-white text-sm`}>
                  {selectedImageIndex + 1} / {filteredImages.length}
                </Text>
              </View>
            </SafeAreaView>
          </View>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
} 