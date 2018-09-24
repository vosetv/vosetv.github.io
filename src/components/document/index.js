import React from 'react';
import VideoProvider from '../video-provider';
import Header from '../header';
import VideoList from '../video-list';
import Player from '../player';
import Message from '../message';

// TODO Extract error element into component.
const Document = ({ preloadedState }) => (
  <VideoProvider preloadedState={preloadedState}>
    {({
      videos,
      getVideoListProps,
      getPlayerProps,
      // TODO Sort might not rerender
      getSortProps,
      // url,
      // handleLocationChange,
    }) => (
      <>
        {/*<Location onChange={handleLocationChange}>{url}</Location>*/}
        <Header getSortProps={getSortProps} />
        {videos?.length === 0 ? (
          <Message />
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

export default Document;
