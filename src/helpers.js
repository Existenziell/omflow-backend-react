import axios from 'axios';

const log = (msg) => {
  console.log(msg)
}

const loadMapData = () => {
  axios.get('http://localhost:5000/maps/')
    .then(response => {
      return (response.data);
    })
    .catch((error) => {
      console.log(error);
    })
}

export { log, loadMapData }
