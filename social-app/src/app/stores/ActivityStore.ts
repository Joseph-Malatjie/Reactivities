﻿import { makeAutoObservable, runInAction } from 'mobx';
import { Activity } from '../models/activity';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';

export default class ActivityStore{
    activityList = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    
    constructor() {
        makeAutoObservable(this, )
    }
    
    get activitiesByDate() {
        return Array.from(
            this.activityList.values()
        ).sort((a, b) => 
            Date.parse(a.date) - Date.parse(b.date));
    }
    
    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0]
                    runInAction(() => {
                        this.activityList.set(activity.id, activity);
                    })
                })
                this.setLoadingInitial(false);
            
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    
    selectActivity = (id: string) => {
        this.selectedActivity = this.activityList.get(id);
    }
    
    cancelSelectActivity = () => {
        this.selectedActivity = undefined;
    }
    
    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectActivity();
        this.editMode = true;
    }
    
    closeForm = () => {
        this.editMode = false;
    }
    
    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityList.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityList.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityList.delete(id);
                if (this.selectedActivity?.id === id) 
                    this.cancelSelectActivity();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}
