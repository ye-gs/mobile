import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { GenericInput } from '@/components/GenericInput';
import { GenericButton } from '@/components/GenericButton';
import { Email, Password, EyeSlash, Eye, Google } from "@/assets/images/index";
import { useState } from 'react';
import { GenericIconButton } from '@/components/GenericIconButton';
import { UserProvider, useUser } from "@/contexts/user";
import { ActivityIndicator } from 'react-native-paper';
import { handleLoginMethods } from '@/utils/auth';



export default function Home() {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const { handleLogin, handleGoogleLogin } = handleLoginMethods(email, password, setIsLoading, setUser);
  return (
    <UserProvider>
      <View style={styles.container}>
        <View style={styles.form}>
          <GenericInput placeholderText='Email' onChange={setEmail} StartImageComponent={Email} height="20%"></GenericInput>
          <GenericInput placeholderText='Senha' onChange={setPassword} StartImageComponent={Password} EndImageComponent={showPassword ? EyeSlash : Eye} shouldBeSecure={!showPassword} onPress={toggleShowPassword} height="20%"></GenericInput>
          <Text style={styles.passwordReset}>Esqueceu a senha?</Text>
        </View>
        <View style={styles.signInOptions}>
          <GenericButton title="Entrar" color="#407CE2" onPress={handleLogin} height={"20%"} width={"100%"}></GenericButton>
          <View style={styles.createAccount}>
            <Text>Não tem conta?</Text><Text onPress={() => router.navigate("/signup")} style={styles.createAccount__link}>Crie agora</Text>
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null}
          <View style={styles.optionsSeparator}>
            <View style={styles.separator}></View><Text style={styles.optionsSeparator__text}>OU</Text><View style={styles.separator}></View>
          </View>
          <View style={styles.extraOptions}>
            <GenericIconButton onPress={handleGoogleLogin} text="Entrar com o Google" ImageComponent={Google}></GenericIconButton>
          </View>
        </View>

      </View>
    </UserProvider >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    gap: 12,
    width: '80%',
    justifyContent: 'center',
  },
  passwordReset: {
    fontSize: 13,
    alignSelf: 'flex-end',
    color: 'rgba(64, 124, 226, 1)',
    fontWeight: '500',
  },
  signInOptions: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  createAccount: {
    flexDirection: 'row',
    gap: 6,
    fontSize: 14
  },
  createAccount__link: {
    color: '#407CE2',
    fontWeight: '600',
  },
  optionsSeparator: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    color: '#A1A8B0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionsSeparator__text: {
    color: '#A1A8B0',
    fontSize: 16,
    width: '12%',
    textAlign: 'center'
  },
  separator: {
    marginVertical: 20,
    height: 1.5,
    width: "44%",
    backgroundColor: 'rgba(34,34,31,0.1)'
  },
  extraOptions: {
    width: "100%",
    gap: 15
  }
});
