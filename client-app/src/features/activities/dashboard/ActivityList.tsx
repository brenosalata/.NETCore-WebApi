import React, { useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityList({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
}: Props) {
  const [target, setTarget] = useState("");

  function handleActivityDelete(
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">
                {activity.title}
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                    {activity.city}, {activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={(e) => handleActivityDelete(e, activity.id)}
                    loading={submitting && target === activity.id}
                    name={activity.id}
                    floated="right"
                    content="delete"
                    color="red"
                  />
                  <Button
                    onClick={() => selectActivity(activity.id)}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Header>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
