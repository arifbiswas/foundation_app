import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, Pressable } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import tw from "@/utils/tw";
import { t, tObj } from "@/utils/i18n";

// Get foundation initiatives for helping the poor from translations
const helpInitiativesData = tObj('about.helpingPoorSection.initiatives');
const helpInitiatives = Array.isArray(helpInitiativesData) ? helpInitiativesData : [];

export default function About() {
  // Get translations or use fallbacks if not available
  const aboutData = tObj('about');
  
  const title = aboutData?.title || 'আমাদের সম্পর্কে';
  const subtitle = aboutData?.subtitle || 'আমাদের সম্প্রদায়ে পরিবর্তন আনি';
  const mission = aboutData?.mission || 'আমাদের লক্ষ্য';
  const missionText = aboutData?.missionText || 'আমরা একটি ফাউন্ডেশন হিসাবে সমাজের সবচেয়ে দুর্বল সদস্যদের জীবনমান উন্নত করতে প্রতিশ্রুতিবদ্ধ। আমরা বিশ্বাস করি যে সমানভাবে সুযোগ-সুবিধা পাওয়ার অধিকার সবার আছে, এবং আমরা সেই লক্ষ্যে কাজ করি।';
  const vision = aboutData?.vision || 'আমাদের দৃষ্টিভঙ্গি';
  const visionText = aboutData?.visionText || 'আমরা এমন একটি সমাজ কল্পনা করি যেখানে প্রত্যেকেরই তার পূর্ণ সম্ভাবনা অর্জনের জন্য প্রয়োজনীয় সংস্থান এবং সমর্থন রয়েছে। আমরা একটি ন্যায়সঙ্গত, সমতাপূর্ণ এবং টেকসই ভবিষ্যত গড়ে তুলতে চাই।';
  const leaderTitle = aboutData?.leaderTitle || 'নেতৃত্বে';
  const leaderName = aboutData?.leaderName || 'মারুফ হাসান মাসুম';
  const leaderDescription = aboutData?.leaderDescription || 'সমাজসেবা এবং সম্প্রদায়ের উন্নয়নে দশকেরও বেশি অভিজ্ঞতা নিয়ে, মারুফ হাসান মাসুম একটি অনুপ্রেরণামূলক নেতৃত্ব প্রদান করে যা সত্যিকারের পরিবর্তন আনতে পারে। তার দূরদর্শী চিন্তাভাবনা এবং অটল প্রতিশ্রুতি আমাদের ফাউন্ডেশনকে চালিত করে।';
  const valuesTitle = aboutData?.valuesTitle || 'আমাদের মূল্যবোধ';
  
  const values = aboutData?.values || [
    { title: 'সততা', description: 'আমরা সবসময় সৎভাবে এবং স্বচ্ছতার সাথে কাজ করি।', icon: 'shield-check' },
    { title: 'সহানুভূতি', description: 'আমরা অন্যদের জন্য করুণা ও বোঝাপড়ার সাথে কাজ করি।', icon: 'heart' },
    { title: 'দায়িত্বশীলতা', description: 'আমরা আমাদের কর্ম এবং তার প্রভাবের জন্য দায়িত্বশীল।', icon: 'balance-scale' },
    { title: 'উদ্ভাবন', description: 'আমরা সমস্যা সমাধানে নতুন দৃষ্টিভঙ্গি অন্বেষণ করি।', icon: 'lightbulb' }
  ];

  // For helping poor section
  const helpingPoorTitle = aboutData?.helpingPoorSection?.title || 'দরিদ্রদের সাহায্য';
  
  // For join section
  const joinSectionTitle = aboutData?.joinSection?.title || 'আমাদের ফাউন্ডেশনে যোগ দিন';
  const joinSectionSubtitle = aboutData?.joinSection?.subtitle || 'আপনার অবদান আমাদের আরও বেশি মানুষের কাছে পৌঁছাতে এবং আমাদের উদ্যোগ বাড়াতে সাহায্য করবে।';
  const joinButtonText = aboutData?.joinSection?.buttonText || 'যোগ দিন (১০০ টাকা)';

  return (
    <View style={tw`flex-1 bg-neutral-50`}>
      {/* Sticky Header */}
      <LinearGradient
        colors={[tw.color('primary-700') as string, tw.color('primary') as string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={tw`pt-14 pb-6 px-5`}
      >
        <Text style={tw`text-white text-4xl font-bold`}>{title}</Text>
        <Text style={tw`text-white text-base mt-2 opacity-90`}>{t('about.subtitle')}</Text>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView 
        style={tw`flex-1 -mt-14`}
        contentContainerStyle={tw`pt-16 pb-10`}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile card */}
        <View style={tw`mx-5 mb-6 rounded-3xl overflow-hidden bg-white shadow-xl`}>
          <View style={tw`p-5`}>
            <View style={tw`items-center`}>
              <Image 
                source={require('@/assets/images/profile.jpg')} 
                style={tw`w-32 h-32 rounded-full border-4 border-primary mb-4`}
              />
              <Text style={tw`text-2xl font-bold text-primary mb-1`}>{leaderName}</Text>
              <Text style={tw`text-neutral-600 text-center mb-4`}>
                {t('common.appName') || 'মারুফ হাসান মাসুম ফাউন্ডেশন'}
              </Text>
              <View style={tw`flex-row`}>
                <TouchableOpacity style={tw`mx-2 w-10 h-10 rounded-full bg-primary items-center justify-center`}>
                  <FontAwesome5 name="facebook-f" size={18} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={tw`mx-2 w-10 h-10 rounded-full bg-primary items-center justify-center`}>
                  <FontAwesome5 name="twitter" size={18} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={tw`mx-2 w-10 h-10 rounded-full bg-primary items-center justify-center`}>
                  <FontAwesome5 name="instagram" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Help for the Poor Section */}
        <View style={tw`mx-5 mb-6`}>
          <Text style={tw`text-xl font-bold text-neutral-800 mb-3`}>{helpingPoorTitle}</Text>
          
          {helpInitiatives.length > 0 ? (
            helpInitiatives.map((initiative: any, index: number) => (
              <View key={index} style={tw`mb-4 bg-white rounded-xl shadow-md overflow-hidden`}>
                <View style={tw`flex-row`}>
                  <View style={tw`w-2 bg-primary h-full`} />
                  <View style={tw`p-4 flex-1`}>
                    <View style={tw`flex-row items-center mb-2`}>
                      <View style={tw`w-10 h-10 rounded-full bg-primary bg-opacity-10 items-center justify-center mr-3`}>
                        <FontAwesome5 name={initiative.icon} size={18} color="#0A5F52" />
                      </View>
                      <Text style={tw`font-bold text-lg text-primary`}>{initiative.title}</Text>
                    </View>
                    <Text style={tw`text-neutral-600`}>{initiative.description}</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={tw`mb-4 bg-white rounded-xl shadow-md p-4`}>
              <Text style={tw`text-neutral-600 text-center`}>No initiatives available</Text>
            </View>
          )}
        </View>

        {/* Vision and Mission */}
        <View style={tw`mx-5 mb-6`}>
          <Text style={tw`text-xl font-bold text-neutral-800 mb-3`}>{vision} & {mission}</Text>
          <View style={tw`bg-white rounded-xl shadow-md overflow-hidden mb-4`}>
            <LinearGradient
              colors={['#0A5F52', '#0E8573']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={tw`w-full h-2`}
            />
            <View style={tw`p-5`}>
              <View style={tw`flex-row items-center mb-3`}>
                <View style={tw`w-12 h-12 rounded-full bg-primary bg-opacity-10 items-center justify-center mr-4`}>
                  <FontAwesome5 name="eye" size={20} color="#0A5F52" />
                </View>
                <Text style={tw`text-xl font-bold text-primary`}>{vision}</Text>
              </View>
              <Text style={tw`text-neutral-700 leading-6`}>
                {visionText}
              </Text>
            </View>
          </View>
          
          <View style={tw`bg-white rounded-xl shadow-md overflow-hidden`}>
            <LinearGradient
              colors={['#0A5F52', '#0E8573']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={tw`w-full h-2`}
            />
            <View style={tw`p-5`}>
              <View style={tw`flex-row items-center mb-3`}>
                <View style={tw`w-12 h-12 rounded-full bg-primary bg-opacity-10 items-center justify-center mr-4`}>
                  <FontAwesome5 name="bullseye" size={20} color="#0A5F52" />
                </View>
                <Text style={tw`text-xl font-bold text-primary`}>{mission}</Text>
              </View>
              <Text style={tw`text-neutral-700 leading-6`}>
                {missionText}
              </Text>
            </View>
          </View>
        </View>

        {/* Join Us Section */}
        <View style={tw`mx-5 mb-6 bg-primary p-5 rounded-xl`}>
          <Text style={tw`text-xl font-bold text-white mb-2`}>{joinSectionTitle}</Text>
          <Text style={tw`text-white mb-4 opacity-90`}>
            {joinSectionSubtitle}
          </Text>
          <TouchableOpacity 
            style={tw`bg-white py-4 rounded-lg items-center shadow-sm flex-row justify-center`}
            activeOpacity={0.8}
            onPress={() => router.push('/volunteer')}
          >
            <FontAwesome5 name="user-plus" size={18} color={tw.color('primary')} style={tw`mr-2`} />
            <Text style={tw`text-primary font-bold text-lg`}>{joinButtonText}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
} 