import { CityCard } from './components/CityCard';
import './styles/global.css';

const DUMMY_CITY_LIST = [
  {
    nameKo: '서울',
    nameEn: 'Seoul',
    price: '1000000'
  },
  {
    nameKo: '도쿄',
    nameEn: 'Tokyo',
    price: '1000000'
  },
  {
    nameKo: '방콕',
    nameEn: 'Bangkok',
    price: '1000000'
  },
  {
    nameKo: '베이징',
    nameEn: 'Beijing',
    price: '1000000'
  },
  {
    nameKo: '베를린',
    nameEn: 'Berlin',
    price: '1000000'
  },
  {
    nameKo: '로마',
    nameEn: 'Roma',
    price: '1000000'
  }
];

function App() {
  return (
    <div className="relative h-screen">
      <div className="absolute w-full h-full flex flex-col justify-between items-center">
        <div className="flex space-x-1 -mt-6">
          {DUMMY_CITY_LIST.map((city) => (
            <CityCard key={city.nameEn} nameKo={city.nameKo} nameEn={city.nameEn} price={city.price} />
          ))}
        </div>
        <div className="flex space-x-1 -mb-6">
          {DUMMY_CITY_LIST.map((city) => (
            <CityCard key={city.nameEn} nameKo={city.nameKo} nameEn={city.nameEn} price={city.price} />
          ))}
        </div>
      </div>
      <div className="absolute w-full h-full flex flex-row justify-around items-center">
        <div className="flex flex-col -ml-48">
          {DUMMY_CITY_LIST.map((city) => (
            <CityCard
              className="-rotate-90 -mb-11 last:mb-0"
              key={city.nameEn}
              nameKo={city.nameKo}
              nameEn={city.nameEn}
              price={city.price}
            />
          ))}
        </div>
        <div className="flex flex-col -mr-48">
          {DUMMY_CITY_LIST.map((city) => (
            <CityCard
              className="rotate-90 -mb-11 last:mb-0"
              key={city.nameEn}
              nameKo={city.nameKo}
              nameEn={city.nameEn}
              price={city.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
