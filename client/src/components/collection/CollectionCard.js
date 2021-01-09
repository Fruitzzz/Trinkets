import React from "react";
import Alc from "../../images/Alc.jpg";
import { Card, CardTitle, Icon } from "react-materialize";
const CollectionCard = ({ content }) => {
  return (
    <Card
      className="col s12 m4 hoverable"
      actions={[
        <button
          key="1"
          className="btn-flat right"
          style={{ marginBottom: "10px" }}
        >
          Подробнее
        </button>,
      ]}
      closeIcon={<Icon>close</Icon>}
      header={<CardTitle image={Alc} reveal waves="light" />}
      reveal={<p>{content.description}</p>}
      revealIcon={<Icon>more_vert</Icon>}
      title={content.title}
    >
      <p>Type: {content.subject}</p>
      <p>Author: {content.ownerName}</p>
    </Card>
  );
};

export default CollectionCard;
