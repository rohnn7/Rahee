import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { configureStore } from './src/store/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createSwitchNavigator } from '@react-navigation/compat'
import TestScreen from './src/screen/TestScreen';
import {setNavigator} from './navigationRef'
import SigninScreen from './src/screen/SigninScreen';
import SignupScreen from './src/screen/SignupScreen';
import AnalysisScreen from './src/screen/Analysis';
import ChatBotScreen from './src/screen/ChatBotScreen';
import AccountScreen from './src/screen/AccountScreen';
import Icon from 'react-native-vector-icons/FontAwesome'

const initialState = global.window && global.window.__INITIAL_STATE__ 
const store = configureStore(initialState);
const BottomTab = createBottomTabNavigator()
const Stack = createStackNavigator()

const mainFlow = ()=>(
  <BottomTab.Navigator  
    screenOptions={{
      tabBarShowLabel:false,
      tabBarStyle:{
        position:'absolute',
        bottom:0,
        left:10,
        right:10,
        elevation:4,

        backgroundColor:'#ffffff',
        borderRadius:15,
        height:70,
        shadowColor:'black',
        shadowOffset:{
          width:0,
          height:10
        },
        shadowOpacity:0.25,
        shadowRadius: 3.5
      }
    }}
  >
    <BottomTab.Screen name='Analysis' 
                      component={AnalysisScreen} 
                      options={{
                        tabBarIcon:({focused})=>(
                          <View style={{alignItems:'center', justifyContent:'center', top:1}} >
                            <Image 
                              source={require('../CodeUtsav/assets/Icon/pie-chart.png')}
                              resizeModel='Contain'
                              style = {{
                                width:25,
                                height:25,
                                tintColor: focused?'#34eb9b':'black'
                              }} />
                              <Text style={{fontSize:12, color:focused?'#34eb9b':'black'}} >Analytics</Text>
                          </View>
                        ),
                        title:'Report',
                        headerStyle: {
                          backgroundColor: '#34eb9b',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                          fontWeight: 'bold',

                        },

                        headerTitleAlign:'center'
                      }}/>
      <BottomTab.Screen name='Chat' 
                      component={ChatBotScreen} 
                      options={{
                        tabBarIcon:({focused})=>(
                          <View style={{alignItems:'center', justifyContent:'center', top:1}} >
                            <Image 
                              source={require('../CodeUtsav/assets/Icon/chat.png')}
                              resizeModel='Contain'
                              style = {{
                                width:25,
                                height:25,
                                tintColor: focused?'#34eb9b':'black'
                              }} />
                              <Text style={{fontSize:12, color:focused?'#34eb9b':'black'}} >Let's Talk</Text>
                          </View>
                        ),
                        title:'Jarvis',
                        headerStyle: {
                          backgroundColor: '#34eb9b',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                          fontWeight: 'bold',
                          
                        },
                        headerTitleAlign:'center',
                        headerLeft:()=>(
                          <Image 
                          source={require('../CodeUtsav/assets/Icon/man.png')}
                          resizeModel='Contain'
                          style = {{
                            width:45,
                            height:45,
                            marginLeft:20
                          }} />
                        ),
                        
                        tabBarStyle:{display:'none'}
                      }}/>
    <BottomTab.Screen name='Account' component={TestScreen}
                                  options={{
                                    tabBarIcon:({focused})=>(
                                      <View style={{alignItems:'center', justifyContent:'center', top:1}} >
                                        <Image 
                                          source={require('../CodeUtsav/assets/Icon/user.png')}
                                          resizeModel='Contain'
                                          style = {{
                                            width:25,
                                            height:25,
                                            tintColor: focused?'#34eb9b':'black'
                                          }} />
                                          <Text style={{fontSize:12, color:focused?'#34eb9b':'black'}} >Account</Text>
                                      </View>
                                    )
                                  }} />
  </BottomTab.Navigator>
)


const SigninFlow = ()=>(
  <Stack.Navigator>
    <Stack.Screen name='Sign up' component={SignupScreen} />
    <Stack.Screen name='Sign in' component={SigninScreen} />
  </Stack.Navigator>
)


const ContainerFlow = createSwitchNavigator({
  signinFlow: SigninFlow,
  mainFlow:mainFlow
})

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={(navigator)=>{setNavigator(navigator)}} >
        <ContainerFlow/>
      </NavigationContainer>
    </Provider>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
