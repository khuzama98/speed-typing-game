import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { H1, Item, Input, Button, Spinner } from 'native-base';
import { AsyncStorage } from 'react-native';
import Layout from '../common/Layout'
import * as Font from 'expo-font';
import { setScore } from '../../config'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'CaviarDreams': require('../../assets/fonts/Caviar_Dreams_Bold.ttf'),
        });
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
            const username = JSON.parse(value)
            console.log(value);
        }
        const score = this.props.navigation.state.params.score;
        const difficulty = this.props.navigation.state.params.difficulty;
        this.setState({ score, difficulty })
    }

    setScore = async (username, score, difficulty) => {
        try {
            let result = await setScore(username, score, difficulty);
            console.log(result)
        }
        catch (e) {
            console.log(e)
            Alert.alert(
                'Error',
                `${e.message}`
            );
        }
    }

    render() {
        return (
            <Layout>
                <View style={{ flex: 0.4, alignItems: "center", justifyContent: "center" }} >
                    <H1 style={{ color: "white", fontFamily: "CaviarDreams" }} >Result</H1>
                </View>
                <View style={{ flex: 0.4 }} >
                    <Text style={{ color: "white", fontFamily: "CaviarDreams", fontSize: 20, alignSelf: "center" }} >Score: {this.state.score}</Text>
                    <Text style={{ color: "white", fontFamily: "CaviarDreams", fontSize: 20, alignSelf: "center" }} >Difficulty: Easy</Text>
                    <Button block onPress={() => this.props.navigation.navigate("Game")} style={{ marginHorizontal: 30, marginVertical: 20, backgroundColor: "white", elevation: 0, opacity: 0.8, marginBottom: 15 }} >
                        <Text style={{ color: "black", fontFamily: 'CaviarDreams' }} >Home</Text>
                    </Button>
                </View>
            </Layout>
        );
    }
}

export default index;
