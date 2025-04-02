import React, { useState } from "react";
import { 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Platform,
  KeyboardAvoidingView,
  Alert,
  Switch
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from "../utils/tw";
import { t, tObj } from "../utils/i18n";

// Get membership interests from translations or use fallback
interface InterestItem {
  id: string;
  title: string;
  icon: string;
}

const membershipInterests: InterestItem[] = [
  { id: '1', title: t('volunteer.interests.options.0.title') || 'সামাজিক কার্যক্রম', icon: 'users' },
  { id: '2', title: t('volunteer.interests.options.1.title') || 'সম্প্রদায় সেবা', icon: 'hands-helping' },
  { id: '3', title: t('volunteer.interests.options.2.title') || 'দাতব্য অনুদান', icon: 'hand-holding-heart' },
  { id: '4', title: t('volunteer.interests.options.3.title') || 'নীতি সমর্থন', icon: 'landmark' },
  { id: '5', title: t('volunteer.interests.options.4.title') || 'শিক্ষা কর্মসূচি', icon: 'graduation-cap' },
  { id: '6', title: t('volunteer.interests.options.5.title') || 'স্বাস্থ্য উদ্যোগ', icon: 'hospital' },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  nid: string;
  dob: string;
  occupation: string;
}

export default function Volunteer() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    nid: '',
    dob: '',
    occupation: '',
  });

  // Selected interests
  const [selectedInterests, setSelectedInterests] = useState<Record<string, boolean>>({});
  // Payment agreement
  const [agreeToPayment, setAgreeToPayment] = useState(false);

  // Get translations
  const pageTitle = t('volunteer.title') || 'যোগ দিন';
  const pageSubtitle = t('volunteer.subtitle') || 'আমাদের ফাউন্ডেশনের সদস্য হোন';
  const introTitle = t('volunteer.intro.title') || 'ফাউন্ডেশন সদস্যতা';
  const introText = t('volunteer.intro.description') || 'মাত্র ১০০ টাকা এন্ট্রি ফি দিয়ে মারুফ হাসান মাসুম ফাউন্ডেশনে যোগ দিন।';
  const personalInfoTitle = t('volunteer.personalInfo.title') || 'ব্যক্তিগত তথ্য';
  const requiredText = t('volunteer.personalInfo.fields.required') || 'প্রয়োজনীয়';
  
  const nameLabel = t('volunteer.personalInfo.fields.name') || 'পূর্ণ নাম';
  const emailLabel = t('volunteer.personalInfo.fields.email') || 'ইমেইল ঠিকানা';
  const phoneLabel = t('volunteer.personalInfo.fields.phone') || 'ফোন নম্বর';
  const nidLabel = t('volunteer.personalInfo.fields.nid') || 'এনআইডি/জন্ম সনদ নম্বর';
  const dobLabel = t('volunteer.personalInfo.fields.dob') || 'জন্ম তারিখ';
  const addressLabel = t('volunteer.personalInfo.fields.address') || 'ঠিকানা';
  const occupationLabel = t('volunteer.personalInfo.fields.occupation') || 'পেশা';
  
  const interestsTitle = t('volunteer.interests.title') || 'আগ্রহের ক্ষেত্র';
  const interestsDesc = t('volunteer.interests.description') || 'আপনি যে ফাউন্ডেশন কার্যক্রমে আগ্রহী তা নির্বাচন করুন:';
  
  const feeTitle = t('volunteer.membershipFee.title') || 'সদস্যতা ফি';
  const feeAmount = t('volunteer.membershipFee.amount') || '১০০ টাকা এন্ট্রি ফি';
  const feeType = t('volunteer.membershipFee.type') || 'এককালীন সদস্যতা ফি';
  const feeAgreement = t('volunteer.membershipFee.agreement') || 'সম্মত হওয়ার মাধ্যমে, আপনি নিশ্চিত করছেন যে আপনি জমা দেওয়ার সময় ১০০ টাকা সদস্যতা ফি প্রদান করবেন';
  
  const submitButtonText = t('volunteer.submitButton') || 'জমা দিন এবং ১০০ টাকা প্রদান করুন';
  const requiredFieldsText = t('volunteer.requiredFields') || '* চিহ্নিত ক্ষেত্রগুলি প্রয়োজনীয়';

  // Toggle selection
  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.nid) {
      Alert.alert("Missing Information", "Please fill in all required fields");
      return;
    }

    if (!agreeToPayment) {
      Alert.alert("Payment Agreement", "Please agree to pay the 100tk membership fee");
      return;
    }

    // Get selected interests
    const interests = Object.keys(selectedInterests).filter(id => selectedInterests[id]);
    
    // Submit application (simulation)
    Alert.alert(
      "Membership Application Submitted",
      "Thank you for joining Maruf Hassan Masum Foundation! Please complete your payment of 100tk to finalize your membership.",
      [{ text: "OK" }]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1`}
    >
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
          {/* Introduction Card */}
          <View style={tw`mx-5 mb-6 rounded-xl overflow-hidden bg-primary shadow-lg`}>
            <View style={tw`p-5`}>
              <Text style={tw`text-white font-bold text-xl mb-2`}>{introTitle}</Text>
              <Text style={tw`text-white leading-5 opacity-90`}>{introText}</Text>
            </View>
          </View>

          {/* Personal Information */}
          <View style={tw`mx-5 mb-6`}>
            <Text style={tw`text-xl font-bold text-neutral-800 mb-3`}>{personalInfoTitle}</Text>
            <View style={tw`bg-white rounded-xl shadow-sm p-5`}>
              <View style={tw`mb-4`}>
                <Text style={tw`text-neutral-600 mb-1 text-sm`}>{nameLabel} <Text style={tw`text-red-500`}>*</Text></Text>
                <TextInput
                  style={tw`bg-neutral-100 p-3 rounded-lg text-neutral-800`}
                  placeholder={nameLabel}
                  value={formData.name}
                  onChangeText={text => setFormData({...formData, name: text})}
                />
              </View>
              
              <View style={tw`mb-4`}>
                <Text style={tw`text-neutral-600 mb-1 text-sm`}>{emailLabel} <Text style={tw`text-red-500`}>*</Text></Text>
                <TextInput
                  style={tw`bg-neutral-100 p-3 rounded-lg text-neutral-800`}
                  placeholder={emailLabel}
                  value={formData.email}
                  onChangeText={text => setFormData({...formData, email: text})}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={tw`mb-4`}>
                <Text style={tw`text-neutral-600 mb-1 text-sm`}>{phoneLabel} <Text style={tw`text-red-500`}>*</Text></Text>
                <TextInput
                  style={tw`bg-neutral-100 p-3 rounded-lg text-neutral-800`}
                  placeholder={phoneLabel}
                  value={formData.phone}
                  onChangeText={text => setFormData({...formData, phone: text})}
                  keyboardType="phone-pad"
                />
              </View>
              
              <View style={tw`mb-4`}>
                <Text style={tw`text-neutral-600 mb-1 text-sm`}>{nidLabel} <Text style={tw`text-red-500`}>*</Text></Text>
                <TextInput
                  style={tw`bg-neutral-100 p-3 rounded-lg text-neutral-800`}
                  placeholder={nidLabel}
                  value={formData.nid}
                  onChangeText={text => setFormData({...formData, nid: text})}
                />
              </View>
              
              <View style={tw`mb-4`}>
                <Text style={tw`text-neutral-600 mb-1 text-sm`}>{dobLabel}</Text>
                <TextInput
                  style={tw`bg-neutral-100 p-3 rounded-lg text-neutral-800`}
                  placeholder="DD/MM/YYYY"
                  value={formData.dob}
                  onChangeText={text => setFormData({...formData, dob: text})}
                />
              </View>
              
              <View style={tw`mb-4`}>
                <Text style={tw`text-neutral-600 mb-1 text-sm`}>{addressLabel}</Text>
                <TextInput
                  style={tw`bg-neutral-100 p-3 rounded-lg text-neutral-800`}
                  placeholder={addressLabel}
                  value={formData.address}
                  onChangeText={text => setFormData({...formData, address: text})}
                  multiline
                />
              </View>
              
              <View style={tw`mb-4`}>
                <Text style={tw`text-neutral-600 mb-1 text-sm`}>{occupationLabel}</Text>
                <TextInput
                  style={tw`bg-neutral-100 p-3 rounded-lg text-neutral-800`}
                  placeholder={occupationLabel}
                  value={formData.occupation}
                  onChangeText={text => setFormData({...formData, occupation: text})}
                />
              </View>
            </View>
          </View>

          {/* Areas of Interest */}
          <View style={tw`mx-5 mb-6`}>
            <Text style={tw`text-xl font-bold text-neutral-800 mb-3`}>{interestsTitle}</Text>
            <View style={tw`bg-white rounded-xl shadow-sm p-5`}>
              <Text style={tw`text-neutral-600 mb-3 text-sm`}>
                {interestsDesc}
              </Text>
              
              {membershipInterests.map((interest: InterestItem) => (
                <TouchableOpacity 
                  key={interest.id}
                  style={tw`flex-row items-center justify-between py-3 border-b border-neutral-100`}
                  onPress={() => toggleInterest(interest.id)}
                >
                  <View style={tw`flex-row items-center`}>
                    <View style={tw`w-10 h-10 rounded-full ${selectedInterests[interest.id] ? 'bg-primary' : 'bg-neutral-100'} items-center justify-center mr-3`}>
                      <FontAwesome5 
                        name={interest.icon} 
                        size={16} 
                        color={selectedInterests[interest.id] ? 'white' : tw.color('neutral-500')} 
                      />
                    </View>
                    <Text style={tw`text-neutral-800 font-medium`}>{interest.title}</Text>
                  </View>
                  <Switch
                    value={!!selectedInterests[interest.id]}
                    onValueChange={() => toggleInterest(interest.id)}
                    thumbColor={selectedInterests[interest.id] ? tw.color('primary') : tw.color('neutral-400')}
                    trackColor={{ 
                      false: tw.color('neutral-200'), 
                      true: tw.color('primary-200') 
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Membership Fee Agreement */}
          <View style={tw`mx-5 mb-6`}>
            <Text style={tw`text-xl font-bold text-neutral-800 mb-3`}>{feeTitle}</Text>
            <View style={tw`bg-white rounded-xl shadow-sm p-5`}>
              <View style={tw`flex-row items-center justify-between py-3 mb-2`}>
                <View style={tw`flex-row items-center`}>
                  <View style={tw`w-10 h-10 rounded-full bg-primary items-center justify-center mr-3`}>
                    <FontAwesome5 name="money-bill-wave" size={16} color="white" />
                  </View>
                  <View>
                    <Text style={tw`text-neutral-800 font-medium`}>{feeAmount}</Text>
                    <Text style={tw`text-neutral-500 text-sm`}>{feeType}</Text>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity 
                style={tw`flex-row items-center mt-2`}
                onPress={() => setAgreeToPayment(!agreeToPayment)}
              >
                <View style={tw`w-6 h-6 rounded-md mr-2 items-center justify-center ${agreeToPayment ? 'bg-primary' : 'bg-neutral-200'}`}>
                  {agreeToPayment && <FontAwesome5 name="check" size={14} color="white" />}
                </View>
                <Text style={tw`text-neutral-600 flex-1`}>
                  {feeAgreement}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <View style={tw`mx-5 mb-3`}>
            <TouchableOpacity
              style={tw`bg-primary rounded-xl py-4 items-center shadow-sm`}
              onPress={handleSubmit}
            >
              <Text style={tw`text-white font-bold text-lg`}>{submitButtonText}</Text>
            </TouchableOpacity>
            <Text style={tw`text-neutral-500 text-sm text-center mt-2`}>
              {requiredFieldsText}
            </Text>
          </View>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
} 