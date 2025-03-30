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
  setSelectedQuery: (query: Query) => void;
  addQuery: (query: Query) => void;
  updateQuery: (query: Query) => void;
  setLoading: (loading: boolean) => void;
  clearSelectedQuery: () => void;
  runQuery: () => void;
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
  setSelectedQuery: (query: Query) => set({ selectedQuery: query }),
  addQuery: (query: Query) =>
    set((state) => ({ queries: [...state.queries, query] })),
  updateQuery: (query: Query) => {
    set((state) => ({
      queries: state.queries.map((q) => (q.id === query.id ? query : q)),
    }));
    set({ selectedQuery: query });
  },
  setLoading: (loading: boolean) => set({ loading }),
  runQuery: async () => {
    const query = get().selectedQuery;

    if (!query) return;

    if (query.result) {
      get().updateQuery({ ...query, executionTime: 0 });
      return;
    }

    set({ loading: true });
    const { result, executionTime } = await executeQuery(query);
    get().updateQuery({ ...query, result, executionTime });
    set({ loading: false });
  },
  saveQuery: (query: Query) => {
    set((state) => ({
      queries: [...state.queries, query],
    }));
  },
  clearSelectedQuery: () => set({ selectedQuery: null }),
}));
