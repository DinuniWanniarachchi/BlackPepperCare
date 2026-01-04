// app/tabs/index.tsx

import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles';  // Import the styles here

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Set the full background image */}
      <ImageBackground 
        source={require('../../assets/images/pepper 3.jpg')}  // Set your background image
        style={styles.backgroundImage} 
        imageStyle={styles.backgroundImageStyle}  // Apply any image-specific styles (e.g., resizing)
      >
        {/* Optional: Dark overlay to ensure text visibility */}
        <View style={styles.overlay}>
          <View style={styles.content}>
            {/* App Title */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                {/* Display the leaf image inside a circle */}
                <Image 
                  source={require('../../assets/images/pepper.jpg')} 
                  style={styles.leafImage} 
                />
              </View>
              <Text style={styles.appTitle}>Black Pepper Care</Text>
            </View>

            {/* Button to Navigate to Upload Page */}
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => router.push('/upload')}
            >
              <Text style={styles.startButtonText}>Get Started</Text>
            </TouchableOpacity>

            {/* Description */}
            <Text style={styles.description}>
              Identify black pepper diseases using a photo of the leaf.
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
