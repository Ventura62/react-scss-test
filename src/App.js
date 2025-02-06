import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import NotificationsManager from "src/components/notifications";
import Views from "./views";
import Login from "./views/login";
import { ThemeProvider } from "./context/theme";
import MergedMonitor from "./views/NewMonitor";
import Configure from "./views/configure";
import { getCurrentUser } from "@aws-amplify/auth";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        console.log("User details:", user);
        if (user?.signInDetails?.loginId) {
          setLoading(false);
        }

        if (!user?.signInDetails?.loginId && window.location.pathname !== "/login") {
          setLoading(false);
          window.location.href = "/login";

        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";

        }
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
