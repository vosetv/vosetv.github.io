import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Provider } from 'unstated';
import { Subscribe } from 'unstated';
import StateContainer from './state-container';
import Header from './header';
import Videos from './videos';
import Player from './player';
import dropdownContainer from './dropdown-container';
import Link from './link';

const Document = () => (
  <React.StrictMode>
    <Provider inject={[dropdownContainer]}>
      <Header />
      <Subscribe to={[StateContainer]}>
        {({ state }) =>
          state.videos && state.videos.length === 0 ? (
            <div className="message">
              <div className="message__icon">
                <canvas id="static" width="80" height="60"></canvas>
              </div>
              <div className="message__content">
                <p><b>We couldn't find any videos for you...</b></p>
                <p>Try a different sorting, or some of our favorite subreddits:</p>
                <ul>
                  {[
                    '/r/artisanvideos',
                    '/r/gaming',
                    '/r/movies',
                    '/r/shittyrobots',
                    '/r/Documentaries',
                    '/r/WhyWereTheyFilming',
                    '/r/Games',
                    '/r/space',
                    '/r/Cyberpunk',
                    '/r/youtubehaiku',
                    '/r/MovieDetails',
                    '/r/DIY',
                    '/r/Music',
                    '/r/Roadcam',
                    '/r/holdmybeer',
                    '/r/holdmyredbull',
                    '/r/holdmycosmo',
                    '/r/holdmyfries',
                    '/r/whatcouldgowrong',
                    '/r/LivestreamFail',
                    '/r/hiphopheads',
                    '/r/ContagiousLaughter',
                    '/r/PublicFreakout',
                    '/r/cars',
                    '/r/DeepIntoYouTube',
                    '/r/CatastrophicFailure',
                    '/r/PlayItAgainSam',
                    '/r/AccidentalComedy',
                    '/r/amibeingdetained',
                    '/r/ArtisanVideos',
                    '/r/AwfulCommercials',
                    '/r/BestOfLiveleak',
                    '/r/bestofworldstar',
                    '/r/cringe',
                    '/r/CommercialCuts',
                    '/r/cookingvideos',
                    '/r/curiousvideos',
                    '/r/educativevideos',
                    '/r/FastWorkers',
                    '/r/fightporn',
                    '/r/FuckingWithNature',
                    '/r/fullmoviesonyoutube',
                    '/r/happycrowds',
                    '/r/idiotsfightingthings',
                    '/r/IMGXXXX',
                    '/r/lectures',
                    '/r/mealtimevideos',
                    '/r/motivationvideos',
                    '/r/ObscureMedia',
                    '/r/playitagainsam',
                    '/r/Prematurecelebration',
                    '/r/streetfights',
                    '/r/sweetjustice',
                    '/r/TheWayWeWereOnVideo',
                    '/r/trailers',
                    '/r/UnexpectedThugLife',
                    '/r/video',
                    '/r/videoporn',
                    '/r/vids',
                    '/r/vine',
                    '/r/vines',
                    '/r/virtualfreakout',
                    '/r/woahtube',
                  ].map(link => <li><Link to={link}>{link}</Link></li>)}
                </ul>
              </div>
            </div>
          ) : (
            <>
              <Player />
              <Videos />
            </>
          )
        }
      </Subscribe>
    </Provider>
  </React.StrictMode>
);

export default hot(module)(Document);
