import {useEffect, useState} from 'react'
import './App.css'
import DuckItem from './DuckItem'
import { ducks } from './demo'
import axios from 'axios'
import { Header, List } from 'semantic-ui-react'

function App() {
    const [activities, setActivities] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:5000/api/activities')
            .then(response => {
                setActivities(response.data)
            })
    }, [])
    
  return (
      <div>
          
        <Header as='h2' icon='chess' content='Reactivities'/>
          <List>
                {activities.map((activity: any) => (
                    <List.Item key={activity.id}>
                        {activity.title}
                    </List.Item>
                ))}
          </List>
          
        {ducks.map(duck => (
          <DuckItem key={duck.name} duck={duck} />
        ))}
      </div>
  )
}
export default App
