import React, { Component } from 'react';
import Product from './Product';
import fetchJsonp from 'fetch-jsonp';
import './App.css';

class App extends Component {
  //Render: componentWillMount() -> render() -> componentDidMount()
  //Update: componentWillReceiveProps() -> shouldComponetUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()
  state = {}

  componentWillMount() {
    console.log('(1) will mount');
  }

  componentDidMount() {
    console.log('(3) did mount');
    this._getItems();
  }

  _callApi = () => {
    const url = 'https://event.ssg.com/event/getLeafItemIdsItemList.ssg?itemIds=1000021158816,1000023150825,1000017480115,1000024135227,2097000201672,1000022797673';

    return fetchJsonp(url, {
      jsonpCallback: 'callBack'
    })
    .then(response => response.json())
    .then(data => data.resultMsg)
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  _getItems = async() => {
    const items = await this._callApi();
    
    this.setState({
      items
    });
  }

  _renderItems = () => {
    const items = this.state.items.map((item, index) => {
      console.log(item);
      return <Product
        soldout={item.soldOutYn}
        name={item.itemNm}
        image={item.imgPath}
        price={item.price}
        link={item.lnkdUrl}
        key={item.itemId} />
    });
    return items;
  }

  render() {
    console.log('(2) render');
    return (
      <div className="App">
        <ul className="cunit_thmb_lst">
          {this.state.items ? this._renderItems() : 'Loading'}
        </ul>
      </div>
    );
  }
}

export default App;
