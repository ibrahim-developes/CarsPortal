import React,{useState} from 'react'
import Toast from 'react-native-root-toast';
import { AntDesign } from '@expo/vector-icons';
import {
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import { signUpApi } from '../../firebaseFunctions/firebaseFunctions'
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;


export default function SignupScreen({navigation}) {
  const[mail,setmail] =useState("")
  const[pass,setpass] =useState("")
  const [confirmPassword, setConfirmPassword] = useState('')
  const[firstName,setFirstName] =useState("")
  const[lastName,setLastName] =useState("")
  const[mobile,setMobile] =useState("")
  const [visible,setVisible]=useState(false);
  const [hide,setHide]=useState(true)
  const [hide1,setHide1]=useState(true)


 const managePasswordVisibility = () =>
{

setHide(!hide);
};
 const managePasswordVisibility1 = () =>
{


setHide1(!hide1);
}
  
const signUp = async () => {
  if (mail && pass && mobile && firstName && lastName && confirmPassword !=="") {
    if(pass == confirmPassword)
    {  
      if (pass.length >=7){
        setVisible(true)
      await signUpApi(firstName,lastName,mobile,mail,pass).then((response)=>{
          console.log("response:",response)
          if(response.success === false){
            setVisible(false)
            console.log("response here ", response.error)
           Toast.show("email already taken")
          }
          if(response.success === true){
            const token = response.resp._tokenResponse.idToken
            console.log("token ",token )
            setVisible(false)
            // saveUserId(token);
            setConfirmPassword("");
            setmail("");
            setpass("");
            setMobile("");
            setConfirmPassword("");
            setFirstName("");
            setLastName("")

            
            
           
          }
          
      
        }).catch(e =>{ console.log("error:",e)
        }) 
      }else{
        Toast.show('Passwords length must be atleast 8');
      }
    }else{
      Toast.show('Passwords are not Matching');
    }
  }else{
    Toast.show('Some Fields Are Missing');
  }


  }


   return (
            <SafeAreaView style={styles.container}>
                 <TouchableWithoutFeedback onPress={()=>  Keyboard.dismiss() }>
                  
              <KeyboardAvoidingView
        style={{flex:1}}
        // keyboardShouldPersistTaps={'always'}
        // showsVerticalScrollIndicator={false}>
       >
       <View style={{marginHorizontal:WIDTH*0.07, marginTop:HEIGHT/15}}>
          
    
            <Text style={styles.signup}>Bringing you Car Portal</Text>
            <Text style={{...styles.signup,color:"#F76300",}}>Sign Up</Text>
            <ScrollView >
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="First Name"
                value={firstName}
            onChangeText={(text)=>setFirstName(text)}
              
              />
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Last Name"
                value={lastName}
            onChangeText={(text)=>setLastName(text)}
              
              />
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                onChangeText={text =>setMobile(text)}
            value={mobile}
             
              />
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Email Address"
                keyboardType="email-address"
                onChangeText={text =>setmail(text)}
            value={mail}
             
              />
    
            <View style={styles.passwordContainer}>
            <TextInput
              style={{...styles.input,borderWidth:0,padding:0,width:'90%',marginTop:1}}
              
              placeholder="Password"
              secureTextEntry={hide}
              keyboardType="default"
              value={pass}
              
          onChangeText={(text)=>setpass(text)}
            />
    
             <TouchableOpacity onPress ={managePasswordVisibility}>
            
              <AntDesign name={ ( hide ) ? 'eyeo' : 'eye'} size={24} color="black" />
            </TouchableOpacity>
            </View>
    
            <View style={styles.passwordContainer}>
            <TextInput
              style={{...styles.input,borderWidth:0,padding:0,width:'90%',marginTop:1}}
              
              placeholder="Re-Enter Password"
              secureTextEntry={hide1}
              keyboardType="default"
              value={confirmPassword}
              onChangeText={(text)=>setConfirmPassword(text)}
    
             
            />
    
             <TouchableOpacity onPress ={managePasswordVisibility1}>
              
              <AntDesign name={ ( hide1 ) ? 'eyeo' : 'eye'} size={23} color="black" />
            </TouchableOpacity>
    
            </View>
    
              <View style={{flexDirection: 'row', marginTop: '1%'}}>
                <Text style={{fontSize: 12, marginLeft: 8}}>
                  By signing up,you are agreed to our{' '}
                  <Text style={{fontWeight: 'bold'}}>Terms of Use</Text> and
                  <Text style={{fontWeight: 'bold'}}> Privacy Policy</Text>
                </Text>
              </View>
            </View>
              <View
                style={{
                  borderRadius: 14,
                  backgroundColor:"#c54f00",
                  padding:14,
                  marginTop: "10%",
                  alignItems:'center'
                }}>
              {visible ? (
        <ActivityIndicator visible={visible} color="#fff" size="small" />
        ) :(
              <TouchableOpacity activeOpacity={0.9} onPress={()=>signUp()}
              style={{width:'100%',alignItems:"center"}}>    
                <Text style={{color: '#ffffff', fontSize: 16, fontWeight: 'bold'}}>
                  Sign Up
                </Text>
            </TouchableOpacity> ) }
                         </View>
    </ScrollView>
            <View style={styles.bottom}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 12}}>Already have an account?</Text>
                <TouchableOpacity>
                  <Text
                  onPress={()=>navigation.navigate('login')}
                    style={{
                      textDecorationLine: 'underline',
                      fontWeight: 'bold',
                      fontSize: 12,
                      marginHorizontal:10
                    }}>
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>
            </KeyboardAvoidingView>
            
            </TouchableWithoutFeedback>
          </SafeAreaView>
      );
    

}

const styles = StyleSheet.create({

  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor:'#fff'
  },
 
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  welcome: {
    marginTop: '12%',
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 14,
    padding: 14,
    borderRadius: 14,
    borderColor: '#A3A4AA',
    borderWidth: 1,
    marginTop: '6.5%',
  },
  face: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  CheckButton: {
    backgroundColor: '#1C59CC',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    width: '100%',
    marginTop: '8%',
  },
  bottom: {
    marginTop: '5%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signup: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#5B5B5B',
    alignSelf: 'center',
    marginTop: 5,
  },
  passwordContainer:{
    // width:WIDTH*0.92,
    padding:12,
    borderRadius: 12,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderColor: "#A3A4AA",
    marginTop:('5.5%'),
    borderRadius: 14,
    borderColor: '#A3A4AA',
    borderWidth: 1,
    
  }



})