import React from 'react'

function TopicAnswer({
  label,
  otherClass,
}: {
  label: string
  otherClass?: string
}) {
  return (
    <div className={`${otherClass}`}>
      <span
        className={`text-smtext-gray-600 font-[700] self-start  text-forest py-2 border-b-4 border-teal`}
      >
        {label}
      </span>
    </div>
  )
}

export default TopicAnswer
