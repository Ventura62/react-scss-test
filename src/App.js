import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import NotificationsManager from "src/components/notifications";
import Views from "./views";
import Login from "./views/login";
import { ThemeProvider } from "./context/theme";
import MergedMonitor from "./views/NewMonitor";
import Configure from "./views/configure";

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MergedMonitor />} />
            <Route path="/configure" element={<Configure />} />
            <Route path="/monitor" element={<Views />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <NotificationsManager />
    </>
  );
}

export default App;
