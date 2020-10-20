import React from 'react';

class Dog extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      url: ''
    }
    this.fetchDog = this.fetchDog.bind(this);
    this.alertBreed = this.alertBreed.bind(this);
  }

  async fetchDog() {
    this.setState({loading: true}, async () => { 
      const requestReturn = await fetch('https://dog.ceo/api/breeds/image/random')
      const requestObject = await requestReturn.json()
      this.setState({
        loading: false,
        url: requestObject.message
      })
    })
  }

  alertBreed() {
    const { url } = this.state;
    const breed = url.split('/')[4];
    alert(breed)
  }

  shouldComponentUpdate() {
    const { url } = this.state;
    const isTerrier = url.includes('terrier');
    return !isTerrier;

  }

  componentDidUpdate(prevProps, prevState) {
    const { url } = prevState;
    localStorage.setItem('url', url);
    // const breed = url.split('/')[4];
    // alert(breed);
    this.alertBreed()
  }

  componentDidMount() {
    this.fetchDog();
  }

  render() {
    return (
      <div>
        <h1>Dog</h1>
        {this.state.loading ? <p>Loading...</p> : <img src={this.state.url} alt="dog" />}<br />
        <button onClick={this.fetchDog}>Mudar cachorro</button>
      </div>
    )
  }
}

export default Dog;