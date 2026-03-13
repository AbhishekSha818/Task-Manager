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

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    setLoading(true);
    try {
      await taskService.createTask(title, description || undefined);
      Alert.alert('Success', 'Task created successfully');
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to create task');
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
