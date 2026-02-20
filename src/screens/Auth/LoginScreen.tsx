import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../services/authApi';
import { toAppError } from '../../services/errorMapper';
import { errorMessage } from '../../utils/errorMessages';
import { useAuth } from './AuthContext';

export default function LoginScreen() {
  const { setSession } = useAuth();

  const [email, setEmail] = React.useState('test@example.com');
  const [password, setPassword] = React.useState('password');

  const mutation = useMutation({
    mutationFn: () => login({ email, password }),
    onSuccess: async res => {
      await setSession(res.accessToken);
    },
  });

  const errText = mutation.error ? errorMessage(toAppError(mutation.error)) : null;

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>Login</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      {errText ? <Text>{errText}</Text> : null}

      <Button
        title={mutation.isPending ? 'Logging in…' : 'Login'}
        onPress={() => mutation.mutate()}
        disabled={mutation.isPending}
      />
    </View>
  );
}
