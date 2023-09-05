// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Home extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const dataList = data.teams
    const formattedDataList = dataList.map(each => ({
      name: each.name,
      id: each.id,
      teamImageUrl: each.team_image_url,
    }))
    console.log(formattedDataList)
    this.setState({teamsList: formattedDataList, isLoading: false})
  }

  render() {
    const {teamsList, isLoading} = this.state
    return (
      <div className="homePage">
        <div className="title">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            className="iplLogo"
            alt="ipl logo"
          />
          <h1 className="name">IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <div data-testid="loader">
            {' '}
            <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
          </div>
        ) : (
          <ul className="teamsList">
            {teamsList.map(each => (
              <TeamCard details={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Home
