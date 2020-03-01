import React from 'react';
import Vose from '../vose';
import Header from '../header';
import VideoList from '../video-list';
import Player from '../player';
import Message from '../message';
import Sort from '../sort';

export default function Document({ preloadedState }) {
  return (
    <Vose
      initialState={preloadedState}
      error={error => <Message error={error} />}
      header={props => (
        <Header>
          <Sort {...props} />
          <div>About</div>
        </Header>
      )}
      app={({ videos, currentVideo, setCurrentVideo }) => (
        <>
          <Player video={videos && videos[currentVideo]} next={() => {}} />
          <VideoList
            videos={videos}
            currentVideo={currentVideo}
            setCurrentVideo={() => {}}
          />
        </>
      )}
    />
  );
}
