import React from 'react';

export default class User extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.username}<p>
        {if (this.props.voted) {
          if (this.props.showVoltes) {
            <div>{this.props.vote}</div>
          } else {
            <div class='hidden-vote' />
          }
        } else {
          <div class='no-vote' />
        }
        }
    );
  }
}
