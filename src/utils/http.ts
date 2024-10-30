import { getErrorOnly } from './errors'

export async function bitvmGet(url: string) {
  try {
    const response = await fetch(url)
    if (response.status !== 200) {
      return { bitvmResponse: undefined, httpError: await response.text() }
    } else {
      return { bitvmResponse: await response.json(), httpError: undefined }
    }
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
    if (response.status !== 200) {
      return { bitvmResponse: undefined, httpError: await response.text() }
    } else {
      return { bitvmResponse: await response.json(), httpError: undefined }
    }
  } catch (err) {
    const error = getErrorOnly(err).message
    return { bitvmResponse: undefined, httpError: error }
  }
}
