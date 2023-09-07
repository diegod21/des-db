import React, {useEffect, useState} from 'react';


function Footer(){
const [city, setCity] = useState("");
  const [dateTime, setDateTime] = useState("");

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          const userCity = data.address.city || data.address.town || data.address.village || "Desconhecida";
          setCity(userCity);
        } catch (error) {
          console.error("Erro ao buscar a cidade do usuário:", error);
        }
      });
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Janeiro é 0, então somamos 1
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    getCurrentLocation();
    setDateTime(getCurrentDate());
  }, []);

    return(
        <footer>
        {city ? `${city} ${dateTime}` : dateTime}
      </footer>
    )
}
export default Footer