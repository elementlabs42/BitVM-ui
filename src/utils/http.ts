import { getErrorOnly } from './errors'

export async function bitvmGet(url: string) {
  try {
    const response = await fetch(url)
    return handleResponse(response)
  } catch (err) {
    const error = getErrorOnly(err).message
    return { bitvmResponse: undefined, httpError: error }
  }
}

export async function bitvmPost(url: string, data: object) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return handleResponse(response)
  } catch (err) {
    const error = getErrorOnly(err).message
    return { bitvmResponse: undefined, httpError: error }
  }
}

async function handleResponse(response: Response) {
  if (response.status !== 200) {
    const httpError = await response.text()
    try {
      const bitvmResponse = JSON.parse(httpError)
      return { bitvmResponse, httpError: undefined }
    } catch {
      return { bitvmResponse: undefined, httpError }
    }
  } else {
    return { bitvmResponse: await response.json(), httpError: undefined }
  }
}
