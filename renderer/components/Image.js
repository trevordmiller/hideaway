import React from 'react'

const Image = ({ src }) =>
  <img
    src={src}
    style={{
      maxWidth: '100%',
      maxHeight: 'inherit',
    }}
  />

export default Image
