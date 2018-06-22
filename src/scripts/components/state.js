import { Container } from 'unstated';

class State extends Container {
  state = {
    currentVideoIndex: 0,
    currentVideo: {},
    subreddit: 'videos',
    sort: 'hot',
  };

  constructor() {
    super();
    window.addEventListener('popstate', this.handleNavigation);
  }

  changeVideo(index) {
    this.setState({ currentVideoIndex: this.state.count + 1 });
  }

  setSubreddit(subreddit) {
    this.setState({
      subreddit,
    });
  }

  setSort(sort) {
    this.setState({
      sort,
    });
  }

  handleNavigation() {
    const [, subreddit, sort] = location.pathname.replace(/\/{2,}/, '/').split('/');
    this.setState({
      subreddit,
      sort,
    });
  }

  // decrement() {
  //   this.setState({ count: this.state.count - 1 });
  // }
}

export default State;
