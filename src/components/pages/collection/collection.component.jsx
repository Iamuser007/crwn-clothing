import React from "react";
import "./collection.styles.scss";
import CollectionItem from "../../collection-item/collection-item.component";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { selectCollection } from "../../../redux/shop/shop.selectors";
import { GetLocation } from "../shop/shop.component";

const CollectionPage = ({collection}) => {
  // const { pathname } = props;
  const {title, items} = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className='items'>
        {
          items.map(item => <CollectionItem key={item.id} item={item} />)
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const pathnameParts = ownProps.pathname.split("/"); // Split the pathname into parts
  const collection = selectCollection(pathnameParts[2])(state);

  return {
    collection,
  };
};
export default connect(mapStateToProps)(CollectionPage);
