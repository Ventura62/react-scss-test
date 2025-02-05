import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";

import { getViews } from 'src/utils/routes';

import { getCurrentUser } from 'aws-amplify/auth';

import Layout from "src/components/layout";

const Views = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };
    checkUser();
  })

  return(
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/monitor" replace />} />
        {getViews((routePath, module) => {
          const Component = module.default;
          return <Route key={routePath} path={`/${routePath}`} element={<Component />} />;
        })}
      </Routes>
    </Layout>
  )
}

export default Views;