import React from "react";
import { 
  Text, 
  View, 
  ScrollView, 
  Image,
  FlatList
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from "../utils/tw";
import { t, tObj } from "../utils/i18n";

// Define the GalleryItem interface to fix TypeScript error
interface GalleryItem {
  id: string;
  image: any;
}

// Get translations with fallbacks
const myInfoData = tObj('myinfo');

// Personal information
const personalInfo = {
  name: myInfoData?.personalInfo?.name || 'মারুফ হাসান মাসুম',
  title: myInfoData?.personalInfo?.title || 'সংসদ সদস্য ও সামাজিক কর্মী',
  birthInfo: {
    title: myInfoData?.personalInfo?.birthInfo?.title || 'জন্ম তথ্য',
    date: myInfoData?.personalInfo?.birthInfo?.date || 'জন্ম তারিখ',
    dateValue: myInfoData?.personalInfo?.birthInfo?.dateValue || 'জানুয়ারি ১৫, ১৯৮০',
    place: myInfoData?.personalInfo?.birthInfo?.place || 'জন্মস্থান',
    placeValue: myInfoData?.personalInfo?.birthInfo?.placeValue || 'ঢাকা, বাংলাদেশ'
  },
  aboutMe: {
    title: myInfoData?.personalInfo?.aboutMe?.title || 'আমার সম্পর্কে',
    text: myInfoData?.personalInfo?.aboutMe?.text || 'আমি একজন নিবেদিতপ্রাণ জনসেবক যার সামাজিক পরিবর্তনের জন্য ১৫ বছরেরও বেশি অভিজ্ঞতা রয়েছে। আমার যাত্রা শুরু হয়েছিল আমার নিজের এলাকায় যেখানে আমি সম্প্রদায়ের সংগ্রাম প্রত্যক্ষ করেছিলাম। এই অভিজ্ঞতা আমার মধ্যে ইতিবাচক পরিবর্তন এবং ন্যায্য উন্নয়নের জন্য কাজ করার আবেগ জাগিয়েছে।'
  },
  quote: 'আমি বিশ্বাস করি যে প্রতিটি মানুষের সম্মানের সাথে বাঁচার অধিকার আছে।'
};

// Personal gallery
const personalGallery: GalleryItem[] = [
  { id: '1', image: require('../assets/images/gallery/gallery (1).jpg') },
  { id: '2', image: require('../assets/images/gallery/gallery (8).jpg') },
  { id: '3', image: require('../assets/images/gallery/gallery (9).jpg') },
  { id: '4', image: require('../assets/images/gallery/gallery (10).jpg') },
  { id: '5', image: require('../assets/images/gallery/gallery (11).jpg') },
  { id: '6', image: require('../assets/images/gallery/gallery (1).jpeg') }
];

export default function MyInfo() {
  // Get page title and subtitle from translations
  const pageTitle = myInfoData?.title || 'আমার প্রোফাইল';
  const pageSubtitle = myInfoData?.subtitle || 'ব্যক্তিগত তথ্য';

  const renderGalleryItem = ({ item }: { item: GalleryItem }) => (
    <View style={tw`w-1/3 aspect-square p-1`}>
      <Image 
        source={item.image} 
        style={tw`w-full h-full rounded-lg`}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View style={tw`flex-1 bg-neutral-50`}>
      {/* Header */}
      <LinearGradient
        colors={[String(tw.color('primary-700')), String(tw.color('primary'))]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={tw`pt-14 pb-24 px-5`}
      >
        <Text style={tw`text-white text-4xl font-bold`}>{pageTitle}</Text>
        <Text style={tw`text-white text-base mt-2 opacity-90`}>{pageSubtitle}</Text>
      </LinearGradient>

      <ScrollView 
        style={tw`flex-1 -mt-20`}
        contentContainerStyle={tw`pb-10`}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={tw`mx-5 mb-6 bg-white rounded-2xl shadow-xl`}>
          <View style={tw`p-5 items-center`}>
            <Image 
              source={require('../assets/images/profile.jpg')} 
              style={tw`w-32 h-32 rounded-full border-4 border-primary mb-4`}
            />
            <Text style={tw`text-primary text-2xl font-bold`}>{personalInfo.name}</Text>
            <Text style={tw`text-neutral-600 text-center mb-4`}>{personalInfo.title}</Text>
          </View>
        </View>

        {/* Birth Information */}
        <View style={tw`mx-5 mb-6`}>
          <Text style={tw`text-xl font-bold text-neutral-800 mb-3`}>{personalInfo.birthInfo.title}</Text>
          <View style={tw`bg-white rounded-xl p-5 shadow-md`}>
            <View style={tw`flex-row items-center mb-3`}>
              <View style={tw`bg-primary bg-opacity-10 p-3 rounded-full mr-4`}>
                <FontAwesome5 name="calendar-alt" size={18} color="#0A5F52" />
              </View>
              <View>
                <Text style={tw`text-neutral-500 text-sm`}>{personalInfo.birthInfo.date}</Text>
                <Text style={tw`text-neutral-800 font-bold`}>{personalInfo.birthInfo.dateValue}</Text>
              </View>
            </View>
            
            <View style={tw`flex-row items-center`}>
              <View style={tw`bg-primary bg-opacity-10 p-3 rounded-full mr-4`}>
                <FontAwesome5 name="map-marker-alt" size={18} color="#0A5F52" />
              </View>
              <View>
                <Text style={tw`text-neutral-500 text-sm`}>{personalInfo.birthInfo.place}</Text>
                <Text style={tw`text-neutral-800 font-bold`}>{personalInfo.birthInfo.placeValue}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* About Me */}
        <View style={tw`mx-5 mb-6`}>
          <Text style={tw`text-xl font-bold text-neutral-800 mb-3`}>{personalInfo.aboutMe.title}</Text>
          <View style={tw`bg-white rounded-xl p-5 shadow-md`}>
            <Text style={tw`text-neutral-700 leading-6`}>{personalInfo.aboutMe.text}</Text>
          </View>
        </View>

        {/* Quote */}
        <View style={tw`mx-5 mb-6`}>
          <View style={tw`bg-primary rounded-xl p-6 shadow-md`}>
            <FontAwesome5 name="quote-left" size={24} color="rgba(255,255,255,0.3)" style={tw`mb-2`} />
            <Text style={tw`text-white text-lg font-medium italic`}>{personalInfo.quote}</Text>
          </View>
        </View>

        {/* Gallery */}
        <View style={tw`mx-5 mb-6`}>
          <Text style={tw`text-xl font-bold text-neutral-800 mb-3`}>ছবি গ্যালারি</Text>
          <FlatList
            data={personalGallery}
            renderItem={renderGalleryItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            style={tw`bg-white rounded-xl p-2 shadow-md`}
          />
        </View>
      </ScrollView>
    </View>
  );
} 