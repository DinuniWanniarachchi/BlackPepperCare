import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles';  // Import the styles here

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Background image with overlay and a centered white card */}
      <ImageBackground
        source={require('../../assets/images/pepper 4.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <View style={styles.card}>
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

            {/* Description inside white card */}
            <Text style={styles.description}>
              Quickly identify black pepper leaf diseases with just a photo! Simply upload or take a picture of the leaf, and our app will analyze the image to diagnose the disease with high accuracy. Get immediate results along with useful treatment tips and solutions to help you protect your crops and ensure a healthy harvest.
            </Text>

            {/* Button to Navigate to Upload Page */}
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => router.push('/upload')}
            >
              <Text style={styles.startButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
