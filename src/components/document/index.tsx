import React from 'react';
import Vose from '../vose';
import Header from '../header';
import VideoList from '../video-list';
import Player from '../player';
import Message from '../message';
import Sort from '../sort';

export default function Document({}: {}) {
  return (
    <Vose
      error={error => <Message error={error} />}
      header={props => (
        <Header>
          <Sort {...props} />
        </Header>
      )}
      app={() => (
        <>
          <Player />
          <VideoList />
        </>
      )}
    />
  );
}
