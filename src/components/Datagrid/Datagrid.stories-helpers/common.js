import React from 'react';
// import namor from 'namor';

import { faker } from '@faker-js/faker';

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i ++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    someone1: faker.name.findName(),
    someone2: faker.name.findName(),
    someone3: faker.name.findName(),
    someone4: faker.name.findName(),
    someone5: faker.name.findName(),
    someone6: faker.name.findName(),
    someone7: faker.name.findName(),
    someone8: faker.name.findName(),
    someone9: faker.name.findName(),
    someone10: faker.name.findName(),
    someone11: faker.name.findName(),
    someone12: faker.name.findName(),
    someone13: faker.name.findName(),
    someone14: faker.name.findName(),
    someone15: faker.name.findName(),
    someone16: faker.name.findName(),
    someone17: faker.name.findName(),
    someone18: faker.name.findName(),
    someone19: faker.name.findName(),
    someone20: faker.name.findName(),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
          ? 'complicated'
          : 'single',
  };
};

// eslint-disable-next-line react/prop-types
export const Wrapper = ({ children }) => (
  <div
    style={{
      height: '490px',
      width: '100%',
      padding: '16px',
      margin: '0',
      zIndex: '0',
    }}
  >
    {children}
  </div>
);

export const makeData = (...lens) => {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(() => ({
      ...newPerson(),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
    }));
  };

  return makeDataLevel();
};

export const defaultHeader = [
  {
    Header: 'Row Index',
    accessor: (row, i) => i,
    sticky: 'left',
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
    sticky: 'left',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Age',
    accessor: 'age',
    width: 50,
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    width: 60,
  },
  {
    Header: 'Someone 1',
    accessor: 'someone1',
  },
  {
    Header: 'Someone 2',
    accessor: 'someone2',
  },
  {
    Header: 'Someone 3',
    accessor: 'someone3',
  },
  {
    Header: 'Someone 4',
    accessor: 'someone4',
  },
  {
    Header: 'Someone 5',
    accessor: 'someone5',
  },
  {
    Header: 'Someone 6',
    accessor: 'someone6',
  },
  {
    Header: 'Someone 7',
    accessor: 'someone7',
  },
  {
    Header: 'Someone 8',
    accessor: 'someone8',
  },
  {
    Header: 'Someone 9',
    accessor: 'someone9',
  },
  {
    Header: 'Someone 10',
    accessor: 'someone10',
  },
];
