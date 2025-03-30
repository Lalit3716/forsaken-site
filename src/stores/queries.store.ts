import { create } from "zustand";
import { DataSet } from "./datasource.store";

type Query = {
  id: string;
  name: string;
  query: string;
  result?: DataSet;
  datasourceId: string;
};

type QueryStore = {
  queries: Query[];
  selectedQuery: Query | null;
  setSelectedQuery: (query: Query) => void;
  addQuery: (query: Query) => void;
  updateQuery: (query: Query) => void;
};

const DEFAULT_QUERIES = [
  {
    id: "1",
    name: "Query 1",
    query: "SELECT * FROM customers",
    datasourceId: "customers",
  },
  {
    id: "2",
    name: "Query 2",
    query: "SELECT * FROM orders",
    datasourceId: "orders",
  },
  {
    id: "3",
    name: "Query 3",
    query: "SELECT * FROM products",
    datasourceId: "products",
  },
];

export const useQueryStore = create<QueryStore>((set) => ({
  queries: DEFAULT_QUERIES,
  selectedQuery: null,
  setSelectedQuery: (query: Query) => set({ selectedQuery: query }),
  addQuery: (query: Query) =>
    set((state) => ({ queries: [...state.queries, query] })),
  updateQuery: (query: Query) =>
    set((state) => ({
      queries: state.queries.map((q) => (q.id === query.id ? query : q)),
    })),
}));
