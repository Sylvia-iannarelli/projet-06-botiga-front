import { createContext, useContext, useState } from 'react';

const TestContext = createContext();

const TestProvider = ({ children }) => {
  const test = 'test';

  return (
    <TestContext.Provider value={{ test }}>{children}</TestContext.Provider>
  );
};

export const useTest = () => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within an TestProvider');
  }
  return context;
};

export default TestProvider;
export { TestContext };
