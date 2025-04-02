import React, { useState } from "react";
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
import tw from "../utils/tw";
import { t, tObj } from "../utils/i18n";

const { width } = Dimensions.get('window');

// Define the gallery image type
interface GalleryImage {
  id: string;
  image: any; // Using any for image source is common in React Native
  title: string;
}

// Gallery images data with Bengali titles
const galleryImages: GalleryImage[] = [
  { id: '1', image: require('../assets/images/gallery/gallery (1).jpg'), title: 'সম্প্রদায় অনুষ্ঠান' },
  { id: '2', image: require('../assets/images/gallery/gallery (2).jpg'), title: 'রাজনৈতিক সমাবেশ' },
  { id: '3', image: require('../assets/images/gallery/gallery (3).jpg'), title: 'ফাউন্ডেশন সভা' },
  { id: '4', image: require('../assets/images/gallery/gallery (4).jpg'), title: 'শিক্ষামূলক কর্মসূচি' },
  { id: '5', image: require('../assets/images/gallery/gallery (5).jpg'), title: 'জনসম্মুখে বক্তব্য' },
  { id: '6', image: require('../assets/images/icon.png'), title: 'ফাউন্ডেশন লোগো' },
  { id: '7', image: require('../assets/images/icon.png'), title: 'দল গঠন' },
  { id: '8', image: require('../assets/images/icon.png'), title: 'স্বাস্থ্য প্রচারণা' },
  { id: '9', image: require('../assets/images/icon.png'), title: 'স্বেচ্ছাসেবক কর্মসূচি' },
  { id: '10', image: require('../assets/images/icon.png'), title: 'দাতব্য অনুষ্ঠান' },
  { id: '11', image: require('../assets/images/icon.png'), title: 'রাজনৈতিক সম্মেলন' },
  { id: '12', image: require('../assets/images/icon.png'), title: 'সম্প্রদায় সহায়তা' },
];


export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

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
          setSelectedImage(item);
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

  return (
    <View style={tw`flex-1 bg-neutral-50`}>
      {/* Header */}
      <LinearGradient
        colors={[String(tw.color('primary-700')), String(tw.color('primary'))]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={tw`pt-14 pb-16 px-5`}
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
            
            {/* Image display */}
            {selectedImage && (
              <View style={tw`flex-1 justify-center items-center`}>
                <Image
                  source={selectedImage.image}
                  style={tw`w-full h-2/3`}
                  resizeMode="contain"
                />
                <View style={tw`mt-6 px-5`}>
                  <Text style={tw`text-white text-xl font-bold text-center`}>
                    {selectedImage.title}
                  </Text>
                </View>
              </View>
            )}
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
} 