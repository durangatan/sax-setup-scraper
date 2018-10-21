import util from 'util';
export default function logger(logged) {
  console.log(util.inspect(logged, true, null));
}
