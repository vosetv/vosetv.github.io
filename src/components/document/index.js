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
      sort,
      // url,
      // handleLocationChange,
    }) => (
      <>
        {/*<Location onChange={handleLocationChange}>{url}</Location>*/}
        <Header sort={sort} getSortProps={getSortProps} />
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

export default Document;
