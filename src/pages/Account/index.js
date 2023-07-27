import { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  object, string, number,
} from 'yup';
import HeaderMain from '../../components/HeaderMain';
import Footer from '../../components/Footer';
import { UserContext } from '../../utils/providers/useUserProvider';
import './styles.scss';

const Account = () => {
  const { user, updateAccount } = useContext(UserContext);
  const [email, setEmail] = useState(user.email);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [phone, setPhone] = useState(user.phone);

  const userSchema = object({
    firstname: string().max(255).required('Le prénom est requis'),
    lastname: string().max(255).required('Le nom est requis'),
    phone: number('Le numéro de téléphone doit etre composé de chiffres').required('Le numéro de téléphone est requis'),
    email: string().max(255).required('L\'Email est requis'),
  });

  const userData = {
    firstname: firstname,
    lastname: lastname,
    phone: phone,
    email: email,
  };
  const newUserSchema = async () => {
    try {
      await userSchema.validate(userData, {
        abortEarly: false,
      });
      updateAccount(email, firstname, lastname, phone);
    }
    catch (err) {
      err.errors.forEach((error) => toast.error(error));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateAccount(userData);
    newUserSchema();
  };

  return (
    <main className="account">
      <HeaderMain />
      <div className="account--container container">
        <div className="form-container">
          <h2 className="account--container--title">Informations Personnelles</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Prénom</label>
              <input
                placeholder="Prénom"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Nom</label>
              <input
                placeholder="Nom"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Téléphone</label>
              <input
                type="tel"
                placeholder="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Field>
            <Button type="submit" color="green">
              Mettre à jour
            </Button>
          </Form>
        </div>
      </div>
      <Footer />
    </main>
  );
};
export default Account;
