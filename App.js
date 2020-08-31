//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import FeedItem from './components/FeedItem';

const url2 = 'https://samples.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02'
const url3 = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe&page=${page}'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listArticles: [],
      isLoading: false,
      page: 1,
      isRefresh: false,
    }
  }
  componentDidMount = () => {
    console.log('componentDidMount ....')
    this.setState({
      isLoading: true
    })
    this.getData(this.state.page);
  }
  getData = async page => {
    await setTimeout(() => { }, 2000)
    axios.get(url3)
      .then(response => {
        const result = response.data
        console.log(result)
        this.setState({
          page: page,
          isLoading: false,
          isRefresh: false,
          listArticles: this.state.listArticles.concat(result.articles)
        })
      })
      .catch(error => console.log(error))
  }
  renderItem = ({ item }) => {
    return (
      <FeedItem item={item} />
    )
  }
  onEndReached = () => {
    console.log('....END...')
    const newPage = this.state.page + 1;
    this.setState({ page: newPage })
    this.getData(newPage)
  }
  onRefresh = () => {
    console.log('...refresh...');
    const newPage = 1;
    this.setState({
      isRefresh: true,
      listArticles: [],
      page: newPage,
    })
    setTimeout(() => {
      this.getData(newPage);
    }, 1000);


  }

  renderFooter = () => {
    if (!this.state.isRefresh) {
      return (
        <ActivityIndicator size='large' color='gray' animating={true} />
      )
    }
  }

  render() {
    console.log('render')
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' color='red' animating={this.state.isLoading} />
        </View>
      )
    }
    return (
      <FlatList style={styles.list}
        data={this.state.listArticles}
        renderItem={this.renderItem}
        onEndReached={this.onEndReached}                // cuối flatlist
        onEndReachedThreshold={0.1}                    // kc gần cuối
        ListFooterComponent={this.renderFooter()}     //kéo xuống dưới cùng 
        onRefresh={this.onRefresh}                      //refresh
        refreshing={this.state.isRefresh}
      />
    )

  }
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 10,


  }
});