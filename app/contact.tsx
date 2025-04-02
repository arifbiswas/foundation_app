import React, { useState } from "react";
import { 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Platform,
  KeyboardAvoidingView,
  Linking
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import tw from "../utils/tw";
import { t, tObj } from '../utils/i18n';

// Get translations with fallbacks
const contactData = tObj('contact');

const title = contactData?.title || 'যোগাযোগ করুন';
const subtitle = contactData?.subtitle || 'আমাদের সাথে সংযোগ স্থাপন করুন';

const addressTitle = contactData?.info?.address?.title || 'ঠিকানা';
const addressValue = contactData?.info?.address?.value || '১২৩ গুলশান এভিনিউ, ঢাকা ১২১২, বাংলাদেশ';

const phoneTitle = contactData?.info?.phone?.title || 'ফোন';
const phoneValue = contactData?.info?.phone?.value || '+৮৮০ ১৭১২-৩৪৫৬৭৮';

const emailTitle = contactData?.info?.email?.title || 'ইমেইল';
const emailValue = contactData?.info?.email?.value || 'info@marufmasum.org';

const hoursTitle = contactData?.info?.hours?.title || 'অফিস সময়';
const hoursValue = contactData?.info?.hours?.value || 'রবিবার-বৃহস্পতিবার: সকাল ৯টা - বিকাল ৫টা';

// Additional translations
const officesTitle = t('contact.offices') || 'আমাদের অফিস';
const messageTitle = t('contact.messageForm.title') || 'আমাদের একটি বার্তা পাঠান';
const nameLabel = t('contact.messageForm.name') || 'পূর্ণ নাম';
const emailLabel = t('contact.messageForm.email') || 'ইমেইল ঠিকানা';
const phoneLabel = t('contact.messageForm.phone') || 'ফোন নম্বর';
const messageLabel = t('contact.messageForm.message') || 'বার্তা';
const sendButtonText = t('contact.messageForm.sendButton') || 'বার্তা পাঠান';
const followUsTitle = t('common.followUs') || 'আমাদের অনুসরণ করুন';

// Contact information based on translations
const contactInfo = [
  { 
    id: '1', 
    title: phoneTitle,
    value: phoneValue,
    icon: 'phone-alt',
    action: () => Linking.openURL(`tel:${phoneValue.replace(/\s+/g, '')}`)
  },
  { 
    id: '2', 
    title: emailTitle, 
    value: emailValue,
    icon: 'envelope',
    action: () => Linking.openURL(`mailto:${emailValue}`)
  },
  { 
    id: '3', 
    title: addressTitle, 
    value: addressValue,
    icon: 'building',
    action: () => {}
  },
];

// Office hours
const officeLocations = [
  { 
    id: '1', 
    city: 'ঢাকা', 
    address: addressValue,
    hours: hoursValue
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  // Define gradient colors separately to avoid type issues
  const primaryColor = String(tw.color('primary'));
  const primaryDarkColor = String(tw.color('primary-700'));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1`}
    >
      <View style={tw`flex-1 bg-neutral-50`}>
        {/* Header */}
        <View style={tw`bg-primary pt-12 pb-16 px-5`}>
          <Text style={tw`text-white text-3xl font-bold`}>{title}</Text>
          <Text style={tw`text-white text-sm mt-1 opacity-90`}>{subtitle}</Text>
        </View>

        <ScrollView 
          style={tw`flex-1 -mt-12`}
          contentContainerStyle={tw`pb-10`}
          showsVerticalScrollIndicator={false}
        >
          {/* Contact cards */}
          <View style={tw`mx-5 mb-6`}>
            {contactInfo.map(item => (
              <TouchableOpacity 
                key={item.id} 
                style={tw`mb-3 bg-white p-4 rounded-xl shadow-sm flex-row items-center`}
                onPress={item.action}
                activeOpacity={0.7}
              >
                <View style={tw`w-10 h-10 rounded-full bg-primary-100 items-center justify-center mr-4`}>
                  <FontAwesome5 name={item.icon} size={16} color={tw.color('primary')} />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-neutral-400 text-xs`}>{item.title}</Text>
                  <Text style={tw`text-neutral-800 font-medium`}>{item.value}</Text>
                </View>
                {item.id !== '3' && (
                  <FontAwesome5 name="chevron-right" size={14} color={tw.color('neutral-400')} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Office locations */}
          <View style={tw`mx-5 mb-6`}>
            <Text style={tw`text-xl font-bold text-neutral-800 mb-3`}>{officesTitle}</Text>
            <View style={tw`bg-white rounded-xl shadow-sm overflow-hidden`}>
              {officeLocations.map((office, index) => (
                <View key={office.id} style={tw`p-4 ${index < officeLocations.length - 1 ? 'border-b border-neutral-100' : ''}`}>
                  <Text style={tw`font-bold text-neutral-800 text-base mb-1`}>{office.city}</Text>
                  <Text style={tw`text-neutral-600 mb-1`}>{office.address}</Text>
                  <Text style={tw`text-neutral-500 text-sm`}>{office.hours}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Contact form */}
          <View style={tw`mx-5 mb-6`}>
            <Text style={tw`text-xl font-bold text-neutral-800 mb-3`}>{messageTitle}</Text>
            <View style={tw`bg-white rounded-xl shadow-sm p-5`}>
              <View style={tw`mb-4`}>
                <Text style={tw`text-neutral-600 mb-1 text-sm`}>{nameLabel}</Text>
                <TextInput
                  style={tw`bg-neutral-100 p-3 rounded-lg text-neutral-800`}
                  placeholder={nameLabel}
                  value={formData.name}
                  onChangeText={text => setFormData({...formData, name: text})}
                />
              </View>
              
              <View style={tw`mb-4`}>
                <Text style={tw`text-neutral-600 mb-1 text-sm`}>{emailLabel}</Text>
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
                <Text style={tw`text-neutral-600 mb-1 text-sm`}>{phoneLabel}</Text>
                <TextInput
                  style={tw`bg-neutral-100 p-3 rounded-lg text-neutral-800`}
                  placeholder={phoneLabel}
                  value={formData.phone}
                  onChangeText={text => setFormData({...formData, phone: text})}
                  keyboardType="phone-pad"
                />
              </View>
              
              <View style={tw`mb-5`}>
                <Text style={tw`text-neutral-600 mb-1 text-sm`}>{messageLabel}</Text>
                <TextInput
                  style={tw`bg-neutral-100 p-3 rounded-lg text-neutral-800 min-h-[100px]`}
                  placeholder={messageLabel}
                  value={formData.message}
                  onChangeText={text => setFormData({...formData, message: text})}
                  multiline
                  textAlignVertical="top"
                />
              </View>
              
              <TouchableOpacity 
                style={tw`bg-primary py-3 rounded-lg items-center`}
                onPress={handleSubmit}
                activeOpacity={0.8}
              >
                <Text style={tw`text-white font-semibold`}>{sendButtonText}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Social media */}
          <View style={tw`mx-5`}>
            <Text style={tw`text-xl font-bold text-neutral-800 mb-3`}>{followUsTitle}</Text>
            <View style={tw`flex-row justify-between bg-white p-4 rounded-xl shadow-sm`}>
              <TouchableOpacity 
                style={tw`items-center`}
                onPress={() => Linking.openURL('https://facebook.com')}
              >
                <View style={tw`w-12 h-12 rounded-full bg-blue-100 items-center justify-center mb-2`}>
                  <FontAwesome5 name="facebook-f" size={20} color="#1877F2" />
                </View>
                <Text style={tw`text-neutral-600 text-xs`}>Facebook</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={tw`items-center`}
                onPress={() => Linking.openURL('https://twitter.com')}
              >
                <View style={tw`w-12 h-12 rounded-full bg-blue-50 items-center justify-center mb-2`}>
                  <FontAwesome5 name="twitter" size={20} color="#1DA1F2" />
                </View>
                <Text style={tw`text-neutral-600 text-xs`}>Twitter</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={tw`items-center`}
                onPress={() => Linking.openURL('https://instagram.com')}
              >
                <View style={tw`w-12 h-12 rounded-full bg-pink-50 items-center justify-center mb-2`}>
                  <FontAwesome5 name="instagram" size={20} color="#E4405F" />
                </View>
                <Text style={tw`text-neutral-600 text-xs`}>Instagram</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={tw`items-center`}
                onPress={() => Linking.openURL('https://youtube.com')}
              >
                <View style={tw`w-12 h-12 rounded-full bg-red-50 items-center justify-center mb-2`}>
                  <FontAwesome5 name="youtube" size={20} color="#FF0000" />
                </View>
                <Text style={tw`text-neutral-600 text-xs`}>YouTube</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
} 