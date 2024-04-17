import {Grid} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/Store";
import { observer } from "mobx-react-lite";
import {useEffect} from "react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import ActivityFilters from "./ActivityFilters";

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityList} = activityStore;
    
    useEffect(() => {
        if(activityList.size <= 1)
            loadActivities();
    }, [loadActivities, activityList.size])

    if (activityStore.loadingInitial)
        return <LoadingComponents  content={'Loading...'}/>
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters/>
            </Grid.Column>
        </Grid>
    )
})