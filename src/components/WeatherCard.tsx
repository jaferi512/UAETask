import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WeatherCardProps {
  data: {
    coord: {
      lon: number;
      lat: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cityName}>{data && data.name}</Text>
      <Text style={styles.weatherDescription}>{data.weather && data.weather[0].description}</Text>
      <Text style={styles.temperature}>Temperature: {data.main && data.main.temp}°C</Text>
      <Text style={styles.humidity}>Humidity: {data.main && data.main.humidity}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:'80%',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  weatherDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  temperature: {
    fontSize: 16,
    marginBottom: 4,
  },
  humidity: {
    fontSize: 16,
  },
});

export default WeatherCard;
