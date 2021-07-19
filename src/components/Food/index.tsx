import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';
import { FoodInterface } from '../../types'

interface FoodPropsInterface{
  food : FoodInterface,
  handleEditFood : (food : FoodInterface) => void,
  handleDeleteFood : (id : number) => void,
}

export function Food ( { food , handleDeleteFood , handleEditFood } : FoodPropsInterface ) {
  const available  = food.available;
  const [ isFoodAvailable , setIsFoodAvailable] = useState(available)

  const toggleAvailable = async () => {
    const isAvailable = isFoodAvailable;

    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsFoodAvailable(!isFoodAvailable)
    
  }

  const setEditingFood = () => {
    handleEditFood(food);
  }

  return (
    <Container available={isFoodAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDeleteFood(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{ isFoodAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isFoodAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
  
};
