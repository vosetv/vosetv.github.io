import { normalizeVideos } from '../normalizeVideos';

function getTimestamp(url: string) {
  const match = url.match(/(?:#|&|\?)t=(\d+h)?(\d+m)?(\d+(?:s|$))?/);

  if (match === null) return 0;

  const hours = parseInt(match[1], 10) * 3600 || 0;
  const minutes = parseInt(match[2], 10) * 60 || 0;
  const seconds = parseInt(match[3], 10) || 0;

  return hours + minutes + seconds;
}

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

export interface Dictionary<T> {
  [key: string]: T;
}

function unique(a: NormalizedVideoItem[]): NormalizedVideoItem[] {
  const seen: Dictionary<boolean> = {};
  return a.filter((video: NormalizedVideoItem): boolean =>
    seen[video.id] === true ? false : (seen[video.id] = true),
  );
}

interface RecursiveError extends PromiseRejectionEvent {
  msg: string;
  after: string;
}

export async function fetchSubreddit({
  subreddit,
  sorting,
  timeRange,
}: {
  subreddit: string;
  sorting: string;
  timeRange?: string;
}): Promise<NormalizedVideoItem[]> {
  const videoLimit = 50;
  const count = 0;
  let videos: VideoItem[] = [];
  const timeRangeQuery = ['top', 'controversial'].includes(sorting)
    ? `t=${timeRange ? timeRange : 'day'}`
    : '';

  async function recursiveGet(
    depth: number,
    after?: string,
  ): Promise<NormalizedVideoItem[]> {
    try {
      const url = after
        ? `https://reddit-proxy.simonlc.workers.dev/r/${subreddit}/${sorting}.json?${timeRangeQuery}&count=${
            count * 100
          }&after=${after}`
        : `https://reddit-proxy.simonlc.workers.dev/r/${subreddit}/${sorting}.json?sort=${sorting}&${timeRangeQuery}`;
      // `https://www.reddit.com/r/${subreddit}/${sorting}.json?sort=${sorting}&t=${timeRange}&raw_json=1`
      const response = await fetch(url);
      const posts = await response.json();
      console.log('step1', url, posts);
      videos = videos.concat(
        posts.data.children.filter(
          (item: VideoItem) =>
            item.data.secure_media &&
            item.data.secure_media.type === 'youtube.com',
        ),
      );
      console.log('step2', videos);
      if (videos.length > videoLimit || depth >= 8) {
        console.log('step3', normalizeVideos(videos));
        console.log('step4', unique(normalizeVideos(videos)));
        return unique(normalizeVideos(videos));
      }
      throw { msg: 'next', after: posts.data.after };
    } catch (err) {
      if (err.msg === 'next') {
        return await recursiveGet(depth + 1, err.after);
      }
      console.error('Recursive Videos Error', err);
      return [];
    }
  }
  return await recursiveGet(count);
}
