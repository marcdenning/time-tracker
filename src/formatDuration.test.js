import formatDuration from './formatDuration';

it('formats duration', function () {
  expect(formatDuration(100)).toEqual('00:00:00');
  expect(formatDuration(999)).toEqual('00:00:00');
  expect(formatDuration(1000)).toEqual('00:00:01');
  expect(formatDuration(1900)).toEqual('00:00:01');
  expect(formatDuration(1 * 60 * 1000)).toEqual('00:01:00');
  expect(formatDuration(1 * 60 * 60 * 1000)).toEqual('01:00:00');
});
