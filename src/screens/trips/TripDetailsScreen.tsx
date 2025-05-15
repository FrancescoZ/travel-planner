import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Share } from 'react-native';
import { Text, Button, FAB, Card, Chip, Menu, Divider, Portal, Dialog } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TripsStackParamList } from '../../navigation/types';
import { colors } from '../../theme';
import { FullTrip, Trip, TripState, Day } from '../../types';
import Ionicons from '@expo/vector-icons/Ionicons';

type TripDetailsScreenNavigationProp = NativeStackNavigationProp<TripsStackParamList, 'TripDetails'>;
type TripDetailsScreenRouteProp = RouteProp<TripsStackParamList, 'TripDetails'>;

// Mock data for a full trip
const mockFullTrip: FullTrip = {
  id: '1',
  title: 'Summer in Rome',
  destinationRegion: 'Rome, Italy',
  startDate: new Date(2023, 6, 15).toISOString(),
  endDate: new Date(2023, 6, 20).toISOString(),
  budget: 2000,
  description: 'Exploring the ancient city of Rome, visiting historic sites, enjoying Italian cuisine, and experiencing local culture.',
  coverImage: 'https://images.unsplash.com/photo-1525874684015-58379d421a52',
  state: TripState.WAITING_TO_START,
  generalTransportation: 'Flight, Public Transport',
  ownerId: '1',
  collaborators: ['2', '3'],
  createdAt: new Date(2023, 5, 10).toISOString(),
  updatedAt: new Date(2023, 5, 10).toISOString(),
  days: [
    {
      index: 0,
      date: new Date(2023, 6, 15).toISOString(),
      accommodations: [],
      activities: [],
    },
    {
      index: 1,
      date: new Date(2023, 6, 16).toISOString(),
      accommodations: [],
      activities: [],
    },
    {
      index: 2,
      date: new Date(2023, 6, 17).toISOString(),
      accommodations: [],
      activities: [],
    },
    {
      index: 3,
      date: new Date(2023, 6, 18).toISOString(),
      accommodations: [],
      activities: [],
    },
    {
      index: 4,
      date: new Date(2023, 6, 19).toISOString(),
      accommodations: [],
      activities: [],
    },
    {
      index: 5,
      date: new Date(2023, 6, 20).toISOString(),
      accommodations: [],
      activities: [],
    },
  ],
  comments: [],
};

// Helper function to get a color for a trip state
const getTripStateColor = (state: TripState) => {
  switch (state) {
    case TripState.IN_CREATION:
      return colors.accent3; // Green
    case TripState.WAITING_TO_START:
      return colors.accent2; // Orange
    case TripState.IN_PROGRESS:
      return colors.accent1; // Light blue
    case TripState.COMPLETED:
      return colors.accent4; // Purple
    default:
      return colors.textSecondary;
  }
};

// Helper function to format a date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
};

const TripDetailsScreen = () => {
  const navigation = useNavigation<TripDetailsScreenNavigationProp>();
  const route = useRoute<TripDetailsScreenRouteProp>();
  const { tripId } = route.params;
  
  const [trip, setTrip] = useState<FullTrip | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch trip data from API or local store
    const fetchTrip = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setTrip(mockFullTrip);
      } catch (error) {
        console.error('Error fetching trip:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrip();
    
    // Set up navigation options
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.headerButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={colors.primary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, tripId]);
  
  const handleEditTrip = () => {
    setMenuVisible(false);
    navigation.navigate('EditTrip', { tripId });
  };
  
  const handleShareTrip = async () => {
    setMenuVisible(false);
    
    if (!trip) return;
    
    try {
      await Share.share({
        message: `Check out my trip to ${trip.destinationRegion} from ${new Date(trip.startDate).toLocaleDateString()} to ${new Date(trip.endDate).toLocaleDateString()}!`,
        title: trip.title,
      });
    } catch (error) {
      console.error('Error sharing trip:', error);
    }
  };
  
  const handleManageCollaborators = () => {
    setMenuVisible(false);
    navigation.navigate('ManageCollaborators', { tripId });
  };
  
  const handleDeleteTrip = () => {
    setMenuVisible(false);
    setDeleteDialogVisible(true);
  };
  
  const confirmDeleteTrip = async () => {
    setDeleteDialogVisible(false);
    // In a real app, delete trip from API or local store
    // For now, just navigate back
    navigation.goBack();
  };
  
  const handleDayPress = (dayIndex: number) => {
    navigation.navigate('DayDetails', { tripId, dayIndex });
  };
  
  const renderDayCard = (day: Day) => {
    const date = new Date(day.date);
    const formattedDate = formatDate(day.date);
    const hasActivities = day.activities.length > 0;
    const hasAccommodation = day.accommodations.some(acc => acc.isSelected);
    
    return (
      <TouchableOpacity
        key={day.index}
        style={styles.dayCard}
        onPress={() => handleDayPress(day.index)}
      >
        <Card>
          <Card.Content>
            <View style={styles.dayHeader}>
              <View>
                <Text style={styles.dayTitle}>Day {day.index + 1}</Text>
                <Text style={styles.dayDate}>{formattedDate}</Text>
              </View>
              <View style={styles.dayIndicators}>
                {hasActivities ? (
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} style={styles.indicator} />
                ) : (
                  <Ionicons name="add-circle-outline" size={20} color={colors.textSecondary} style={styles.indicator} />
                )}
                {hasAccommodation ? (
                  <Ionicons name="home" size={20} color={colors.success} style={styles.indicator} />
                ) : (
                  <Ionicons name="home-outline" size={20} color={colors.textSecondary} style={styles.indicator} />
                )}
              </View>
            </View>
            
            <View style={styles.dayContent}>
              {hasActivities ? (
                <Text>{day.activities.length} activities planned</Text>
              ) : (
                <Text style={styles.emptyText}>No activities planned yet</Text>
              )}
              
              {hasAccommodation ? (
                <Text>Accommodation selected</Text>
              ) : (
                <Text style={styles.emptyText}>No accommodation selected</Text>
              )}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  
  if (loading || !trip) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading trip details...</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: trip.coverImage }}
          style={styles.coverImage}
        />
        
        <View style={styles.headerContainer}>
          <Chip 
            style={[styles.stateChip, { backgroundColor: getTripStateColor(trip.state) }]}
            textStyle={{ color: 'white' }}
          >
            {trip.state}
          </Chip>
          
          <Text style={styles.title}>{trip.title}</Text>
          
          <View style={styles.tripDetail}>
            <Ionicons name="location-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.detailText}>{trip.destinationRegion}</Text>
          </View>
          
          <View style={styles.tripDetail}>
            <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.detailText}>
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </Text>
          </View>
          
          {trip.budget && (
            <View style={styles.tripDetail}>
              <Ionicons name="wallet-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.detailText}>Budget: ${trip.budget}</Text>
            </View>
          )}
          
          {trip.generalTransportation && (
            <View style={styles.tripDetail}>
              <Ionicons name="car-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.detailText}>{trip.generalTransportation}</Text>
            </View>
          )}
          
          <View style={styles.tripDetail}>
            <Ionicons name="people-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.detailText}>
              {trip.collaborators.length > 0
                ? `You and ${trip.collaborators.length} others`
                : 'Just you'
              }
            </Text>
          </View>
          
          {trip.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{trip.description}</Text>
            </View>
          )}
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.daysContainer}>
          <Text style={styles.sectionTitle}>Itinerary</Text>
          <View style={styles.daysGrid}>
            {trip.days.map(renderDayCard)}
          </View>
        </View>
      </ScrollView>
      
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={{ x: 0, y: 0 }}
        style={styles.menu}
      >
        <Menu.Item
          leadingIcon="pencil-outline"
          onPress={handleEditTrip}
          title="Edit Trip"
        />
        <Menu.Item
          leadingIcon="share-outline"
          onPress={handleShareTrip}
          title="Share Trip"
        />
        <Menu.Item
          leadingIcon="people-outline"
          onPress={handleManageCollaborators}
          title="Manage Collaborators"
        />
        <Divider />
        <Menu.Item
          leadingIcon="trash-outline"
          onPress={handleDeleteTrip}
          title="Delete Trip"
          titleStyle={{ color: colors.error }}
        />
      </Menu>
      
      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={() => setDeleteDialogVisible(false)}>
          <Dialog.Title>Delete Trip</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this trip? This action cannot be undone.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>Cancel</Button>
            <Button onPress={confirmDeleteTrip} textColor={colors.error}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  headerContainer: {
    padding: 16,
  },
  stateChip: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
  },
  descriptionContainer: {
    marginTop: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  divider: {
    marginVertical: 16,
  },
  daysContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  daysGrid: {
    flexDirection: 'column',
  },
  dayCard: {
    marginBottom: 12,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayDate: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  dayIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    marginLeft: 8,
  },
  dayContent: {
    marginTop: 8,
  },
  emptyText: {
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  headerButton: {
    padding: 8,
  },
});

export default TripDetailsScreen; 
