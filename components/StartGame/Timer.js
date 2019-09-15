import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Font from 'expo-font';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sec: 0,
            min: 0,
            isSet: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (state.sec !== props.sec) {
            // console.log('timer ==>', props)
            return {
                sec: props.sec,
            }
        }
        return false
    }

    async componentDidMount() {
        await Font.loadAsync({
            'CaviarDreams': require('../../assets/fonts/Caviar_Dreams_Bold.ttf'),
        });
    }


    // time = () => {
    //     const { sec, min } = this.state;
    //     // console.log('sec ==>', sec)
    //     if (sec !== 0) {
    //         this.setState({
    //             sec: sec - 1
    //         })
    //     }

    // }

    componentDidMount() {
        const timer = setInterval(() => this.props.setTime(), 1000)
        this.setState({
            timer
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
        // this.props.getTime(this.state.min, this.state.sec)
    }

    render() {
        const { sec, min } = this.state;
        // console.log(this.props.getTime)
        const toDisplaySec = sec < 10 ? '0' + sec : sec
        const toDisplayMin = min < 10 ? '0' + min : min
        const isDanger = sec < 4 ? { color: "red" } : {}
        return (
            <Text style={{ color: "white", fontFamily: "CaviarDreams", position: "absolute", top: 0, right: 0, marginTop: 35, marginRight: 20, ...isDanger }} > {toDisplayMin}:{toDisplaySec} </Text>
        );
    }
}

export default Timer;
