import Layout from "./components/ui/Layout";
import QueryEditor from "./components/QueryEditor";
import DatasourceSection from "./components/DatasourceSection";
import QueryResultViewer from "./components/QueryResultViewer";
import { useGetPerformance } from "./hooks/useGetPerformance";

function App() {
  useGetPerformance({
    screenName: "App",
  });

  return (
    <Layout>
      <QueryEditor />
      <DatasourceSection />
      <QueryResultViewer />
    </Layout>
  );
}

export default App;
