import axios from 'axios';

const getStore = async (setProducerData) => {
  try {
    const result = await axios.get(
      // URL
      // 'http://localhost:8000/api/stores',
      'https://botiga-back-office.iannarelli.fr/api/stores',
    );
    setProducerData(result.data);
    // on a recuperé les recettes préférées on va les ajouter dans le state
  }
  catch (e) {
    // afficher une erreur
    // console.log(e);
  }
};
export default getStore;
