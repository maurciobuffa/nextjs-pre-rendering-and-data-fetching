import { promises } from 'fs';
import path from 'path';
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {
        products.map(product => (
          <li key={ product.id }>
            <Link href={`/${product.id}`}>
              { product.title }
            </Link>
          </li>
        ))
      }
    </ul>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await promises.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: '/no-data'
      }
    }
  }

  if (!data.products.length) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      products: data.products
    },
    revalidate: 10,
    // notFound: true,
  };
}

export default HomePage;
