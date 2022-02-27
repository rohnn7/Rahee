import React, {useContext,useState, useEffect, useRef } from 'react'
import {View,  StyleSheet} from 'react-native'
import {Button, Text} from 'react-native-elements'
import {connect} from 'react-redux'
import {SafeAreaView, withNavigationFocus} from 'react-navigation'
import * as actions from '../store/actions/actions'
import * as Notifications from 'expo-notifications'


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

const TestScreen = (props) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [flag, setFlag] = useState(0)

    const onNotification = async ()=>{
        const sub=  await schedulePushNotification()
    }


    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, [flag]);
    return (
        <SafeAreaView>
            <View>

                <Text h3>{props.counter}</Text>
                <Text h3>{expoPushToken}</Text>
                <Button title='Increment' onPress={props.onIncrement}  />
                
                <Button title='Notification' onPress={async ()=>{await schedulePushNotification()}}  />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

const mapStateToProps=state=>{
    return{
        counter:state.main.counter,
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onIncrement: ()=>dispatch(actions.onIncrement()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);