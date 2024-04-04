export default function createFormData(object: Record<string, any>) {
  const formData = new FormData()

  Object.entries(object).forEach(([key, value]) => {
    formData.append(key, value)
  })

  return formData
}
