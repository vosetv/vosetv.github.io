import React from 'react';
import VideoProvider from '../video-provider';
import Header from '../header';
import VideoList from '../video-list';
import Player from '../player';
import Message from '../message';

import { State } from '../video-provider';

export default function Document({
  preloadedState,
}: {
  preloadedState: State;
}) {
  return (
    <VideoProvider preloadedState={preloadedState}>
      {({ isEmpty, getVideoListProps, getPlayerProps, getSortProps, sort }) => (
        <>
          <Header sort={sort} {...getSortProps()} />
          {isEmpty ? (
            <Message sort={sort} />
          ) : (
            <>
              <Player {...getPlayerProps()} />
              <VideoList {...getVideoListProps()} />
            </>
          )}
        </>
      )}
    </VideoProvider>
  );
}
