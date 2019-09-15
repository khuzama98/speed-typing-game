import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'

class Goback extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress()} style={{ position: "absolute", top: 0, left: 0, marginTop: 35, marginLeft: 20 }} >
                <AntDesign name="arrowleft" size={30} color="white" />
            </TouchableOpacity>
        );
    }
}

export default Goback;
