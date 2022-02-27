import React, {useContext, useState} from 'react'
import {View,  StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import {Text, Input, Button, Header} from 'react-native-elements'
import Spacer from '../components/spacer'
import { NavigationEvents } from 'react-navigation'

const AccountScreen = ({navigation}) => {
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const onLogout = ()=>{

        navigation.navigate('signinFlow')
     
    }

    return (
        <View style={styles.container}>
            <Text h1 style={styles.head}>User Info</Text>

            <View style={styles.infoContainer} >
                <Text style={styles.infoField} > Name: </Text> 
                <Text style={styles.info} > Rohan Verma </Text>
            </View>
            <View style={styles.infoContainer} >
                <Text style={styles.infoField} > Email: </Text> 
                <Text style={styles.info} > vrohanrv7@gmail.com </Text>
            </View>
            <View style={styles.infoContainer} >
                <Text style={styles.infoField} > Status(1 day): </Text> 
                <Text style={styles.info} > No </Text>
            </View>
            <View style={styles.infoContainer} >
                <Text style={styles.infoField} > Status(1 week): </Text> 
                <Text style={styles.info} > Yes </Text>
            </View>
            <View style={styles.infoContainer} >
                <Text style={styles.infoField} > Status(1 month): </Text> 
                <Text style={styles.info} > No </Text>
            </View>
            <Spacer/>
            <View style={styles.buttonContainer} >
                <Button title={'Log out'} containerStyle={styles.button} buttonStyle={{backgroundColor:'#a83244'}} onPress={onLogout} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:'100%',
        fontFamily:'sans-serif-thin',
        width:'100%'

    },
    text:{
        color:'#a83244'
    },
    login:{
        color:'#a83244'
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
        top:0,
        fontFamily:'sans-serif-thin',
        color:'#34eb9b'
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

    infoContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        margin:20
    },
    infoField:{
        fontSize:20,
        fontWeight:'bold'
    },
    info:{
        fontSize:20
    },
    buttonContainer:{
        width:'100%',
        alignItems:'center',


    },

    button:{
        height:42,
        width:'70%',
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

export default AccountScreen;