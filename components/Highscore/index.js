import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Image, Text, Alert } from 'react-native';
import { H1, Container, Header, Left, Body, Icon, Title, Button, Tab, Tabs, Spinner } from 'native-base'
import Layout from '../common/Layout'
import * as Font from 'expo-font';
import icon from '../../assets/logo.png'
import BackButton from '../common/Goback'


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
        // this.setState({ isloaded: true })
    }

    render() {
        return (
            <Container style={{ backgroundColor: "#3d5aad" }} >
                <Header hasTabs style={{ marginTop: 25, paddingBottom: 10, }} >
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()} >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 22, color: "white", fontFamily: "CaviarDreams" }}>HighScores</Text>
                    </Body>
                </Header>
                <Tabs>
                    <Tab heading="Easy">
                        <Text>No Data Found</Text>
                    </Tab>
                    <Tab heading="Medium">
                        <Text>No Data Found</Text>
                    </Tab>
                    <Tab heading="Hard">
                        <Text>No Data Found</Text>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default index;
