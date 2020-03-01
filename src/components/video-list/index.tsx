import React, { useEffect } from 'react';
import objstr from 'obj-str';
import VideoItem, { Preview } from '../video-item';
import useLocalStorage from '../../hooks/useLocalStorage.ts';
import styles from './styles.css';

// States:
//  - With videos
//  - No filtered videos
//  - Empty
//  - Loading
export default function VideoList({ videos, currentVideo, setCurrentVideo }) {
  // TODO Move down to VideoItem?
  const [watchedVideos, setWatchedVideos] = useLocalStorage({});

  // TODO Need useEffect here? Maybe use layoutEffect?
  useEffect(() => {
    setWatchedVideos({ ...watchedVideos, [videos[currentVideo].id]: true });
  }, [currentVideo]);

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
                isSelected={currentVideo === i}
                isWatched={watchedVideos ? !!watchedVideos[video.id] : false}
                onClick={() => setCurrentVideo(i)}
              />
            ))
          : [...Array(32)].map((_, i) => <Preview key={i} />)}
      </ul>
    </div>
  );
}
