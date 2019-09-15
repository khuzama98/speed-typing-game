import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, KeyboardAvoidingView } from 'react-native';
import { H1, Item, Input, Container, Content, Button } from 'native-base'
import posed, { Transition } from 'react-native-pose';
import Layout from '../common/Layout'
import icon from '../../assets/speed.png'
import * as Font from 'expo-font';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            isloaded: false
        };
    }
    //CaviarDreams
    async componentDidMount() {
        await Font.loadAsync({
            'CaviarDreams': require('../../assets/fonts/Caviar_Dreams_Bold.ttf'),
        });
        this.setState({ isloaded: true })
        setTimeout(() => {
            this.setState({ isVisible: true })
        }, 100)
    }

    render() {
        const Box = posed.View({
            enter: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 50 }
        });
        const { isVisible } = this.state;
        return (
            <Layout>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }} >
                    <View style={{ flex: 0.6, alignItems: "flex-end", justifyContent: "center" }} >
                        <Transition>
                            {isVisible && <Box key="a" style={{ alignSelf: "center" }} >
                                <Image source={icon} style={{ alignSelf: "center", height: 60, width: 60 }} />
                                {this.state.isloaded ? <H1 style={{ fontFamily: 'CaviarDreams', color: "white", alignSelf: "center", marginVertical: 20 }} >SPEED TYPING GAME</H1> : null}
                            </Box>}
                        </Transition>
                    </View>
                    <Transition>
                        {isVisible && <Box key="b" style={{ paddingHorizontal: 10 }} >
                            <Button block onPress={() => this.props.navigation.navigate("Signin")} style={{ marginHorizontal: 30, marginBottom: 20, backgroundColor: "white", elevation: 0, opacity: 0.8 }} >
                                <Text style={{ color: "black", fontFamily: 'CaviarDreams' }} >SIGNIN</Text>
                            </Button>
                            <Button block onPress={() => this.props.navigation.navigate("Signup")} style={{ marginHorizontal: 30, backgroundColor: "white", elevation: 0, opacity: 0.8 }} >
                                <Text style={{ color: "black", fontFamily: 'CaviarDreams' }} >SIGNUP</Text>
                            </Button>
                        </Box>}
                    </Transition>
                </KeyboardAvoidingView>
            </Layout>
        );
    }
}

export default Home;
