import { useMe } from "../hooks/useMe";
import { ClientRoute } from "./client-route";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "../components/header";

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      {data.me.role === "Client" && <ClientRoute me={data.me} />}
    </Router>
  );
};
