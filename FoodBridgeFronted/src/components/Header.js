import React from 'react';
import { Text, View, StyleSheet, StatusBar, Image, Dimensions} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import logo from "../assets/logo.png";

const {width, height} = Dimensions.get('window');
const Header = ({ navigation }) => {
    return (
        
        <View style={styles.container}>
            <View style={styles.logo}>
            <Image source={logo}  style={styles.image}></Image>
            </View>
            <StatusBar
                animated={true}
                backgroundColor="#ffffff"
                barStyle={'dark-content'}
                showHideTransition={'fade'}
                hidden={false} />
        
           <View style={{width:width-250,
            alignItems:'center',
            borderRadius:10,
            backgroundColor:'lightblue'}}>
           <Text style={styles.mainLogo}>AAHAR
            </Text>
           </View>
            <View style={styles.profile}>
            <EvilIcons onPress={()=>navigation.current.navigate("Profile") } size={40} name='user' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        elevation: 10,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    logo:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        flex:1
    },
    image:{
        width:80,
        height:150,
        resizeMode:'contain' ,
        alignSelf:'flex-start',
        marginLeft:-10
    },
    profile:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        flex:1
    },
    mainLogo: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        justifyContent:'center',
        alignItems:'center',
    },
});


export default Header;