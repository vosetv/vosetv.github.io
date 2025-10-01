import React, { useEffect } from 'react';
import objstr from 'obj-str';
import VideoItem, { Preview } from '../video-item';
import useLocalStorage from '../../hooks/useLocalStorage.ts';
import styles from './styles.module.css';

// States:
//  - With videos
//  - No filtered videos
//  - Empty
//  - Loading
export default function VideoList({ videos, current, setCurrent }) {
  // TODO Move down to VideoItem?
  const [watchedVideos, setWatchedVideos] = useLocalStorage(
    'watchedVideos',
    {},
  );

  // TODO Need useEffect here? Maybe use layoutEffect?
  useEffect(() => {
    if (videos) {
      setWatchedVideos({ ...watchedVideos, [videos[current].id]: true });
    }
  }, [videos, current]);

  return (
    <div
      className={objstr({
        [styles.list]: true,
        [styles.preview]: !videos,
      })}
    >
      <ul>
        {videos?.length > 0
          ? videos.map((video, i) => (
              <VideoItem
                key={video.id}
                id={video.id}
                title={video.title}
                isSelected={current === i}
                isWatched={watchedVideos ? !!watchedVideos[video.id] : false}
                onClick={() => setCurrent(i)}
              />
            ))
          : [...Array(32)].map((_, i) => <Preview key={i} />)}
      </ul>
    </div>
  );
}
