import React, { Component } from "react";
import CollectionsOverview from "../../collections-overview/collections-overview.component";
import { useLocation } from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import { Routes, Route } from "react-router-dom";

const ShopPage = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="shop-page">
      <Routes>
        <Route exact path="" element={<CollectionsOverview />} />
        <Route
          path="/:collectionId"
          element={<CollectionPage pathname={pathname} />}
        />
      </Routes>
    </div>
  );
};
export default ShopPage;
