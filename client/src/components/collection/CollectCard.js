import React from "react";
import Alc from "../../images/Alc.jpg";
import { Card, CardTitle, Icon } from "react-materialize";
const CollectCard = () => {
  return (
      <Card
      className="col s12 m4"
        actions={[<button key="1" className="btn-flat right" style={{marginBottom: "10px"}}>Подробнее</button>]}
        closeIcon={<Icon>close</Icon>}
        header={<CardTitle image={Alc} reveal waves="light" />}
        reveal={
          <p>
            Here is some more information about this product that is only
            revealed once clicked on.
          </p>
        }
        revealIcon={<Icon>more_vert</Icon>}
        title="Card Title"
      >
        <p>Type: Alcohol</p>
      </Card>
  );
};

export default CollectCard;
