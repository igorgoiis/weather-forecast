import { IDailyWeatherForecastProps } from '@components/DailyWeatherForecast';
import { IListForecast } from '@interfaces/ListForecast';

export function unixTimestampGetTime(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  return hours + ':' + minutes.substr(-2);
}

export function unixTimestampGetDataTime(timestamp: number) {
  const date = new Date(timestamp * 1000).getDay();
  return date;
}

export function formatDateForecast(list: IListForecast[]) {
  const weekDay = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sabado'
  ];
  const response: IDailyWeatherForecastProps[] = [];

  const currentDay = new Date();

  list.forEach((item) => {
    if (item.dt) {
      const date = new Date(item.dt * 1000);
      if (date.getDate() !== currentDay.getDate()) {
        if (date.getDate() === currentDay.getDate() + 1) {
          if (response.length === 0) {
            response.push({
              day: weekDay[date.getDay()],
              weathers: [
                {
                  dt: date,
                  description: item.weather ? item.weather[0].description : '',
                  icon: item.weather ? item.weather[0].icon : '',
                  temp:
                    item.main && item.main.temp ? Math.round(item.main.temp) : 0
                }
              ]
            });
          } else {
            response[0].weathers.push({
              dt: date,
              description: item.weather ? item.weather[0].description : '',
              icon: item.weather ? item.weather[0].icon : '',
              temp: item.main && item.main.temp ? Math.round(item.main.temp) : 0
            });
          }
        }
        if (date.getDate() === currentDay.getDate() + 2) {
          if (!response[1]) {
            response.push({
              day: weekDay[date.getDay()],
              weathers: [
                {
                  dt: date,
                  description: item.weather ? item.weather[0].description : '',
                  icon: item.weather ? item.weather[0].icon : '',
                  temp:
                    item.main && item.main.temp ? Math.round(item.main.temp) : 0
                }
              ]
            });
          } else {
            response[1].weathers.push({
              dt: date,
              description: item.weather ? item.weather[0].description : '',
              icon: item.weather ? item.weather[0].icon : '',
              temp: item.main && item.main.temp ? Math.round(item.main.temp) : 0
            });
          }
        }
        if (date.getDate() === currentDay.getDate() + 3) {
          if (!response[2]) {
            response.push({
              day: weekDay[date.getDay()],
              weathers: [
                {
                  dt: date,
                  description: item.weather ? item.weather[0].description : '',
                  icon: item.weather ? item.weather[0].icon : '',
                  temp:
                    item.main && item.main.temp ? Math.round(item.main.temp) : 0
                }
              ]
            });
          } else {
            response[2].weathers.push({
              dt: date,
              description: item.weather ? item.weather[0].description : '',
              icon: item.weather ? item.weather[0].icon : '',
              temp: item.main && item.main.temp ? Math.round(item.main.temp) : 0
            });
          }
        }
        if (date.getDate() === currentDay.getDate() + 4) {
          if (!response[3]) {
            response.push({
              day: weekDay[date.getDay()],
              weathers: [
                {
                  dt: date,
                  description: item.weather ? item.weather[0].description : '',
                  icon: item.weather ? item.weather[0].icon : '',
                  temp:
                    item.main && item.main.temp ? Math.round(item.main.temp) : 0
                }
              ]
            });
          } else {
            response[3].weathers.push({
              dt: date,
              description: item.weather ? item.weather[0].description : '',
              icon: item.weather ? item.weather[0].icon : '',
              temp: item.main && item.main.temp ? Math.round(item.main.temp) : 0
            });
          }
        }
      }
    }
  });

  return response;
}
