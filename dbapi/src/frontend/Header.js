import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ formType }) {
  const navigate = useNavigate();

  const redirectToForm = () => {
    switch (formType) {
      case 'people':
        navigate('/people-form'); 
        break;
      case 'cities':
       navigate('/city-form'); 
        break;

        case 'bairro':
       navigate('/bairro-form'); 
        break;

        case 'produtos':
       navigate('/produtos-form'); 
        break;

        case 'vendas':
          navigate('/vendas-form'); 
           break;

        

      default:
        break;
    }
  };

  return (
    <div>
      <button className="greenbtn" onClick={redirectToForm}>Inlcuir {formType.charAt(0).toUpperCase() + formType.slice(1)}</button>
    </div>
  );
}

export default Header;
