import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { GET_FOODS } from '../graphql/foodQuaries';
import {AiOutlineCloseCircle} from 'react-icons/ai'


const DeleteBotton = ({id}) => {
  const [error, setError] = useState(null);

  useQuery(GET_FOODS);

  const [deleteFood] = useMutation(DELETE_FOOD, {
    update(proxy) {
      // Remove the deleted Food object from the cache
      const data = proxy.readQuery({
        query: GET_FOODS,
      });

      const updatedFoods = data.getFoods.filter((food) => food.id !== id);

      proxy.writeQuery({
        query: GET_FOODS,
        data: { getFoods: updatedFoods },
      });
    },
    onError(error) {
      setError(error.message);
    },
    variables: {
      id,
    },
  });

  const onDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this food object?')) {
      deleteFood();
    }
  };

  return (
    <div>
      <AiOutlineCloseCircle onClick={onDeleteClick} className='text-red-700 text-[18px] cursor-pointer'/>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default DeleteBotton;

const DELETE_FOOD = gql`
  mutation DeleteFood($id:ID!){
    deleteFood(id: $id)
  }
`;
