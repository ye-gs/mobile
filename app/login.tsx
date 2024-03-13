import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { GenericInput } from '@/components/GenericInput';
import { GenericButton} from '@/components/GenericButton';
import { Email, Password, EyeSlash } from "@/assets/images/index";

export default function Home() {
  const handleLogin = () => {
    // Handle login logic here
    console.log('Login button pressed');
    router.navigate("/home")

  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Google login button pressed');
    router.navigate("/home")

  };

  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
    console.log('Facebook login button pressed');
    router.navigate("/home")

  };


  return (
    <View style={styles.container}>
      <View style={styles.form}>
      <GenericInput placeholderText='Email' StartImageComponent={Email}></GenericInput>
      <GenericInput placeholderText='Senha' StartImageComponent={Password} EndImageComponent={EyeSlash} shouldBeSecure={true}></GenericInput>
      <Text style={styles.passwordReset}>Esqueceu a senha?</Text>
      </View>
      <View style={styles.signInOptions}>
        <GenericButton title="Entrar" color="#407CE2" onPress={handleLogin} height={"20%"}></GenericButton>
        <View style={styles.createAccount}>
          <Text>Não tem conta?</Text><Text  onPress={() => router.navigate("/signup")} style={styles.createAccount__link}>Crie agora</Text>
        </View>
        <View style={styles.optionsSeparator}>
        <View style={styles.separator}></View><Text style={styles.optionsSeparator__text}>OU</Text><View style={styles.separator}></View>
      </View>
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
  form:{
    flex: 2,
    gap: 6,
    borderWidth: 1,
    borderColor: '#000',
    width: '80%',
    maxHeight: 'auto'
  },
  passwordReset:{
    fontSize: 13,
    alignSelf: 'flex-end',
    color: 'rgba(64, 124, 226, 1)',
    fontWeight: '500',
  },
  signInOptions:{
    flex: 2,
    borderColor: '#000',
    borderWidth: 1,
    width: '80%',
    alignItems: 'center'
  },
  createAccount:{
    flexDirection: 'row',
    gap: 6,
    fontSize: 14
  },
  createAccount__link:{
    color: '#407CE2',
    fontWeight: '600',
  },
  optionsSeparator:{
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    color: '#A1A8B0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionsSeparator__text:{
    color: '#A1A8B0',
    fontSize: 16
  },
  separator: {
    marginVertical: 20,
    height: 1.5,
    width: "40%",
    backgroundColor: 'rgba(34,34,31,0.1)'
  },
});
