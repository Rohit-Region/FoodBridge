import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Util from '../utils/CommonUtils';
import { getUserDetails, getUserAddressDetails, userLogOut, getFoodDetails } from '../services/userServices';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './Login';
import Register from './Register';
import FoodList from '../components/FoodList';


const Profile = ({ navigation }) => {
    const [token, setToken] = useState("");
    const [userName, setuserName] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [email, setemail] = useState('');
    const [userAddress, setUserAddress] = useState([]);
    const [userAddressIndex, setUserAddressIndex] = useState(0);
    const [listDataSource, setlistDataSource] = useState([]);
    const [screen, setScreen] = useState('Login');


    useEffect(() => {
        getUser();
    }, []);

    const getUserAddress = async () => {
        const userAddressDetails = await getUserAddressDetails()
        if (userAddressDetails?.status == 200) {
            setUserAddress(userAddressDetails.data.data)
        }
    }

    const getPosts = async () => {
        const userPostDetails = await getFoodDetails()
        if (userPostDetails?.status == 200) {
            setlistDataSource(userPostDetails.data.data)
        }
    }
    

    const getUser = async () => {
        const userDetails = await getUserDetails()
        let data = await Util.getData('token')
        setToken(data ? data : '')
        if (userDetails.status == 200) {
            setuserName(userDetails.data.data.userName)
            setphoneNumber(userDetails.data.data.phoneNumber)
            setemail(userDetails.data.data.email)
            getUserAddress()
            getPosts()
        }
    }

    const logout = async () => {
        const userDetails = await userLogOut()
        if (userDetails.status == 200) {
            getUser()
        }
    }


    if (token == "") {
        return (
            <>
                <View style={styles.page1}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => setScreen('Login')} style={{ backgroundColor: screen == 'Login' ? 'skyblue' : 'transparent', height: 80, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: screen == 'Login' ? 'bold' : '100' }}>SignIn</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => setScreen('Register')} style={{ backgroundColor: screen == 'Register' ? 'skyblue' : 'transparent', height: 80, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: screen == 'Register' ? 'bold' : '100' }}>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {screen == 'Login' && <Login getUser={getUser} />}
                {screen == 'Register' && <Register setScreen={setScreen} />}
            </>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.container2}>
                    <Text style={styles.userDetailsScreen}>User Details </Text>
                    <View style={{ margin: 10, }}>
                        <View style={styles.margin}>
                            <Ionicons size={22} color={'black'} name='person-outline' />
                            <Text style={styles.Predefined}>Name :<Text style={styles.userInput}> {userName}</Text></Text>
                        </View>
                        <View style={styles.margin}>
                            <Ionicons size={22} color={'black'} name='call-outline' />
                            <Text style={styles.Predefined}>Mobile :<Text style={styles.userInput}> {phoneNumber}</Text></Text>
                        </View>
                        <View style={styles.margin}>
                            <Ionicons size={22} color={'black'} name='ios-mail-open-outline' />
                            <Text style={styles.Predefined}>Email :<Text style={styles.userInput}> {email}</Text></Text>
                        </View>
                        <View style={styles.margin}>
                            <Ionicons size={22} color={'black'} name='home-outline' />
                            <Text style={styles.Predefined}>Address :</Text>
                            {userAddress.length > 0 ?
                                <View style={{ marginBottom: 5, }}>
                                    <Text style={styles.restaurantName}>  {userAddress[userAddressIndex].restaurantName}</Text>
                                    <Text style={styles.addressLines}>  {userAddress[userAddressIndex].addressLine1}, {userAddress[userAddressIndex].city},</Text>
                                    <Text style={styles.addressLines}>  {userAddress[userAddressIndex].state},{userAddress[userAddressIndex].pincode}.</Text>
                                </View> : null
                            }
                        </View>
                    </View>
                    <FoodList listDataSource={listDataSource}/>
                    <View style={styles.logoutContainer}>
                        <TouchableOpacity onPress={logout} >
                            <View style={styles.logoutButton}>
                            <Text style={styles.logoutText}>LOGOUT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 80 }} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
page1:{
   flexDirection: 'row', 
   justifyContent: 'space-between' 
  },
  container:{ 
    marginTop: 20
   },
  container2:{
     padding: 10
   },
   userDetailsScreen:{ 
    color: 'black', 
    fontWeight: '800', 
    marginRight: 80, 
    fontSize: 30
   },
   margin:{ 
    marginVertical: 8, 
    flexDirection: 'row' 
  },
   Predefined:{ 
    marginLeft: 5, 
    fontSize: 20, 
    fontWeight: '600', 
    color: 'black' 
  },
    userInput:{ 
      color: '#666464', 
      fontWeight: '400'
  },
  restaurantName:{ 
    fontWeight: 'bold', 
    fontSize: 20, 
  },
  addressLines:{
    color: '#666464', 
    fontWeight: '400', 
    fontSize: 18,
  },
  logoutContainer:{ 
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'flex-start' 
},
logoutButton:{ 
  height: 40, 
  width: 120, 
  backgroundColor: 'orange', 
  borderRadius: 5, 
  justifyContent: 'center', 
  alignItems: 'center' 
},
logoutText:{ 
  textAlign: 'center', 
  color: 'white', 
},
});


export default Profile;
