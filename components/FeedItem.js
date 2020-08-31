//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking} from 'react-native';

// create a component
class FeedItem extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    readMore = () =>{
        const { item: { url } } = this.props
        Linking.openURL(url)
        .catch(error =>{
            console.log('loi'+ error)
        })
    }
    render() {
        const { item: { title, urlToImage, description, url, publishedAt } } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.txtTitle}>{title}</Text>
                <Image source={{ uri: urlToImage }} style={styles.img} />
                <Text style={styles.txtDescription} >{description}</Text>
                
                <TouchableOpacity style={styles.button} onPress={() =>this.readMore()}>
                    <Text style={styles.textButton}>Read more</Text>
                </TouchableOpacity>                
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal:15,
        paddingVertical:10,
        flexDirection:'column',
        backgroundColor:'gainsboro',
        borderRadius:5,
        marginBottom:20,
        justifyContent:'center',
    },
    img: {
        width: 310,
        height: 200,
    },
    button:{
        backgroundColor:'blue',
        paddingHorizontal:15,
        paddingVertical:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
    },
    textButton:{
        fontSize:20,
        color:'white',
        fontWeight:'600',
    },
    txtTitle:{
        fontSize:18,
        fontWeight:'bold',
        paddingBottom:15,
    },
    txtDescription:{
        paddingBottom:15,
        paddingTop:10,
    },

});

//make this component available to the app
export default FeedItem;
