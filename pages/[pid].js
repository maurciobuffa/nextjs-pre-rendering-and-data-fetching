import { promises } from 'fs';
import path from 'path';

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>{ loadedProduct.title }</h1>
      <p>{ loadedProduct.description } </p>
    </>
  )
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await promises.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find(product => product.id === productId);

  if (!product) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      loadedProduct: product
    }
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const pathWithParams = data.products.map(product => ({
    params: {
      pid: product.id
    }
  }));

  return {
    paths: pathWithParams,
    fallback: true
  };
}

export default ProductDetailPage
