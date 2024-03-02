import { StyleSheet, TextInput, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Home() {
  const handleLogin = () => {
    // Handle login logic here
    console.log('Login button pressed');
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>YE Gestão de Saúde</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <TextInput
        autoComplete='email'
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor={styles.input.color}
        autoCapitalize="none"
      />

      <TextInput
        autoComplete='password'
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={styles.input.color}
        secureTextEntry
        autoCapitalize="none"
      />

      <Button title="Entrar" onPress={handleLogin} />

      <View style={styles.socialLoginContainer}>
        <FontAwesome.Button
          name="google"
          backgroundColor="#DB4437"
          onPress={handleGoogleLogin}
        >
        </FontAwesome.Button>
        <FontAwesome.Button
          name="facebook"
          backgroundColor="#3B5998"
          onPress={handleFacebookLogin}
        >
        </FontAwesome.Button>
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
});
