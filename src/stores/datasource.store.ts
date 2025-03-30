import { create } from "zustand";
import { loadDatasource } from "../utils/dataLoader";

type DataSet = {
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
  loadDatasource: (id: string) => Promise<Datasource>;
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
  {
    label: "Territories",
    value: "territories",
  },
];

export const useDatasourceStore = create<DatasourceStore>((set, get) => ({
  loading: false,
  availableDatasources: AVAILABLE_DATASOURCES,
  datasources: {},
  selectedDatasource: null,
  setSelectedDatasource: (datasource: Datasource) =>
    set({ selectedDatasource: datasource }),
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
    }));

    set({ loading: false });

    return dataSource;
  },
}));
