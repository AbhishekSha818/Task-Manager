import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Task } from '../types';
import { useTheme } from '../context/ThemeContext';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onDelete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress, onDelete }) => {
  const { colors } = useTheme();

  const statusColors: Record<string, string> = {
    Pending: colors.warning,
    'In Progress': colors.primary,
    Completed: colors.success,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.card,
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: statusColors[task.status] || colors.primary,
      }}
    >
      <Text style={{ color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 5 }}>
        {task.title}
      </Text>

      {task.description && (
        <Text style={{ color: colors.text, opacity: 0.7, fontSize: 14, marginBottom: 10 }}>
          {task.description}
        </Text>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text
          style={{
            color: statusColors[task.status],
            fontSize: 12,
            fontWeight: '600',
            backgroundColor: statusColors[task.status] + '20',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 4,
          }}
        >
          {task.status}
        </Text>

        <TouchableOpacity
          onPress={onDelete}
          style={{ padding: 5 }}
        >
          <Text style={{ color: colors.error, fontSize: 18 }}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
