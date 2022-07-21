/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// import namor from 'namor';

import { faker } from '@faker-js/faker';

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

export const range = (len) => {
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

export const newPersonWithTwoLines = () => {
  return {
    firstName: (
      <>
        <div>{faker.name.findName()}</div>
        <div>{faker.name.findName()}</div>
      </>
    ),
    lastName: faker.name.lastName(),
    age: Math.floor(Math.random() * 30),
  };
};
