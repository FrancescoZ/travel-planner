import React from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors } from '../../theme';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=1000' }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>✈️</Text>
            <Text style={styles.appName}>TravelPlanner</Text>
          </View>
          
          <Text style={styles.tagline}>
            Plan and share your trips with friends and family
          </Text>
          
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              style={styles.button}
              contentStyle={styles.buttonContent}
              onPress={() => navigation.navigate('Login')}
            >
              Log In
            </Button>
            
            <Button
              mode="outlined"
              style={[styles.button, styles.registerButton]}
              contentStyle={styles.buttonContent}
              textColor={colors.background}
              onPress={() => navigation.navigate('Register')}
            >
              Sign Up
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  appName: {
    fontSize: 38,
    fontWeight: 'bold',
    color: colors.background,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.background,
    marginBottom: 60,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    marginVertical: 10,
    borderRadius: 30,
  },
  registerButton: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default WelcomeScreen; 
