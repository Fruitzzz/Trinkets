import { React, useCallback, useState, useEffect} from "react";
import Loader from "../technical/Loader";
import { useHttp } from "../../hooks/http.hook";
import { useParams, useHistory, Link } from "react-router-dom";
import Alc from "../../images/Alc.jpg";
import { Collapsible, CollapsibleItem, Icon } from "react-materialize";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Item from "./Item";
import Button from "@material-ui/core/Button";
const Collection = () => {
  const { request } = useHttp();
  const history = useHistory();
  const params = useParams();
  const [collection, setCollection] = useState(null);
  const [items, setItems] = useState([]);
  const fetchCollection = useCallback(async () => {
    try {
      const fetched = await request(`/api/collections/collection/${params.id}`);
      setCollection(fetched.collection);
      setItems(fetched.items);
    } catch (e) {
      history.push("/notFound");
    }
  }, [request, params.id, history]);
  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);
  if (!collection) {
    return <Loader />;
  }
  return (
    <div className="row content">
      <div className="col s12 m6">
        <img alt="" className="responsive-img" src={Alc} />
      </div>
      <div className="col s12 m6">
        <ul className="collection with-header">
          <li className="collection-header">
            <h3 className="center-align">{collection.title}</h3>
          </li>
          <li className="collection-item">
            <p className="flow-text">Автор: {collection.ownerName}</p>
          </li>
          <li className="collection-item">
            <p className="flow-text"> Тема: {collection.subject}</p>
          </li>
          <li className="collection-item">
            <p className="flow-text"> Количество элементов: {items.length}</p>
          </li>
        </ul>
      </div>
      <div className="col s12">
        <Collapsible accordion>
          <CollapsibleItem
            expanded={false}
            header="Описание"
            icon={<Icon>more_horiz</Icon>}
          >
            <ReactMarkdown
              plugins={[gfm]}
              children={collection.description}
            ></ReactMarkdown>
          </CollapsibleItem>
        </Collapsible>
      </div>
      <div className="col s6">
        <h4>Элементы коллекции</h4>
      </div>
      <div className="col s12">
        <Link to="/addItem">
          <Button variant="outlined" className="blue-border-btn right">
            Добавить элемент
          </Button>
        </Link>
      </div>
      <div className="col s12">
        <ul className="collection">
          <Item />
        </ul>
      </div>
    </div>
  );
};
export default Collection;
