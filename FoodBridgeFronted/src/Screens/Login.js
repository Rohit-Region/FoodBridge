import React, { useState, } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { login } from '../services/userServices';
import Util from '../utils/CommonUtils';
import InputLabel from '../components/InputText';

export default function Login({ getUser }) {
  const [password, setpassword] = useState({ passwords: "", passwordError: "", });
  const [phone, setphone] = useState({ phones: "", phoneError: "", });

  const handleLogin = () => {
    let loginObj = {
      phoneNumber: phone,
      password: password,
    }
    login(loginObj).then(result => {
      if (result.status == 200) {
        Util.storeData('token', result?.data?.token)
        Util.showToast(result?.data?.message);
        getUser();
      } else {
        Util.showToast(result?.data?.message);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const onChange = (text, field) => {
    if (field == 'phone') {
      setphone(text)
    } else if (field == 'password') {
      setpassword(text)
    }
  }

  const validate = (text) => {
    let p = password.length;
    let ph = phone.length;
    let phn = /[^0-9]/g;
    if (!phn.test(phone) === false || ph > 10)
      Util.showToast("Check the Mobile Number");
    else {
      if (p <= "" || p <= 4)
        Util.showToast("Password Should be more than 4 Letters");
      else
        handleLogin();
    }
  }

  const phoneerror = () => {
    if (phone == "")
      return true
    else
      return false
  }

  const passworderror = () => {
    if (password == "")
      return true
    else
      return false
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.Container}>
        <Text style={styles.heading}>LogIn Your Account </Text>
        <Text></Text>
        <InputLabel maxLength={10} keyboardType={'phone-pad'} placeholder={'Mobile Number'} value={phone} onChangeText={(text) => onChange(text, 'phone')} error={phoneerror()} errorMsg={'Phone Field Is Empty'} />
        <InputLabel secureTextEntry={true} placeholder={'Password'} value={password} onChangeText={(text) => onChange(text, 'password')} error={passworderror()} errorMsg={'Password Field Is Empty'} />
        <View style={styles.loginButton}>
          <TouchableOpacity onPress={validate} >
            <View style={{ height: 40, width: 120, backgroundColor: 'orange', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', color: 'white', }}>LOGIN</Text>
            </View>
          </TouchableOpacity>
          {/* <Text></Text>
          <View style={{ flexDirection: 'row' }}>
            <Text>New to Aahar? </Text><TouchableOpacity onPress={() => { navigation.navigate("PostAvailableFood") }}><Text style={{ color: 'orange' }}>Register</Text></TouchableOpacity>
          </View> */}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  Container: { 
    padding: 10
   },
   heading:{ 
    color: 'black',
    fontWeight: '800',
    marginRight: 80,
    fontSize: 30 
  },
  loginButton:{ 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
   },
  error: {
    color: "red",
  },
});
