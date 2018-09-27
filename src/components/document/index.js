import React from 'react';
import VideoProvider from '../video-provider';
import Header from '../header';
import VideoList from '../video-list';
import Player from '../player';
import Message from '../message';

const Document = ({ preloadedState }) => (
  <VideoProvider preloadedState={preloadedState}>
    {({
      isEmpty,
      getVideoListProps,
      getPlayerProps,
      getSortProps,
      getLinkProps,
      // url,
      // handleLocationChange,
    }) => (
      <>
        {/*<Location onChange={handleLocationChange}>{url}</Location>*/}
        <Header getSortProps={getSortProps} />
        {isEmpty ? (
          <Message getLinkProps={getLinkProps} />
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
