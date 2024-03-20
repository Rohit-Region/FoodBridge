import React, { useState, useEffect } from 'react';
import { Modal, Pressable, SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity, View, ScrollView, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getUserAddressDetails, addUserAddressDetails, postFoodDetails } from '../services/userServices';
import Util from '../utils/CommonUtils';
import InputTextField from '../components/InputText';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PostAvailableFood({ navigation, }) {
  const [phoneNumber, setphoneNumber] = useState({ phoneNumber: "", phoneNumberError: "", });
  const [noOfPersons, setnoOfPersons] = useState({ noOfPersons: "", noOfPersonsError: "" });
  const [availableTime, setavailableTime] = useState({ availableTime: "", availableTimeError: "" });
  const [foodName, setfoodName] = useState({ foodName: "", foodNameError: "", });
  const [foodQuantity, setfoodQuantity] = useState({ foodQuantity: "", foodQuantityError: "", });
  const [expiresIn, setexpiresIn] = useState({ expiresIn: "", expiresInError: "", });
  const [modalVisible, setModalVisible] = useState(false);
  const [datas, setdatas] = useState([]);
  const [typeOfFood, settypeOfFood] = useState({ typeOfFood: "Veg", typeOfFoodError: "" });
  const [userAddress, setUserAddress] = useState([]);
  const [userRestaurant,setUserRestaurant] = useState([]);
  const [userAddressIndex, setUserAddressIndex] = useState(0);
  const [userRestaurantIndex,setUserRestaurantIndex] = useState(0);
  const [addressModal, setAddressModal] = useState(false);
  const [restaurantModal,setRestaurantModal] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [addRestaurant, setAddRestaurant] = useState(false);
  const [address, setaddress] = useState({ address: "", addressError: "", });
  const [restaurant, setrestaurant] = useState({ restaurantName: "", restaurantNameError: "", });
  const [pin, setpin] = useState({ pin: "", pinError: "", });
  const [city, setcity] = useState({ city: "", cityError: "", });
  const [state, setstate] = useState({ state: "", stateError: "", });

  useEffect(() => {
    getUserAddress();
    getUserRestaurant()
    // getFoodDetails()
  }, [])

  const getUserAddress = async () => {
    const userAddressDetails = await getUserAddressDetails()
    if (userAddressDetails?.status == 200) {
      setUserAddress(userAddressDetails.data.data)
    }
  }

  const getUserRestaurant = async () => {
    const userRestaurant = await getUserAddressDetails()
    if (userRestaurant?.status == 200) {
      setUserRestaurant(userRestaurant.data.data)
    }
  }

  // const getFoodPost = async () =>{
  //   const postFoodDetails = await getFoodPost()
  //   if (postFoodDetails?.status == 200){
  //     setfoodPost(postFoodDetails.data.data)
  //   }
  // }

  // const handlePost = () => {
  //   // let postObj = {
  //   //   phoneNumber: phone,
  //   //   password: password,
  //   // }
  //   getFoodDetails(handlePost).then(result => {
  //     if (result.status == 200) {
  //       storeData('token',result?.data?.token)
  //       setToken(result?.data?.token);
  //       Axios.defaults.headers.common['Authorization'] = result?.data?.token;
  //       ToastAndroid.show(result?.data?.message, ToastAndroid.LONG);
  //     }else{
  //       ToastAndroid.show(result?.message, ToastAndroid.LONG);
  //     }
  //   }).catch(err => {
  //     console.error(err);
  //   });
  // };
  const onChange = (text, field) => {
    if (field == 'Restaurant Name') {
      setrestaurant({ restaurantName: text, restaurantNameError: "", })
    } else if (field == 'phoneNumber') {
      setphoneNumber({ phoneNumber: text, phoneNumberError: "", })
    } else if (field == 'Serves') {
      setnoOfPersons({ noOfPersons: text, noOfPersonsError: "", })
    } else if (field == 'Available Till') {
      setavailableTime({ availableTime: text, availableTimeError: "", })
    } else if (field == 'address') {
      setaddress({ address: text, addressError: "", })
    } else if (field == 'typeOfFood') {
      settypeOfFood({ typeOfFood: text, typeOfFoodError: "", })
    } else if (field == 'foodName') {
      setfoodName({ foodName: text, foodNameError: "" })
    } else if (field == 'foodQuantity') {
      setfoodQuantity({ foodQuantity: text, foodQuantityError: "" })
    } else if (field == 'expiresIn') {
      setexpiresIn({ expiresIn: text, expiresInError: "", })
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

  const validate = () => {
    let result = true

    if (phoneNumber.phoneNumber == '') {
      result = false
      setphoneNumber({ phoneNumber: phoneNumber.phoneNumber, phoneNumberError: "Phone Number Should not be empty", })
    }

    if(userRestaurant.length==0){
      result = false
    }
    if(userAddress.length==0){
      result = false
    }

    if (restaurant.restaurantName == "") {
      result = false
      setrestaurant({ restaurantName: restaurant.restaurantName, restaurantNameError: "Restaurant Should not be empty", })
    }
    if (noOfPersons.noOfPersons == "") {
      result = false
      setnoOfPersons({ noOfPersons: noOfPersons.noOfPersons, noOfPersonsError: "No of Persons Should not be empty", })
    }
    if (availableTime.availableTime == "") {
      result = false
      setavailableTime({ availableTime: availableTime.availableTime, availableTimeError: "Available Time Should not be empty", })
    }

    return result;
  }

  const addItem = () => {
    if (foodName.foodName != "" && foodQuantity.foodQuantity != "" && expiresIn.expiresIn != "") {
      const newTask = {
        id: 1 + datas.length,
        foodName: foodName.foodName,
        foodQuantity: foodQuantity.foodQuantity,
        expiresIn: expiresIn.expiresIn
      };

      let person = {
        foodName: '',
        foodQuantity: '',
        expiresIn: '',

      };
      let foodList = []
      foodList.push({ ...person, foodName: foodName.foodName, foodQuantity: foodQuantity.foodQuantity, expiresIn: expiresIn.expiresIn })
      setModalVisible(false)
      setdatas([...datas, newTask]);
    }
    else {
      if (foodName.foodName == "") {
        setfoodName({ foodName: foodName.foodName, foodNameError: "Food Name Should not be empty", })
      }
      if (foodQuantity.foodQuantity == "") {
        setfoodQuantity({ foodQuantity: foodQuantity.foodQuantity, foodQuantityError: "Food Quantity Should not be empty", })
      }
      if (expiresIn.expiresIn == "") {
        setexpiresIn({ expiresIn: expiresIn.expiresIn, expiresInError: "Expiry Field Should not be empty", })
      }
    }

  };

  const handlePostAvailableFood = () => {
    if (validate()) {
      let f = datas.filter(x => delete x.id)
      let foodObj = {
        restaurantName: restaurant.restaurantName,
        noOfPersons: noOfPersons.noOfPersons,
        phoneNumber: phoneNumber.phoneNumber,
        typeOfFood: typeOfFood.typeOfFood,
        availableTime: availableTime.availableTime,
        addressId: userAddress[userAddressIndex].addressId,
        foodList: f,
        postTime: new Date()
      }

      postFoodDetails(foodObj).then(result => {
        if (result.status == 200) {
          navigation.navigate('Home');
          Util.showToast(result?.data?.message);
        } else {
          Util.showToast(result?.data?.message);
        }
      }
      ).catch(err => {
        console.log(err);
      });
    }
  };

  const deleteFoodItem = (item) => {
    const res = datas.filter(x => x.id != item.id)
    setdatas(res)
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.renderItem}>
        <Text style={{ width: 25 }}>{index + 1} .</Text>
        <Text style={{ flex: 1 }}>{item.foodName}</Text>
        <Text style={{ width: 100 }}>{item.foodQuantity}</Text>
        <Text style={{ width: 100 }}>{item.expiresIn}</Text>
        <Ionicons onPress={() => deleteFoodItem(item)} name='trash' size={25} />
      </View>
    );
  };

  const addUserAddress = async () => {
    if (restaurant.restaurantName == '' || address.address == '' || city.city == ''
      || state.state == '' || pin.pin == '') {
      if (restaurant.restaurantName == '') {
        setrestaurant({ restaurantName: restaurant.restaurantName, restaurantNameError: "Restaurant Should not be empty", })
      }
      if (address.address == '') {
        setaddress({ address: address.address, addressError: "Address Should not be empty", })
      }
      if (city.city == '') {
        setcity({ city: city.city, cityError: "City Should not be empty", })
      }
      if (state.state == '') {
        setstate({ state: state.state, stateError: "State Should not be empty", })
      }
      if (pin.pin == '') {
        setpin({ pin: pin.pin, pinError: "Pincode Should not be empty", })
      }

    } else {
      let obj = {
        restaurantName: restaurant.restaurantName,
        addressLine1: address.address,
        city: city.city,
        state: state.state,
        pincode: pin.pin,
      }
      let result = await addUserAddressDetails(obj)
      if (result.status == 200) {
        getUserAddress()
        setAddAddress(false)
        setrestaurant({ restaurantName: "", restaurantNameError: "", })
        setaddress({ address: "", addressError: "", })
        setcity({ city: "", cityError: "", })
        setstate({ state: "", stateError: "", })
        setpin({ pin: "", pinError: "", })
      } else {
        Util.showToast(result.data.message)
      }
    }
  }

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>

        <Text style={styles.Headers}>Post the Available Food </Text>
        <InputTextField placeholder={'Restaurant Name *'} value={restaurant.restaurantName} onChangeText={(text) => onChange(text, 'restaurant')} error={restaurant.restaurantNameError != ""} errorMsg={restaurant.restaurantNameError} />
        {/* <View style={{ paddingHorizontal: 15 }}>
          <Text style={styles.headingText}>Restaurant Name*</Text> */}
        
          {/* {
            userRestaurant.length > 0 ?
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.restaurantName}>{userRestaurant[userRestaurantIndex].restaurantName}</Text>
                  {/* <Text>{userAddress[userAddressIndex].addressLine1}, {userAddress[userAddressIndex].state}, {userAddress[userAddressIndex].city}, {userAddress[userAddressIndex].pincode}</Text> */}
                {/* </View>
                <TouchableOpacity style={{ width: 100 }} onPress={() => { setRestaurantModal(true) }}>
                  <Text style={{ textAlign: 'right', color: 'royalblue' }}>Add New</Text>
                </TouchableOpacity>
        //       </View> : null */} 
        {/* //   }
        // </View> */}

        {/* <Modal animationType="fade" visible={restaurantModal} onRequestClose={() => {
          setRestaurantModal(false);
        }}>
          <View style={{ padding: 15 }}>
            <View style={styles.sideHeading}>
              <Text style={styles.headingText}>Add New Place</Text>
              <Ionicons onPress={() => setAddRestaurant(true)} name='add-circle' size={25} />
            </View>
            {addRestaurant &&
              <View>
                <InputTextField placeholder={'Restaurant Name'} value={restaurant.restaurantName} onChangeText={(text) => onChange(text, 'restaurant')} error={""} errorMsg={""} />
                
                <View style={styles.modal}>
                  <Pressable style={{ margin: 10, borderRadius: 20, backgroundColor: "#f7f7f7", height: 30, width: 125, justifyContent: 'center', alignContent: 'center', alignItems: "center", alignSelf: 'center' }}
                    onPress={() => setAddRestaurant(false)}>
                    <Text style={styles.cancel}>Cancel</Text>
                  </Pressable>
                  <Pressable style={{ margin: 10, borderRadius: 20, backgroundColor: "royalblue", height: 30, width: 125, justifyContent: 'center', alignContent: 'center', alignItems: "center", alignSelf: 'center' }}
                    onPress={() => setAddRestaurant(false)}>
                    <Text style={styles.confirm}>Confirm</Text>
                  </Pressable>
                </View>
              </View>
            }
            {
              userRestaurant.map((data, index) => {
                return <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                  <CheckBox
                    disabled={false}
                    value={index == userRestaurantIndex}
                    onValueChange={() => {setRestaurantModal(false);setUserRestaurantIndex(index)}}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.restaurantName}>{data.restaurantName}</Text>
                  </View>
                </View>
              })
            }
          </View>
        </Modal>
       <Text></Text> */}
        <View style={styles.Picker}>
          <Picker
            selectedValue={typeOfFood.typeOfFood}
            onValueChange={(itemValue, itemIndex) =>
              settypeOfFood(itemValue)
            }>
            <Picker.Item label="Veg" value="Veg" />
            <Picker.Item label="Non-Veg" value="Non-Veg" />
            <Picker.Item label="Mixed" value="Mixed" />
          </Picker>
        </View>

        <InputTextField keyboardType={'numeric'} placeholder="No of Person *" value={noOfPersons.noOfPersons} onChangeText={(text) => onChange(text, 'Serves')} error={noOfPersons.noOfPersonsError != ""} errorMsg={noOfPersons.noOfPersonsError} />
        <InputTextField maxLength={10} keyboardType={'numeric'} placeholder="Contact Number *" value={phoneNumber.phoneNumber} onChangeText={(text) => onChange(text, 'phoneNumber')} error={phoneNumber.phoneNumberError != ""} errorMsg={phoneNumber.phoneNumberError} />
        <InputTextField placeholder="Available Till *" value={availableTime.availableTime} onChangeText={(text) => onChange(text, 'Available Till')} error={availableTime.availableTimeError != ""} errorMsg={availableTime.availableTimeError} />
        <View style={styles.address}>
          <Text style={styles.headingText}>Pickup Address</Text>

          {
            userAddress.length > 0 ?
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.restaurantName}>{userAddress[userAddressIndex].restaurantName}</Text>
                  <Text>{userAddress[userAddressIndex].addressLine1}, {userAddress[userAddressIndex].state}, {userAddress[userAddressIndex].city}, {userAddress[userAddressIndex].pincode}</Text>
                </View>
                <TouchableOpacity style={{ width: 100 }} onPress={() => { setAddressModal(true) }}>
                  <Text style={styles.change}>Change</Text>
                </TouchableOpacity>
              </View> : <Ionicons style={{ alignSelf: 'flex-end' }} onPress={() => { setAddressModal(true); setAddAddress(true) }} name='add-circle' size={25} />
          }
        </View>

        <Modal animationType="fade" visible={addressModal} onRequestClose={() => {
          setAddressModal(false);
        }}>
          <View style={{ padding: 15 }}>
            <View style={styles.sideHeading}>
              <Text style={styles.headingText}>User Addresses</Text>
              <Ionicons onPress={() => setAddAddress(true)} name='add-circle' size={25} />
            </View>
            {addAddress &&
              <View>
                <InputTextField placeholder={'Restaurant Name'} value={restaurant.restaurantName} onChangeText={(text) => onChange(text, 'restaurant')} error={restaurant.restaurantNameError != ""} errorMsg={restaurant.restaurantNameError} />
                <InputTextField placeholder={'Address'} value={address.address} onChangeText={(text) => onChange(text, 'address')} error={address.addressError != ""} errorMsg={address.addressError} />
                <InputTextField placeholder={'City'} value={city.city} onChangeText={(text) => onChange(text, 'city')} error={city.cityError != ""} errorMsg={city.cityError} />
                <InputTextField placeholder={'State'} value={state.state} onChangeText={(text) => onChange(text, 'state')} error={state.stateError != ""} errorMsg={state.stateError} />
                <InputTextField maxLength={6} keyboardType={'numeric'} placeholder={'Pin'} value={pin.pin} onChangeText={(text) => onChange(text, 'pin')} error={pin.pinError != ""} errorMsg={pin.pinError} />
                <View style={styles.modal}>
                  <Pressable style={styles.pressable}
                    onPress={() => setAddAddress(false)}>
                    <Text style={styles.cancel}>Cancel</Text>
                  </Pressable>
                  <Pressable style={styles.pressable}
                    onPress={() => addUserAddress()}>
                    <Text style={styles.confirm}>Confirm</Text>
                  </Pressable>
                </View>
              </View>
            }
            {
              userAddress.map((data, index) => {
                return <View style={styles.map}>
                  <CheckBox
                    disabled={false}
                    value={index == userAddressIndex}
                    onValueChange={() => { setAddressModal(false); setUserAddressIndex(index) }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.restaurantName}>{data.restaurantName}</Text>
                    <Text>{data.addressLine1}, {data.state}, {data.city}, {data.pincode}</Text>
                  </View>
                </View>
              })
            }
          </View>
        </Modal>

        <View style={styles.addfood}>
          <View style={styles.sideHeading}>
            <Text style={styles.headingText}>Food details</Text>
            <Ionicons onPress={() => {
              setfoodName({ foodName: "", foodNameError: "", });
              setfoodQuantity({ foodQuantity: "", foodQuantityError: "", });
              setexpiresIn({ expiresIn: "", expiresInError: "", });
              setModalVisible(true)
            }} name='add-circle' size={25} />
          </View>
          <FlatList
            data={datas}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>

        <Modal animationType="fade" visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View>
            <Text style={styles.enterFoodDetails} >Enter Food Details</Text>
            <InputTextField placeholder="Food Name" value={foodName.foodName} onChangeText={(text) => onChange(text, 'foodName')} error={foodName.foodNameError != ""} errorMsg={foodName.foodNameError} />
            <InputTextField placeholder="Food Quantity" value={foodQuantity.foodQuantity} onChangeText={(text) => onChange(text, 'foodQuantity')} error={foodQuantity.foodQuantityError != ""} errorMsg={foodQuantity.foodQuantityError} />
            <InputTextField placeholder="Expires in" value={expiresIn.expiresIn} onChangeText={(text) => onChange(text, 'expiresIn')} error={expiresIn.expiresInError != ""} errorMsg={expiresIn.expiresInError} />

            <View style={styles.modal}>
              <Pressable style={styles.pressable2}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancel}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.pressable2}
                onPress={() => addItem()}>
                <Text style={styles.confirm}>Add</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={styles.downView}>
          <TouchableOpacity onPress={() => { navigation.navigate('Home') }} >
            <View style={styles.cancelButton}>
              <Text style={styles.buttonText}>CANCEL</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePostAvailableFood}>
            <View style={styles.submitButton}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>

  );

}



const styles = StyleSheet.create({
  renderItem:{ 
    flexDirection: 'row', 
    margin: 10, 
    alignItems: 'center' 
  },
  container:{ 
    backgroundColor: '#f4f4f4'
   },
   scroll:{ 
    paddingHorizontal: 10 
  },
  Headers:{
     color: 'black', 
     fontWeight: '800',
    marginRight: 50, 
    fontSize: 30, 
    marginTop: 10 
  },
  Picker:{ 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 5, 
    marginHorizontal: 10 
  },
  address:{ 
    paddingHorizontal: 15 
  },
  headingText:{ 
    fontSize: 20,
   },
   restaurantName: { 
    fontWeight: 'bold',
    fontSize: 20 
  },
  change:{ 
    textAlign: 'right', 
    color: 'royalblue' 
  },
  sideHeading:{ 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  modal:{ 
    flexDirection: 'row', 
    justifyContent: 'center' 
  },
  pressable:{ 
    margin: 10, 
    borderRadius: 20, 
    backgroundColor: "#f7f7f7", 
    height: 30, width: 125, 
    justifyContent: 'center', 
    alignContent: 'center', 
    alignItems: "center", 
    alignSelf: 'center' 
  },
  cancel:{ 
    color: "black", 
    fontWeight: "bold",
   },
  confirm:{ 
    color: "black", 
    fontWeight: "bold", 
  },
  map:{ 
    flexDirection: 'row', 
    paddingVertical: 5 
  },
  addfood:{ 
    paddingHorizontal: 15, 
    marginTop: 10 
  },
  enterFoodDetails:{ 
    marginBottom: 10, 
    color: 'black', 
    fontWeight: 'bold', 
    fontSize: 20, 
  },
  pressable2:{ 
    margin: 10, 
    borderRadius: 20, 
    backgroundColor: "#f7f7f7", 
    height: 30, 
    width: 125, 
    justifyContent: 'center', 
    alignContent: 'center', 
    alignItems: "center", 
    alignSelf: 'center' 
  },
  downView:{ 
    marginTop: 30, 
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'flex-start' 
  },
  cancelButton:{ 
    height: 40, 
    width: 175, 
    backgroundColor: 'royalblue', 
    borderRadius: 5, 
    justifyContent: 'center', 
    alignItems: 'center'
   },
   buttonText:{ 
    textAlign: 'center', 
    color: 'white', 
  },
   submitButton:{ height: 40, 
    width: 175, 
    backgroundColor: 'green', 
    borderRadius: 5, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  button: {
    marginLeft: 10,
    borderRadius: 10,
    padding: 15,
    elevation: 8,
    height: 50,
    width: 350,
    // borderWidth:100
  },

  buttonClose: {
    backgroundColor: "white",
  },
  buttons: {
    justifyContent: 'center', alignItems: 'center'
  }
});