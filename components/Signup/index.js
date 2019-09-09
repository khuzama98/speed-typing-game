import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, Alert } from 'react-native';
import { H1, Item, Input, Button, Spinner } from 'native-base'
import Layout from '../common/Layout'
import * as Font from 'expo-font';
import { registerUser } from '../../config'

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
        this.setState({ isRequest: true })
        const { username, password } = this.state;

        if (!username.trim() || !password.trim()) {
            Alert.alert(
                'Error',
                `Please enter Username & Password!`
            );
        }
        else {
            try {
                let result = await registerUser(username, password);
                console.log('result ==>', result)
                !!result.success ? this.props.navigation.navigate("Game") : Alert.alert(
                    'Error',
                    `${result.message}`
                );
            }
            catch (e) {
                console.log('e ==>', e)
                Alert.alert(
                    'Error',
                    `${e.message}`
                );
            }
            finally {
                this.setState({ isRequest: false })
            }
        }
    }

    render() {
        return (
            <Layout>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }} >
                    <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }} >
                        {!!this.state.isloaded ? <H1 style={{ fontFamily: 'CaviarDreams', color: "white" }} >SIGNUP</H1> : null}
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
                                        <Text style={{ fontFamily: 'CaviarDreams' }} >SIGNUP</Text>
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
