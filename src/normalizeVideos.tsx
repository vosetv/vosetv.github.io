interface Oembed {
  url: string;
  thumbnail_url: string;
}
interface SecureMedia {
  oembed: Oembed;
  type: string;
}
interface VideoItemData {
  secure_media: SecureMedia;
  id: string;
  url: string;
  title: string;
  num_comments: number;
  score: number;
  link_flair_text: number;
}
interface VideoItem {
  data: VideoItemData;
}

export type NormalizedVideoItem = {
  id: string;
  title: string;
  url: string;
  comments: number;
  score: number;
  timestamp?: number;
  flair?: number;
};

function getTimestamp(url: string) {
  const match = url.match(/(?:#|&|\?)t=(\d+h)?(\d+m)?(\d+(?:s|$))?/);

  if (match === null) return 0;

  const hours = parseInt(match[1], 10) * 3600 || 0;
  const minutes = parseInt(match[2], 10) * 60 || 0;
  const seconds = parseInt(match[3], 10) || 0;

  return hours + minutes + seconds;
}

export function normalizeVideos(videos: VideoItem[]): NormalizedVideoItem[] {
  console.log('children', videos);
  return videos
    .filter((item: VideoItem) => item.data.secure_media?.type === 'youtube.com')
    .map((video: VideoItem) => {
      let id;
      if (video.data.secure_media.oembed.url) {
        id = video.data.secure_media.oembed.url.match(
          /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&\?]*).*/,
        )![1];
      } else if (video.data.secure_media.oembed.thumbnail_url) {
        id = video.data.secure_media.oembed.thumbnail_url.split('/')[4];
      }
      const timestamp = getTimestamp(video.data.url);
      // TODO_TS Might be undefined?
      return {
        id: id as string,
        url: video.data.id,
        title: video.data.title,
        // subreddit: video.data.subreddit_name_prefixed,
        comments: video.data.num_comments,
        score: video.data.score,
        ...(video.data.link_flair_text && {
          flair: video.data.link_flair_text,
        }),
        ...(timestamp > 0 && { timestamp }),
      } as NormalizedVideoItem;
    });
}
