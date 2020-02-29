import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Player from '../';
import VideoProvider from '../../video-provider';

test.todo('should render skeleton components during loading');

test('should be able to change videos with keyboard', () => {
  const videos = [
    {
      id: 'VfJ7FVhAcdQ',
      url: 'f89fv5',
      title: 'A huge elephant lays down to let his friend treat his eye',
      comments: 794,
      score: 14391,
    },
    {
      id: 'yt4rjnAW2QM',
      url: 'f8chpu',
      title: 'A quarter only gets you 15 minutes.',
      comments: 120,
      score: 1731,
    },
    {
      id: 'uX7CAoxBNOU',
      url: 'f8bqk3',
      title:
        "Bill Hader's scene in the opening of Pineapple Express is one of the greatest comedy performances I have ever seen",
      comments: 185,
      score: 1922,
    },
  ];
  const preloadedState = {
    videos,
    subreddit: 'videos',
    sorting: 'hot',
    timeRange: 'day',
    currentVideo: videos[0],
    currentVideoIndex: 0,
    watchedVideos: {},
  };
  const { getByTestId } = render(
    <VideoProvider preloadedState={preloadedState}>
      {({ getPlayerProps }) => <Player {...getPlayerProps()} />}
    </VideoProvider>,
  );
  const beforeTitle = getByTestId('player-title')
  expect(beforeTitle.textContent).toBe(videos[0].title);
  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(beforeTitle.textContent).toBe(videos[0].title);
  fireEvent.keyDown(window, { key: 'k' });
  expect(beforeTitle.textContent).toBe(videos[1].title);
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(beforeTitle.textContent).toBe(videos[2].title);
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(beforeTitle.textContent).toBe(videos[2].title);
  fireEvent.keyDown(window, { key: 'j' });
  expect(beforeTitle.textContent).toBe(videos[1].title);
});
