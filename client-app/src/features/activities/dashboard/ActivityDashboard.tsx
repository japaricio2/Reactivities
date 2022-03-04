import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';


interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDashboard({ activities, selectedActivity
    , selectActivity, cancelSelectActivity
    , editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting }: Props) {


    return (
        <Grid>
            <Grid.Column width='10'>
                {/* <List>
                    {
                        activities.map(
                            (activity) => (
                                <List.Item key={activity.id}>
                                    {activity.title}
                                </List.Item>
                            ))
                    }
                </List> */}

                <ActivityList submitting={submitting} activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} />
            </Grid.Column>

            <Grid.Column width='6'>

                {/* {
                    activities[0] && <ActivityDetails activity={activities[0]} />
                    
                } */}

                {
                    selectedActivity && !editMode
                    && <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />
                }

                {

                    editMode 
                    && <ActivityForm closeForm={closeForm} 
                                     activity={selectedActivity} 
                                     createOrEdit={createOrEdit}
                                     submitting={submitting} />
                }



            </Grid.Column>
        </Grid>
    )
}