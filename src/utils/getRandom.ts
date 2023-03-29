// https://github.com/baires/shouldideploy/blob/master/helpers/constans.ts

const getRandom = function ranDay(list: string | string[]) {
  return list[Math.floor(Math.random() * list.length)]
}

export default getRandom
