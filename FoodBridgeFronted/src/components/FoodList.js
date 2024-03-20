import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, LayoutAnimation, UIManager,StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');
const FoodList = ({ listDataSource }) => {
    const [collapsedIndex, setCollapsed] = useState(null);
    if (Platform.OS == 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const toggleExpand = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.create(300, 'easeInEaseOut', 'scaleY'));
        let i = collapsedIndex == index ? null : index
        setCollapsed(i)
    }
    return (
        <ScrollView style={styles.container}>
            {
                listDataSource.map((item, index) => {
                    return <>
                        <View key={index} style={styles.toggleExpand}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => toggleExpand(index)}>
                                {(collapsedIndex != index) && <View style={{
                                    width: 100, backgroundColor: item.typeOfFood == 'Veg' ? '#68B62A' : item.typeOfFood == 'Non-Veg' ? '#E86272' : '#E8862C', borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                                    justifyContent: 'center', padding: 10
                                }}>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{`${item.typeOfFood} food is available for ${item.noOfPersons} persons`}</Text>
                                </View>}
                                <View style={{ flex: 1, padding: 10 }}>
                                    <Text style={styles.restaurantName}>{item.restaurantName}</Text>
                                    <View style={styles.iconView}>
                                        <Ionicons size={15} name='person-outline' />
                                        <Text style={styles.inputStyle}>{item.username}</Text>
                                    </View>
                                    <View style={styles.iconView}>
                                        <Ionicons size={15} name='call-outline' />
                                        <Text style={styles.inputStyle}>{item.phoneNumber}</Text>
                                    </View>
                                    <View style={styles.iconView}>
                                        <Ionicons size={15} name='home-outline' />
                                        <Text style={styles.address}>{item.address.replaceAll(',,',',').replaceAll(',',', ')}</Text>
                                    </View>

                                    <View style={styles.availableView}>
                                        <Text>available till <Text style={styles.availableText}>{item.availableTime}</Text></Text>
                                        <Text>post time  <Text style={styles.availableText}>{item.postTime}</Text></Text>

                                    </View>
                                </View>
                            </TouchableOpacity>
                            {(collapsedIndex === index) &&
                                <View style={styles.foodListView}>
                                    <View style={styles.foodListView2}>
                                        <Text style={styles.PredifinedNo}>No</Text>
                                        <Text style={styles.PredifinedItem}>Item</Text>
                                        <Text style={styles.PredifinedQuantity}>Quantity</Text>
                                        <Text style={styles.PredifinedQuantity}>ExpiresIn</Text>
                                    </View>
                                    {
                                        item.foodList.map((item, key) => (
                                            <View key={key + 1} style={styles.foodListView2}>
                                                <Text style={{ width: 25 }}>{key + 1}.</Text>
                                                <Text style={{ flex: 1 }}>{item.foodName}</Text>
                                                <Text style={{ width: 100 }}>{item.foodQuantity}</Text>
                                                <Text style={{ width: 100 }}>{item.expiresIn}</Text>
                                            </View>

                                        ))
                                    }
                                </View>

                            }
                        </View>
                    </>
                })

            }

            <View style={{ height: 100 }} />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{ 
        paddingHorizontal: 10
    },
    toggleExpand:{ 
        backgroundColor: '#ffffff', 
        elevation: 10,
        marginVertical: 10, 
        borderRadius: 10, 
        borderColor: '#f4f4f4' 
    },
    iconView:{ 
        marginVertical: 3, 
        flexDirection: 'row' 
    },
    restaurantName:{ 
        fontWeight: 'bold', 
        fontSize: 15 
    },
    inputStyle:{ 
        marginLeft: 5 
    },
    address:{ 
        marginLeft: 5, 
        flexWrap: 'wrap' 
    },
    availableView:{ 
        flexDirection: 'row', 
        justifyContent: 'space-between' 
    },
    availableText:{ 
        fontWeight: 'bold' 
    },
    foodListView:{ 
        backgroundColor: '#ffffff', 
        borderRadius: 10, 
        borderColor: '#f4f4f4', 
        padding: 10 
    },
    foodListView2:{ 
        flexDirection: 'row', 
        margin: 2, 
        alignItems: 'center' 
    },
    PredifinedNo:{ 
        width: 25, 
        color: 'black' 
    },
    PredifinedItem:{ 
        flex: 1, 
        color: 'black' 
    },
    PredifinedQuantity:{ 
        width: 100, 
        color: 'black' 
    },

});
export default FoodList;