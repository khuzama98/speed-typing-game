import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Image, Text, Alert } from 'react-native';
import { H1, Item, Input, Button, Spinner } from 'native-base'
import Layout from '../common/Layout'
import * as Font from 'expo-font';
import icon from '../../assets/logo.png'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            isloaded: false
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'CaviarDreams': require('../../assets/fonts/Caviar_Dreams_Bold.ttf'),
        });
        this.setState({ isloaded: true })
    }

    render() {
        return (
            <Layout>
                <Button rounded bordered style={{ position: "absolute", top: 0, right: 0, marginTop: 35, marginRight: 15, paddingHorizontal: 20, borderColor: "white" }} >
                    <Text style={{ color: "white", fontFamily: 'CaviarDreams' }} >Logout</Text>
                </Button>
                <View style={{ flex: 0.6, alignItems: "flex-end", justifyContent: "center" }} >
                    <Image source={icon} style={{ alignSelf: "center" }} />
                    {this.state.isloaded ? <H1 style={{ fontFamily: 'CaviarDreams', color: "white", alignSelf: "center", marginVertical: 20 }} >SPEED TYPING GAME</H1> : null}
                </View>
                <Button block style={{ marginHorizontal: 30, backgroundColor: "white", elevation: 0, opacity: 0.8, marginBottom: 15, }} >
                    <Text style={{ color: "black", fontFamily: 'CaviarDreams' }} >START GAME</Text>
                </Button>
                <Button block style={{ marginHorizontal: 30, backgroundColor: "white", elevation: 0, opacity: 0.8, marginBottom: 15 }} >
                    <Text style={{ color: "black", fontFamily: 'CaviarDreams' }} >HIGH SCORES</Text>
                </Button>
                <Button block style={{ marginHorizontal: 30, backgroundColor: "white", elevation: 0, opacity: 0.8 }} >
                    <Text style={{ color: "black", fontFamily: 'CaviarDreams' }} >INSTRUCTIONS</Text>
                </Button>
            </Layout>
        );
    }
}

export default index;
