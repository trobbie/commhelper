import { Activity } from '../../_models/activity.model';

/** return fresh array of test activities */
export function getTestActivities(): Activity[] {
  return [
    {id: 41, name: 'TestActivity41' },
    {id: 42, name: 'TestActivity42' },
    {id: 43, name: 'TestActivity43' },
    {id: 44, name: 'TestActivity44' },
    {id: 45, name: 'TestActivity45' },
    {id: 46, name: 'TestActivity46' }
  ];
}
