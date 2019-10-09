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
        'https://firebasestorage.googleapis.com/v0/b/rainbarrel-dev.appspot.com/o/images%2Fyoga.GIF?alt=media&token=1da9c88a-ebfe-45eb-9aaf-c2a13116746e',
        'https://firebasestorage.googleapis.com/v0/b/rainbarrel-dev.appspot.com/o/images%2Fsnow.png?alt=media&token=2a4b4a60-12ed-4333-a678-8ed10dfaeac9',
        'https://firebasestorage.googleapis.com/v0/b/rainbarrel-dev.appspot.com/o/images%2Fmckay.jpg?alt=media&token=e743ef3b-ea0d-4099-ad41-4a5ef0c28ff4'
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
