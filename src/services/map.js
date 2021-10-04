import React from 'react';
import Map from './gmap';
export default class NewCompo extends React.Component {
  render() {
    return (
      <div style={{height: "40vh"}}>
        <Map
          google={this.props.google}
          center={{ lat: 0, lng: 0 }}
          zoom={15}
        />
      </div>
    )
  }
}