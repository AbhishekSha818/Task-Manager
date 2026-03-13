import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { taskService } from '../../services/api';

export default function CreateTaskScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    height: 48,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 0,
    fontSize: 15,
    color: colors.text,
    marginBottom: 14,
  };

  const descriptionInputStyle = {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
    marginBottom: 14,
    minHeight: 100,
  };

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    setLoading(true);
    console.log('[CreateTask] Starting task creation with title:', title);
    try {
      console.log('[CreateTask] Calling API with:', { title, description: description || 'none' });
      const result = await taskService.createTask(title, description || undefined);
      console.log('[CreateTask] API Response:', result);
      Alert.alert('Success', 'Task created successfully!');
      console.log('[CreateTask] Alert shown, calling router.back()');
      router.back();
    } catch (error: any) {
      console.error('[CreateTask] Error occurred:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
      const errorMessage = 
        error.response?.data?.error || 
        error.response?.data?.message || 
        error.message || 
        'Failed to create task';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 20, flex: 1, backgroundColor: colors.background }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>
              Create Task
            </Text>
            <TouchableOpacity
              onPress={() => router.back()}
              disabled={loading}
            >
              <Text style={{ fontSize: 24, color: colors.text }}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6, opacity: 0.7 }}>
            Title
          </Text>
          <TextInput
            placeholder="Task Title"
            placeholderTextColor={colors.text + '55'}
            value={title}
            onChangeText={setTitle}
            style={inputStyle}
            editable={!loading}
            autoComplete="off"
          />

          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6, opacity: 0.7 }}>
            Description (optional)
          </Text>
          <TextInput
            placeholder="Add task details..."
            placeholderTextColor={colors.text + '55'}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            style={descriptionInputStyle}
            editable={!loading}
            autoComplete="off"
          />

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            onPress={handleCreate}
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
              {loading ? 'Creating...' : 'Create Task'}
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
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
