import React, { Component } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import backVector from '../../assets/typo.png'

class Layout extends Component {
    render() {
        return (
            <ImageBackground source={require("../../assets/bg-crop.png")} style={{ flex: 1, position: "relative" }} >
                <Image source={backVector} style={{ position: "absolute", bottom: 0, right: -9 }} />
                {this.props.children}
            </ImageBackground>
        );
    }
}

export default Layout;
