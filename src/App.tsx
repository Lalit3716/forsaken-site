import Layout from "./components/ui/Layout";
import QueryEditor from "./components/QueryEditor";
import DatasourceSection from "./components/DatasourceSection";
import QueryResultViewer from "./components/QueryResultViewer";

function App() {
  return (
    <Layout>
      <QueryEditor />
      <DatasourceSection />
      <QueryResultViewer />
    </Layout>
  );
}

export default App;
