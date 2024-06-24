<script>
export default { }

export async function fetchData(API_URL) {
  const url = `${API_URL}/get`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Http error with status: ${response.status}`)
    }
    const data = await response.json()
    return data.data
  } catch (err) {
    console.log(err)
  }
}



</script>