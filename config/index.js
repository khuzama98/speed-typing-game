import Axios from "react-native-axios";

const BASE_URL = "https://type-game.herokuapp.com";

const registerUser = (username, password) => {
    return new Promise((resolve, reject) => {
        const credentials = {
            username,
            password
        }
        console.log(credentials);
        fetch(`${BASE_URL}/users/signup`, {
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
        fetch(`${BASE_URL}/users/signin`, {
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

const getWords = (level) => {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}/words/get/${level}`)
            .then((res) => res.json())
            .then((res) => resolve(res))
            .catch((e) => reject({ message: e.message }))
    })
}

const setScore = (username, score, difficulty) => {
    return new Promise((resolve, reject) => {
        const data = {
            username,
            score,
            difficulty
        }
        fetch(`${BASE_URL}/score/insert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((res) => resolve(res))
            .catch((e) => reject({ message: e.message }))
    })
}

export {
    registerUser,
    UserSignin,
    getWords,
    setScore
}