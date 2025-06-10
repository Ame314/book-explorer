import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';

import Layout from "./route/Layout";
import Inicio from "./pages/Inicio";
import Books from "./pages/Books"
import RouterHooks from "./pages/RouterHooks";
import TodoApp from "./pages/TodoApp";
import HighChartsPage from "./pages/HighChartsPage";
import ApiRestMono from "./pages/ApiRestMono";
import NoPage from "./route/NoPage";
import './css/global.css';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="books" element={<Books />} />
          <Route path="router-hooks" element={<RouterHooks />} />
          <Route path="todo" element={<TodoApp />} />
          <Route path="highcharts" element={<HighChartsPage />} />
          <Route path="api-rest" element={<ApiRestMono />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
