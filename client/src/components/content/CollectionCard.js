import { React } from "react";
import Alc from "../../images/Alc.jpg";
import { Link } from "react-router-dom";
import { Card, CardTitle, Icon } from "react-materialize";
const CollectionCard = ({ collection }) => {
  return (
    <Card
      className="col s12 m4 hoverable"
      actions={[
        <Link key={collection._id} to={`/collection/${collection._id}`}>
          <button className="btn-flat right" style={{ marginBottom: "10px" }}>
            Подробнее
          </button>
        </Link>,
      ]}
      closeIcon={<Icon>close</Icon>}
      header={<CardTitle image={Alc} reveal waves="light" />}
      reveal={<p>{collection.description}</p>}
      revealIcon={<Icon>more_vert</Icon>}
      title={collection.title}
    >
      <p>
        Type:
        <Link
          className="blue-grey-text text-darken-2"
          to={`/profile/${collection.ownerId}`}
        >
          {` ${collection.subject}`}
        </Link>
      </p>
      <p>
        Author:
        <Link
          className="blue-grey-text text-darken-2"
          to={`/profile/${collection.ownerId}`}
        >
          {` ${collection.ownerName}`}
        </Link>
      </p>
    </Card>
  );
};

export default CollectionCard;
