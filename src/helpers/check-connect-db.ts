import mongoose from 'mongoose'
import os from 'os'

const _SECOND = 1000
export const countConnect = () => {
  console.log('number connect to db: ', mongoose.connections.length)
}

export const checkOverload = () => {
  setInterval(() => {
    const numberConnect = mongoose.connections.length
    const numberCores = os.cpus().length
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024

    const maxConnect = numberCores * 3

    console.log('Active connections: ', numberConnect)
    console.log('Memory usage: ', memoryUsage.toFixed(2), 'MB')

    if (numberConnect > maxConnect) {
      console.log('Overload')
      process.exit(1)
    }
  }, _SECOND)
}
