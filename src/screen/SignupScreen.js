import React, {useState, useContext, useEffect} from 'react'
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {Text, Input, Button} from 'react-native-elements'
import Spacer from '../components/spacer'
import SigninScreen from './SigninScreen'
import {NavigationEvents} from 'react-navigation'
import {navigate} from '../../navigationRef'
import * as actions from '../store/actions/actions'
import {connect} from 'react-redux'
import {server, sensorKey} from '../../server'


const SignupScreen = ({navigation, onRegister}) => {
    const [username, setUsername]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [errorMessage, setErrorMessage] = useState('')
    //  useEffect(()=>{tryLocalSignin()}, [])
    const signin = ()=>{
        const userdata = {
            'username':username,
            'password1':password,
            'password2':password,
            'email':email,
            'sensor_key':sensorKey

        }
        // onRegister(userdata)
        fetch(server+'/register/',{
            method:"POST",
            headers:{"Content-Type":"application/json; charset=UTF-8"},
            body:JSON.stringify(userdata)
        }).then(
            response=>response.json()
        ).then(
            data=>{
                onRegister(data)
                if(data['is_success'] === true){
                    navigation.navigate('mainFlow')
                }
            }
        )


    }


    return (
        <View style={styles.container}>
            
            <Spacer>
                <Text h3 style={styles.head}>Register</Text>
            </Spacer>
            <TextInput label='Username' 
                   value={username}
                   onChangeText={setUsername}
                   autoCorrect={false} 
                   placeholder='Enter Username'
                   style={errorMessage !==''?styles.inputError:styles.input}  />
            <Spacer/>
            <TextInput label='Email' 
                   value={email}
                   onChangeText={setEmail}
                   autoCorrect={false} 
                   placeholder='Enter Email'
                   style={errorMessage !==''?styles.inputError:styles.input}  />
            <Spacer/>
            <TextInput label='Password' 
                   value={password}
                   onChangeText={setPassword}
                   autoCorrect={false} 
                   secureTextEntry={true}
                   placeholder='Enter Password'                   
                   style={errorMessage !==''?styles.inputError:styles.input}  />
            <Spacer>
                <Text style={styles.text} >{errorMessage}</Text>
            </Spacer>
            <Spacer>
                <Button title='Sign Up' onPress={signin} containerStyle={styles.button} buttonStyle={{backgroundColor:'#34eb9b'}} />
            </Spacer>

            <TouchableOpacity onPress={()=>{navigation.navigate('Sign in')}}>
               <Spacer><Text style={styles.login} >Already have an account?</Text></Spacer> 
            </TouchableOpacity>
        </View>
    )
}

SignupScreen.navigationOption=()=>{
    return{
        header:null
    }
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        marginBottom:150,
        marginTop:100,
        marginHorizontal:10,
        shadowColor:'black',
        backgroundColor:'white',
        height:200,
        borderRadius:2,
        shadowOffset:{
            height:2,
            width:3

        }
    },
    text:{
        color:'#a83244'
    },
    login:{
        color:'#2e74ff'
    },
    input:{
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#34eb9b',
        height: 50, 
        marginHorizontal:15,
        padding:10

    }, 
    head:{
        width:'100%',
        textAlign:'center',
        marginTop:0,
        color:'#3e3f40'
    }, 
    inputError:{
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#a83244',
        height: 50, 
        marginHorizontal:15,
        padding:10
    },
    button:{
        height:42,
        width:'100%',
        borderRadius:5,
        shadowColor:'#a83244',
        shadowOffset:{
            height:1,
            width:0
        },
        shadowOpacity:0.1,
        shadowRadius:5,
        color:'#a83244'


    }
})

const mapStateToProps=state=>{
    return{
        user:state.main.userdata,
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onRegister: (userdata)=>dispatch(actions.register(userdata)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);