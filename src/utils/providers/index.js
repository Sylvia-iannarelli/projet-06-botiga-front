import AddressProvider from './useAddressProvider';
import TestProvider from './useTestProvider';

const combineProviders = (providers) => providers.reduce(
  (AccumulatedProviders, [Provider, props = {}]) => ({ children }) => (
    <AccumulatedProviders>
      <Provider {...props}>{children}</Provider>
    </AccumulatedProviders>
  ),

  ({ children }) => <>{children}</>,
);

// eslint-disable-next-line import/prefer-default-export
export const AllProviders = combineProviders([[AddressProvider, TestProvider]]);
