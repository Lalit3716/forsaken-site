import { BiImport } from "react-icons/bi";

import { useShallow } from "zustand/shallow";

import { Container, GridArea } from "../ui/Container";
import ToolbarContainer from "../ui/Toolbar";
import { IconButton } from "../ui/Button";
import { Title } from "../ui/Title";
import { Table } from "../ui/Table";
import { useQueryStore } from "../../stores/queries.store";
import { Loading } from "../ui/Loading";
import { Badge } from "../ui/Badge";
import { exportToCSV } from "../../utils/export";

function QueryResultViewer() {
  const { loading, result, executionTime } = useQueryStore(
    useShallow((state) => ({
      loading: state.loading,
      result: state.result,
      executionTime: state.executionTime,
    }))
  );

  const handleExport = () => {
    if (result) {
      exportToCSV(result, "export.csv");
    }
  };

  const renderContent = () => {
    if (loading) return <Loading />;

    if (result) {
      return (
        <Table data={result?.data ?? []} columns={result?.columns ?? []} />
      );
    }

    return <Container $centered>Execute the query to view results</Container>;
  };

  return (
    <GridArea $gridArea="query-result-viewer">
      <ToolbarContainer>
        <Title>Query Result Viewer</Title>
        {executionTime !== null && (
          <Badge>Execution Time: {executionTime}ms</Badge>
        )}
        <IconButton
          text="Export"
          icon={<BiImport />}
          onClick={handleExport}
          disabled={!result}
        />
      </ToolbarContainer>
      {renderContent()}
    </GridArea>
  );
}

export default QueryResultViewer;
