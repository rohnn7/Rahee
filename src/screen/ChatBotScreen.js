import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react'
import {View, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native'
import {Text, Input, Button} from 'react-native-elements'
import Spacer from '../components/spacer'
import SigninScreen from './SigninScreen'
import {NavigationEvents} from 'react-navigation'
import {navigate} from '../../navigationRef'
import {GiftedChat} from 'react-native-gifted-chat'


const ChatBotScreen = ({navigation}) => {
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('')
    const [prevLength, setPrevLength] = useState(messages.length)
    const [id, setId] = useState(1)
    //  useEffect(()=>{tryLocalSignin()}, [])
    const onNavigate = ()=>{
        navigation.navigate('Analysis')
    }

    const re = '.*\\bif\\b.*'
    const str = 'I lose if I start tomorrow'

    // console.log(str.match(".*?\\bif\\b.*?"))


    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(
                <TouchableOpacity onPress={onNavigate} >
                   <Image 
                      source={require('../../assets/Icon/return-button.png')}
                      resizeModel='Contain'
                      style = {{
                        width:25,
                        height:25,
                        marginRight:20,
                        tintColor:'white'
                      }} />
                </TouchableOpacity>
              )
        })
    })

    let newMessage = {
        _id: 1,
        text: 'Hii, do you wanna talk?',
        createdAt: new Date(),
        user: {
        _id: 2,
        name: 'React Native',
        avatar: require('../../assets/Icon/man.png'),
        }
    }

    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hii, do you wanna talk?',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: require('../../assets/Icon/man.png'),
            },
          },
        ])
      }, [])

    let healthPoint = 0

    const onSend = useCallback((message = []) => {
        // console.log(message[0]['text'])
        setUserMessage(message[0]['text'])
        setMessages(previousMessages => GiftedChat.append(previousMessages, message))
        setId(previousId=>previousId+1)
        // setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))

        console.log(messages.length)
        let prev_message_id = 1
        if(message){
            // for(let i in messages){
            //     if(messages[i]['text']===message[0]['text']){
            //         prev_message_id = messages[i+1]['_id']
            //         console.log(prev_message_id)
            //         break;
            //     }else{
            //         continue;
            //     }
    
            // }


                if(message[0]['text']==='yeah'){
                    newMessage={
                        ...newMessage,
                        _id: Math.floor(Math.random() * 100) + 1,
                        text: 'Sooo, why are you so down?'
                    }
                }else if(message[0]['text']==='I am not sure'){
                    newMessage={
                        ...newMessage,
                        _id: Math.floor(Math.random() * 100) + 1,
                        text: 'Relax, it happens with everyone',
    
                    }
                }else if(message[0]['text']==='I can not do anything properly'){
                    newMessage={
                        ...newMessage,
                        _id: Math.floor(Math.random() * 100) + 1,
                        text: 'Do not think too much. Ok lets distract you from this. Tell me did you eat 3 meals today \n a1) yes \n b1) no'
                    }
                }else if(message[0]['text']==='a1'){
                    newMessage={
                        ...newMessage,
                        _id: Math.floor(Math.random() * 100) + 1,
                        text: 'Now choose how much water did you drinnk? \n a2) less than 5 \n b2) between 5 and 10 \n c2) between 10 and 15'
                    }
                    healthPoint = healthPoint + 1
                 }else if(message[0]['text']==='b1'){
                    newMessage={
                        ...newMessage,
                        _id: Math.floor(Math.random() * 100) + 1,
                        text: 'Now choose how much water did you drinnk? \n a2) less than 5 \n b2) between 5 and 10 \n c2) between 10 and 15'
                    }
                    healthPoint = healthPoint + 0
                }else if(message[0]['text']==='a2'){
                    newMessage={
                        ...newMessage,
                        _id: Math.floor(Math.random() * 100) + 1,
                        text: 'Did you start eating too much of junk food? \n a3) yes \n b2) no'
                    }
                    healthPoint = healthPoint + 0
                }else if(message[0]['text']==='b2'){
                    newMessage={
                        ...newMessage,
                        _id: Math.floor(Math.random() * 100) + 1,
                        text: 'Did you start eating too much of junk food? \n a3) yes \n b2) no'
                    }
                    healthPoint = healthPoint + 1
                }else if(message[0]['text']==='c2'){
                    newMessage={
                        ...newMessage,
                        _id: Math.floor(Math.random() * 100) + 1,
                        text: 'Did you start eating too much of junk food? \n a3) yes \n b2) no'
                    }
                    healthPoint = healthPoint + 2
                }else if(message[0]['text']==='a3'){
                    healthPoint = healthPoint +1
                    newMessage={
                        ...newMessage,
                        _id: Math.floor(Math.random() * 100) + 1,
                        text: `Your health point is ${healthPoint}, a healthy person should have 4. \n you can visit https://www.myfitnesspal.com/ for better tracking of health \n if you agree we can also connect to a professional`
                    }
                    healthPoint = healthPoint + 0
                }else{
                    newMessage={
                        ...newMessage,
                        _id: Math.floor(Math.random() * 100) + 1,
                        text: 'everything will be alright'
                    } 
                }
    
            // switch(message[0]['text']){
            //     case('yeah'):
            //         newMessage={
            //             ...newMessage,
            //             _id: prev_message_id+1,
            //             text: 'Sooo, why are you so down?'
            //         }
            //     case('I am not sure'):
            //         newMessage={
            //             ...newMessage,
            //             _id: prev_message_id+1,
            //             text: 'Relax, it happens with everyone',
        
            //         }
            //     case('I am such a loser'):
            //         newMessage={
            //             ...newMessage,
            //             _id: prev_message_id+1,
            //             text: 'No you are not'
            //         }
        
            // }
            // console.log(`${newMessage['_id']} -  ${newMessage['text']}`)
            setTimeout(()=> setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage)), 2000)
        }
        
        
      }, [])
      
     




    // console.log(userMessage)

   


    
    // console.log(`prev - ${prevLength}  new - ${messages.length} `)

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
            _id: 1,
            name:'Rohan',
            avatar:require('../../assets/Icon/user.png')
            }}
            
        />

    )
}

ChatBotScreen.navigationOption=()=>{
    return{
        header:null
    }
}



const styles = StyleSheet.create({
    container:{
        width:"100%"
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

export default ChatBotScreen;