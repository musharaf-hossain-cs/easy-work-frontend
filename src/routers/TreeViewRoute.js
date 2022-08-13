import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TreeList from '../components/TreeView';

function TreeViewRoute() {
 return (
  <Routes>
   <Route path="*" element={<TreeList />} />
  </Routes>
 );
}

export default TreeViewRoute;
