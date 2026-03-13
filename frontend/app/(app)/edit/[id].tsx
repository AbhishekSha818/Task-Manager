import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../../context/ThemeContext';
import { taskService } from '../../../services/api';
import { Task } from '../../../types';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

export default function EditTaskScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Pending' | 'In Progress' | 'Completed'>('Pending');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const statuses: Array<'Pending' | 'In Progress' | 'Completed'> = ['Pending', 'In Progress', 'Completed'];

  useEffect(() => {
    const loadTask = async () => {
      if (!id) return;
      try {
        const data = await taskService.getTask(id);
        setTask(data);
        setTitle(data.title);
        setDescription(data.description || '');
        setStatus(data.status);
      } catch (error) {
        Alert.alert('Error', 'Failed to load task');
        router.back();
      } finally {
        setInitialLoading(false);
      }
    };
    loadTask();
  }, [id]);

  const handleUpdate = async () => {
    if (!title.trim() || !id) {
      Alert.alert('Error', 'Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      await taskService.updateTask(id, title, description || undefined, status);
      Alert.alert('Success', 'Task updated successfully');
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <LoadingSpinner />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ padding: 20, backgroundColor: colors.background }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>
              Edit Task
            </Text>
            <TouchableOpacity
              onPress={() => router.back()}
              disabled={loading}
            >
              <Text style={{ fontSize: 24, color: colors.text }}>✕</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Task Title"
            placeholderTextColor={colors.text + '80'}
            value={title}
            onChangeText={setTitle}
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              padding: 14,
              marginBottom: 15,
              color: colors.text,
              fontSize: 16,
              fontWeight: '500',
            }}
            editable={!loading}
          />

          <TextInput
            placeholder="Description (optional)"
            placeholderTextColor={colors.text + '80'}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              padding: 14,
              marginBottom: 20,
              color: colors.text,
              fontSize: 14,
              textAlignVertical: 'top',
            }}
            editable={!loading}
          />

          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 10 }}>
            Status
          </Text>

          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 20 }}>
            {statuses.map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setStatus(s)}
                disabled={loading}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: status === s ? colors.primary : colors.border,
                  backgroundColor: status === s ? colors.primary + '20' : 'transparent',
                }}
              >
                <Text
                  style={{
                    color: status === s ? colors.primary : colors.text,
                    fontSize: 12,
                    fontWeight: '600',
                    textAlign: 'center',
                  }}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            onPress={handleUpdate}
            disabled={loading}
            style={{
              backgroundColor: loading ? colors.primary + '80' : colors.primary,
              borderRadius: 8,
              padding: 14,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              {loading ? 'Updating...' : 'Update Task'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            disabled={loading}
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              padding: 14,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
