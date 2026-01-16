import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Recommended from '../pages/Recommended'; 
import RecipeDetail from '../pages/RecipeDetail';
import RecipeManagement from '../pages/RecipeManagement';
import AdminPanel from '../pages/AdminPanel';
function RouterConfig() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/recommended" element={<Recommended />} />
        <Route path="/Meals/:id" element={<RecipeDetail/>} />
        <Route path="/manage" element={<RecipeManagement />} />
        <Route path="/admin" element={<AdminPanel />} />

    </Routes>
  )
}

export default RouterConfig;