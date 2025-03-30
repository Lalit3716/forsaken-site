export function parseCSV(text: string) {
  const lines = text.split("\n");

  if (lines.length < 2) {
    throw new Error("CSV file is empty or invalid");
  }

  const columns = lines[0].split(",").map((col) => col.trim());
  const data = lines
    .slice(1)
    .filter((line) => line.trim())
    .map((line) => {
      const values = line.split(",").map((val) => val.trim());
      const row: Record<string, unknown> = {};
      columns.forEach((col, index) => {
        row[col] = values[index];
      });
      return row;
    });

  return { columns, data };
}

async function loadCSVData(
  filePath: string
): Promise<{ columns: string[]; data: Record<string, unknown>[] }> {
  const response = await fetch(filePath);
  const text = await response.text();
  return parseCSV(text);
}

export async function loadDatasource(id: string) {
  const dataSet = await loadCSVData(`/data/${id}.csv`);
  return {
    id,
    name: id.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    dataSet,
  };
}
