import { create } from "zustand";
import { DataSet } from "./datasource.store";
import { executeQuery } from "../utils/query";

export type Query = {
  id: string;
  name: string;
  query: string;
  result?: DataSet;
  executionTime?: number;
  datasourceId: string;
};

type QueryStore = {
  loading: boolean;
  queries: Query[];
  selectedQuery: Query | null;
  result: DataSet | null;
  executionTime: number | null;
  setSelectedQuery: (query: Query | null) => void;
  addQuery: (query: Query) => void;
  updateQuery: (query: Query) => void;
  setLoading: (loading: boolean) => void;
  clearSelectedQuery: () => void;
  runQuery: (query?: Query) => void;
  saveQuery: (query: Query) => void;
};

const DEFAULT_QUERIES = [
  {
    id: "-1",
    name: "Select saved queries",
    query: "",
    datasourceId: "",
  },
  {
    id: "1",
    name: "Customers from Sweden",
    query: "SELECT * FROM customers WHERE country = 'Sweden';",
    datasourceId: "customers",
  },
  {
    id: "2",
    name: "Latest 10 orders",
    query: "SELECT * FROM orders ORDER BY order_date DESC LIMIT 10;",
    datasourceId: "orders",
  },
  {
    id: "3",
    name: "Products in stock",
    query: "SELECT * FROM products WHERE unitsInStock > 0;",
    datasourceId: "products",
  },
];

export const useQueryStore = create<QueryStore>((set, get) => ({
  queries: DEFAULT_QUERIES,
  loading: false,
  selectedQuery: null,
  result: null,
  executionTime: null,
  setSelectedQuery: (query: Query | null) => set({ selectedQuery: query }),
  addQuery: (query: Query) =>
    set((state) => ({ queries: [...state.queries, query] })),
  updateQuery: (query: Query) => {
    set((state) => ({
      queries: state.queries.map((q) => (q.id === query.id ? query : q)),
      selectedQuery: query,
    }));
  },
  setLoading: (loading: boolean) => set({ loading }),
  runQuery: async (newQuery?: Query) => {
    const query = get().selectedQuery;

    if (!query && newQuery) {
      const { result, executionTime } = await executeQuery(newQuery);
      set({ result, executionTime });
      return;
    }

    if (!query) return;

    if (query.result) {
      get().updateQuery({ ...query, executionTime: 0 });
      set({ result: query.result, executionTime: query.executionTime });
      return;
    }

    set({ loading: true });
    const { result, executionTime } = await executeQuery(query);
    get().updateQuery({ ...query, result, executionTime });
    set({ loading: false, result, executionTime });
  },
  saveQuery: (query: Query) => {
    set((state) => ({
      queries: [...state.queries, query],
      selectedQuery: query,
    }));
  },
  clearSelectedQuery: () => set({ selectedQuery: null }),
}));
