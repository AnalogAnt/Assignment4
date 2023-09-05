import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class TeamMatches extends Component {
  // eslint-disable-next-line
  state = {
    itemDetails: [],
    isLoading: true,
    teamClass: '',
    recentMatchDetails: [],
  }
  // eslint-disable-next-line

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    // eslint-disable-next-line
    let classs = ''
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const formmatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }

    if (id === 'RCB') {
      classs = 'teamRCB'
    } else if (id === 'KKR') {
      classs = 'teamKKR'
    } else if (id === 'KXP') {
      classs = 'teamKXP'
    } else if (id === 'CSK') {
      classs = 'teamCSK'
    } else if (id === 'RR') {
      classs = 'teamRR'
    } else if (id === 'MI') {
      classs = 'teamMI'
    } else if (id === 'SH') {
      classs = 'teamSH'
    } else if (id === 'DC') {
      classs = 'teamDC'
    }
    console.log(formmatedData)
    this.setState({
      itemDetails: formmatedData,
      isLoading: false,
      teamClass: classs,
      recentMatchDetails: formmatedData.recentMatches,
    })
  }

  render() {
    const {itemDetails, isLoading, teamClass, recentMatchDetails} = this.state
    return (
      <div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
          </div>
        ) : (
          <div className={teamClass}>
            <img
              src={itemDetails.teamBannerUrl}
              className="teamBanner"
              alt="team banner"
            />
            <p className="para">Latest Matches</p>
            <LatestMatch details={itemDetails.latestMatchDetails} />
            <ul className="cardList">
              {recentMatchDetails.map(each => (
                <MatchCard details={each} key={each.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
