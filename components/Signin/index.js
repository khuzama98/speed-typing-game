import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, Alert } from 'react-native';
import { H1, Item, Input, Button, Spinner } from 'native-base';
import { AsyncStorage } from 'react-native';
import Layout from '../common/Layout'
import * as Font from 'expo-font';
import { UserSignin } from '../../config'
import BackButton from '../common/Goback'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isRequest: false,
            isloaded: false
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'CaviarDreams': require('../../assets/fonts/Caviar_Dreams_Bold.ttf'),
        });
        this.setState({ isloaded: true })
    }


    handleChange = (e, name) => {
        console.log(e)
        this.setState({ [name]: e })
    }

    handleClick = async () => {
        const { username, password } = this.state;

        if (!username.trim() || !password.trim()) {
            Alert.alert(
                'Error',
                `Please enter Username & Password!`
            );
        }
        else {
            this.setState({ isRequest: true })
            try {
                let result = await UserSignin(username, password);
                console.log('result ==>', result)
                if (!!result.success) {
                    await AsyncStorage.setItem("user", JSON.stringify(username))
                    this.props.navigation.navigate("Game")
                }
                else {
                    Alert.alert(
                        'Error',
                        `${result.message}`
                    );
                    this.setState({ isRequest: false })
                }
            }
            catch (e) {
                console.log('e ==>', e)
                Alert.alert(
                    'Error',
                    `${e.message}`
                );
                this.setState({ isRequest: false })
            }
        }

    }

    goToPreviousScreen = () => {
        this.props.navigation.goBack();
    }


    render() {
        return (
            <Layout>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }} >
                    <BackButton onPress={this.goToPreviousScreen} />
                    <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }} >
                        {!!this.state.isloaded ? <H1 style={{ fontFamily: 'CaviarDreams', color: "white" }} >SIGNIN</H1> : null}
                    </View>
                    <View style={{ paddingHorizontal: 20, justifyContent: "center" }} >
                        {
                            !!this.state.isRequest
                                ?
                                <Spinner color="white" />
                                :
                                <>
                                    <Item rounded style={{ paddingHorizontal: 10, marginBottom: 20 }} >
                                        <Input placeholder='Username' onChangeText={(e) => this.handleChange(e, 'username')} placeholderTextColor="white" style={{ color: "white" }} />
                                    </Item>
                                    <Item rounded style={{ paddingHorizontal: 10, marginBottom: 30 }} >
                                        <Input placeholder='Password' onChangeText={(e) => this.handleChange(e, 'password')} secureTextEntry={true} placeholderTextColor="white" style={{ color: "white" }} />
                                    </Item>
                                    <Button bordered block onPress={() => this.handleClick()} style={{ backgroundColor: "white", marginHorizontal: 70, opacity: 0.8 }} >
                                        <Text style={{ fontFamily: 'CaviarDreams' }} >SIGNIN</Text>
                                    </Button>
                                </>
                        }
                    </View>
                </KeyboardAvoidingView>
            </Layout>

        );
    }
}

export default index;
