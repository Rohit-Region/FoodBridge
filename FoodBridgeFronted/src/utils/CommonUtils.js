import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const UtlCommon = {

    storeData: async (key, value) => {
        try {
            const result = await AsyncStorage.setItem(key, value)
            return result
        } catch (e) {
            // saving error
        }
    },


    getData: async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            return value;
        } catch (e) {
            // error reading value
        }
    },


    showToast: (msg) => {
        Toast.show(msg, Toast.LONG);
    }
}

export default UtlCommon