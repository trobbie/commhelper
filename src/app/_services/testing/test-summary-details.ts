import { TestDetails } from 'src/app/_models/test-details.model';

/** return fresh array of test details */
export function getTestDetails(): TestDetails[] {
  return [
    {id: 41, name: 'TestActivity41', dateCreated: new Date('2019-09-01T01:00:00') },
    {id: 42, name: 'TestActivity42', dateCreated: new Date('2019-09-01T02:00:00') },
    {id: 43, name: 'TestActivity43', dateCreated: new Date('2019-09-01T03:00:00') },
    {id: 44, name: 'TestActivity44', dateCreated: new Date('2019-09-01T04:00:00') },
    {id: 45, name: 'TestActivity45', dateCreated: new Date('2019-09-01T05:00:00') },
    {id: 46, name: 'TestActivity46', dateCreated: new Date('2019-09-01T06:00:00') }
  ];
}
