import parseDuration from './parseDuration';

it('parses duration', function () {
  expect(parseDuration('00:00:00')).toEqual(0);
  expect(parseDuration('00:00:01')).toEqual(1000);
  expect(parseDuration('00:01:00')).toEqual(60000);
  expect(parseDuration('00:01:01')).toEqual(61000);
  expect(parseDuration('01:00:00')).toEqual(3600000);
  expect(parseDuration('01:01:01')).toEqual(3661000);
});

it('throws an error on invalid duration', function () {
  expect(() => {parseDuration('')}).toThrow();
  expect(() => {parseDuration('000000')}).toThrow();
  expect(() => {parseDuration('00:0000')}).toThrow();
  expect(() => {parseDuration('0000:00')}).toThrow();
  expect(() => {parseDuration('ab:cd:ef')}).toThrow();
});
