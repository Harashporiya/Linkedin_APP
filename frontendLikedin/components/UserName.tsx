import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from './BackendApi'
import { AsyncStorageStatic } from '@react-native-async-storage/async-storage'


const UserName = () => {
 const [firstName, setFirstname] = useState<string>('');
 const [lastname, setlastname] = useState<string>('');
 const [firstnameError, setFirstnameError] = useState<string | null>(null);
 const [lastnameError, setlastnameError] = useState<string | null>(null);
  const handelSubmit = async () => {
    let valid = true;
    setFirstnameError(null);
    setlastnameError(null);

    if(!firstName.trim()){
        setFirstnameError("Please enter your first name.")
           setTimeout(() => {
            setFirstnameError(null)
           }, 3000);
        valid = false;
    }

    if(!lastname.trim()){
        setlastnameError("Please enter your last name.")
        setTimeout(() => {
            setlastnameError(null);
        }, 3000);
        valid = false;
    }
    if(!firstName.trim() || !lastname.trim()){
        return;
    }

    try {
        const response = await axios.post(`${API_URL}/user/name`,{
            firstName,
            lastname
        })
        console.log(response.data)
    } catch (error) {
        console.log("Error",error)
    }
  }

  return (
    <>
      <StatusBar backgroundColor='black' barStyle={"light-content"} />
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: "https://download.logo.wine/logo/LinkedIn/LinkedIn-Logo.wine.png" }} />
        <Text style={styles.header}>Make the most of your professional life</Text>
        
        <View>
          <Text style={styles.text}>First name</Text>
          <TextInput
            placeholder='Jhon'
            style={styles.input}
          value={firstName}
          onChangeText={(text)=>setFirstname(text)}
          />
          {firstnameError && <Text style={styles.errorText}>{firstnameError}</Text>}
        </View>
        <View>
          <Text style={styles.text}>Last name</Text>
          
            <TextInput
              placeholder='Doe'
              style={styles.input}
               value={lastname}
               onChangeText={(text)=>setlastname(text)}
            />
            {lastnameError && <Text style={styles.errorText}>{lastnameError}</Text>}
         
          <View>
            <TouchableOpacity onPress={handelSubmit} style={styles.button}>
              <Text style={styles.btn}>Continue</Text>
            </TouchableOpacity>
          </View>
          
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
    marginTop:100
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
  errorText: {
    color: 'red',
    marginLeft: 10,
    marginTop: -5,
  },

})

export default UserName
