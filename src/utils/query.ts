import { DataSet, useDatasourceStore } from "../stores/datasource.store";
import type { Query } from "../stores/queries.store";

function selectRandom<T>(array: T[], count: number): T[] {
  const selected: T[] = [];
  const available = [...array];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    selected.push(available[randomIndex]);
    available.splice(randomIndex, 1);
  }

  return selected;
}

const fetchRandomDataSet = (dataSet: DataSet): DataSet => {
  const numColumns = Math.max(
    1,
    Math.floor(Math.random() * dataSet.columns.length)
  );

  const selectedColumns = selectRandom(dataSet.columns, numColumns);

  const numRows = Math.max(1, Math.floor(Math.random() * dataSet.data.length));

  const selectedRows = selectRandom(dataSet.data, numRows).map((row) => {
    const newRow: Record<string, unknown> = {};
    selectedColumns.forEach((col) => {
      newRow[col] = row[col];
    });
    return newRow;
  });

  return {
    columns: selectedColumns,
    data: selectedRows,
  };
};

export const executeQuery = async (query: Query) => {
  const datasource =
    useDatasourceStore.getState().datasources[query.datasourceId];
  if (!datasource) {
    throw new Error("Datasource not found");
  }

  // Wait random amount of time from 100ms to 300ms
  const executionTime = Math.floor(Math.random() * 200 + 100);
  await new Promise((resolve) => setTimeout(resolve, executionTime));

  return {
    executionTime,
    result: fetchRandomDataSet(datasource.dataSet),
  };
};
