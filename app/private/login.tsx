import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import tw from '@/utils/tw';
import { t } from "@/utils/i18n";
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    // Basic validation

    // if (!username || !password) {
    //   Alert.alert('Error', 'Please enter both username and password');
    //   return;
    // }

    setIsLoading(true);

    // Mock authentication (in a real app, you would call an API)
    setTimeout(() => {
      setIsLoading(false);
      
      router.navigate('/private');
      // // Demo credentials (in a real app, never hardcode credentials)
      // if (username === 'admin' && password === 'password') {
      //   // Navigate to admin panel on successful login
      //   router.navigate('/private/admin');
      // } else {
      //   Alert.alert('Login Failed', 'Invalid username or password');
      // }
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1`}
    >
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#0A5F52', '#0E8573']}
        style={tw`flex-1`}
      >
        <ScrollView contentContainerStyle={tw`flex-grow justify-center px-6 py-16`}>
          {/* Back button */}
          <TouchableOpacity
            style={tw`absolute top-14 left-4 z-10 p-2`}
            onPress={() => router.back()}
          >
            <FontAwesome5 name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          
          {/* Logo and Title */}
          <View style={tw`items-center mb-10`}>
            <Image
              source={require('@/assets/images/profile.jpg')}
              style={tw`w-24 h-24 rounded-full mb-4 border-4 border-white`}
            />
            <Text style={tw`text-white text-3xl font-bold`}>Admin Login</Text>
            <Text style={tw`text-white text-base opacity-80 mt-2`}>Enter your credentials to continue</Text>
          </View>
          
          {/* Login Form */}
          <View style={tw`bg-white rounded-xl p-6 shadow-xl`}>
            {/* Username Input */}
            <View style={tw`mb-4`}>
              <Text style={tw`text-neutral-600 mb-2 font-medium`}>Username</Text>
              <View style={tw`flex-row items-center border border-neutral-300 rounded-lg px-3 py-2`}>
                <FontAwesome5 name="user" size={18} color="#0A5F52" style={tw`mr-3`} />
                <TextInput
                  style={tw`flex-1 text-base`}
                  placeholder="Enter your username"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            </View>
            
            {/* Password Input */}
            <View style={tw`mb-6`}>
              <Text style={tw`text-neutral-600 mb-2 font-medium`}>Password</Text>
              <View style={tw`flex-row items-center border border-neutral-300 rounded-lg px-3 py-2`}>
                <FontAwesome5 name="lock" size={18} color="#0A5F52" style={tw`mr-3`} />
                <TextInput
                  style={tw`flex-1 text-base`}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>
            
            {/* Login Button */}
            <TouchableOpacity
              style={tw`bg-primary py-3 rounded-lg items-center justify-center mb-4`}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text style={tw`text-white font-bold`}>Logging in...</Text>
              ) : (
                <Text style={tw`text-white font-bold`}>Login</Text>
              )}
            </TouchableOpacity>
            
            {/* Help Text */}
            <Text style={tw`text-center text-neutral-500`}>
              Demo credentials: admin / password
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
} 