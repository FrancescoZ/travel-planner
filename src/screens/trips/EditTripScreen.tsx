import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, HelperText, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TripsStackParamList } from '../../navigation/types';
import { colors } from '../../theme';
import { TripState, Trip } from '../../types';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

type EditTripScreenNavigationProp = NativeStackNavigationProp<TripsStackParamList, 'EditTrip'>;
type EditTripScreenRouteProp = RouteProp<TripsStackParamList, 'EditTrip'>;

// Sample cover images (same as in CreateTripScreen)
const sampleCoverImages = [
  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
  'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9',
  'https://images.unsplash.com/photo-1503220317375-aaad61436b1b',
  'https://images.unsplash.com/photo-1581351721010-8cf859cb14a4',
  'https://images.unsplash.com/photo-1519677100203-a0e668c92439',
  'https://images.unsplash.com/photo-1515859005217-8a1f08870f59',
];

// Mock trip data for testing
const mockTrip: Trip = {
  id: '1',
  title: 'Summer in Rome',
  destinationRegion: 'Rome, Italy',
  startDate: new Date(2023, 6, 15).toISOString(),
  endDate: new Date(2023, 6, 25).toISOString(),
  budget: 2000,
  description: 'Exploring the ancient city of Rome',
  coverImage: 'https://images.unsplash.com/photo-1525874684015-58379d421a52',
  state: TripState.WAITING_TO_START,
  generalTransportation: 'Flight, Public Transport',
  ownerId: '1',
  collaborators: ['2', '3'],
  createdAt: new Date(2023, 5, 10).toISOString(),
  updatedAt: new Date(2023, 5, 10).toISOString(),
};

const EditTripScreen = () => {
  const navigation = useNavigation<EditTripScreenNavigationProp>();
  const route = useRoute<EditTripScreenRouteProp>();
  const { tripId } = route.params;
  
  // Form state
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [budget, setBudget] = useState('');
  const [transportation, setTransportation] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [tripState, setTripState] = useState<TripState>(TripState.IN_CREATION);
  
  // UI state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  
  // Load existing trip data
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        // In a real app, fetch trip from API
        // For now, use mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Populate form with mock trip data
        setTitle(mockTrip.title);
        setDestination(mockTrip.destinationRegion);
        setStartDate(new Date(mockTrip.startDate));
        setEndDate(new Date(mockTrip.endDate));
        setBudget(mockTrip.budget?.toString() || '');
        setTransportation(mockTrip.generalTransportation || '');
        setDescription(mockTrip.description || '');
        setCoverImage(mockTrip.coverImage || null);
        setTripState(mockTrip.state);
      } catch (error) {
        console.error('Error fetching trip data:', error);
        setError('Failed to load trip details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrip();
  }, [tripId]);
  
  // Validation
  const validateForm = () => {
    if (!title.trim()) {
      setError('Please enter a trip title');
      return false;
    }
    if (!destination.trim()) {
      setError('Please enter a destination');
      return false;
    }
    if (endDate < startDate) {
      setError('End date cannot be before start date');
      return false;
    }
    return true;
  };
  
  // Handle date changes
  const onStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      
      // If end date is before new start date, update end date
      if (endDate < selectedDate) {
        const newEndDate = new Date(selectedDate);
        newEndDate.setDate(selectedDate.getDate() + 1);
        setEndDate(newEndDate);
      }
    }
  };
  
  const onEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Handle form submission
  const handleUpdateTrip = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // In a real app, call API to update trip
      // For now, simulate a delay and navigate back
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to trip details
      navigation.navigate('TripDetails', { tripId });
    } catch (err) {
      console.error('Error updating trip:', err);
      setError('Failed to update trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Render cover image selector
  const renderCoverImageSelector = () => {
    return (
      <View style={styles.coverImageSection}>
        <Text style={styles.sectionTitle}>Cover Image</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
          {sampleCoverImages.map((imageUrl, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.imageThumbnail,
                coverImage === imageUrl && styles.selectedImageThumbnail,
              ]}
              onPress={() => setCoverImage(imageUrl)}
            >
              <Image source={{ uri: imageUrl }} style={styles.thumbnailImage} />
              {coverImage === imageUrl && (
                <View style={styles.selectedOverlay}>
                  <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {coverImage && (
          <View style={styles.selectedImageContainer}>
            <Image source={{ uri: coverImage }} style={styles.selectedImage} />
          </View>
        )}
      </View>
    );
  };
  
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <Text>Loading trip details...</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {error ? (
            <HelperText type="error" visible={!!error}>
              {error}
            </HelperText>
          ) : null}
          
          <TextInput
            label="Trip Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            mode="outlined"
          />
          
          <TextInput
            label="Destination"
            value={destination}
            onChangeText={setDestination}
            style={styles.input}
            mode="outlined"
          />
          
          <View style={styles.dateSection}>
            <Text style={styles.sectionTitle}>Trip Dates</Text>
            
            <View style={styles.dateRow}>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowStartDatePicker(true)}
              >
                <Text style={styles.dateLabel}>Start Date</Text>
                <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
                <Ionicons name="calendar-outline" size={20} color={colors.primary} />
              </TouchableOpacity>
              
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={onStartDateChange}
                />
              )}
            </View>
            
            <View style={styles.dateRow}>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowEndDatePicker(true)}
              >
                <Text style={styles.dateLabel}>End Date</Text>
                <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
                <Ionicons name="calendar-outline" size={20} color={colors.primary} />
              </TouchableOpacity>
              
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={onEndDateChange}
                  minimumDate={startDate}
                />
              )}
            </View>
            
            <Chip style={styles.durationChip}>
              {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
            </Chip>
          </View>
          
          <TextInput
            label="Budget (optional)"
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            left={<TextInput.Affix text="$" />}
          />
          
          <TextInput
            label="Transportation (optional)"
            value={transportation}
            onChangeText={setTransportation}
            style={styles.input}
            mode="outlined"
            placeholder="E.g., Flight, Car, Train"
          />
          
          <TextInput
            label="Description (optional)"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={4}
          />
          
          {renderCoverImageSelector()}
          
          <Button
            mode="contained"
            onPress={handleUpdateTrip}
            style={styles.updateButton}
            loading={loading}
            disabled={loading}
          >
            Save Changes
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  dateSection: {
    marginBottom: 16,
  },
  dateRow: {
    marginBottom: 12,
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateLabel: {
    color: colors.textSecondary,
    width: 80,
  },
  dateValue: {
    flex: 1,
    marginLeft: 8,
    fontWeight: '500',
  },
  durationChip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
  },
  coverImageSection: {
    marginBottom: 24,
  },
  imageScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  imageThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    overflow: 'hidden',
  },
  selectedImageThumbnail: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  updateButton: {
    marginTop: 16,
    paddingVertical: 8,
    borderRadius: 30,
  },
});

export default EditTripScreen; 
