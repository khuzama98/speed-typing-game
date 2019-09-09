import React from 'react';
import { createDrawerNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import * as Routes from './components';

const AuthNavigator = createStackNavigator({
    Home: {
        screen: Routes.Home
    },
    Signin: {
        screen: Routes.Signin
    },
    Signup: {
        screen: Routes.Signup
    }
},
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
)


const GameNavigator = createStackNavigator({
    Game: {
        screen: Routes.Game
    }
},
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
)

const MainNavigator = createSwitchNavigator({
    Auth: {
        screen: AuthNavigator
    },
    App: {
        screen: GameNavigator
    }
})

export default createAppContainer(MainNavigator)