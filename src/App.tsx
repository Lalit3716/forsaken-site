import Layout from "./components/ui/Layout";
import QueryEditor from "./components/QueryEditor";
import DatasourceSection from "./components/DatasourceSection";
import QueryResultViewer from "./components/QueryResultViewer";

function App() {
  return (
    <Layout>
      <QueryEditor>Query Editor</QueryEditor>
      <DatasourceSection>Datasource Section</DatasourceSection>
      <QueryResultViewer>Query Result Viewer</QueryResultViewer>
    </Layout>
  );
}

export default App;
