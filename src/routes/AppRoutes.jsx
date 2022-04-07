import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import RequireAuth from "../hoc/RequireAuth"
import routes from "./routes"
import Layout from "./../core/Layout"

function AppRoutes() {
  return (
    <Routes>
      {routes.public.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        {routes.private.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
        <Route path="/" element={<Navigate replace to="/map" />} />
        <Route path="/*" element={<Navigate replace to="/map" />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
