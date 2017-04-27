import React, { Component } from 'react';
import './styles/App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  static get COOKIE_REGEX () {
    return /(?:(?:^|.*;\s*)prevSearches\s*\=\s*([^;]*).*$)|^.*$/;
  }
  constructor (props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: [],
      prevSearches: [],
    };
  }

  saveSearch (artist) {
    const prevSearches = this.state.prevSearches.slice(0, 4)
    prevSearches.push(artist.name);
    this.setState({prevSearches});
    document.cookie = `prevSearches=${this.state.prevSearches.join(',')}`
  }

  componentDidMount() {
    const prevSearches = document.cookie.replace(App.COOKIE_REGEX, "$1") || [];
    this.setState({
      prevSearches: prevSearches.split(',')
    });
  }
  
  search () {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q=${encodeURI(this.state.query)}&type=artist&limit=1`
    const ALBUM_URL = "https://api.spotify.com/v1/artists"
    fetch(FETCH_URL, { method: 'GET' })
      .then(res => res.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({artist});
        this.saveSearch(artist);

        const TRACK_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=US&`
        fetch(TRACK_URL, { method: 'GET' })
          .then(res => res.json())
          .then(json => {
            const { tracks } = json;
            this.setState({tracks})
          });
      });
  }

  renderSearch (search, i) {
    return (
      <li key={i}
          className="app__prev-results"
          onClick={() => this.setState({query: search}) }>
        {search}
      </li>
    )
  }
  render () {
    return (
      <div className="app">
        <div className="app__title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={evt => this.setState({query: evt.target.value})}
              onKeyPress={evt => {
                if (evt.key === 'Enter') this.search();
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist ? 
            <div>
              <Profile artist={this.state.artist} />
              <Gallery tracks={this.state.tracks} />
            </div>
            : <div>
                Previous Searches:
                <ul>
                  {this.state.prevSearches.map(this.renderSearch.bind(this))}
                </ul>
              </div>
        }
      </div>
    )
  }
}

export default App;
