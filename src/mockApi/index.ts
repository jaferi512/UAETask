export interface Category {
  id: number;
  name: string;
}

const sensors: Category[] = [
  {id: 0, name: 'All'},
  {id: 1, name: 'Category 1'},
  {id: 2, name: 'Category 2'},
  {id: 3, name: 'Category 3'},
  {id: 4, name: 'Category 4'},
];

  const getSensors = (): Promise<Category[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sensors);
      }, 1000);
    });
  };
  
  export default { getSensors };
  