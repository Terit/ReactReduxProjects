import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import './styles/Gallery.css';

class Gallery extends Component {
  constructor (props) {
    super(props)

    this.state = {
      playingUrl: '',
      audio: null,
      playing: false,
    };
  }

  playAudio (url) {
    let audio = new Audio(url);
    if (!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: url,
        audio
      });
    } else {
      if (this.state.playingUrl === url) {
        this.state.audio.pause();
        this.setState({
          playing: false
        });
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: url,
          audio
        })
      }
    }
  }

  renderTrack (track, i) {
    const trackImg = track.album.images[0].url;
    return (
      <div key={i} className="track" onClick={() => this.playAudio(track.preview_url)}>
        <img src={trackImg} alt="track" className="track__img" />
        <div className="track__play">
          <div className="track__play-inner">
            { 
              this.state.playing && this.state.playingUrl === track.preview_url 
                ? <Glyphicon glyph="pause" />
                : <Glyphicon glyph="play" />
            }
          </div>
        </div>
        <p className="track__text">
          {track.name}
        </p>
      </div>
    )
  }
  render () {
    const { tracks } = this.props;

    return (
      <div>
        {tracks.map(this.renderTrack.bind(this))}
      </div>
    );
  }
}

export default Gallery;
