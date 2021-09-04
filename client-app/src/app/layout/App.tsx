import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, Header, List, ListItem } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashBoard from "../../features/activities/dashboard/ActivityDashBoard";
import { Activity } from "../models/Activity";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const [selectActivity, setSelectActivity] = useState<Activity | undefined>(
    undefined
  );

  const [editMode, setEditMode] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
    });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectActivity(activities.find((e) => e.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectActivity(undefined);
  }

  function openForm(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function closeForm() {
    setEditMode(false);
  }

  function createOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setEditMode(false);
        setSelectActivity(activity);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, { ...activity, id: uuid() }]);
        setEditMode(false);
        setSelectActivity(activity);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (loading) {
    return <LoadingComponent content="Loading..."></LoadingComponent>;
  }
  return (
    <Fragment>
      <NavBar openForm={openForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashBoard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={openForm}
          closeForm={closeForm}
          deleteActivity={handleDeleteActivity}
          createOrEdit={createOrEditActivity}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
