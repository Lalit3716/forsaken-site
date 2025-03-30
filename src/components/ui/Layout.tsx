import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "query-editor datasource-section"
    "query-editor query-result-viewer";
  height: 100vh;
`;

export default Layout;
