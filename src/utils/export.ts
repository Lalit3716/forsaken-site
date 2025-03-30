import type { DataSet } from "../stores/datasource.store";

export const exportToCSV = (
  dataSet: DataSet,
  filename: string = "export.csv"
) => {
  if (!dataSet || !dataSet.columns || !dataSet.data) {
    throw new Error("Invalid dataset provided for export");
  }

  const header = dataSet.columns.join(",");

  const rows = dataSet.data.map((row) =>
    dataSet.columns
      .map((column) => {
        const value = row[column];
        // Handle values that contain commas or quotes
        if (
          typeof value === "string" &&
          (value.includes(",") || value.includes('"'))
        ) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      })
      .join(",")
  );

  const csvContent = [header, ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
