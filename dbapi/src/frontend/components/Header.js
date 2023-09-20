import React from 'react';
import { useNavigate  } from 'react-router-dom';
import '../css/global.css'


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
      <button className="headerbtn" onClick={redirectToForm}>Inlcuir</button>
    </div>
  );
}

export default Header;
