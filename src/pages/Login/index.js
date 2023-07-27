import { useState, useContext } from 'react';
import {
  Button, Form, Grid, Header, Message, Segment,
} from 'semantic-ui-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { object, string } from 'yup';
import Footer from '../../components/Footer';
import HeaderMain from '../../components/HeaderMain';
import { UserContext } from '../../utils/providers/useUserProvider';
import './styles.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorsArray, setErrorsArray] = useState([]);
  // const [formError, setformError] = useState(false);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const userSchema = object({
    email: string().email('Vous devez rentrer un email valide').max(255).required('L\'Email est requis'),
    password: string().required('Mot de passe requis'),
  });

  const userData = {
    email: email,
    password: password,
  };

  const newUserSchema = async () => {
    try {
      const validationResult = await userSchema.validate(userData, {
        abortEarly: false,
      });
      // console.log('🚀~ newUserSchema ~ validationResult:', validationResult);
    }
    catch (err) {
      setErrorsArray(err.errors);
      err.errors.forEach((error) => toast.error(error, { theme: "colored" }));
      // console.log(err.errors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newUserSchema();
    if (email !== '' && password !== '') {
      try {
        await login(email, password);
        navigate('/local-market');
      }
      catch (err) {
        toast.error("L'adresse e-mail et / ou le mot de passe sont incorects", { theme: "colored", autoClose: 2000 });
        // console.error(err);
      }
    }
  };

  return (
    <main className="login">
      <HeaderMain />
      <Button
        onClick={() => navigate(-1)}
        color="teal"
        className="login-buttonreturn"
      >
        Retour
      </Button>
      <div className="login--container container">
        <div className="form-container">
          <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                Connectez-vous
              </Header>
              <Form size="large" onSubmit={handleSubmit}>
                <Segment stacked>
                  <Form.Field>
                    <Form.Input
                      fluid
                      icon="user"
                      type="email"
                      iconPosition="left"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      icon="lock"
                      type="password"
                      iconPosition="left"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Field>
                  <Button type="submit" color="teal" fluid size="large">
                    Connexion
                  </Button>
                </Segment>
              </Form>
              <Link to="/sign-in">
                <Message>Pas encore inscrit ?</Message>
              </Link>
            </Grid.Column>
          </Grid>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Login;
