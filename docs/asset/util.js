const parse_json = text => {
  try {
    return JSON.parse(text)
  }
  catch (error) {
    return error
  }
}

const fetch_json = async uri => {
  let result = await fetch(uri).catch(error => error)
  if (result instanceof Error)
    return result
  let body = await result.text()
  if (body instanceof Error)
    return body
  return parse_json(body)
}
