import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
// création d'un context via createContext
export const ProducerContext = createContext();

const useProducerProvider = () => {
  const [producerData, setProducerData] = useState([]);
  const [producerProducts, setProducerProducts] = useState([]);

  const getProducerById = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost:8000/api/stores/${id}`,
      );
      const producerResult = result;
      setProducerData([producerResult.data]);
    }
    catch (e) {
      // console.log(e);
    }
  };

  const getProductByProducer = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost:8000/api/stores/${id}/products`,
      );
      setProducerProducts(result.data.products);
    }
    catch (e) {
      // console.log(e);
    }
  };
  return {
    producerData,
    setProducerData,
    getProductByProducer,
    producerProducts,
    getProducerById,
  };
};

export default useProducerProvider;
