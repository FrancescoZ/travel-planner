import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, Button, FAB, Card, Chip, Divider, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TripsStackParamList } from '../../navigation/types';
import { colors } from '../../theme';
import { FullTrip, Day, Activity, Accommodation } from '../../types';
import Ionicons from '@expo/vector-icons/Ionicons';

type DayDetailsScreenNavigationProp = NativeStackNavigationProp<TripsStackParamList, 'DayDetails'>;
type DayDetailsScreenRouteProp = RouteProp<TripsStackParamList, 'DayDetails'>;

// Mock full trip data
const mockFullTrip: FullTrip = {
  id: '1',
  title: 'Summer in Rome',
  destinationRegion: 'Rome, Italy',
  startDate: new Date(2023, 6, 15).toISOString(),
  endDate: new Date(2023, 6, 20).toISOString(),
  budget: 2000,
  description: 'Exploring the ancient city of Rome',
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
      accommodations: [
        {
          id: 'acc1',
          tripId: '1',
          dayIndex: 0,
          name: 'Hotel Roma',
          location: {
            latitude: 41.9028,
            longitude: 12.4964,
            address: 'Via del Corso 123, Rome, Italy',
            name: 'Hotel Roma',
          },
          price: 150,
          url: 'https://example.com/hotel-roma',
          photos: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
          isSelected: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      activities: [
        {
          id: 'act1',
          tripId: '1',
          dayIndex: 0,
          name: 'Colosseum Tour',
          location: {
            latitude: 41.8902,
            longitude: 12.4924,
            address: 'Piazza del Colosseo, Rome, Italy',
            name: 'Colosseum',
          },
          startTime: new Date(2023, 6, 15, 10, 0).toISOString(),
          endTime: new Date(2023, 6, 15, 12, 0).toISOString(),
          price: 25,
          url: 'https://example.com/colosseum-tour',
          photos: ['https://images.unsplash.com/photo-1552832230-c0197dd311b5'],
          votes: ['1', '2'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'act2',
          tripId: '1',
          dayIndex: 0,
          name: 'Lunch at La Trattoria',
          location: {
            latitude: 41.8992,
            longitude: 12.4768,
            address: 'Via della Lungaretta 45, Rome, Italy',
            name: 'La Trattoria',
          },
          startTime: new Date(2023, 6, 15, 13, 0).toISOString(),
          endTime: new Date(2023, 6, 15, 14, 30).toISOString(),
          price: 30,
          photos: [],
          votes: ['1', '3'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      transportation: {
        id: 'trans1',
        tripId: '1',
        dayIndex: 0,
        type: 'Public Transportation',
        details: 'Metro and walking',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    {
      index: 1,
      date: new Date(2023, 6, 16).toISOString(),
      accommodations: [],
      activities: [],
    },
  ],
  comments: [],
};

// Helper to format time
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

// Helper to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};

const DayDetailsScreen = () => {
  const navigation = useNavigation<DayDetailsScreenNavigationProp>();
  const route = useRoute<DayDetailsScreenRouteProp>();
  const { tripId, dayIndex } = route.params;
  
  const [trip, setTrip] = useState<FullTrip | null>(null);
  const [day, setDay] = useState<Day | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch trip data from API or local store
    const fetchTrip = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setTrip(mockFullTrip);
        const foundDay = mockFullTrip.days.find(d => d.index === dayIndex);
        setDay(foundDay || null);
      } catch (error) {
        console.error('Error fetching trip:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrip();
    
    // Set up navigation options
    navigation.setOptions({
      title: `Day ${dayIndex + 1}`,
    });
  }, [navigation, tripId, dayIndex]);
  
  const handleAddActivity = () => {
    navigation.navigate('AddActivity', { tripId, dayIndex });
  };
  
  const handleAddAccommodation = () => {
    navigation.navigate('AddAccommodation', { tripId, dayIndex });
  };
  
  const handleActivityPress = (activityId: string) => {
    navigation.navigate('ActivityDetails', { tripId, dayIndex, activityId });
  };
  
  const handleAccommodationPress = (accommodationId: string) => {
    navigation.navigate('AccommodationDetails', { tripId, dayIndex, accommodationId });
  };
  
  const renderTimelineItem = (activity: Activity) => {
    if (!activity.startTime || !activity.endTime) return null;
    
    return (
      <View style={styles.timelineItem} key={activity.id}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(activity.startTime)}</Text>
          <View style={styles.timeLine} />
          <Text style={styles.timeText}>{formatTime(activity.endTime)}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.activityCard}
          onPress={() => handleActivityPress(activity.id)}
        >
          <Card>
            <Card.Content>
              <Text style={styles.activityTitle}>{activity.name}</Text>
              
              <View style={styles.activityDetail}>
                <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.detailText}>{activity.location.name || activity.location.address}</Text>
              </View>
              
              {activity.price && (
                <View style={styles.activityDetail}>
                  <Ionicons name="wallet-outline" size={16} color={colors.textSecondary} />
                  <Text style={styles.detailText}>${activity.price}</Text>
                </View>
              )}
              
              <View style={styles.activityDetail}>
                <Ionicons name="thumbs-up-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.detailText}>{activity.votes.length} votes</Text>
              </View>
            </Card.Content>
            
            {activity.photos && activity.photos.length > 0 && (
              <Card.Cover source={{ uri: activity.photos[0] }} style={styles.activityImage} />
            )}
          </Card>
        </TouchableOpacity>
      </View>
    );
  };
  
  const renderAccommodation = (accommodation: Accommodation) => {
    return (
      <TouchableOpacity
        key={accommodation.id}
        onPress={() => handleAccommodationPress(accommodation.id)}
      >
        <Card style={styles.accommodationCard}>
          {accommodation.photos && accommodation.photos.length > 0 && (
            <Card.Cover source={{ uri: accommodation.photos[0] }} style={styles.accommodationImage} />
          )}
          
          <Card.Content>
            <Text style={styles.accommodationTitle}>{accommodation.name}</Text>
            
            <View style={styles.accommodationDetail}>
              <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.detailText}>{accommodation.location.address}</Text>
            </View>
            
            {accommodation.price && (
              <View style={styles.accommodationDetail}>
                <Ionicons name="wallet-outline" size={16} color={colors.textSecondary} />
                <Text style={styles.detailText}>${accommodation.price}/night</Text>
              </View>
            )}
            
            {accommodation.isSelected && (
              <Chip style={styles.selectedChip} textColor="white">
                Selected
              </Chip>
            )}
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  
  const renderTransportation = () => {
    if (!day || !day.transportation) return null;
    
    return (
      <Card style={styles.transportationCard}>
        <Card.Content>
          <View style={styles.transportationHeader}>
            <Ionicons name="car-outline" size={24} color={colors.accent2} />
            <Text style={styles.transportationTitle}>Transportation</Text>
          </View>
          
          <Text style={styles.transportationType}>{day.transportation.type}</Text>
          
          {day.transportation.details && (
            <Text style={styles.transportationDetails}>{day.transportation.details}</Text>
          )}
        </Card.Content>
      </Card>
    );
  };
  
  if (loading || !trip || !day) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }
  
  const sortedActivities = [...day.activities].sort((a, b) => {
    if (!a.startTime || !b.startTime) return 0;
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.date}>{formatDate(day.date)}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{day.activities.length}</Text>
              <Text style={styles.statLabel}>Activities</Text>
            </View>
            
            <View style={styles.stat}>
              <Text style={styles.statValue}>{day.accommodations.length}</Text>
              <Text style={styles.statLabel}>Accommodations</Text>
            </View>
            
            <View style={styles.stat}>
              <Text style={styles.statValue}>{day.transportation ? '1' : '0'}</Text>
              <Text style={styles.statLabel}>Transportation</Text>
            </View>
          </View>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Activities</Text>
            <TouchableOpacity onPress={handleAddActivity}>
              <Text style={styles.addLink}>+ Add</Text>
            </TouchableOpacity>
          </View>
          
          {sortedActivities.length > 0 ? (
            <View style={styles.timeline}>
              {sortedActivities.map(renderTimelineItem)}
            </View>
          ) : (
            <Text style={styles.emptyText}>No activities planned for this day yet.</Text>
          )}
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Accommodation</Text>
            <TouchableOpacity onPress={handleAddAccommodation}>
              <Text style={styles.addLink}>+ Add</Text>
            </TouchableOpacity>
          </View>
          
          {day.accommodations.length > 0 ? (
            <View>
              {day.accommodations.map(renderAccommodation)}
            </View>
          ) : (
            <Text style={styles.emptyText}>No accommodations added for this day yet.</Text>
          )}
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transportation</Text>
          </View>
          
          {day.transportation ? (
            renderTransportation()
          ) : (
            <Text style={styles.emptyText}>No transportation details added for this day yet.</Text>
          )}
        </View>
      </ScrollView>
      
      <FAB.Group
        open={false}
        visible={true}
        icon="plus"
        actions={[
          {
            icon: 'bed',
            label: 'Add Accommodation',
            onPress: handleAddAccommodation,
          },
          {
            icon: 'map-marker',
            label: 'Add Activity',
            onPress: handleAddActivity,
          },
        ]}
        fabStyle={styles.fab}
      />
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
  header: {
    padding: 16,
  },
  date: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  divider: {
    marginVertical: 8,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addLink: {
    color: colors.primary,
    fontWeight: '500',
  },
  emptyText: {
    color: colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
  },
  timeline: {
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeContainer: {
    width: 70,
    alignItems: 'center',
    marginRight: 8,
  },
  timeText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  timeLine: {
    width: 2,
    height: 40,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  activityCard: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  activityDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 6,
    fontSize: 14,
    color: colors.textSecondary,
  },
  activityImage: {
    height: 120,
  },
  accommodationCard: {
    marginBottom: 12,
  },
  accommodationImage: {
    height: 160,
  },
  accommodationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  accommodationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  selectedChip: {
    backgroundColor: colors.success,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  transportationCard: {
    marginTop: 8,
  },
  transportationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  transportationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  transportationType: {
    fontSize: 16,
    marginBottom: 4,
  },
  transportationDetails: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  fab: {
    backgroundColor: colors.primary,
  },
});

// Import missing TripState enum
import { TripState } from '../../types';

export default DayDetailsScreen; 
