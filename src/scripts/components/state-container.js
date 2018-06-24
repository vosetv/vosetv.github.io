import { Container } from 'unstated';
import subreddits from '../../subreddits';

class StateContainer extends Container {
  state = {
    currentVideoIndex: 0,
    currentVideo: null,
    subreddit: null,
    sort: null,
    videos: null,
    watchedVideos: null,
    subreddits,
    sortOptions: [
      'hot',
      'top',
      'new',
    ],
  };

  constructor() {
    super();

    window.addEventListener('popstate', this.historyUpdate);
    const [, , subreddit, sort = 'hot'] = location.pathname
      .replace(/\/{2,}/, '/')
      .split('/');

    const watchedVideos =
      localStorage.getItem('watchedVideos') === null
      ? {}
      : JSON.parse(localStorage.getItem('watchedVideos'));

    this.setState({
      subreddit,
      sort,
      watchedVideos,
    });

    fetch(`/api/videos/${subreddit}`)
      .then(res => res.json())
      .then(videos => {
        this.setState({
          videos,
          currentVideo: videos[0],
        });
      });
  }

  historyUpdate() {
    const [, subreddit, sort] = location.pathname
      .replace(/\/{2,}/, '/')
      .split('/');

    if (subreddit !== this.state.subreddit) {
      if (this.state.sort) {
        history.push(`/r/${this.state.subreddit}/${this.state.sort}`);
      } else {
        history.push(`/r/${this.state.subreddit}`);
      }
    } else if (sort !== this.state.sort) {
      history.push(`/r/${this.state.subreddit}/${this.state.sort}`);
    }
  }

  changeVideo = index => {
    this.setState(prevState => ({
      currentVideoIndex: index,
      currentVideo: this.state.videos[index],
      watchedVideos: { ...prevState.watchedVideos, ...{ [this.state.videos[index].id]: true } },
    }), () => {
      localStorage.setItem('watchedVideos', JSON.stringify(this.state.watchedVideos));
    });
  };

  setSubreddit = subreddit => {
    fetch(`/api/videos/${subreddit}`)
      .then(res => res.json())
      .then(videos => {
        this.setState({
          subreddit,
          videos,
          // TODO Set currentVideo
        });
      });
  }

  setSort = sort => {
    fetch(`/api/videos/${this.state.subreddit}/${sort}`)
      .then(res => res.json())
      .then(videos => {
        this.setState({
          sort,
          videos,
          // TODO Set currentVideo
        });
      });
  }
}

export default StateContainer;
