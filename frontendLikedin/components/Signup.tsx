import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { API_URL } from './BackendApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation , NavigationProp} from '@react-navigation/native'
import { routerType } from './Navigation'

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  
  const navigation = useNavigation<NavigationProp<routerType>>();

  const handleSubmit = async () => {
    let valid = true;
  
    setEmailError(null);
    setPasswordError(null);

    if (!email.trim()) {
      setEmailError('Please enter your email address.');
      setTimeout(()=>{
        setEmailError(null)
      },3000)
      valid = false;
    }

   
    if (!password.trim()) {
      setPasswordError('Please enter your password.');
      setTimeout(() => {
        setPasswordError(null)
      }, 3000);
      valid = false;
    }

    if (valid) {
      try {
        const response = await axios.post(`${API_URL}/user/signin`, {
          email,
          password,
        });
        const id = response.data.id;
        await AsyncStorage.setItem("userId", id);
        setEmail('');
        setPassword('');
        setTimeout(() => {
          navigation.navigate('Name');
        }, 5000);
      } catch (error) {
        console.log("error", error);
      }
    }
  }

  return (
    <>
      <StatusBar backgroundColor='black' barStyle={"light-content"} />
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: "https://download.logo.wine/logo/LinkedIn/LinkedIn-Logo.wine.png" }} />
        <Text style={styles.header}>Make the most of your professional life</Text>
        
        <View>
          <Text style={styles.text}>Email</Text>
          <TextInput
            placeholder='example@gmail.com'
            style={styles.input}
            keyboardType='email-address'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}
        </View>
        
        <View>
          <Text style={styles.text}>Password (6+ characters)</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder='password'
              style={[{ fontSize: 18, flex: 1 }]}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons
                name={passwordVisible ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
        </View>
        
        <View>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.btn}>Agree & Join</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.hr} />
        
        <View>
          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.signInPrompt}>
          <Text style={styles.signInText}>
            Already on Linkedin? <Text style={styles.signInLink} onPress={()=>navigation.navigate("Signin")}>Sign in</Text>
          </Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    marginHorizontal: "auto",
  },
  image: {
    height: 100,
    width: 120,
    marginHorizontal: 10
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10
  },
  input: {
    borderColor: "gray",
    borderWidth: 2,
    padding: 8,
    margin: 8,
    fontSize: 18,
    borderRadius: 6
  },
  text: {
    fontSize: 18,
    marginLeft: 9,
    fontWeight: 'bold',
    color: "gray"
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 6,
    padding: 8,
    margin: 8,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#0b66c3",
    padding: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  btn: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  hr: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  googleButton: {
    borderColor: 'gray',
    padding: 10,
    borderWidth: 2,
    borderRadius: 20,
  },
  googleText: {
    textAlign: "center",
    fontSize: 20
  },
  signInPrompt: {
    padding: 10,
  },
  signInText: {
    textAlign: "center",
    fontSize: 18,
  },
  signInLink: {
    fontWeight: "bold",
    color: "#0b66c3"
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
    marginTop: -5,
  },
});

export default Signup;
