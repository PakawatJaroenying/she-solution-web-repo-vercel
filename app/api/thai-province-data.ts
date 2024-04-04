// "id":1,"name_th":"กรุงเทพมหานคร","name_en":"Bangkok"
interface GetProvincesResponse {
  id: number
  name_th: string
  name_en: string
}

const getProvinces = async () => {
  const data = await fetch(
    'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json',
  )
  const json = await data.json()
  return json satisfies GetProvincesResponse[]
}

// {"id":1001,"name_th":"เขตพระนคร","name_en":"Khet Phra Nakhon","province_id":1
interface GetDistrictsResponse {
  id: number
  name_th: string
  name_en: string
  province_id: number
}

const getDistricts = async () => {
  const data = await fetch(
    'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json',
  )
  const json = await data.json()
  return json satisfies GetDistrictsResponse[]
}

interface GetSubDistrictsResponse {
  id: number
  name_th: string
  name_en: string
  amphure_id: number
  zip_code: number
}

const getSubDistricts = async () => {
  const data = await fetch(
    'https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json',
  )
  const json= await data.json()
  return json satisfies GetSubDistrictsResponse[]
}

export type { GetProvincesResponse, GetDistrictsResponse, GetSubDistrictsResponse }

export { getProvinces, getDistricts, getSubDistricts }
