import { Drawer } from "expo-router/drawer";
import React, { useCallback, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Platform, useColorScheme, useWindowDimensions } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from "@react-navigation/drawer";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import tw from "../utils/tw";
import { t, tObj } from "../utils/i18n";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { router } from "expo-router";

SplashScreen.preventAutoHideAsync();

// Social Icon Component
function SocialIcon({ name }: { name: string }) {
  return (
    <View style={tw`bg-white bg-opacity-90 p-3 rounded-full shadow-sm`}>
      <FontAwesome5 name={name} size={20} color="#0A5F52" />
    </View>
  );
}

// Custom Drawer Content component
function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
<>

      {/* Top Section with Profile - Using Gradient */}
      <LinearGradient
        colors={['#0A5F52', '#0E8573']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={tw`pt-8 pb-6 px-4`}
      >
        <View style={tw`items-center mb-4`}>
          <Image 
            source={require('../assets/images/profile.jpg')} 
            style={tw`w-24 h-24 rounded-full border-4 border-white`}
          />
          <Text style={tw`mt-3 text-xl font-bold text-white`}>{t('common.appName')}</Text>
          <Text style={tw`text-white opacity-80`}>info@example.com</Text>
        </View>
      </LinearGradient>
      
<DrawerContentScrollView {...props} contentContainerStyle={tw`flex-1`}>
      {/* Navigation Section */}
      <View style={tw`px-4 pt-4 pb-2`}>
        <Text style={tw`uppercase text-neutral-500 font-bold text-xs mb-3`}>{t('common.navigation')}</Text>
      </View>
      <DrawerItemList {...props} />
      
      {/* Support Section */}
      <View style={tw`px-5 py-4 mx-4 mt-2 bg-neutral-100 rounded-lg`}>
        <Text style={tw`font-bold text-base mb-1 text-neutral-800`}>{t('drawer.supportSection.title')}</Text>
        <Text style={tw`text-sm text-neutral-600 mb-3`}>{t('drawer.supportSection.subtitle')}</Text>
        <TouchableOpacity 
          style={tw`bg-primary py-2 rounded-md flex-row items-center justify-center`}
          onPress={() => props.navigation.navigate('volunteer')}
        >
          <FontAwesome5 name="user-plus" size={14} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white text-center font-bold`}>{t('common.joinNow')}</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
      
      {/* Footer/Social Media Section */}
      <View style={tw`px-4 mt-4 mb-6`}>
        <Text style={tw`uppercase text-neutral-500 font-bold text-xs mb-3`}>{t('common.followUs')}</Text>
        <View style={tw`flex-row justify-between px-4`}>
          <SocialIcon name="facebook" />
          <SocialIcon name="twitter" />
          <SocialIcon name="instagram" />
          <SocialIcon name="youtube" />
        </View>
      </View>
</>
  );
}

// Custom hamburger menu button component
function MenuButton() {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity 
      style={{ marginLeft: 16 , marginRight: 10 }}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    >
      <Ionicons name="menu" size={24} color="white" />
    </TouchableOpacity>
  );
}

// Custom back button component
function BackButton() {
  return (
    <TouchableOpacity 
      style={{ marginLeft: 16 , marginRight: 10 }}
      onPress={() => router.replace("/")}
    >
      <Ionicons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Inter-Black': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const dimensions = useWindowDimensions();
  
  // Set drawer type based on screen width
  const isLargeScreen = dimensions.width >= 768;

  // Get translated drawer items or use defaults
  const getDrawerLabel = (key: string, defaultValue: string) => {
    const translation = t(`drawer.${key}`);
    return translation !== `drawer.${key}` ? translation : defaultValue;
  };

  return (
    <Drawer
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#0A5F52',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: '#0A5F52',
        drawerInactiveTintColor: '#555',
        drawerLabelStyle: {
          marginLeft: 10, // Increased spacing between icon and label
          fontSize: 15,
        },
        drawerItemStyle: {
          borderRadius: 8,
          paddingVertical: 5,
          marginVertical: 2,
          paddingHorizontal: 8,
        },
        // Explicitly set header left for all screens
        headerLeft: () => {
          // Show menu button on home screen
          if (route.name === 'index') {
            return <MenuButton />;
          }
          // Show back button on all other screens
          return <BackButton />;
        }
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: getDrawerLabel('home', 'হোম'),
          title: getDrawerLabel('home', 'হোম'),
          drawerIcon: ({ size, color }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: getDrawerLabel('about', 'আমাদের সম্পর্কে'),
          title: getDrawerLabel('about', 'আমাদের সম্পর্কে'),
          drawerIcon: ({ size, color }) => (
            <FontAwesome5 name="info-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="gallery"
        options={{
          drawerLabel: getDrawerLabel('gallery', 'গ্যালারি'),
          title: getDrawerLabel('gallery', 'গ্যালারি'),
          drawerIcon: ({ size, color }) => (
            <FontAwesome5 name="images" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="volunteer"
        options={{
          drawerLabel: getDrawerLabel('volunteer', 'স্বেচ্ছাসেবক হন'),
          title: getDrawerLabel('volunteer', 'স্বেচ্ছাসেবক হন'),
          drawerIcon: ({ size, color }) => (
            <FontAwesome5 name="hands-helping" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="politics"
        options={{
          drawerLabel: getDrawerLabel('politics', 'রাজনৈতিক কার্যক্রম'),
          title: getDrawerLabel('politics', 'রাজনৈতিক কার্যক্রম'),
          drawerIcon: ({ size, color }) => (
            <FontAwesome5 name="landmark" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="myinfo"
        options={{
          drawerLabel: getDrawerLabel('myinfo', 'আমার তথ্য'),
          title: getDrawerLabel('myinfo', 'আমার তথ্য'),
          drawerIcon: ({ size, color }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="contact"
        options={{
          drawerLabel: getDrawerLabel('contact', 'যোগাযোগ করুন'),
          title: getDrawerLabel('contact', 'যোগাযোগ করুন'),
          drawerIcon: ({ size, color }) => (
            <FontAwesome5 name="phone-alt" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
