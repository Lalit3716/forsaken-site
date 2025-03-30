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
