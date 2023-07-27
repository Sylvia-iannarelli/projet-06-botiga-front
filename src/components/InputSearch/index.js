import { Icon, Input } from 'semantic-ui-react';
import './styles.scss';

const InputSearch = () => (
  <Input
    icon={<Icon name="search" size="large" link color="black" />}
    placeholder="Produit recherché"
    className="input-search"
  />
);
export default InputSearch;
