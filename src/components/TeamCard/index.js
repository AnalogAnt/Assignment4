// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {details} = props
  const {name, teamImageUrl, id} = details

  return (
    <Link to={`/team-matches/${id}`}>
      <li className="teamItem">
        <img src={teamImageUrl} alt={name} className="teamItemLogo" />
        <p className="teamItemHead">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
