import React from 'react';
import Raindrop from './components/Raindrop';
import Default from './components/Default';
import Firebase from 'firebase/app';
import 'firebase/firestore';
import { Spin } from 'antd';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { beginShowingPhotos: null };
  }

  componentDidMount() {
    const db = Firebase.firestore();
    const currentBookendRef = db.collection('bookends').doc('current');

    currentBookendRef.onSnapshot((doc) => {
      const bookend = doc.data().bookend;
      const beginShowingPhotos = (bookend === 'start');
      this.setState({ beginShowingPhotos: beginShowingPhotos });
    });
  }

  render() {
    const { beginShowingPhotos } = this.state;

    let view;
    if (beginShowingPhotos === null) {
      view = <Spin size='large' />;
    } else {
      view = beginShowingPhotos ? <Raindrop /> : <Default />;
    }

    return (
      <div className="app">
        {view}
      </div>
    );
  }
}

export default App;
