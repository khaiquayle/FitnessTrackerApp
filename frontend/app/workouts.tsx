import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function WorkoutsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Workouts</Text>
          <Text style={styles.headerSubtitle}>Track and manage your workouts</Text>
        </View>

        {/* Start Workout Button */}
        <TouchableOpacity 
          style={styles.startWorkoutButton}
          onPress={() => router.push('/workout')}
        >
          <Text style={styles.startWorkoutText}>Start New Workout</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Workouts</Text>
          <View style={styles.workoutCard}>
            <Text style={styles.workoutTitle}>Push Day</Text>
            <Text style={styles.workoutDate}>Today</Text>
            <Text style={styles.workoutStats}>6 exercises planned</Text>
          </View>
          <View style={styles.workoutCard}>
            <Text style={styles.workoutTitle}>Leg Day</Text>
            <Text style={styles.workoutDate}>Tomorrow</Text>
            <Text style={styles.workoutStats}>5 exercises planned</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Templates</Text>
          <View style={styles.workoutCard}>
            <Text style={styles.workoutTitle}>Full Body</Text>
            <Text style={styles.workoutStats}>8 exercises • 60 mins</Text>
          </View>
          <View style={styles.workoutCard}>
            <Text style={styles.workoutTitle}>Upper Body</Text>
            <Text style={styles.workoutStats}>6 exercises • 45 mins</Text>
          </View>
          <View style={styles.workoutCard}>
            <Text style={styles.workoutTitle}>Lower Body</Text>
            <Text style={styles.workoutStats}>5 exercises • 40 mins</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  startWorkoutButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startWorkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  workoutCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  workoutDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  workoutStats: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
}); 