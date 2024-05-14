/* eslint-disable no-restricted-globals */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  object, string, number, boolean,
} from 'yup';
import {
  Button, Form, Checkbox, Label,
} from 'semantic-ui-react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/Footer';
import HeaderMain from '../../components/HeaderMain';
import useUserContext from '../../utils/providers/useUserProvider';
import './styles.scss';

const SignInForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formVerify, setFormVerify] = useState(false);
  const [errorsArray, setErrorsArray] = useState(null);
  const [passwordToVerify, setPasswordToVerify] = useState('');
  const { signInValues, setSignInValues, signIn } = useUserContext();
  const navigate = useNavigate();

  const userSchema = object({
    firstname: string().max(255).required(),
    lastname: string().max(255).required(),
    phone: number().required('Merci de rentrer votre numéro de téléphone'),
    email: string('Merci de rentrer votre email')
      .max(255)
      .required('Merci de rentrer votre email'),

    password: string().max(255).required('Merci de rentrer votre mot de passe'),
    passwordToVerify: string().max(255).required('mots de passes différents'),
    // checkbox: boolean()
    //   .oneOf([true], 'You must accept the pricing policy terms and conditions').required(),
  });

  const userData = {
    firstname: firstname,
    lastname: lastname,
    phone: phone,
    email: email,
    password: password,
    passwordToVerify: passwordToVerify,
  };

  useEffect(() => {
    if (signInValues !== null) {
      setFormVerify(false);
      setErrorsArray(null);
      navigate('/login');
    }
  }, [signInValues]);

  const handleChange = (value, setValue) => {
    setValue(value);
  };

  const newUserSchema = async () => {
    try {
      const validationResult = await userSchema.validate(userData, {
        abortEarly: false,
      });
      setSignInValues(validationResult);
    }
    catch (err) {
      setErrorsArray(err.errors);
      err.errors.forEach((error) => toast.error(error));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await newUserSchema();
    await signIn(userData);
  };

  useEffect(() => {
    if (errorsArray !== null) {
      setFormVerify(true);
    }
  }, [errorsArray]);

  return (
    <section className="signIn">
      <HeaderMain />
      <Button
        onClick={() => navigate(-1)}
        color="teal"
        className="signIn-buttonreturn"
      >
        Retour
      </Button>
      <div className="signIn-form">
        <h2>Rejoignez nous! </h2>
        <a
          href="http://localhost:8000/user/new"
          className="signIn-backoffice"
        >
          <h3 className="signIn-producerText">
            Vous êtes producteur ? Par ici !
          </h3>
        </a>
        <h3>Inscription</h3>
        <Form>
          <Form.Field>
            <Label>Prénom</Label>
            <Form.Input
              placeholder="Prénom"
              name="firstame"
              value={firstname}
              type="text"
              onChange={() => handleChange(event.target.value, setFirstname)}
              required
            />
          </Form.Field>
          <Form.Field>
            <Label>Nom de famille</Label>
            <Form.Input
              placeholder="Nom de famille"
              name="lastname"
              value={lastname}
              type="text"
              onChange={() => handleChange(event.target.value, setLastname)}
              required
            />
          </Form.Field>
          <Form.Field>
            <Label>Email</Label>
            <Form.Input
              fluid
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={() => handleChange(event.target.value, setEmail)}
              required
            />
          </Form.Field>
          <Form.Field>
            <Label>Téléphone</Label>
            <Form.Input
              placeholder="Téléphone"
              name="phone"
              value={phone}
              type="text"
              onChange={() => handleChange(event.target.value, setPhone)}
              required
            />
          </Form.Field>
          <Form.Field>
            <Label>Mot de passe</Label>
            <Form.Input
              placeholder="Mot de passe"
              name="password"
              value={password}
              type="password"
              onChange={() => handleChange(event.target.value, setPassword)}
              required
            />
          </Form.Field>
          <Form.Field>
            <Label>Verifier votre mot de passe</Label>
            <Form.Input
              placeholder="Vérifier votre mot de passe"
              name="passwordToVerify"
              value={passwordToVerify}
              type="password"
              onChange={() => {
                handleChange(event.target.value, setPasswordToVerify);
              }}
              required
            />
          </Form.Field>
          <Form.Field>
            <Checkbox required label="J'accepte les termes et conditions d'utilisation" />
          </Form.Field>
          <Button
            color="pink"
            type="submit"
            onClick={() => handleSubmit(event)}
          >
            S'inscrire
          </Button>
        </Form>
      </div>
      <Footer />
    </section>
  );
};
export default SignInForm;
