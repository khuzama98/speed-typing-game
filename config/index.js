import Axios from "react-native-axios";

const registerUser = (username, password) => {
    return new Promise((resolve, reject) => {
        const credentials = {
            username,
            password
        }
        console.log(credentials);
        fetch('https://type-game.herokuapp.com/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then((res) => res.json())
            .then((res) => resolve(res))
            .catch((e) => reject({ message: e.message }))
    })
}

const UserSignin = (username, password) => {
    return new Promise((resolve, reject) => {
        const credentials = {
            username,
            password
        }
        console.log(credentials);
        fetch('https://type-game.herokuapp.com/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then((res) => res.json())
            .then((res) => resolve(res))
            .catch((e) => reject({ message: e.message }))
    })
}

export {
    registerUser,
    UserSignin
}