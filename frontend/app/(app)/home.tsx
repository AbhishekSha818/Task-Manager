import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { taskService } from '../../services/api';
import { Task } from '../../types';
import { TaskCard } from '../../components/TaskCard';
import { ThemeToggle } from '../../components/ThemeToggle';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { logout, user } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const statuses = ['All', 'Pending', 'In Progress', 'Completed'];

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks(selectedStatus === 'All' ? undefined : selectedStatus);
      setTasks(data);
    } catch (error) {
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

  const handleDeleteTask = async (id: string) => {
    Alert.alert('Delete Task', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await taskService.deleteTask(id);
            setTasks(tasks.filter(t => t._id !== id));
          } catch (error) {
            Alert.alert('Error', 'Failed to delete task');
          }
        },
      },
    ]);
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  if (loading && tasks.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 20, backgroundColor: colors.background, flex: 1 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <View>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.text }}>
              Tasks
            </Text>
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
              }}
            >
              <Text style={{ color: colors.error, fontSize: 18 }}>🚪</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Filter */}
        <View style={{ flexDirection: 'row', marginBottom: 20, gap: 8 }}>
          {statuses.map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => setSelectedStatus(status)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor:
                  selectedStatus === status ? colors.primary : colors.card,
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
        {tasks.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: colors.text, opacity: 0.6 }}>
              No tasks yet
            </Text>
            <Text style={{ fontSize: 14, color: colors.text, opacity: 0.4, marginTop: 5 }}>
              Create one to get started!
            </Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item._id}
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
            marginTop: 20,
            alignSelf: 'center',
          }}
        >
          <Text style={{ fontSize: 28, color: '#FFFFFF' }}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
