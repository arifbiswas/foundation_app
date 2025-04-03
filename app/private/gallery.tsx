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
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import tw from '@/utils/tw';

// Mock data for gallery albums
interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  isFeatured: boolean;
  dateAdded: string;
}

interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  imageCount: number;
  dateCreated: string;
  images?: GalleryImage[];
}

const mockAlbums: GalleryAlbum[] = [
  {
    id: '1',
    title: 'Community Events',
    description: 'Photos from various community events and gatherings',
    coverImage: 'https://via.placeholder.com/300',
    imageCount: 24,
    dateCreated: '2023-05-15',
    images: [
      {
        id: 'img1',
        url: 'https://via.placeholder.com/500',
        title: 'Community Gathering',
        description: 'Annual community gathering at the town hall',
        isFeatured: true,
        dateAdded: '2023-05-15'
      },
      {
        id: 'img2',
        url: 'https://via.placeholder.com/500',
        title: 'Charity Run',
        description: 'Participants at the annual charity run',
        isFeatured: false,
        dateAdded: '2023-05-18'
      },
      {
        id: 'img3',
        url: 'https://via.placeholder.com/500',
        title: 'Town Hall Meeting',
        description: 'Discussion of community initiatives',
        isFeatured: true,
        dateAdded: '2023-06-02'
      }
    ]
  },
  {
    id: '2',
    title: 'Public Appearances',
    description: 'Official appearances and public engagements',
    coverImage: 'https://via.placeholder.com/300',
    imageCount: 18,
    dateCreated: '2023-06-20'
  },
  {
    id: '3',
    title: 'Campaign Trail',
    description: 'Photos from campaign events and rallies',
    coverImage: 'https://via.placeholder.com/300',
    imageCount: 32,
    dateCreated: '2023-07-10'
  },
  {
    id: '4',
    title: 'Media Interviews',
    description: 'Television, radio, and press appearances',
    coverImage: 'https://via.placeholder.com/300',
    imageCount: 12,
    dateCreated: '2023-08-05'
  }
];

export default function GalleryManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  const filteredAlbums = mockAlbums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBackToAdmin = () => {
    if (selectedAlbum) {
      setSelectedAlbum(null);
    } else {
      router.back();
    }
  };

  const handleViewAlbum = (album: GalleryAlbum) => {
    setSelectedAlbum(album);
  };

  const handleEditImage = (image: GalleryImage) => {
    setCurrentImage({...image});
    setIsImageModalVisible(true);
  };

  const handleSaveImage = () => {
    if (!currentImage || !selectedAlbum || !selectedAlbum.images) return;
    
    // Update the image in the album
    const updatedImages = selectedAlbum.images.map(img => 
      img.id === currentImage.id ? currentImage : img
    );
    
    // Update the album
    setSelectedAlbum({...selectedAlbum, images: updatedImages});
    
    // Close the modal
    setIsImageModalVisible(false);
    setCurrentImage(null);
    
    // Show success message
    Alert.alert('Success', 'Image details updated successfully');
  };

  const handleDeleteImage = (imageId: string) => {
    if (!selectedAlbum || !selectedAlbum.images) return;
    
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
            // Remove the image from the album
            const updatedImages = selectedAlbum.images!.filter(img => img.id !== imageId);
            setSelectedAlbum({
              ...selectedAlbum, 
              images: updatedImages,
              imageCount: updatedImages.length
            });
            Alert.alert('Success', 'Image deleted successfully');
          }
        }
      ]
    );
  };

  const renderAlbumItem = ({ item }: { item: GalleryAlbum }) => (
    <TouchableOpacity 
      style={tw`bg-white rounded-xl shadow-sm overflow-hidden mb-4`}
      onPress={() => handleViewAlbum(item)}
    >
      <Image 
        source={{ uri: item.coverImage }} 
        style={tw`w-full h-48`}
        resizeMode="cover"
      />
      <View style={tw`p-4`}>
        <View style={tw`flex-row justify-between items-center mb-2`}>
          <Text style={tw`text-lg font-bold text-neutral-800`}>{item.title}</Text>
          <Text style={tw`text-sm text-neutral-500`}>{item.imageCount} images</Text>
        </View>
        <Text style={tw`text-neutral-600 mb-3`} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={tw`text-neutral-500 text-sm`}>
          Created: {item.dateCreated}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderImageItem = ({ item }: { item: GalleryImage }) => (
    <View style={tw`bg-white rounded-xl shadow-sm overflow-hidden mb-4`}>
      <Image 
        source={{ uri: item.url }} 
        style={tw`w-full h-48`}
        resizeMode="cover"
      />
      <View style={tw`p-4`}>
        <View style={tw`flex-row justify-between items-center mb-2`}>
          <Text style={tw`text-lg font-bold text-neutral-800`}>{item.title}</Text>
          {item.isFeatured && (
            <View style={tw`bg-yellow-100 px-2 py-1 rounded-full`}>
              <Text style={tw`text-yellow-800 text-xs font-medium`}>Featured</Text>
            </View>
          )}
        </View>
        <Text style={tw`text-neutral-600 mb-3`} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={tw`text-neutral-500 text-sm mb-3`}>
          Added: {item.dateAdded}
        </Text>
        
        <View style={tw`flex-row justify-end`}>
          <TouchableOpacity
            style={tw`flex-row items-center mr-3 px-3 py-2 bg-primary rounded-lg`}
            onPress={() => handleEditImage(item)}
          >
            <FontAwesome5 name="edit" size={14} color="white" style={tw`mr-2`} />
            <Text style={tw`text-white`}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={tw`flex-row items-center px-3 py-2 bg-red-500 rounded-lg`}
            onPress={() => handleDeleteImage(item.id)}
          >
            <FontAwesome5 name="trash" size={14} color="white" style={tw`mr-2`} />
            <Text style={tw`text-white`}>Delete</Text>
          </TouchableOpacity>
        </View>
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
            {selectedAlbum ? `${selectedAlbum.title} Album` : 'Gallery Management'}
          </Text>
        </View>
      </LinearGradient>
      
      {/* Search bar */}
      <View style={tw`p-4 bg-white border-b border-neutral-200`}>
        <View style={tw`flex-row items-center bg-neutral-100 rounded-lg px-3 py-2`}>
          <FontAwesome5 name="search" size={16} color="#777" style={tw`mr-2`} />
          <TextInput
            style={tw`flex-1`}
            placeholder={selectedAlbum ? "Search images..." : "Search albums..."}
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
        {selectedAlbum ? (
          /* Album View */
          <>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-lg font-bold text-neutral-800`}>
                Album Images ({selectedAlbum.images?.length || 0})
              </Text>
              <TouchableOpacity
                style={tw`flex-row items-center py-2 px-3 bg-primary rounded-lg`}
              >
                <FontAwesome5 name="plus" size={14} color="white" style={tw`mr-2`} />
                <Text style={tw`text-white font-medium`}>Add Images</Text>
              </TouchableOpacity>
            </View>
            
            {selectedAlbum.images && selectedAlbum.images.length > 0 ? (
              <FlatList
                data={selectedAlbum.images}
                renderItem={renderImageItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            ) : (
              <View style={tw`py-16 items-center`}>
                <FontAwesome5 name="images" size={48} color="#ccc" />
                <Text style={tw`mt-4 text-neutral-500 text-lg`}>No images in this album</Text>
                <Text style={tw`text-neutral-400`}>Add images to get started</Text>
              </View>
            )}
          </>
        ) : (
          /* Albums List */
          <>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-lg font-bold text-neutral-800`}>Photo Albums</Text>
              <TouchableOpacity
                style={tw`flex-row items-center py-2 px-3 bg-primary rounded-lg`}
              >
                <FontAwesome5 name="plus" size={14} color="white" style={tw`mr-2`} />
                <Text style={tw`text-white font-medium`}>New Album</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={filteredAlbums}
              renderItem={renderAlbumItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              ListEmptyComponent={
                <View style={tw`py-8 items-center`}>
                  <Text style={tw`text-neutral-500`}>No albums found</Text>
                </View>
              }
            />
          </>
        )}
      </ScrollView>
      
      {/* Image Edit Modal */}
      <Modal
        visible={isImageModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-center p-4`}>
          <View style={tw`bg-white rounded-xl p-5 shadow-xl`}>
            <Text style={tw`text-xl font-bold mb-4 text-neutral-800`}>Edit Image</Text>
            
            {currentImage && (
              <>
                <Image 
                  source={{ uri: currentImage.url }} 
                  style={tw`w-full h-48 rounded-lg mb-4`}
                  resizeMode="cover"
                />
                
                <View style={tw`mb-4`}>
                  <Text style={tw`text-neutral-600 mb-2`}>Image Title</Text>
                  <TextInput
                    style={tw`border border-neutral-300 rounded-lg px-3 py-2 text-base`}
                    value={currentImage.title}
                    onChangeText={(text) => setCurrentImage({...currentImage, title: text})}
                  />
                </View>
                
                <View style={tw`mb-4`}>
                  <Text style={tw`text-neutral-600 mb-2`}>Description</Text>
                  <TextInput
                    style={tw`border border-neutral-300 rounded-lg px-3 py-2 text-base min-h-[80px]`}
                    value={currentImage.description}
                    onChangeText={(text) => setCurrentImage({...currentImage, description: text})}
                    multiline
                    textAlignVertical="top"
                  />
                </View>
                
                <View style={tw`flex-row items-center mb-4`}>
                  <TouchableOpacity
                    style={tw`flex-row items-center`}
                    onPress={() => setCurrentImage({...currentImage, isFeatured: !currentImage.isFeatured})}
                  >
                    <View style={tw`w-5 h-5 rounded border border-neutral-400 mr-2 items-center justify-center ${currentImage.isFeatured ? 'bg-primary border-primary' : ''}`}>
                      {currentImage.isFeatured && (
                        <FontAwesome5 name="check" size={12} color="white" />
                      )}
                    </View>
                    <Text style={tw`text-neutral-700`}>Feature this image on the gallery page</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            
            <View style={tw`flex-row justify-end`}>
              <TouchableOpacity
                style={tw`flex-row items-center mr-3 px-4 py-2 bg-neutral-200 rounded-lg`}
                onPress={() => {
                  setIsImageModalVisible(false);
                  setCurrentImage(null);
                }}
              >
                <Text style={tw`text-neutral-700 font-medium`}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={tw`flex-row items-center px-4 py-2 bg-primary rounded-lg`}
                onPress={handleSaveImage}
              >
                <Text style={tw`text-white font-medium`}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
} 