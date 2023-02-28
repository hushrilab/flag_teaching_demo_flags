import React, { useState, useEffect } from 'react';
import ROSLIB from 'roslib';
import Argentina from './flags/Argentina.jpg';
import Bolivia from './flags/Bolivia.jpg';
import Brazil from './flags/Brazil.jpg';
import Canada from './flags/Canada.jpg';
import Chile from './flags/Chile.jpg';
import Columbia from './flags/Columbia.jpg';
import Ecador from './flags/Ecador.jpg';
import Germany from './flags/Germany.jpg';
import Guyana from './flags/Guyana.jpg';
import Iran from './flags/Iran.jpg';
import Italy from './flags/Italy.jpg';
import Mexico from './flags/Mexico.jpg';
import Paraguay from './flags/Paraguay.jpg';
import Peru from './flags/Peru.jpg';
import Suriname from './flags/Suriname.jpg';
import Uruguay from './flags/Uruguay.jpg';
import USA from './flags/USA.jpg';
import Venezuela from './flags/Venezuela.jpg';

function ImageSequence() {
  const [index, setIndex] = useState(0);
  const flags = [Argentina, Bolivia, Brazil, Canada, Chile,
     Columbia, Ecador, Germany, Guyana, Iran, Italy, Mexico, 
     Paraguay, Peru, Suriname, Uruguay, USA, Venezuela];

  useEffect(() => {
    // Connecting to ROS
    const ros = new ROSLIB.Ros({
      url : 'ws://127.0.0.1:9090'
    });

    ros.on('connection', function() {
      console.log('Connected to websocket server.');
    });

    ros.on('error', function(error) {
      console.log('Error connecting to websocket server: ', error);
    });

    ros.on('close', function() {
      console.log('Connection to websocket server closed.');
    });

    const next_country = new ROSLIB.Topic({
      ros : ros,
      name : '/next_country',
      messageType : 'std_msgs/String'
    });

    next_country.subscribe(function(message) {
      setIndex((index) => (index + 1));
    });

    return () => {
      next_country.unsubscribe();
      ros.close();
    };
  }, []);

  useEffect(() => {

  }, [index]);

  return <img src={flags[index]} style={{ width: '100%', height: 'auto' }}/>;
}


function App() {
  return (
    <div className="App">
      <ImageSequence />
    </div>
  );
}

export default App;