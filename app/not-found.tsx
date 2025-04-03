import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import tw from '@/utils/tw';
import { t } from '@/utils/i18n';

export default function NotFound() {
  return (
    <View style={tw`flex-1 bg-white items-center justify-center p-5`}>
      <FontAwesome5 
        name="exclamation-circle" 
        size={80} 
        color={tw.color('primary')} 
        style={tw`mb-6`}
      />
      
      <Text style={tw`text-2xl font-bold text-neutral-800 mb-2 text-center`}>
        {t('notFound.title') || 'পৃষ্ঠাটি পাওয়া যায়নি'}
      </Text>
      
      <Text style={tw`text-base text-neutral-600 mb-8 text-center`}>
        {t('notFound.message') || 'আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি। অনুগ্রহ করে হোম পেজে ফিরে যান।'}
      </Text>

      <View style={tw`w-full max-w-xs`}>
        <Text
          onPress={() => router.replace('/public')}
          style={tw`bg-primary text-white text-center py-3 px-6 rounded-xl font-bold text-lg`}
        >
          {t('notFound.backHome') || 'হোম পেজে ফিরুন'}
        </Text>
      </View>
    </View>
  );
}