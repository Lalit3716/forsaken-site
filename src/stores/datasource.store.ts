import { create } from "zustand";
import { loadDatasource, parseCSV } from "../utils/dataLoader";

export type DataSet = {
  columns: string[];
  data: Record<string, unknown>[];
};

type Datasource = {
  id: string;
  name: string;
  dataSet: DataSet;
};

type DatasourceStore = {
  loading: boolean;
  availableDatasources: { label: string; value: string }[];
  datasources: Record<string, Datasource>;
  selectedDatasource: Datasource | null;
  setSelectedDatasource: (datasource: Datasource) => void;
  setSelectedDatasourceById: (id: string) => Promise<void>;
  loadDatasource: (id: string) => Promise<Datasource>;
  addCustomDatasource: (file: File) => Promise<Datasource>;
};

const AVAILABLE_DATASOURCES = [
  {
    label: "Select Datasource",
    value: "",
  },
  {
    label: "Categories",
    value: "categories",
  },
  {
    label: "Customers",
    value: "customers",
  },
  {
    label: "Employees",
    value: "employees",
  },
  {
    label: "Employee Territories",
    value: "employee_territories",
  },
  {
    label: "Order Details",
    value: "order_details",
  },
  {
    label: "Orders",
    value: "orders",
  },
  {
    label: "Products",
    value: "products",
  },
  {
    label: "Regions",
    value: "regions",
  },
  {
    label: "Shippers",
    value: "shippers",
  },
  {
    label: "Suppliers",
    value: "suppliers",
  },
];

export const useDatasourceStore = create<DatasourceStore>((set, get) => ({
  loading: false,
  availableDatasources: AVAILABLE_DATASOURCES,
  datasources: {},
  selectedDatasource: null,
  setSelectedDatasourceById: async (id: string) => {
    if (!id) {
      set({ selectedDatasource: null });
      return;
    }

    await get().loadDatasource(id);
  },
  setSelectedDatasource: (datasource: Datasource) => {
    set({ selectedDatasource: datasource });
  },
  loadDatasource: async (id: string) => {
    // Return existing datasource if already loaded
    const existing = get().datasources[id];
    if (existing) {
      set({ selectedDatasource: existing });
      return existing;
    }

    set({ loading: true });

    // Load new datasource
    const dataSource = await loadDatasource(id);

    // Update store
    set((state) => ({
      datasources: {
        ...state.datasources,
        [id]: dataSource,
      },
      selectedDatasource: dataSource,
      loading: false,
    }));

    return dataSource;
  },
  addCustomDatasource: async (file: File) => {
    set({ loading: true });

    try {
      const text = await file.text();
      const dataSet = parseCSV(text);

      const id = `custom_${Date.now()}`;
      const dataSource: Datasource = {
        id,
        name: file.name
          .replace(".csv", "")
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        dataSet,
      };

      set((state) => ({
        datasources: {
          ...state.datasources,
          [id]: dataSource,
        },
        selectedDatasource: dataSource,
        availableDatasources: [
          ...state.availableDatasources,
          {
            label: dataSource.name,
            value: id,
          },
        ],
      }));

      return dataSource;
    } finally {
      set({ loading: false });
    }
  },
}));
