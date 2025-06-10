import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link> |{" "}
        <Link to="/books">Books</Link> |{" "}
        <Link to="/router-hooks">Router & Hooks</Link> |{" "}
        <Link to="/todo">To-do App</Link> |{" "}
        <Link to="/highcharts">HighCharts</Link> |{" "}
        <Link to="/api-rest">API Rest Mono</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
