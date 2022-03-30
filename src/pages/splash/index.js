import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Logo} from '../../assets/'
import AsyncStorage from '@react-native-async-storage/async-storage';

class Splash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        // AsyncStorage.clear();
        try{
            const data = await AsyncStorage.getItem('user');
            console.log(data);
            if(data === null){
                setTimeout(() => this.props.navigation.replace('Login'),3000)
            }else{
                setTimeout(() => this.props.navigation.replace('MainApp'), 3000)
            }
        }catch(e){
            console.log(e);
        }
    }

    render(){
        return(
            <View style={styles.container}>
            <Logo/>
            <Text style={styles.label}>Peduli Diri</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#125DB1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 34,
        color: '#fff'
    }
})

export default Splash;

// import React, { Component } from 'react';
// import {View, StyleSheet} from 'react-native';

// class Index extends Component {
//     render() {
//         return (
//             <View>
                
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({})

// export default Index;

