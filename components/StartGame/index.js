import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Text, Alert } from 'react-native';
import { H1, Item, Input, Button, Spinner } from 'native-base'
import Layout from '../common/Layout'
import * as Font from 'expo-font';
import posed, { Transition } from 'react-native-pose';
import Timer from './Timer'
import { getWords } from '../../config'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            isLoading: true,
            index: 0,
            questions: [],
            isOpen: false,
            text: "",
            score: 0
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'CaviarDreams': require('../../assets/fonts/Caviar_Dreams_Bold.ttf'),
        });
        const level = this.props.navigation.state.params.level;
        console.log('props ==>', level)
        if (level === "easy") {
            this.setState({ time: 12, toSet: 12 })
        }
        else if (level === "medium") {
            this.setState({ time: 9, toSet: 9 })
        }
        else {
            this.setState({ time: 7, toSet: 7, difficulty: level })
        }
        try {
            let result = await getWords(level)
            console.log('result ==>', result)
            let questions = result.data.map(item => {
                return (
                    <H1 style={{ fontFamily: "CaviarDreams", color: "white" }} >{item.word}</H1>
                )
            })
            this.setState({ isLoading: false, questions, toCompare: result.data })
        }
        catch (e) {
            console.log('e ==>', e)
            Alert.alert(
                'Error',
                `${e.message}`
            );
            this.setState({ isLoading: false })
        }
    }

    setTime = () => {
        const { time, index, questions, toSet } = this.state;
        // console.log('sec ==>', sec)
        if (time !== 0) {
            this.setState({
                time: time - 1
            })
        }
        else if (time === 0 && index === questions.length - 1) {
            this.props.navigation.navigate("Result", { score: this.state.score, difficulty: this.state.difficulty })
        }
        else if (time === 0) {
            this.setState({ index: index + 1, time: toSet })
        }

    }

    handleChange = (text, name) => {
        const { questions, index, score, toSet, toCompare } = this.state;
        console.log('text ==>', text)
        console.log('questions[index].toLowerCase() ==>', toCompare.length)
        console.log('index', index)
        this.setState({ text: text })
        if (toCompare[index].word.toLowerCase() === text.toLowerCase()) {
            this.setState({ score: score + 1, index: index + 1, time: toSet }, () => {
                this.setState({ text: "" })
                if (index >= toCompare.length - 1) {
                    console.log('chala')
                    this.props.navigation.navigate("Result", { score: score, difficulty: this.state.difficulty })
                }
            })
        }

        // else {
        // console.log('set')
        // }
    }

    render() {
        const { time, isLoading, questions, index, text } = this.state;
        return (
            <Layout>
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, alignItems: "center" }} >
                    {
                        !!isLoading
                            ?
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
                                <Spinner color="white" />
                            </View>
                            :
                            <>
                                <Timer sec={time} setTime={this.setTime} />
                                <View style={{ flex: 0.6, alignItems: "flex-end", justifyContent: "center" }} >
                                    {index !== questions.length ? questions[index] : null}
                                </View>
                                {/* <View style={{ flex: 0.4 }} > */}
                                <Item rounded style={{ paddingHorizontal: 10, marginBottom: 20 }} >
                                    <Input placeholder='Type Here...' value={text} onChangeText={(e) => this.handleChange(e, 'text')} placeholderTextColor="white" style={{ color: "white" }} />
                                </Item>
                                {/* </View> */}
                            </>
                    }
                </KeyboardAvoidingView>
            </Layout>
        );
    }
}

export default index;
