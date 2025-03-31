import React from 'react';
import { StyleSheet, Modal, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

type Exercise = {
  id: string;
  name: string;
  category: string;
};

type WorkoutExercise = Exercise & {
  sets: { reps: number; weight: number }[];
};

export default function WorkoutScreen() {
  const router = useRouter();
  const [isAddExerciseModalVisible, setIsAddExerciseModalVisible] = useState(false);
  const [isExerciseDetailModalVisible, setIsExerciseDetailModalVisible] = useState(false);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'chest', name: 'Chest' },
    { id: 'back', name: 'Back' },
    { id: 'legs', name: 'Legs' },
    { id: 'shoulders', name: 'Shoulders' },
    { id: 'arms', name: 'Arms' },
  ];

  const exercises = [
    // Chest
    { id: '1', name: 'Bench Press', category: 'chest' },
    { id: '2', name: 'Dumbbell Bench Press', category: 'chest' },
    { id: '3', name: 'Incline Dumbbell Bench Press', category: 'chest' },
    { id: '4', name: 'Decline Dumbbell Bench Press', category: 'chest' },
    { id: '5', name: 'Pushups', category: 'chest' },
    { id: '6', name: 'Incline Bench Press', category: 'chest' },
    { id: '7', name: 'Decline Bench Press', category: 'chest' },
    { id: '8', name: 'Dumbell Chest Fly', category: 'chest' },
    { id: '9', name: 'Cable Chest Fly', category: 'chest' },
    
    // Back
    { id: '10', name: 'Pull-ups', category: 'back' },
    { id: '11', name: 'Chinups', category: 'back' },
    { id: '12', name: 'Barbell Bent Over Row', category: 'back' },
    { id: '13', name: 'Back Row', category: 'back' },
    { id: '14', name: 'Wide Grip Pulldowns', category: 'back' },
    { id: '15', name: 'Close Grip Pulldowns', category: 'back' },
    { id: '16', name: 'Seated Cable Rows', category: 'back' },
    
    // Legs
    { id: '17', name: 'Squats', category: 'legs' },
    { id: '18', name: 'Dumbbell Squats', category: 'legs' },
    { id: '19', name: 'Front Squats', category: 'legs' },
    { id: '20', name: 'Deadlift', category: 'legs' },
    { id: '21', name: 'Romanian Deadlift', category: 'legs' },
    { id: '22', name: 'Quad Extensions', category: 'legs' },
    { id: '23', name: 'Hamstring Curls', category: 'legs' },
    { id: '24', name: 'Leg Press', category: 'legs' },
    { id: '25', name: 'Cable Kicks', category: 'legs' },
    { id: '26', name: 'Back Squats', category: 'legs' },
    { id: '27', name: 'Hack Squats', category: 'legs' },
    { id: '28', name: 'Hip Abduction', category: 'legs' },
    { id: '29', name: 'Hip Thrusts', category: 'legs' },
    { id: '30', name: 'Calf Raises', category: 'legs' },

    // Shoulders
    { id: '31', name: 'Shoulder Press', category: 'shoulders' },
    { id: '32', name: 'Overhead Press', category: 'shoulders' },
    { id: '33', name: 'Lateral Raises', category: 'shoulders' },
    { id: '34', name: 'Front Raises', category: 'shoulders' },
    { id: '35', name: 'Rear Delt Raises', category: 'shoulders' },
    { id: '36', name: 'Face Pulls', category: 'shoulders' },
    { id: '37', name: 'Shrugs', category: 'shoulders' },
    { id: '38', name: 'Dumbbell Shoulder Press', category: 'shoulders' },
    { id: '39', name: 'Arnold Press', category: 'shoulders' },
    
    // Arms
    { id: '40', name: 'Dumbbell Bicep Curls', category: 'arms' },
    { id: '41', name: 'Dumbbell Hammer Curls', category: 'arms' },
    { id: '42', name: 'Dumbbell Triceps Skull Crusher', category: 'arms' },
    { id: '43', name: 'Barbell Triceps Skull Crusher', category: 'arms' },
    { id: '44', name: 'Tricep Pushdowns', category: 'arms' },
    { id: '45', name: 'Overhead Triceps Extension', category: 'arms' },
    { id: '46', name: 'Barbell Curls', category: 'arms' },
    { id: '47', name: 'Concentration Curls', category: 'arms' },
    { id: '48', name: 'Preacher Curls', category: 'arms' },
    { id: '49', name: 'Preacher Hammer Curls', category: 'arms' },
    { id: '50', name: 'Forearm Curls', category: 'arms' },
    { id: '51', name: 'Reverse Grip Curls', category: 'arms' },
    { id: '52', name: 'Dips', category: 'arms' },
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddExercise = (exercise: Exercise) => {
    const newWorkoutExercise: WorkoutExercise = {
      ...exercise,
      sets: [{ reps: 0, weight: 0 }],
    };
    setWorkoutExercises([...workoutExercises, newWorkoutExercise]);
    setIsAddExerciseModalVisible(false);
  };

  const handleAddSet = (exerciseIndex: number) => {
    const updatedExercises = [...workoutExercises];
    updatedExercises[exerciseIndex].sets.push({ reps: 0, weight: 0 });
    setWorkoutExercises(updatedExercises);
  };

  const handleUpdateSet = (exerciseIndex: number, setIndex: number, field: 'reps' | 'weight', value: string) => {
    const updatedExercises = [...workoutExercises];
    updatedExercises[exerciseIndex].sets[setIndex][field] = Number(value) || 0;
    setWorkoutExercises(updatedExercises);
  };

  const handleRemoveSet = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...workoutExercises];
    updatedExercises[exerciseIndex].sets.splice(setIndex, 1);
    setWorkoutExercises(updatedExercises);
  };

  const handleRemoveExercise = (exerciseIndex: number) => {
    const updatedExercises = [...workoutExercises];
    updatedExercises.splice(exerciseIndex, 1);
    setWorkoutExercises(updatedExercises);
    setIsExerciseDetailModalVisible(false);
  };

  const handleExercisePress = (index: number) => {
    setSelectedExerciseIndex(index);
    setIsExerciseDetailModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Workout in Progress</Text>
          <Text style={styles.headerSubtitle}>Track your exercises</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          {workoutExercises.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No exercises added yet</Text>
              <TouchableOpacity 
                style={styles.addExerciseButton}
                onPress={() => setIsAddExerciseModalVisible(true)}
              >
                <Text style={styles.addExerciseText}>Add Exercise</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {workoutExercises.map((exercise, index) => (
                <TouchableOpacity
                  key={exercise.id}
                  style={styles.workoutExercise}
                  onPress={() => handleExercisePress(index)}
                >
                  <Text style={styles.workoutExerciseName}>{exercise.name}</Text>
                  <View style={styles.sets}>
                    {exercise.sets.map((set, setIndex) => (
                      <View key={setIndex} style={styles.set}>
                        <Text style={styles.setText}>Set {setIndex + 1}</Text>
                        <View style={styles.setInputs}>
                          <Text style={styles.setLabel}>Reps: {set.reps}</Text>
                          <Text style={styles.setLabel}>Weight: {set.weight}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
              <TouchableOpacity 
                style={[styles.addExerciseButton, styles.addMoreButton]}
                onPress={() => setIsAddExerciseModalVisible(true)}
              >
                <Text style={styles.addExerciseText}>Add Another Exercise</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {/* Exercise Detail Modal */}
      <Modal
        visible={isExerciseDetailModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsExerciseDetailModalVisible(false)}
        statusBarTranslucent
        presentationStyle="pageSheet"
      >
        <TouchableOpacity 
          style={styles.modalContainer} 
          activeOpacity={1} 
          onPress={() => setIsExerciseDetailModalVisible(false)}
        >
          <TouchableOpacity 
            activeOpacity={1} 
            style={styles.modalContent}
            onPress={e => e.stopPropagation()}
          >
            <View style={styles.modalHandle} />
            {selectedExerciseIndex !== null && (
              <>
                <Text style={styles.modalTitle}>{workoutExercises[selectedExerciseIndex].name}</Text>
                <ScrollView style={styles.setsContainer}>
                  {workoutExercises[selectedExerciseIndex].sets.map((set, setIndex) => (
                    <View key={setIndex} style={styles.setDetail}>
                      <Text style={styles.setText}>Set {setIndex + 1}</Text>
                      <View style={styles.setInputsContainer}>
                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>Reps</Text>
                          <TextInput
                            style={styles.input}
                            value={set.reps.toString()}
                            onChangeText={(value) => handleUpdateSet(selectedExerciseIndex, setIndex, 'reps', value)}
                            keyboardType="numeric"
                          />
                        </View>
                        <View style={styles.inputGroup}>
                          <Text style={styles.inputLabel}>Weight</Text>
                          <TextInput
                            style={styles.input}
                            value={set.weight.toString()}
                            onChangeText={(value) => handleUpdateSet(selectedExerciseIndex, setIndex, 'weight', value)}
                            keyboardType="numeric"
                          />
                        </View>
                        <TouchableOpacity
                          style={styles.removeSetButton}
                          onPress={() => handleRemoveSet(selectedExerciseIndex, setIndex)}
                        >
                          <FontAwesome name="trash" size={20} color="#ff3b30" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </ScrollView>
                
                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={styles.addSetButton}
                    onPress={() => handleAddSet(selectedExerciseIndex)}
                  >
                    <Text style={styles.addSetButtonText}>Add Set</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.removeExerciseButton}
                    onPress={() => handleRemoveExercise(selectedExerciseIndex)}
                  >
                    <Text style={styles.removeExerciseText}>Remove Exercise</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={isAddExerciseModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddExerciseModalVisible(false)}
        statusBarTranslucent
        presentationStyle="pageSheet"
      >
        <TouchableOpacity 
          style={styles.modalContainer} 
          activeOpacity={1} 
          onPress={() => setIsAddExerciseModalVisible(false)}
        >
          <TouchableOpacity 
            activeOpacity={1} 
            style={styles.modalContent}
            onPress={e => e.stopPropagation()}
          >
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Add Exercise</Text>
            
            <View style={styles.searchContainer}>
              <FontAwesome name="search" size={20} color="#555" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search exercises..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && styles.selectedCategory
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.selectedCategoryText
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView style={styles.exerciseList}>
              {filteredExercises.map(exercise => (
                <TouchableOpacity
                  key={exercise.id}
                  style={styles.exerciseItem}
                  onPress={() => handleAddExercise(exercise)}
                >
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <FontAwesome name="chevron-right" size={16} color="#666" />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setIsAddExerciseModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  addExerciseButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addExerciseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '70%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    marginBottom: 20,
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 0,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    color: '#555',
    fontSize: 14,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  exerciseList: {
    flex: 1,
    marginTop: -300,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  exerciseName: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  workoutExercise: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  workoutExerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  sets: {
    gap: 10,
  },
  set: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  setText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  setInputs: {
    flexDirection: 'row',
    gap: 15,
  },
  setLabel: {
    fontSize: 14,
    color: '#666',
  },
  addMoreButton: {
    marginTop: 5,
  },
  setDetail: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  setInputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  removeSetButton: {
    padding: 10,
  },
  modalActions: {
    marginTop: 20,
    gap: 10,
  },
  addSetButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addSetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  removeExerciseButton: {
    backgroundColor: '#ff3b30',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  removeExerciseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  setsContainer: {
    maxHeight: '70%',
  },
});
