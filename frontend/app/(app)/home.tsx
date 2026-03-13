import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { taskService } from '../../services/api';
import { Task } from '../../types';
import { TaskCard } from '../../components/TaskCard';
import { ThemeToggle } from '../../components/ThemeToggle';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useDebounce } from '../../hooks/useDebounce';
import { TaskStatsCard } from '../../components/TaskStatsCard';

// Cross-platform confirm helper.
// On web, Alert.alert callbacks are not invoked (browser alert has no buttons),
// so we fall back to window.confirm() which works synchronously.
function confirmAction(title: string, message: string, onConfirm: () => void) {
  if (Platform.OS === 'web') {
    const ok = (window as any).confirm(`${title}\n\n${message}`);
    if (ok) onConfirm();
  } else {
    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm', style: 'destructive', onPress: onConfirm },
    ]);
  }
}

export default function HomeScreen() {
  const { colors } = useTheme();
  const { logout, user } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const statuses = ['All', 'Pending', 'In Progress', 'Completed'];

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks(selectedStatus === 'All' ? undefined : selectedStatus);
      setTasks(data);
      console.log('[HomeScreen] Tasks loaded:', data.length);
    } catch (error) {
      console.error('[HomeScreen] Failed to load tasks:', error);
      Alert.alert('Error', 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
    }, [selectedStatus])
  );

  // Client-side filtering based on debounced search query
  const filteredTasks = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return tasks;
    const query = debouncedSearchQuery.toLowerCase();
    return tasks.filter(
      task =>
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
    );
  }, [tasks, debouncedSearchQuery]);

  const handleDeleteTask = (id: string) => {
    confirmAction('Delete Task', 'Are you sure you want to delete this task?', async () => {
      try {
        await taskService.deleteTask(id);
        setTasks(prev => prev.filter(t => t._id !== id));
        console.log('[HomeScreen] Task deleted:', id);
      } catch (error) {
        console.error('[HomeScreen] Failed to delete task:', error);
        Alert.alert('Error', 'Failed to delete task');
      }
    });
  };

  const handleLogout = () => {
    confirmAction('Logout', 'Are you sure you want to log out?', async () => {
      try {
        await logout();
        router.replace('/(auth)/login');
      } catch (error) {
        console.error('[HomeScreen] Logout error:', error);
        router.replace('/(auth)/login');
      }
    });
  };

  if (loading && tasks.length === 0) {
    return <LoadingSpinner />;
  }

  const searchInputStyle = {
    height: 40,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: colors.text,
    marginBottom: 16,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 20, backgroundColor: colors.background, flex: 1 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <View>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.text }}>Tasks</Text>
            <Text style={{ fontSize: 14, color: colors.text, opacity: 0.6 }}>
              Hello, {user?.username}!
            </Text>
          </View>

          <View style={{ gap: 10 }}>
            <ThemeToggle />
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                padding: 10,
                backgroundColor: colors.error + '20',
                borderRadius: 8,
                flexDirection: 'row',
                gap: 6,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: colors.error, fontSize: 18 }}>🚪</Text>
              <Text style={{ color: colors.error, fontSize: 12, fontWeight: '600' }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Task Statistics Card */}
        <TaskStatsCard tasks={tasks} />

        {/* Search Bar */}
        <TextInput
          placeholder="Search tasks..."
          placeholderTextColor={colors.text + '55'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={searchInputStyle}
        />

        {/* Status Filter */}
        <View style={{ flexDirection: 'row', marginBottom: 16, gap: 8 }}>
          {statuses.map(status => (
            <TouchableOpacity
              key={status}
              onPress={() => setSelectedStatus(status)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: selectedStatus === status ? colors.primary : colors.card,
                borderWidth: 1,
                borderColor: selectedStatus === status ? colors.primary : colors.border,
              }}
            >
              <Text
                style={{
                  color: selectedStatus === status ? '#FFFFFF' : colors.text,
                  fontSize: 12,
                  fontWeight: '600',
                }}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: colors.text, opacity: 0.6 }}>
              {debouncedSearchQuery.trim() ? 'No tasks found' : 'No tasks yet'}
            </Text>
            <Text style={{ fontSize: 14, color: colors.text, opacity: 0.4, marginTop: 5 }}>
              {debouncedSearchQuery.trim() ? 'Try a different search' : 'Create one to get started!'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredTasks}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <TaskCard
                task={item}
                onPress={() => router.push(`/(app)/edit/${item._id}`)}
                onDelete={() => handleDeleteTask(item._id)}
              />
            )}
            scrollEnabled
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Create Button */}
        <TouchableOpacity
          onPress={() => router.push('/(app)/create')}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 50,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
            alignSelf: 'center',
          }}
        >
          <Text style={{ fontSize: 28, color: '#FFFFFF' }}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
