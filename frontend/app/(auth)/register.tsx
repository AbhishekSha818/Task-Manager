import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';

export default function RegisterScreen() {
  const { colors } = useTheme();
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.register(email, username, password);
      await login(response.token, response.user);
      router.replace('/(app)/home');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: 'center',
            backgroundColor: colors.background,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: colors.primary,
              marginBottom: 10,
              textAlign: 'center',
            }}
          >
            Create Account
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: colors.text,
              opacity: 0.7,
              marginBottom: 30,
              textAlign: 'center',
            }}
          >
            Join us today!
          </Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.text + '80'}
            value={email}
            onChangeText={setEmail}
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
              color: colors.text,
              fontSize: 14,
            }}
            keyboardType="email-address"
            editable={!loading}
          />

          <TextInput
            placeholder="Username"
            placeholderTextColor={colors.text + '80'}
            value={username}
            onChangeText={setUsername}
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
              color: colors.text,
              fontSize: 14,
            }}
            editable={!loading}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.text + '80'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
              color: colors.text,
              fontSize: 14,
            }}
            editable={!loading}
          />

          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={colors.text + '80'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              padding: 12,
              marginBottom: 20,
              color: colors.text,
              fontSize: 14,
            }}
            editable={!loading}
          />

          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            style={{
              backgroundColor: loading ? colors.primary + '80' : colors.primary,
              borderRadius: 8,
              padding: 14,
              marginBottom: 15,
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
              {loading ? 'Creating account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.text, fontSize: 14 }}>Already have an account? </Text>
            <TouchableOpacity
              disabled={loading}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 14,
                  fontWeight: '600',
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
