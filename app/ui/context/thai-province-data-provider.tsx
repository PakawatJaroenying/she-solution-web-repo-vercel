'use client'
import {
  GetDistrictsResponse,
  GetProvincesResponse,
  GetSubDistrictsResponse,
} from '@/app/api/thai-province-data'
import React, { useState } from 'react'

const ThaiProvinceDataProviderContext = React.createContext<{
  provinces: GetProvincesResponse[]
  districts: GetDistrictsResponse[]
  subDistricts: GetSubDistrictsResponse[]
} | null>(null)

interface ThaiProvinceDataProviderProps {
  children: React.ReactNode
  provinces: GetProvincesResponse[]
  districts: GetDistrictsResponse[]
  subDistricts: GetSubDistrictsResponse[]
}

function ThaiProvinceDataProvider({
  children,
  provinces,
  districts,
  subDistricts,
}: Readonly<ThaiProvinceDataProviderProps>) {
  return (
    <ThaiProvinceDataProviderContext.Provider
      value={{
        provinces,
        districts,
        subDistricts,
      }}
    >
      {children}
    </ThaiProvinceDataProviderContext.Provider>
  )
}

export function useThaiProvinceDataProvider() {
  return React.useContext(ThaiProvinceDataProviderContext)!
}

export default ThaiProvinceDataProvider
