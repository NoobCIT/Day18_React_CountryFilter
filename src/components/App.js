import React, { Component } from 'react';

class Loading extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: 'Loading',
    }
  }

  componentDidMount() {
    const stopper = 'Loading...'
    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState({ text: 'Loading' })
        : this.setState((prevState) => ({
          text: prevState.text + '.'
        }))
    }, 300)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div className='loading'>
        {this.state.text}
      </div>
    )
  }
}

function ShowCountries(props) {
  return (
    <div>
      {props.list.filter((country) => {
        let name = country.name.common;
        let nameFlag = true;

        let capital = country.capital[0];
        let capitalFlag = true;

        let region = country.region;
        let regionFlag = true;

        let subRegion = country.subregion;
        let subRegionFlag = true;

        for (let i = 0; i < props.byCountry.length; i++) {
          if (name[i].toLowerCase() !== props.byCountry[i].toLowerCase()) {
            nameFlag = false;
            break;
          }
        }

        for (let i = 0; i < props.byCapital.length; i++) {
          if (capital === undefined || capital.length === 0 ||
            capital[i].toLowerCase() !== props.byCapital[i].toLowerCase() ) {
            capitalFlag = false;
            break;
          }
        }

        for (let i = 0; i < props.byRegion.length; i++) {
          if (region === undefined || region.length === 0 ||
            region[i].toLowerCase() !== props.byRegion[i].toLowerCase() ) {
            regionFlag = false;
            break;
          }
        }

        for (let i = 0; i < props.bySubRegion.length; i++) {
          if (subRegion === undefined || subRegion.length === 0 ||
            subRegion[i].toLowerCase() !== props.bySubRegion[i].toLowerCase() ) {
            subRegionFlag = false;
            break;
          }
        }

        return nameFlag === true && capitalFlag === true
          && regionFlag === true && subRegionFlag === true;
      })
        .map((country) => (
        <ul className='row' key={(country.name.common)}>
          <li>{(country.name.common)}</li>
          <li>{(country.capital[0])}</li>
          <li>{(country.region)}</li>
          <li>{(country.subregion)}</li>
          <li>{(country.latlng[0])}</li>
          <li>{(country.latlng[1])}</li>
        </ul>
      )
    )}
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      countries: [],
      loading: true,
      byCountry: '',
      byCapital: '',
      byRegion: '',
      bySubRegion: '',
    }

    this.fetchData = this.fetchData.bind(this);
    this.handleInputByCountry = this.handleInputByCountry.bind(this);
    this.handleInputByCapital = this.handleInputByCapital.bind(this);
    this.handleInputByRegion = this.handleInputByRegion.bind(this);
    this.handleInputBySubRegion = this.handleInputBySubRegion.bind(this);
  }

  handleInputByCountry(event) {
    const input = event.target.value;
    this.setState({
      byCountry: input,
    })
  }

  handleInputByCapital(event) {
    const input = event.target.value;
    this.setState({
      byCapital: input,
    })
  }

  handleInputByRegion(event) {
    const input = event.target.value;
    this.setState({
      byRegion: input,
    })
  }

  handleInputBySubRegion(event) {
    const input = event.target.value;
    this.setState({
      bySubRegion: input,
    })
  }

  componentDidMount() {
    const URL = 'https://raw.githubusercontent.com/mledoze/countries/master/countries.json';
    setTimeout(() => {this.fetchData(URL)}, 3000);
  }

  fetchData(url) {
    return (
      fetch(url)
        .then(response => response.json())
        .then(countries => {
          this.setState({
            countries: [...countries],
            loading: false,
          })
        })
    )
  }

  render() {
    if (this.state.loading) return <Loading />
    return (
      <div className='container'>
        <h1 id='title'>Country Filter</h1>
        <div className='filter'>
          <input onChange={this.handleInputByCountry} placeholder='By Country'></input>
          <input onChange={this.handleInputByCapital} placeholder='By Capital'></input>
          <input onChange={this.handleInputByRegion} placeholder='By Region'></input>
          <input onChange={this.handleInputBySubRegion} placeholder='By Subregion'></input>
        </div>
        <div className='col-labels'>
          <div className='col'>
            <h3>Country</h3>
          </div>
          <div className='col'>
            <h3>Capital</h3>
          </div>
          <div className='col'>
            <h3>Region</h3>
          </div>
          <div className='col'>
            <h3>Subregion</h3>
          </div>
          <div className='col'>
            <h3>Latitutde</h3>
          </div>
          <div className='col'>
            <h3>Longitude</h3>
          </div>
        </div>
        <ShowCountries list={this.state.countries}
          byCountry={this.state.byCountry}
          byCapital={this.state.byCapital}
          byRegion={this.state.byRegion}
          bySubRegion={this.state.bySubRegion}
        />
    </div>
    )
  }
}

export default App;
