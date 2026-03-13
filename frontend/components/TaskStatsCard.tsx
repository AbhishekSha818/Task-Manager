import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { Task } from '../types';
import { useTheme } from '../context/ThemeContext';

interface TaskStatsCardProps {
  tasks: Task[];
}

export const TaskStatsCard: React.FC<TaskStatsCardProps> = ({ tasks }) => {
  const { colors } = useTheme();

  // Calculate statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter(t => t.status === 'Pending').length;
    const inProgress = tasks.filter(t => t.status === 'In Progress').length;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      pending,
      inProgress,
      completed,
      completionPercentage,
    };
  }, [tasks]);

  const progressBarWidth = `${stats.completionPercentage}%`;

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {/* Header */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: colors.text,
          marginBottom: 14,
        }}
      >
        Progress Overview
      </Text>

      {/* Stats Grid */}
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 14 }}>
        {/* Total Tasks */}
        <View
          style={{
            flex: 1,
            backgroundColor: colors.primary + '15',
            borderRadius: 8,
            padding: 12,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: colors.primary,
              marginBottom: 4,
            }}
          >
            {stats.total}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.text,
              opacity: 0.7,
              textAlign: 'center',
            }}
          >
            Total
          </Text>
        </View>

        {/* Pending */}
        <View
          style={{
            flex: 1,
            backgroundColor: colors.warning + '15',
            borderRadius: 8,
            padding: 12,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: colors.warning,
              marginBottom: 4,
            }}
          >
            {stats.pending}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.text,
              opacity: 0.7,
              textAlign: 'center',
            }}
          >
            Pending
          </Text>
        </View>

        {/* In Progress */}
        <View
          style={{
            flex: 1,
            backgroundColor: colors.primary + '15',
            borderRadius: 8,
            padding: 12,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: colors.primary,
              marginBottom: 4,
            }}
          >
            {stats.inProgress}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.text,
              opacity: 0.7,
              textAlign: 'center',
            }}
          >
            In Progress
          </Text>
        </View>

        {/* Completed */}
        <View
          style={{
            flex: 1,
            backgroundColor: colors.success + '15',
            borderRadius: 8,
            padding: 12,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: colors.success,
              marginBottom: 4,
            }}
          >
            {stats.completed}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.text,
              opacity: 0.7,
              textAlign: 'center',
            }}
          >
            Done
          </Text>
        </View>
      </View>

      {/* Completion Percentage and Progress Bar */}
      <View style={{ gap: 8 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: colors.text,
            }}
          >
            Completion Rate
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              color: colors.success,
            }}
          >
            {stats.completionPercentage}%
          </Text>
        </View>

        {/* Progress Bar */}
        <View
          style={{
            height: 8,
            backgroundColor: colors.border,
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: '100%',
              width: progressBarWidth,
              backgroundColor: colors.success,
              borderRadius: 4,
            }}
          />
        </View>
      </View>
    </View>
  );
};
