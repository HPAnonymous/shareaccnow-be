import jwt from 'jsonwebtoken'

export class AccessSerive {
  async createTokenPair(payload: any, publicKey: any, privateKey: any) {
    try {
      const accessToken = jwt.sign(payload, publicKey, {
        expiresIn: '2 days'
      })

      const refreshToken = jwt.sign(payload, privateKey, {
        expiresIn: '7 days'
      })

      jwt.verify(accessToken, publicKey, (error, decode) => {
        if (error)
          console.log(
            '🚀 ~ file: access.service.ts:21 ~ AccessSerive ~ jwt.verify ~ error:',
            error
          )

        console.log('decode:::', decode)
      })

      return { accessToken, refreshToken }
    } catch (error) {
      console.log(
        '🚀 ~ file: access.service.ts:27 ~ AccessSerive ~ error:',
        error
      )
    }
  }
}
