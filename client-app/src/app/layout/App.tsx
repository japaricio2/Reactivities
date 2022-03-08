import { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponents from './LoadingComponents';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';

function App() {
  const {activityStore} = useStore();
  const {loadingInitial} = activityStore;

  useEffect(
    () => {
      activityStore.loadActivities();
    }, [activityStore]
  )
    

  if (loadingInitial) return <LoadingComponents content='Loading App' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App);
