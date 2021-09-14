import cryptoRandomString from 'crypto-random-string'

const GenerateHash = (length: number) : string => {
  return cryptoRandomString({ length, type: 'base64' })
}

export default GenerateHash;
