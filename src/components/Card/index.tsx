import styles from './styles.module.scss'

type Product = {
  id: string;
  description: string;
  price: string;
  img: string;
}

type CardProps = {
  product: Product;

}

export const Card = ({ product }: CardProps) => {
  return (
    <div id={styles.card_container}>
      <img src={product.img}></img>
      <div>
        <p>{product.description}</p>
        <span>{product.price}</span>

      </div>

    </div>
  )
}