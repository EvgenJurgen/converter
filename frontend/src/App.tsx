import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTE_PATHS, ROUTES } from "./app/routing";
import { Layout } from "./app/ui";

function App() {
  return (
    <Layout>
      <Routes>
        {ROUTES.map(({ route, Page }) => (
          <Route path={route} key={route} element={<Page />} />
        ))}
        <Route
          path="*"
          element={<Navigate to={ROUTE_PATHS.converter} replace />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
