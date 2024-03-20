import React, { useState } from 'react';
import { TextInput, LayoutAnimation, Text, TouchableOpacity, View, UIManager, Platform, StyleSheet } from 'react-native';

const InputTextField = ({ placeholder, onChangeText, value, error, errorMsg, keyboardType, secureTextEntry, maxLength }) => {
  const [focus, setFocus] = useState(false);
  const [ref, setRef] = useState(null);

  if (Platform.OS == 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const onBlur = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(300, 'linear', 'opacity'));
    setFocus(false)
  }

  const onFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(300, 'linear', 'opacity'));
    setFocus(true)
  }

  const onPress = () => {
   if(!ref.isFocused()){
    ref.focus()
   }
  }

  return (
    <View style={{marginVertical:3}}>
      <TouchableOpacity onPress={()=>onPress()} style={[styles.labelViewStyles, value && value.length > 0 || focus?styles.af:styles.bf]}>
        <Text style={[styles.labelStyles, value && value.length > 0 || focus?styles.aft:styles.bft,error&&{color:'red'}]}>{placeholder}</Text>
      </TouchableOpacity>
      <TextInput
        ref={setRef}
        onFocus={onFocus}
        onBlur={onBlur}
        keyboardType={keyboardType?keyboardType:'default'}//'numeric','default','email-address','phone-pad'
        secureTextEntry={secureTextEntry?secureTextEntry:false}
        maxLength={maxLength?maxLength:250}
        style={[styles.input,{borderColor:error?'red':'grey'}]}
        onChangeText={onChangeText}
        value={value}
      />
      {error&&errorMsg&&<Text style={styles.errorText}>{errorMsg}</Text>}
    </View>
  )
}
const styles = StyleSheet.create({
  labelStyles: {
    paddingHorizontal: 10
  },
  labelViewStyles: {
    position: 'absolute',
    alignSelf: 'flex-start',
    borderRadius: 20,
    zIndex: 9
  },
  af: {
    left: 20,
    top: 5,
    backgroundColor: '#f4f4f4',
  },
  bf: {
    left: 20,
    top: 20,
  },
  aft: {
    fontSize: 12,
  },
  bft: {
    fontSize: 20
  },
  errorText:{
    fontSize: 12,
    color:'red',
    textAlign:'right',
    paddingHorizontal:20,
    top:-10,
  },
  input: {
    height: 50,
    margin: 12,
    borderColor:'grey',
    borderWidth: 1,
    borderRadius:5,
    padding: 10,
  },
});


export default InputTextField;