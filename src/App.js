import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";

import NotificationsManager from "src/components/notifications";
import Views from "./views";
import Login from "./views/login";
import { ThemeProvider } from "./context/theme";
import MergedMonitor from "./views/NewMonitor";
import Configure from "./views/configure";
import { getCurrentUser } from "@aws-amplify/auth";
import PrivateRoute from "./privateRoute";



function App() {


  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><MergedMonitor /></PrivateRoute>} />
            <Route path="/configure" element={<PrivateRoute><Configure /></PrivateRoute>} />
            <Route path="/monitor" element={<Views />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <NotificationsManager />
    </>
  );
}

export default App;
