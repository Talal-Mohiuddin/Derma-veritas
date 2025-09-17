"use client"

import * as React from "react"
import { useState } from "react"

export function Accordion({ children, type = "single" }) {
  const [openItem, setOpenItem] = useState(null)

  return (
    <div className="w-full">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isOpen: openItem === index,
          onToggle: () =>
            setOpenItem(openItem === index ? null : index),
        })
      )}
    </div>
  )
}

export function AccordionItem({ children, isOpen }) {
  return (
    <div className="border-b">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen })
      )}
    </div>
  )
}

export function AccordionTrigger({ children, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center py-3 text-left font-medium hover:bg-gray-100"
    >
      {children}
    </button>
  )
}

export function AccordionContent({ children, isOpen }) {
  return isOpen ? (
    <div className="p-3 text-gray-600">{children}</div>
  ) : null
}
