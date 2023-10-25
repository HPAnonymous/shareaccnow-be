import _ from 'lodash'
export const getInfoData = ({ filter = [], object = {} }) => {
  return _.pick(object, filter)
}
