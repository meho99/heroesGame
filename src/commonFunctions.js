export const idGenerator = () => Math.floor(new Date().valueOf() * Math.random())

export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min