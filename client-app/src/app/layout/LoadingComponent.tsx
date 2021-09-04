import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

interface Props {
  inverted?: boolean;
  content: string;
}

export default function LoadingComponent({ content, inverted }: Props) {
  return (
    <Dimmer active={true}>
      <Loader inverted={inverted} content={content}></Loader>
    </Dimmer>
  );
}
