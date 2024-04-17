﻿import {Grid} from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";
import { observer } from "mobx-react-lite";
import {useParams} from "react-router-dom";
import { useEffect } from "react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {
        selectedActivity: activity, 
        loadActivity, 
        loadingInitial
    } = activityStore;
    const {id} = useParams<{id: string}>();
    
    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity])
    
    if(loadingInitial || !activity)
        return <LoadingComponents />
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat/>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityDetailedSidebar/>
            </Grid.Column>
        </Grid>
    )
})