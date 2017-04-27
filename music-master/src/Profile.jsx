import React, { Component } from 'react';
import './styles/Profile.css'

class Profile extends Component {
  renderGenres (genre, i) {
    return (
      <span key={i}>{genre}{this.props.artist.genres.length -1 === i ? '' : ','} </span>
    )
  }
  render() {
    let artist = {name: '', followers: {total: ''}, images: [{url: ''}], genres: []};
    artist = this.props.artist ? this.props.artist : artist;

    return (
      <div className="profile">
        <img
          alt="Profile"
          className="profile__img"
          src={artist.images[0].url} />
        <div className="profile__info">
          <div className="profile__name">{artist.name}</div>
          <div className="profile__followers">
            {artist.followers.total} followers
          </div>
          <div className="profile__genres">
            {artist.genres.map(this.renderGenres.bind(this))}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
