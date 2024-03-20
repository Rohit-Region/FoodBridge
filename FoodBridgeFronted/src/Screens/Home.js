import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAllFoodDetails } from '../services/userServices';
import Util from '../utils/CommonUtils'
import FoodList from '../components/FoodList';



export default function Home({ navigation, }) {
  const [listDataSource, setlistDataSource] = useState([]);


  useEffect(() => {
    getDatas()
  }, [])


  const getDatas = async () => {
    const userFoodDetails = await getAllFoodDetails()
    const data = userFoodDetails.data
    setlistDataSource(data)
  }



  const postAvailableFood = async () => {
    let data = await Util.getData('token')
    console.log(data)
    if (data) {
      navigation.navigate("PostAvailableFood")
    } else {
      navigation.navigate("Profile")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sort}>
        <Text><Ionicons name="filter-outline" /> Filter</Text>
        <Text>Sort</Text>
      </View>
      <FoodList listDataSource={listDataSource} />
      <Ionicons style={styles.addIcon} name="add-circle-sharp" size={70} color={'#52C0FD'}
        onPress={postAvailableFood} />
    </SafeAreaView>

  )

};



const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  sort:{ 
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10 
  },
  addIcon: {
    bottom: 10,
    right: 10,
    position: 'absolute'
  }

})