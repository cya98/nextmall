import Link from 'next/link'
import React from 'react'

export default function ProductItem({ product }) {
  //서버에서 부를때 여기에 이상품을 해주세요 객체정보를 줄거다 그래서 중괄호하고 product
  return (
    <div className="card">
      <Link href={`product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          ></img>
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5 ">
        <Link href={`product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button className="primary-button" type="button">
          카트에 넣기{' '}
        </button>
      </div>
    </div>
  )
}
