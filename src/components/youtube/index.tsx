import React, { Component } from 'react';
import PropTypes from 'prop-types';
import youTubePlayer from '@simonlc/youtube-player';

function shouldUpdateVideo(prevProps: YouTubeProps, props: YouTubeProps) {
  // A changing video should always trigger an update
  if (prevProps.videoId !== props.videoId) {
    return true;
  }

  // Otherwise, a change in the start/end time playerVars also requires a player
  // update.
  const prevVars = prevProps.opts.playerVars || {};
  const vars = props.opts.playerVars || {};

  return prevVars.start !== vars.start || prevVars.end !== vars.end;
}

function shouldUpdatePlayer(prevProps: YouTubeProps, props: YouTubeProps) {
  return prevProps.id === props.id || prevProps.className === props.className;
}

interface YouTubeProps {
  videoId?: string;
  // custom ID for player element
  id?: string;
  // custom class name for player element
  className?: string;
  // custom class name for player container element
  containerClassName?: string;
  // https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
  opts?: YT.PlayerOptions;
  // event subscriptions
  onReady?: (event: object) => void;
  onError?: (event: object) => void;
  onPlay?: (event: object) => void;
  onPause?: (event: object) => void;
  onEnd?: (event: object) => void;
  onStateChange?: (event: object) => void;
  onPlaybackRateChange?: (event: object) => void;
  onPlaybackQualityChange?: (event: object) => void;
}

export default class YouTube extends Component<YouTubeProps, {}> {
  static defaultProps = {
    opts: {},
    containerClassName: '',
    onReady: () => {},
    onError: () => {},
    onPlay: () => {},
    onPause: () => {},
    onEnd: () => {},
    onStateChange: () => {},
    onPlaybackRateChange: () => {},
    onPlaybackQualityChange: () => {},
  };

  /**
   * Expose PlayerState constants for convenience. These constants can also be
   * accessed through the global YT object after the YouTube IFrame API is instantiated.
   * https://developers.google.com/youtube/iframe_api_reference#onStateChange
   */
  static PlayerState = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5,
  };

  container: HTMLElement = null;
  internalPlayer: YT.Player = null;
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.createPlayer();
  }

  componentDidUpdate(prevProps: YouTubeProps) {
    if (shouldUpdatePlayer(prevProps, this.props)) {
      this.updatePlayer();
    }

    if (shouldUpdateVideo(prevProps, this.props)) {
      this.updateVideo();
    }
  }

  componentWillUnmount() {
    /**
     * Note: The `youtube-player` package that is used promisifies all Youtube
     * Player API calls, which introduces a delay of a tick before it actually
     * gets destroyed. Since React attempts to remove the element instantly
     * this method isn't quick enough to reset the container element.
     */
    this.internalPlayer.destroy();
  }

  /**
   * https://developers.google.com/youtube/iframe_api_reference#onReady
   *
   * @param {Object} event
   *   @param {Object} target - player object
   */
  onPlayerReady = (event: YT.PlayerEvent) => this.props.onReady(event);

  /**
   * https://developers.google.com/youtube/iframe_api_reference#onError
   *
   * @param {Object} event
   *   @param {Integer} data  - error type
   *   @param {Object} target - player object
   */
  onPlayerError = (event: YT.OnErrorEvent) => this.props.onError(event);

  /**
   * https://developers.google.com/youtube/iframe_api_reference#onStateChange
   *
   * @param {Object} event
   *   @param {Integer} data  - status change type
   *   @param {Object} target - actual YT player
   */
  onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
    this.props.onStateChange(event);
    switch (event.data) {
      case YouTube.PlayerState.ENDED:
        this.props.onEnd(event);
        break;

      case YouTube.PlayerState.PLAYING:
        this.props.onPlay(event);
        break;

      case YouTube.PlayerState.PAUSED:
        this.props.onPause(event);
        break;

      default:
        return;
    }
  };

  /**
   * https://developers.google.com/youtube/iframe_api_reference#onPlaybackRateChange
   *
   * @param {Object} event
   *   @param {Float} data    - playback rate
   *   @param {Object} target - actual YT player
   */
  onPlayerPlaybackRateChange = (event: YT.OnPlaybackRateChangeEvent) =>
    this.props.onPlaybackRateChange(event);

  /**
   * https://developers.google.com/youtube/iframe_api_reference#onPlaybackQualityChange
   *
   * @param {Object} event
   *   @param {String} data   - playback quality
   *   @param {Object} target - actual YT player
   */
  onPlayerPlaybackQualityChange = (event: YT.OnPlaybackQualityChangeEvent) =>
    this.props.onPlaybackQualityChange(event);

  /**
   * Initialize the Youtube Player API on the container and attach event handlers
   */
  createPlayer = () => {
    // do not attempt to create a player server-side, it won't work
    if (typeof document === 'undefined') return;
    // create player
    const playerOpts = {
      ...this.props.opts,
      // preload the `videoId` video if one is already given
      videoId: this.props.videoId,
    };
    this.internalPlayer = youTubePlayer(this.container, playerOpts);
    // attach event handlers
    this.internalPlayer.on('ready', this.onPlayerReady);
    this.internalPlayer.on('error', this.onPlayerError);
    this.internalPlayer.on('stateChange', this.onPlayerStateChange);
    this.internalPlayer.on(
      'playbackRateChange',
      this.onPlayerPlaybackRateChange,
    );
    this.internalPlayer.on(
      'playbackQualityChange',
      this.onPlayerPlaybackQualityChange,
    );
  };

  /**
   * Method to update the id and class of the Youtube Player iframe.
   * React should update this automatically but since the Youtube Player API
   * replaced the DIV that is mounted by React we need to do this manually.
   */
  updatePlayer = () => {
    this.internalPlayer.getIframe().then((iframe: HTMLIFrameElement) => {
      this.props.id
        ? iframe.setAttribute('id', this.props.id)
        : iframe.removeAttribute('id');
      this.props.className
        ? iframe.setAttribute('class', this.props.className)
        : iframe.removeAttribute('class');
    });
  };

  /**
   * Call Youtube Player API methods to update the currently playing video.
   * Depeding on the `opts.playerVars.autoplay` this function uses one of two
   * Youtube Player API methods to update the video.
   */
  updateVideo = () => {
    this.internalPlayer.destroy();
    this.createPlayer();
    // if (this.props.videoId == null) {
    //   this.internalPlayer.stopVideo();
    //   return;
    // }

    // set queueing options
    // let autoplay = false;
    // const opts = {
    //   videoId: this.props.videoId,
    // };
    // if ('playerVars' in this.props.opts) {
    //   // autoplay = this.props.opts.playerVars.autoplay === 1;
    //   if ('start' in this.props.opts.playerVars) {
    //     opts.startSeconds = this.props.opts.playerVars.start;
    //   }
    //   if ('end' in this.props.opts.playerVars) {
    //     opts.endSeconds = this.props.opts.playerVars.end;
    //   }
    // }

    // // if autoplay is enabled loadVideoById
    // // if (autoplay) {
    // // this.internalPlayer.loadVideoById(opts);
    // this.internalPlayer.loadVideoById({
    //   videoId: this.props.videoId
    // });
    // return;
    // }
    // // default behaviour just cues the video
    // this.internalPlayer.cueVideoById(opts);
  };

  refContainer = (container: HTMLElement) => {
    this.container = container;
  };

  render() {
    return (
      <span className={this.props.containerClassName}>
        <div
          id={this.props.id}
          className={this.props.className}
          ref={this.refContainer}
        />
      </span>
    );
  }
}
