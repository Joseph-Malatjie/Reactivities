import {Button, Card, Image} from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";
import { observer } from "mobx-react-lite";


export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, openForm, cancelSelectActivity} = activityStore;
    
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity?.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{activity?.title}</Card.Header>
                <Card.Meta>
                    <span>{activity?.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity?.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
               <Button.Group widths='2'>
                   <Button onClick={() => openForm(activity?.id)} basic color='blue' content='Edit'/>
                   <Button onClick={cancelSelectActivity} basic color='orange' content='Cancel'/>
               </Button.Group>
            </Card.Content>
        </Card>
    )
})