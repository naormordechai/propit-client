import React from 'react';
import { Layout } from './components/Layout/Layout';
import { TodosContainer } from './containers/TodosContainer/TodosContainer';

function App() {
  return (
    <div>
      <Layout>
        <TodosContainer />
      </Layout>
    </div>
  );
}

export default App;
