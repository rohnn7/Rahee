import React, {useContext, useState, useRef, useEffect} from 'react'
import {View,  StyleSheet, TouchableOpacity, TextInput, Dimensions, ScrollView} from 'react-native'
import {Text, Input, Button} from 'react-native-elements'
import Spacer from '../components/spacer'
import { NavigationEvents } from 'react-navigation'
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import SelectDropdown from 'react-native-select-dropdown'
import Constants from 'expo-constants';
import * as actions from '../store/actions/actions'
import {connect} from 'react-redux'
import {server,sensorKey} from '../../server'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

const BACKGROUND_FETCH_TASK = 'background-fetch';

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    try{
        fetch(server+'/get_instantenous_data/'+sensorKey+'/',{
            method:"POST",
            headers:{"Content-Type":"application/json; charset=UTF-8"}            
        }).then(
            response=>response.json()
        ).then(
            async data=>{
                console.log(data)
                if(data['alert']===true){
                    await schedulePushNotification('Do you wanna talk?', 'Let us sort things out')
                }
            }
        )
    }catch{

    }
});

// 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 1, // 5 seconds
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }
  
// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

Notifications.setNotificationHandler({
handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
}),
});  


const createNewArrayFromObjectKey = (arr, key) =>{

    if(Array.isArray(arr)){
        var newArr = arr.map(element=>{
            return element[key]
        })
    
        return newArr;
    }

    return null;

} 

const AnalysisScreen = ({navigation, user}) => {
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isRegistered, setIsRegistered] = React.useState(false);
    const [status, setStatus] = React.useState(null);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [choice, seChoice] = useState('hourly')
    const [data, setData] = useState([])
    const [stressIndex, setStressIndex] = useState(0)
    const [depressionIndex, setDepressionIndex] = useState(0)
    

    let interval = null
    useEffect(() => {
        registerBackgroundFetchAsync()

        interval =   setInterval(()=>{
            fetch(server+'/get_series_data/'+sensorKey+'/300/5/',{
                method:"POST",
                headers:{"Content-Type":"application/json; charset=UTF-8"}            
            }).then(
                response=>response.json()
            ).then(
                async data=>{
                    // console.log(data['data_arr'][0])
                    setData([...data['data_arr']])
                    setDepressionIndex(data['data_arr'][0]['depression_index'])
                    setStressIndex(data['data_arr'][0]['stress_index'])
                }
            )
        }, 5000)



        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
        
        checkStatusAsync()

        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        //   clearInterval(interval)
        };
      }, []);


    const checkStatusAsync = async () => {
        const status = await BackgroundFetch.getStatusAsync();
        const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
        console.log(isRegistered)
        setStatus(status);
        setIsRegistered(isRegistered);
    };

    const toggleFetchTask = async () => {
        if (isRegistered) {
            await unregisterBackgroundFetchAsync();
        } else {
            await registerBackgroundFetchAsync();
        }

        checkStatusAsync();
    };

    const signin = ()=>{
        if(email === 'vrohanrv7@gmail.com' && password === 'password'){
            navigation.navigate('mainFlow')
        }else{
            setErrorMessage('Username or password do not match')
        }
    }

    const commitsData = [
        {  count: 1 },
        {  count: 2 },
        {  count: 3 },
        {  count: 4 },
        {  count: 5 },
        {  count: 2 },
        {  count: 3 },
        {  count: 2 },
        {  count: 4 },
        {  count: 2 },
        {  count: 4 }
      ];
     const choices = ['hourly', 'daily', 'weekly', 'monthly']

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.dropDownContainer} >
                    <SelectDropdown
                        data={choices}
                        onSelect={(selectedItem, index)=>{
                            console.log(selectedItem, index)
                        }}
                    />

                </View>

                <View style={styles.chartContainer} >
                    <Text style={styles.chartTitle}>Depression Index: {depressionIndex/100}</Text>
                </View>

                <View style={styles.chartContainer} >
                    <Text style={styles.chartTitle}>Depression Index</Text>
                    {data.length>1?(
                        <LineChart
                        data={{
                        labels: ["3", "4", "5", "6", "7", "8",'9'],
                        datasets: [
                            {
                            data: createNewArrayFromObjectKey(data,'depression_index').slice(7)
                            }
                        ]
                        }}
                        width={(Dimensions.get("window").width)*0.9 } // from react-native
                        height={220}
                        yAxisInterval={1} // optional, defaults to 1
                        xAxisLabel='PM'
                        chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 0.8) => `rgba(245, 40, 145, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "3",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                        }}
                        bezier
                        style={{
                        marginVertical: 8,
                        borderRadius: 16
                        }}d
                />
                    ):null}
                </View>

                <View style={styles.chartContainer} >
                    <Text style={styles.chartTitle}>Stress Index: {stressIndex}</Text>
                </View>
               
                <View style={styles.chartContainer} >
                    <Text style={styles.chartTitle}>Stress Index</Text>
                    {data.length>1?(
                        <LineChart
                        data={{
                        labels: ["3", "4", "5", "6", "7", "8",'9'],
                        datasets: [
                            {
                            data: createNewArrayFromObjectKey(data, 'stress_index')
                            }
                        ]
                        }}
                        width={(Dimensions.get("window").width)*0.9 } // from react-native
                        height={220}
                        yAxisInterval={1} // optional, defaults to 1
                        xAxisLabel='AM'
                        chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 0.8) => `rgba(245, 40, 145, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "3",
                            strokeWidth: "2",
                            stroke: "#ffa726",
                        }
                        }}
                        bezier
                        style={{
                        marginVertical: 8,
                        borderRadius: 16
                        }}d
                />
                    ):null}

                <View style={styles.chartContainer} >
                    <Text style={styles.chartTitle}>Mood: {stressIndex===2?'Happy':null}</Text>
                    <Text style={styles.chartTitle}>Mood: {stressIndex===0?'Baseline':null}</Text>
                    <Text style={styles.chartTitle}>Mood: {stressIndex===1?'Stressed':null}</Text>
                </View>
                    
                </View>
                <Spacer/>
                <Spacer/>
                <Spacer/>
                


            </ScrollView>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:'100%',
        height:'100%'
    },
    text:{
        color:'#a83244'
    },
    login:{
        color:'blue'
    },
    chartContainer:{
        alignItems:'center',
        marginTop:30
    },
    chartTitle:{
        fontWeight:'bold',
        fontSize:14
    },
    dropDownContainer:{
        marginTop:25,
        alignItems:'center',
        borderRadius:5
    }
})

async function schedulePushNotification(title, body) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
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
        user:state.main.userdata,
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onRegister: (userdata)=>dispatch(actions.register(userdata)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisScreen);