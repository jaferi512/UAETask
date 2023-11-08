export interface Category {
  id: number;
  name: string;
}

const sensors: Category[] = [
  {id: 0, name: 'acdc1'},
  {id: 1, name: 'abba5'},
  {id: 2, name: 'iddqd'},
  {id: 3, name: 'idkfa'},
];

  const getSensors = (): Promise<Category[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sensors);
      }, 1000);
    });
  };
  
  export default { getSensors };
  