import { QR_CODE_API_URL } from '../constants'

export const GenerateQRCode = (data: string) => {
  return QR_CODE_API_URL + data
}
