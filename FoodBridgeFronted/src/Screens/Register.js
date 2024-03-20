import React, { useState, } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import InputTextField from '../components/InputText';
import { register } from '../services/userServices';
import Utils from '../utils/CommonUtils';

export default function Register({ setScreen }) {
  const [name, setname] = useState({ name:"",nameError: "" });
  const [email, setemail] = useState({ email: "", emailError: "", });
  const [password, setpassword] = useState({ password: "", passwordError: "", });
  const [phone, setphone] = useState({ phone: "", phoneError: "", });
  const [address, setaddress] = useState({ address: "", addressError: "", });
  const [restaurant, setrestaurant] = useState({ restaurantName: "", restaurantNameError: "", });
  const [pin, setpin] = useState({ pin: "", pinError: "", });
  const [city, setcity] = useState({ city: "", cityError: "", });
  const [state, setstate] = useState({ state: "", stateError: "", });

  const onChange = (text, field) => {
    if (field == 'username') {
      setname({ name:text,nameError: "" })
    } else if (field == 'password') {
      setpassword({ password: text, passwordError: "", })
    } else if (field == 'email') {
      setemail({ email: text, emailError: "", })
    } else if (field == 'phone') {
      setphone({ phone: text, phoneError: "", })
    } else if (field == 'restaurant') {
      setrestaurant({ restaurantName: text, restaurantNameError: "", })
    } else if (field == 'address') {
      setaddress({ address: text, addressError: "", })
    } else if (field == 'city') {
      setcity({ city: text, cityError: "", })
    } else if (field == 'state') {
      setstate({ state: text, stateError: "", })
    } else if (field == 'pin') {
      setpin({ pin: text, pinError: "", })
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validate = () => {
    let phn = /[^0-9]/g;
    let result = true

    if (name.name == ""){
      result = false
      setname({ name:name.name,nameError: "User name Should not be empty" })
    }

    if(email.email != "" && validateEmail(email.email)){
      result = false
      setemail({ email:email.email,emailError: "Email is not correct!" })
    }

    if(password.password.length<4){
      result = false
      setpassword({ password: password.password, passwordError: "password Should be more than 4 Letters", })
    }

    if(phone.phone == ''){
      result = false
      setphone({ phone: phone.phone, phoneError: "Phone Number Should not be empty", })
    }

    if(!phn.test(phone.phone) === false){
      result = false
      setphone({ phone: phone.phone, phoneError: "Phone Number only contain Numeric Values", })
    }

    if(restaurant.restaurantName != "" || address.address != "" || state.state != "" || city.city != "" || pin.pin != ""){
      if (restaurant.restaurantName == ""){
        result = false
        setrestaurant({ restaurantName: restaurant.restaurantName, restaurantNameError: "restaurant Should not be empty", })
      }

      if(address.address == "" ){
        result = false
        setaddress({ address: address.address, addressError: "Addresses Field Should not be empty", })
      }

      if(state.state == "" ){
        result = false
        setstate({ state: state.state, stateError: "state Field Should not be empty", })
      }

      if(city.city == "" ){
        result = false
        setcity({ city: city.city, cityError: "city Field Should not be empty", })
      }

      if(pin.pin == "" ){
        result = false
        setpin({ pin: pin.pin, pinError: "pin Field Should not be empty", })
      }

      if(!phn.test(pin.pin) === false){
        result = false
        setpin({ pin: pin.pin, pinError: "Pin only contain Numeric Values", })
      }
    }else{
      setrestaurant({ restaurantName: restaurant.restaurantName, restaurantNameError: "", })
      setaddress({ address: address.address, addressError: "", })
      setstate({ state: state.state, stateError: "", })
      setcity({ city: city.city, cityError: "", })
      setpin({ pin: pin.pin, pinError: "", })
    }

    return result;
  }

  const handleSignUp = () => {
    if(validate()){
      let userObj = {
        email: email.email,
        password: password.password,
        userName: name.name,
        restaurantName: restaurant.restaurantName,
        phoneNumber: phone.phone,
        addressLine1: address.address,
        city: city.city,
        state: state.state,
        pincode: pin.pin,
      }
      register(userObj).then(result => {
        if (result.status == 200) {
          Utils.showToast(result?.data?.message);
          setScreen('Login');
        }else{
          Utils.showToast(result?.message);
        }
      }).catch(err => {
          console.error(err);
      });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.sectionContainer}>
        <Text style={styles.heading}>Create Your Account </Text>
        <InputTextField placeholder={'Username *'} value={name.name} onChangeText={(text) => onChange(text, 'username')} error={name.nameError != ""} errorMsg={name.nameError} />
        <InputTextField placeholder={'Password *'} value={password.password} onChangeText={(text) => onChange(text, 'password')} error={password.passwordError  != ""} errorMsg={password.passwordError} />
        <InputTextField maxLength={10} keyboardType={'phone-pad'} placeholder={'Phone *'} value={phone.phone} onChangeText={(text) => onChange(text, 'phone')} error={phone.phoneError  != ""} errorMsg={phone.phoneError} />
        <InputTextField keyboardType={'email-address'} placeholder={'Email'} value={email.email} onChangeText={(text) => onChange(text, 'email')} error={email.emailError  != ""} errorMsg={email.emailError} />
        <Text style={styles.address}>Address Details</Text>
        <InputTextField placeholder={'Restaurant Name'} value={restaurant.restaurantName} onChangeText={(text) => onChange(text, 'restaurant')} error={restaurant.restaurantNameError  != ""} errorMsg={restaurant.restaurantNameError} />
        <InputTextField placeholder={'Address'} value={address.address} onChangeText={(text) => onChange(text, 'address')} error={address.addressError  != ""} errorMsg={address.addressError} />
        <InputTextField placeholder={'City'} value={city.city} onChangeText={(text) => onChange(text, 'city')} error={city.cityError  != ""} errorMsg={city.cityError} />
        <InputTextField placeholder={'State'} value={state.state} onChangeText={(text) => onChange(text, 'state')} error={state.stateError  != ""} errorMsg={state.stateError} />
        <InputTextField maxLength={6} keyboardType={'numeric'} placeholder={'Pincode'} value={pin.pin} onChangeText={(text) => onChange(text, 'pin')} error={pin.pinError  != ""} errorMsg={pin.pinError} />

        <View style={styles.signupButton}>
          <TouchableOpacity onPress={handleSignUp}>
            <View style={{ height: 40, width: 120, backgroundColor: 'orange', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', color: 'white', }}>SIGNUP</Text>
            </View>
          </TouchableOpacity>
          {/* <Text></Text>
          <View style={{ flexDirection: 'row' }}>
            <Text>Already Have A Account ? </Text><TouchableOpacity onPress={() => { navigation.navigate("Home") }}><Text style={{ color: 'orange' }}>Sign In</Text></TouchableOpacity>
          </View> */}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer:{ 
    padding: 10
   },
   heading:{ 
    color: 'black', 
    fontWeight: '800', 
    marginRight: 50, 
    fontSize: 30, 
    marginTop: 10 },
    address:{ 
      fontSize: 20, 
      fontWeight: '400', 
      color: 'black' 
    },
    signupButton:{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' },
    error: {
    color: "red",
  },
});
