function getTimestamp(url: string) {
  const match = url.match(/(?:#|&|\?)t=(\d+h)?(\d+m)?(\d+(?:s|$))?/);

  if (match === null) return 0;

  const hours = parseInt(match[1], 10) * 3600 || 0;
  const minutes = parseInt(match[2], 10) * 60 || 0;
  const seconds = parseInt(match[3], 10) || 0;

  return hours + minutes + seconds;
}

export type NormalizedVideoItem = {
  id: string;
  title: string;
  url: string;
  comments: number;
  score: number;
  timestamp?: number;
  flair?: string;
};

export interface Dictionary<T> {
  [key: string]: T;
}

interface PullPushSubmission {
  id: string;
  title: string;
  url: string;
  score: number;
  num_comments: number;
  link_flair_text: string | null;
}

type SortingOption = 'hot' | 'new' | 'controversial' | 'top' | 'rising';
type TimeRangeOption = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

function getSortType(sorting: SortingOption) {
  switch (sorting) {
    case 'top':
      return 'score';
    case 'controversial':
      return 'num_comments';
    case 'hot':
    case 'new':
    case 'rising':
    default:
      return 'created_utc';
  }
}

function getAfterValue(timeRange?: string) {
  const range = (timeRange ?? 'day') as TimeRangeOption;
  switch (range) {
    case 'hour':
      return '1h';
    case 'day':
      return '1d';
    case 'week':
      return '7d';
    case 'month':
      return '30d';
    case 'year':
      return '365d';
    case 'all':
    default:
      return null;
  }
}

function getYouTubeId(url: string) {
  const match = url.match(
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/,
  );
  if (!match || !match[1]) return null;
  return match[1];
}

function unique(a: NormalizedVideoItem[]): NormalizedVideoItem[] {
  const seen: Dictionary<boolean> = {};
  return a.filter((video: NormalizedVideoItem): boolean =>
    seen[video.id] === true ? false : (seen[video.id] = true),
  );
}

const pullPushUrl = 'https://api.pullpush.io/reddit/search/submission/';

export async function fetchSubreddit({
  subreddit,
  sorting,
  timeRange,
}: {
  subreddit: string;
  sorting: string;
  timeRange?: string;
}): Promise<NormalizedVideoItem[]> {
  const sortType = getSortType((sorting as SortingOption) ?? 'hot');
  const params = new URLSearchParams({
    subreddit,
    sort: 'desc',
    sort_type: sortType,
    size: '100',
  });

  if (['top', 'controversial'].includes(sorting)) {
    const after = getAfterValue(timeRange);
    if (after) {
      params.set('after', after);
    }
  }

  const response = await fetch(`${pullPushUrl}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`PullPush request failed with status ${response.status}`);
  }

  const posts = (await response.json()) as { data?: PullPushSubmission[] };
  const videos =
    posts.data
      ?.filter((item) => /(?:youtube\.com|youtu\.be)/i.test(item.url))
      .map((item) => {
        const id = getYouTubeId(item.url);
        if (!id) return null;
        const timestamp = getTimestamp(item.url);
        return {
          id,
          url: item.id,
          title: item.title,
          comments: item.num_comments,
          score: item.score,
          ...(item.link_flair_text && { flair: item.link_flair_text }),
          ...(timestamp > 0 && { timestamp }),
        } as NormalizedVideoItem;
      })
      .filter((item): item is NormalizedVideoItem => item !== null) ?? [];

  return unique(videos);
}
