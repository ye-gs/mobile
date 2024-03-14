import React, { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { StyleSheet, Button, TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { router } from 'expo-router';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSignUp = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor insira um endereço de email válido.');
      return;
    }

    if (password.length < 8) {
      alert('Senha deve ter pelo menos 8 caracteres.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('Senhas não conferem.');
      return;
    }
    console.log('SignUp button pressed');
    router.navigate("/home")
  };

  function handleGoogleSignUp() {
    console.log('Google SignUp button pressed');
    router.navigate("/home")

  }

  function handleFacebookSignUp() {
    console.log('Facebook SignUp button pressed');
    router.navigate("/home")

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>YE Gestão de Saúde</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <TextInput
        autoComplete='email'
        style={styles.input}
        placeholder="Seu email"
        keyboardType="email-address"
        placeholderTextColor={styles.input.color}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        autoComplete='password'
        style={styles.input}
        placeholder="Sua senha"
        secureTextEntry
        placeholderTextColor={styles.input.color}
        autoCapitalize="none"
        onChangeText={setPassword}
      />
      <TextInput
        autoComplete='password'
        style={styles.input}
        placeholder="Confirmar senha"
        secureTextEntry
        placeholderTextColor={styles.input.color}
        autoCapitalize="none"
        onChangeText={setPasswordConfirm}
      />
      <Button title="Registre-se" onPress={handleSignUp} />
      <View style={styles.socialLoginContainer}>
        <FontAwesome.Button
          name="google"
          backgroundColor="#DB4437"
          onPress={handleGoogleSignUp}
        >
        </FontAwesome.Button>
        <FontAwesome.Button
          name="facebook"
          backgroundColor="#3B5998"
          onPress={handleFacebookSignUp}
        >
        </FontAwesome.Button>
      </View>
      <View style={styles.login}>
        <Text>Já tem conta?</Text><Text onPress={() => router.navigate("/login")} style={styles.login__link}>Logue agora</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  login: {
    flexDirection: 'row',
    gap: 6,
    fontSize: 14
  },
  input: {
    width: '80%',
    height: 40,
    color: 'gray',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    gap: 25,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  login__link: {
    color: '#407CE2',
    fontWeight: '600',
  }
});