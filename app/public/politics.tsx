import React from "react";
import { 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Linking
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from "@/utils/tw";
import { t, tObj } from '@/utils/i18n';

// Political activities data with Bengali text
const activities = [
  {
    id: '1',
    title: 'সম্প্রদায় উন্নয়ন প্রকল্প',
    date: 'জুন ১৫, ২০২৩',
    description: 'পূর্ব জেলায় একটি বড় সম্প্রদায় উন্নয়ন উদ্যোগ পরিচালনা করেছি, অবকাঠামো উন্নয়ন এবং স্থানীয় বাসিন্দাদের জন্য কর্মসংস্থান সৃষ্টির উপর ফোকাস করেছি।',
    icon: 'users'
  },
  {
    id: '2',
    title: 'শিক্ষা সংস্কার সম্মেলন',
    date: 'জুলাই ২২, ২০২৩',
    description: 'জাতীয় শিক্ষা সংস্কার সম্মেলনে আয়োজন ও বক্তৃতা করেছি, সুবিধাবঞ্চিত শিশুদের জন্য উন্নত শিক্ষা সুবিধা ও সুযোগের পক্ষে সাফাই দিয়েছি।',
    icon: 'graduation-cap'
  },
  {
    id: '3',
    title: 'পরিবেশ সংরক্ষণ সমাবেশ',
    date: 'আগস্ট ১০, ২০২৩',
    description: 'জলবায়ু পরিবর্তন এবং টেকসই নীতির প্রয়োজনীয়তা সম্পর্কে সচেতনতা বৃদ্ধির জন্য একটি পরিবেশ সংরক্ষণ সমাবেশে ৫,০০০ এরও বেশি লোককে সংগঠিত করেছি।',
    icon: 'leaf'
  },
  {
    id: '4',
    title: 'স্বাস্থ্যসেবা উদ্যোগ উদ্বোধন',
    date: 'সেপ্টেম্বর ৫, ২০২৩',
    description: 'মোবাইল ক্লিনিক এবং টেলিমেডিসিন সুবিধার মাধ্যমে দূরবর্তী এলাকায় চিকিৎসা সেবা প্রদানের জন্য একটি নতুন স্বাস্থ্যসেবা উদ্যোগ চালু করেছি।',
    icon: 'medkit'
  },
];

// Political positions with Bengali text
const positions = [
  {
    id: '1',
    position: 'সংসদ সদস্য',
    constituency: 'পূর্ব জেলা',
    period: '২০১৯ - বর্তমান',
    icon: 'landmark'
  },
  {
    id: '2',
    position: 'দলীয় সম্পাদক',
    constituency: 'জাতীয় প্রগতিশীল দল',
    period: '২০১৭ - বর্তমান',
    icon: 'clipboard'
  },
  {
    id: '3',
    position: 'সিটি কাউন্সিল সদস্য',
    constituency: 'ঢাকা সেন্ট্রাল',
    period: '২০১৫ - ২০১৯',
    icon: 'building'
  }
];

export default function Politics() {
  // Get translations with fallbacks
  const politicsData = tObj('politics');
  
  const title = politicsData?.title || 'রাজনৈতিক কার্যক্রম';
  const subtitle = politicsData?.subtitle || 'আমাদের রাজনৈতিক মিশন এবং দৃষ্টিভঙ্গি';
  const visionTitle = politicsData?.politicalVision?.title || 'রাজনৈতিক দৃষ্টিভঙ্গি';
  const visionDescription = politicsData?.politicalVision?.description || 'আমরা এমন একটি বাংলাদেশ গড়তে প্রতিশ্রুতিবদ্ধ যেখানে প্রতিটি নাগরিক সুশাসন, অর্থনৈতিক সুযোগ এবং সামাজিক ন্যায়বিচার উপভোগ করবে। আমরা বিশ্বাস করি যে রাজনীতি হল জনগণের সেবা করার এবং সকলের জন্য উন্নত ভবিষ্যত গড়ার মাধ্যম।';
  
  // Additional translations
  const politicalPositionsTitle = t('politics.positionsTitle') || 'রাজনৈতিক পদবি';
  const recentActivitiesTitle = t('politics.activitiesTitle') || 'সাম্প্রতিক কার্যক্রম';
  const getInvolvedTitle = t('politics.getInvolved.title') || 'অংশগ্রহণ করুন';
  const getInvolvedText = t('politics.getInvolved.text') || 'আমাদের সম্প্রদায়ের জন্য একটি উন্নত ভবিষ্যত গড়ার আন্দোলনে যোগ দিন।';
  const contactButtonText = t('politics.getInvolved.contactButton') || 'যোগাযোগ';
  const joinTeamButtonText = t('politics.getInvolved.joinButton') || 'দলে যোগ দিন';
  
  // Events with fallback
  const events = [
    { 
      id: '1',
      title: 'জনসভা', 
      date: 'জুন ১৫, ২০২৩', 
      location: 'শহীদ মিনার ময়দান, ঢাকা',
      time: 'বিকাল ৩:০০',
      image: require('@/assets/images/rallies/rally1.jpg') 
    },
    { 
      id: '2',
      title: 'যুব সম্মেলন', 
      date: 'জুলাই ১০, ২০২৩', 
      location: 'বাংলাদেশ শিল্পকলা একাডেমী',
      time: 'সকাল ১০:০০',
      image: require('@/assets/images/rallies/rally2.jpg') 
    },
    { 
      id: '3',
      title: 'কমিউনিটি টাউন হল', 
      date: 'আগস্ট ৫, ২০২৩', 
      location: 'গুলশান সম্প্রদায় কেন্দ্র',
      time: 'বিকাল ৪:৩০',
      image: require('@/assets/images/rallies/rally3.jpg') 
    }
  ];

  return (
    <View style={tw`flex-1 bg-neutral-50`}>
      {/* Header */}
      <LinearGradient
        colors={[String(tw.color('primary-700')), String(tw.color('primary'))]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={tw`pt-14 pb-24 px-5`}
      >
        <Text style={tw`text-white text-4xl font-bold`}>{title}</Text>
        <Text style={tw`text-white text-base mt-2 opacity-90`}>{subtitle}</Text>
      </LinearGradient>

      <ScrollView 
        style={tw`flex-1 -mt-20`}
        contentContainerStyle={tw`pb-10`}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={tw`mx-5 mb-6 bg-primary rounded-2xl shadow-xl`}>
          <View style={tw`p-5 items-center`}>
            <Image 
              source={require('@/assets/images/profile.jpg')} 
              style={tw`w-32 h-32 rounded-full border-4 border-white mb-4`}
            />
            <Text style={tw`text-white text-2xl font-bold`}>মারুফ হাসান মাসুম</Text>
            <Text style={tw`text-white opacity-90 text-base mb-2`}>সংসদ সদস্য</Text>
            <View style={tw`flex-row items-center px-4 py-2 bg-white bg-opacity-20 rounded-full`}>
              <FontAwesome5 name="map-marker-alt" size={14} color="white" style={tw`mr-2`} />
              <Text style={tw`text-white`}>পূর্ব জেলা, বাংলাদেশ</Text>
            </View>
            
            <View style={tw`flex-row mt-4`}>
              <TouchableOpacity 
                style={tw`mx-1 w-10 h-10 rounded-full bg-white items-center justify-center`}
                onPress={() => Linking.openURL('https://facebook.com')}
              >
                <FontAwesome5 name="facebook-f" size={18} color={tw.color('primary')} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={tw`mx-1 w-10 h-10 rounded-full bg-white items-center justify-center`}
                onPress={() => Linking.openURL('https://twitter.com')}
              >
                <FontAwesome5 name="twitter" size={18} color={tw.color('primary')} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={tw`mx-1 w-10 h-10 rounded-full bg-white items-center justify-center`}
                onPress={() => Linking.openURL('https://instagram.com')}
              >
                <FontAwesome5 name="instagram" size={18} color={tw.color('primary')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Political Mission */}
        <View style={tw`mx-5 mb-6`}>
          <Text style={tw`text-xl font-bold text-neutral-800 mb-3`}>{visionTitle}</Text>
          <View style={tw`bg-primary rounded-xl p-5`}>
            <Text style={tw`text-white leading-6 text-base`}>
              {visionDescription}
            </Text>
          </View>
        </View>

        {/* Political Positions */}
        <View style={tw`mx-5 mb-6`}>
          <Text style={tw`text-xl font-bold text-neutral-800 mb-3`}>{politicalPositionsTitle}</Text>
          {positions.map(position => (
            <View key={position.id} style={tw`mb-3 bg-primary rounded-xl p-4 flex-row`}>
              <View style={tw`w-12 h-12 rounded-full bg-white items-center justify-center mr-3`}>
                <FontAwesome5 name={position.icon} size={20} color={tw.color('primary')} />
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`font-bold text-white text-base`}>{position.position}</Text>
                <Text style={tw`text-white opacity-90`}>{position.constituency}</Text>
                <Text style={tw`text-white opacity-80 text-sm`}>{position.period}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Activities */}
        <View style={tw`mx-5 mb-6`}>
          <Text style={tw`text-xl font-bold text-neutral-800 mb-3`}>{recentActivitiesTitle}</Text>
          {activities.map(activity => (
            <View key={activity.id} style={tw`mb-3 bg-primary rounded-xl overflow-hidden`}>
              <View style={tw`px-4 py-2 bg-white bg-opacity-10 flex-row items-center`}>
                <FontAwesome5 name="calendar-alt" size={14} color="white" style={tw`mr-2`} />
                <Text style={tw`text-white font-medium`}>{activity.date}</Text>
              </View>
              <View style={tw`p-4 flex-row`}>
                <View style={tw`w-12 h-12 rounded-full bg-white items-center justify-center mr-3`}>
                  <FontAwesome5 name={activity.icon} size={20} color={tw.color('primary')} />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`font-bold text-white text-base mb-1`}>{activity.title}</Text>
                  <Text style={tw`text-white opacity-90 text-sm`}>{activity.description}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Call to Action */}
        <View style={tw`mx-5`}>
          <View style={tw`bg-primary rounded-xl p-5`}>
            <Text style={tw`text-white font-bold text-xl mb-3 text-center`}>{getInvolvedTitle}</Text>
            <Text style={tw`text-white text-center opacity-90 mb-4`}>
              {getInvolvedText}
            </Text>
            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity 
                style={tw`flex-1 mr-2 bg-white py-3 rounded-lg items-center`}
                onPress={() => Linking.openURL('mailto:contact@marufhasan.org')}
              >
                <Text style={tw`text-primary font-bold`}>{contactButtonText}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={tw`flex-1 ml-2 bg-white py-3 rounded-lg items-center`}
              >
                <Text style={tw`text-primary font-bold`}>{joinTeamButtonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 