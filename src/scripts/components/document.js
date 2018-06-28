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
                  <li><Link to="/r/artisanvideos">/r/artisanvideos</Link></li>
                  <li><Link to="/r/gaming">/r/gaming</Link></li>
                  <li><Link to="/r/movies">/r/movies</Link></li>
                  <li><Link to="/r/shittyrobots">/r/shittyrobots</Link></li>
                  <li><Link to="/r/Documentaries">/r/Documentaries</Link></li>
                  <li><Link to="/r/WhyWereTheyFilming">/r/WhyWereTheyFilming</Link></li>
                  <li><Link to="/r/Games">/r/Games</Link></li>
                  <li><Link to="/r/space">/r/space</Link></li>
                  <li><Link to="/r/Cyberpunk">/r/Cyberpunk</Link></li>
                  <li><Link to="/r/youtubehaiku">/r/youtubehaiku</Link></li>
                  <li><Link to="/r/MovieDetails">/r/MovieDetails</Link></li>
                  <li><Link to="/r/DIY">/r/DIY</Link></li>
                  <li><Link to="/r/Music">/r/Music</Link></li>
                  <li><Link to="/r/Roadcam">/r/Roadcam</Link></li>
                  <li><Link to="/r/holdmybeer">/r/holdmybeer</Link></li>
                  <li><Link to="/r/holdmyredbull">/r/holdmyredbull</Link></li>
                  <li><Link to="/r/holdmycosmo">/r/holdmycosmo</Link></li>
                  <li><Link to="/r/holdmyfries">/r/holdmyfries</Link></li>
                  <li><Link to="/r/whatcouldgowrong">/r/whatcouldgowrong</Link></li>
                  <li><Link to="/r/LivestreamFail">/r/LivestreamFail</Link></li>
                  <li><Link to="/r/hiphopheads">/r/hiphopheads</Link></li>
                  <li><Link to="/r/ContagiousLaughter">/r/ContagiousLaughter</Link></li>
                  <li><Link to="/r/PublicFreakout">/r/PublicFreakout</Link></li>
                  <li><Link to="/r/cars">/r/cars</Link></li>
                  <li><Link to="/r/DeepIntoYouTube">/r/DeepIntoYouTube</Link></li>
                  <li><Link to="/r/CatastrophicFailure">/r/CatastrophicFailure</Link></li>
                  <li><Link to="/r/PlayItAgainSam">/r/PlayItAgainSam</Link></li>
                  <li><Link to="/r/AccidentalComedy">/r/AccidentalComedy</Link></li>
                  <li><Link to="/r/amibeingdetained">/r/amibeingdetained</Link></li>
                  <li><Link to="/r/ArtisanVideos">/r/ArtisanVideos</Link></li>
                  <li><Link to="/r/AwfulCommercials">/r/AwfulCommercials</Link></li>
                  <li><Link to="/r/BestOfLiveleak">/r/BestOfLiveleak</Link></li>
                  <li><Link to="/r/bestofworldstar">/r/bestofworldstar</Link></li>
                  <li><Link to="/r/cringe">/r/cringe</Link></li>
                  <li><Link to="/r/CommercialCuts">/r/CommercialCuts</Link></li>
                  <li><Link to="/r/cookingvideos">/r/cookingvideos</Link></li>
                  <li><Link to="/r/curiousvideos">/r/curiousvideos</Link></li>
                  <li><Link to="/r/educativevideos">/r/educativevideos</Link></li>
                  <li><Link to="/r/FastWorkers">/r/FastWorkers</Link></li>
                  <li><Link to="/r/fightporn">/r/fightporn</Link></li>
                  <li><Link to="/r/FuckingWithNature">/r/FuckingWithNature</Link></li>
                  <li><Link to="/r/fullmoviesonyoutube">/r/fullmoviesonyoutube</Link></li>
                  <li><Link to="/r/happycrowds">/r/happycrowds</Link></li>
                  <li><Link to="/r/idiotsfightingthings">/r/idiotsfightingthings</Link></li>
                  <li><Link to="/r/IMGXXXX">/r/IMGXXXX</Link></li>
                  <li><Link to="/r/lectures">/r/lectures</Link></li>
                  <li><Link to="/r/mealtimevideos">/r/mealtimevideos</Link></li>
                  <li><Link to="/r/motivationvideos">/r/motivationvideos</Link></li>
                  <li><Link to="/r/ObscureMedia">/r/ObscureMedia</Link></li>
                  <li><Link to="/r/playitagainsam">/r/playitagainsam</Link></li>
                  <li><Link to="/r/Prematurecelebration">/r/Prematurecelebration</Link></li>
                  <li><Link to="/r/streetfights">/r/streetfights</Link></li>
                  <li><Link to="/r/sweetjustice">/r/sweetjustice</Link></li>
                  <li><Link to="/r/TheWayWeWereOnVideo">/r/TheWayWeWereOnVideo</Link></li>
                  <li><Link to="/r/trailers">/r/trailers</Link></li>
                  <li><Link to="/r/UnexpectedThugLife">/r/UnexpectedThugLife</Link></li>
                  <li><Link to="/r/video">/r/video</Link></li>
                  <li><Link to="/r/videoporn">/r/videoporn</Link></li>
                  <li><Link to="/r/vids">/r/vids</Link></li>
                  <li><Link to="/r/vine">/r/vine</Link></li>
                  <li><Link to="/r/vines">/r/vines</Link></li>
                  <li><Link to="/r/virtualfreakout">/r/virtualfreakout</Link></li>
                  <li><Link to="/r/woahtube">/r/woahtube</Link></li>
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
