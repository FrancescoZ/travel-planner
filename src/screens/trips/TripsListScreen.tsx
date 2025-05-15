import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Text, FAB, Card, Chip, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TripsStackParamList } from '../../navigation/types';
import { colors } from '../../theme';
import { Trip, TripState } from '../../types';
import Ionicons from '@expo/vector-icons/Ionicons';

type TripsListScreenNavigationProp = NativeStackNavigationProp<TripsStackParamList, 'TripsList'>;

// Mock data for trips
const mockTrips: Trip[] = [
  {
    id: '1',
    title: 'Summer in Rome',
    destinationRegion: 'Rome, Italy',
    startDate: new Date(2023, 6, 15).toISOString(),
    endDate: new Date(2023, 6, 25).toISOString(),
    budget: 2000,
    description: 'Exploring the ancient city of Rome',
    coverImage: 'https://images.unsplash.com/photo-1525874684015-58379d421a52',
    state: TripState.COMPLETED,
    generalTransportation: 'Flight, Public Transport',
    ownerId: '1',
    collaborators: ['2', '3'],
    createdAt: new Date(2023, 5, 10).toISOString(),
    updatedAt: new Date(2023, 5, 10).toISOString(),
  },
  {
    id: '2',
    title: 'Barcelona Weekend',
    destinationRegion: 'Barcelona, Spain',
    startDate: new Date(2023, 9, 20).toISOString(),
    endDate: new Date(2023, 9, 23).toISOString(),
    budget: 800,
    description: 'Weekend getaway to Barcelona',
    coverImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
    state: TripState.WAITING_TO_START,
    generalTransportation: 'Flight',
    ownerId: '1',
    collaborators: ['2'],
    createdAt: new Date(2023, 8, 5).toISOString(),
    updatedAt: new Date(2023, 8, 5).toISOString(),
  },
  {
    id: '3',
    title: 'Japan Adventure',
    destinationRegion: 'Tokyo, Japan',
    startDate: new Date(2023, 11, 1).toISOString(),
    endDate: new Date(2023, 11, 15).toISOString(),
    budget: 5000,
    description: 'Exploring Japan\'s culture and cuisine',
    coverImage: 'https://images.unsplash.com/photo-1528164344705-47542687000d',
    state: TripState.IN_CREATION,
    generalTransportation: 'Flight, Bullet Train',
    ownerId: '1',
    collaborators: [],
    createdAt: new Date(2023, 10, 1).toISOString(),
    updatedAt: new Date(2023, 10, 1).toISOString(),
  },
];

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

// Helper function to format trip date range
const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
};

const TripsListScreen = () => {
  const navigation = useNavigation<TripsListScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [trips, setTrips] = useState(mockTrips);
  
  const filteredTrips = trips.filter((trip) => 
    trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.destinationRegion.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const renderTripCard = ({ item }: { item: Trip }) => {
    const stateColor = getTripStateColor(item.state);
    const dateRange = formatDateRange(item.startDate, item.endDate);
    
    return (
      <Card
        style={styles.tripCard}
        onPress={() => navigation.navigate('TripDetails', { tripId: item.id })}
      >
        <Image 
          source={{ uri: item.coverImage }} 
          style={styles.tripImage}
        />
        <View style={styles.tripStateContainer}>
          <Chip 
            style={[styles.stateChip, { backgroundColor: stateColor }]}
            textStyle={{ color: 'white' }}
          >
            {item.state}
          </Chip>
        </View>
        <Card.Content style={styles.tripContent}>
          <Text style={styles.tripTitle}>{item.title}</Text>
          <View style={styles.tripDetail}>
            <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.tripDetailText}>{item.destinationRegion}</Text>
          </View>
          <View style={styles.tripDetail}>
            <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.tripDetailText}>{dateRange}</Text>
          </View>
          <View style={styles.tripDetail}>
            <Ionicons name="people-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.tripDetailText}>
              {item.collaborators.length > 0 
                ? `You and ${item.collaborators.length} others`
                : 'Just you'
              }
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
        <Searchbar
          placeholder="Search trips..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={colors.primary}
        />
      </View>
      
      {filteredTrips.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="map-outline" size={80} color={colors.textTertiary} />
          <Text style={styles.emptyTitle}>No Trips Found</Text>
          <Text style={styles.emptySubtitle}>
            {searchQuery 
              ? 'Try a different search query'
              : 'Create your first trip to get started'
            }
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredTrips}
          renderItem={renderTripCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('CreateTrip')}
        color="white"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: colors.card,
    borderRadius: 10,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  tripCard: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  tripImage: {
    width: '100%',
    height: 150,
  },
  tripStateContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  stateChip: {
    height: 28,
  },
  tripContent: {
    paddingTop: 12,
  },
  tripTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  tripDetailText: {
    marginLeft: 8,
    color: colors.textSecondary,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});

export default TripsListScreen; 
