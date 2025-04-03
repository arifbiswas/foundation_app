import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import tw from '@/utils/tw';

// Mock data for gallery images
interface GalleryImage {
  id: string;
  image: any; // Using any for image source is common in React Native
  title?: string;
  dateAdded?: string;
  isUploading?: boolean;
}

// List of mock gallery images using local assets
const mockImages: GalleryImage[] = [
  {
    id: '1',
    image: { uri: 'https://picsum.photos/501' },
    title: 'সম্প্রদায় অনুষ্ঠান',
    dateAdded: '2023-10-15'
  },
  {
    id: '2', 
    image: { uri: 'https://picsum.photos/502' },
    title: 'রাজনৈতিক সমাবেশ',
    dateAdded: '2023-09-22'
  },
  {
    id: '3',
    image: { uri: 'https://picsum.photos/503' },
    title: 'ফাউন্ডেশন সভা',
    dateAdded: '2023-08-30'
  },
  {
    id: '4',
    image: { uri: 'https://picsum.photos/504' },
    title: 'শিক্ষামূলক কর্মসূচি',
    dateAdded: '2023-07-12'
  },
  {
    id: '5',
    image: { uri: 'https://picsum.photos/505' },
    title: 'জনসম্মুখে বক্তব্য',
    dateAdded: '2023-06-05'
  },
  {
    id: '6',
    image: { uri: 'https://picsum.photos/506' },
    title: 'ফাউন্ডেশন কার্যক্রম',
    dateAdded: '2023-05-18'
  },
  {
    id: '7',
    image: { uri: 'https://picsum.photos/507' },
    title: 'দল গঠন',
    dateAdded: '2023-04-22'
  },
  {
    id: '8',
    image: { uri: 'https://picsum.photos/508' },
    title: 'স্বাস্থ্য প্রচারণা',
    dateAdded: '2023-03-15'
  },
  {
    id: '9',
    image: { uri: 'https://picsum.photos/509' },
    title: 'স্বেচ্ছাসেবক কর্মসূচি',
    dateAdded: '2023-02-08'
  }
];

export default function GalleryManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState<GalleryImage[]>(mockImages);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [titleInput, setTitleInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleBackToAdmin = () => {
    router.back();
  };

  const handleDeleteImage = (imageId: string) => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this image? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // In a real app, you would call an API to delete the image
            setImages(images.filter(img => img.id !== imageId));
            Alert.alert('Success', 'Image deleted successfully');
          }
        }
      ]
    );
  };

  const handleImageEdit = (image: GalleryImage) => {
    setSelectedImage(image);
    setTitleInput(image.title || '');
    setModalVisible(true);
  };

  const handleSaveImageDetails = () => {
    if (!selectedImage) return;
    
    setImages(images.map(img => 
      img.id === selectedImage.id ? { ...img, title: titleInput } : img
    ));
    
    setModalVisible(false);
    Alert.alert('Success', 'Image details updated successfully');
  };

  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'We need access to your photos to upload images.');
        return;
      }
      
      // Launch the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        
        // Create a temporary image object with isUploading flag
        const newImage: GalleryImage = {
          id: `temp-${Date.now()}`,
          image: { uri: selectedAsset.uri }, // Store as uri for uploaded images
          dateAdded: new Date().toISOString().split('T')[0],
          isUploading: true
        };
        
        // Add the new image to the state
        setImages([newImage, ...images]);
        
        // Simulate an upload delay
        setIsUploading(true);
        setTimeout(() => {
          // Update the image to mark it as uploaded
          setImages(currentImages => 
            currentImages.map(img => 
              img.id === newImage.id 
                ? { ...img, id: `new-${Date.now()}`, isUploading: false } 
                : img
            )
          );
          setIsUploading(false);
          
          // Show success message
          Alert.alert('Success', 'Image uploaded successfully');
        }, 2000);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'An error occurred while picking an image.');
    }
  };

  const filteredImages = images.filter(image => 
    image.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    image.id.includes(searchQuery)
  );

  const renderImageItem = ({ item }: { item: GalleryImage }) => (
    <View style={tw`w-[48%] bg-white rounded-xl shadow-md overflow-hidden mb-4`}>
      <View style={tw`relative`}>
        <Image 
          source={item.image} 
          style={tw`w-full h-40`}
          resizeMode="cover"
        />
        {item.isUploading ? (
          <View style={tw`absolute inset-0 bg-black/50 justify-center items-center`}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={tw`text-white mt-2`}>Uploading...</Text>
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={tw`absolute top-2 right-2 bg-red-500/80 rounded-full p-2`}
              onPress={() => handleDeleteImage(item.id)}
            >
              <FontAwesome5 name="trash" size={14} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`absolute top-2 left-2 bg-primary/80 rounded-full p-2`}
              onPress={() => handleImageEdit(item)}
            >
              <FontAwesome5 name="edit" size={14} color="white" />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={tw`p-2`}>
        <Text style={tw`text-neutral-700 font-medium`} numberOfLines={1}>
          {item.title || `Image #${item.id}`}
        </Text>
        <Text style={tw`text-neutral-500 text-xs`}>
          {item.dateAdded || 'Unknown date'}
        </Text>
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
            style={tw`p-2 mr-4`}
            onPress={handleBackToAdmin}
          >
            <FontAwesome5 name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={tw`text-white text-2xl font-bold`}>
            Gallery Management
          </Text>
        </View>
      </LinearGradient>
      
      {/* Search bar */}
      <View style={tw`p-4 bg-white border-b border-neutral-200`}>
        <View style={tw`flex-row items-center bg-neutral-100 rounded-lg px-3 py-2`}>
          <FontAwesome5 name="search" size={16} color="#777" style={tw`mr-2`} />
          <TextInput
            style={tw`flex-1`}
            placeholder="Search images..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <FontAwesome5 name="times" size={16} color="#777" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      
      {/* Content */}
      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`p-4 pb-20`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`text-lg font-bold text-neutral-800`}>
            Images ({filteredImages.length})
          </Text>
          <TouchableOpacity
            style={tw`flex-row items-center py-2 px-3 bg-primary rounded-lg`}
            onPress={pickImage}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <ActivityIndicator size="small" color="white" style={tw`mr-2`} />
                <Text style={tw`text-white font-medium`}>Uploading...</Text>
              </>
            ) : (
              <>
                <FontAwesome5 name="plus" size={14} color="white" style={tw`mr-2`} />
                <Text style={tw`text-white font-medium`}>Upload Image</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={filteredImages}
          renderItem={renderImageItem}
          numColumns={2}
          columnWrapperStyle={tw`gap-4 justify-between`}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={tw`py-16 items-center`}>
              <FontAwesome5 name="images" size={48} color="#ccc" />
              <Text style={tw`mt-4 text-neutral-500 text-lg`}>No images found</Text>
              {searchQuery ? (
                <Text style={tw`text-neutral-400`}>Try a different search term</Text>
              ) : (
                <Text style={tw`text-neutral-400`}>Upload images to get started</Text>
              )}
            </View>
          }
        />
      </ScrollView>

      {/* Edit Image Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white rounded-lg w-5/6 p-5`}>
            <Text style={tw`text-lg font-bold mb-4`}>Edit Image Details</Text>
            
            {selectedImage && (
              <Image 
                source={selectedImage.image} 
                style={tw`w-full h-40 rounded-lg mb-4`}
                resizeMode="cover"
              />
            )}
            
            <Text style={tw`text-neutral-700 mb-1`}>Image Title</Text>
            <TextInput
              style={tw`border border-neutral-300 rounded-lg px-3 py-2 mb-4`}
              value={titleInput}
              onChangeText={setTitleInput}
              placeholder="Enter image title"
            />
            
            <View style={tw`flex-row justify-end`}>
              <TouchableOpacity
                style={tw`bg-neutral-300 rounded-lg py-2 px-4 mr-2`}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-primary rounded-lg py-2 px-4`}
                onPress={handleSaveImageDetails}
              >
                <Text style={tw`text-white`}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}