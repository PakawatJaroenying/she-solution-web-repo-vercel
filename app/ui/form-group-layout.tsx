import React, { ReactNode } from 'react'

function FormGroupLayout({
  Header,
  children,
}: {
  Header: ReactNode
  children: ReactNode
}) {
  return (
    <>
      <div className="my-[8px]">
        <div className="mb-4">{Header}</div>
      </div>
      {children}
    </>
  )
}

export default FormGroupLayout
