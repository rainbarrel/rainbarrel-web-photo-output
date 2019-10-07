import React from 'react';
import Img from 'react-image';
import Firebase from 'firebase/app';
import 'firebase/firestore';

class Raindrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrlIndex: 0,
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/rainbarrel-dev.appspot.com/o/images%2Fgame.jpg?alt=media&token=bca4b15d-9c19-4e40-95bc-fa018a274085',
        'https://firebasestorage.googleapis.com/v0/b/rainbarrel-dev.appspot.com/o/images%2Fnick.png?alt=media&token=8b995dbb-1f78-474a-b9a4-d4682bbd89a5',
        'https://firebasestorage.googleapis.com/v0/b/rainbarrel-dev.appspot.com/o/images%2Fsnow.png?alt=media&token=2a4b4a60-12ed-4333-a678-8ed10dfaeac9'
      ],
      initial: true,
    }
  }

  componentDidMount() {
    const db = Firebase.firestore();
    const currentCommandRef = db.collection('commands').doc('current');

    currentCommandRef.onSnapshot((doc) => {
      const command = doc.data().command;
      const { imageUrlIndex, imageUrls, initial } = this.state;
      let newImageUrlIndex;

      if (!initial) {
        if (command === 'next') {
          newImageUrlIndex = imageUrlIndex + 1;

          if (this.outOfBounds(newImageUrlIndex)) {
            newImageUrlIndex = 0;
          }
        } else if (command === 'previous') {
          newImageUrlIndex = imageUrlIndex - 1;

          if (this.outOfBounds(newImageUrlIndex)) {
            newImageUrlIndex = imageUrls.length - 1;
          }
        }

        this.setState({ imageUrlIndex: newImageUrlIndex });
      } else {
        this.setState({ initial: false });
      }
    });
  }

  outOfBounds(imageUrlIndex) {
    const { imageUrls } = this.state;
    return (imageUrlIndex === imageUrls.length || imageUrlIndex < 0);
  }

  render() {
    const { imageUrlIndex, imageUrls } = this.state;

    return (
      <Img src={imageUrls[imageUrlIndex]} />
    );
  }
};

export default Raindrop;
