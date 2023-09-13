import { Top } from '../main/Top';
import { Header } from '../main/Header';
import { Footer } from '../main/Footer';
import {
  getAnonymousToken,
  createCart,
  getMyCarts,
  addProductToCart,
  removeProductFromCart,
} from '../../services/commercetoolsApi';

interface LineItem {
  id: string;
  productId: string;
}

const OUR_PRODUCTS_IDS = [
  '220a50c3-c9f7-46e7-a9d4-3105e97a3c3e',
  '56ee28f3-bbcf-40b1-b9b0-ae16c37a8593',
  '98174ddd-ba7c-4e11-8896-3c16d6b55d8c',
  '1c269a9d-00f2-4d66-9865-a1eb1fadc0ba',
];

let PRODUCT_ID_TO_CART_ID: Record<string, string> = {};

let accessToken = '';
let cartId = '';
let cartVersion = 0;
let actualCart: { lineItems: LineItem[] } | null = null;

function transformToProductIdMap(originalObject: {
  lineItems: LineItem[];
}): Record<string, string> {
  const resultObject: Record<string, string> = {};

  originalObject.lineItems.forEach((item) => {
    resultObject[item.productId] = item.id;
  });

  return resultObject;
}

function updateCardVariables(cart: { lineItems: LineItem[]; version: number }) {
  cartVersion = cart.version; // обновили версию
  actualCart = cart;
  if (actualCart) {
    PRODUCT_ID_TO_CART_ID = transformToProductIdMap(actualCart); // это объект с соответсвием продуктId => Id товара в карточке
  }
}

async function getNewToken() {
  if (accessToken) {
    // eslint-disable-next-line
    console.log('Токен уже получили. Теперь кликакть по кнопке бесполезно!');
    return;
  }
  const token = await getAnonymousToken();
  // eslint-disable-next-line
  console.log('Получили с сервера такой объект:', token);
  accessToken = token.access_token;
  // eslint-disable-next-line
  const match = token.scope.match(/anonymous_id:([0-9a-f\-]+)/);
  const anonymousId = match ? match[1] : null;
  // eslint-disable-next-line
  console.log(`Id анонима: ${anonymousId}`);
}

async function makeNewCart() {
  if (!accessToken) {
    // eslint-disable-next-line
    console.log('Сначала нужно получить анонимный токен и только с ним мы сможем делать корзину!');
    return;
  }

  // получаем корзины для данного анонимуса
  const results = await getMyCarts(accessToken);
  if (results.count) {
    // eslint-disable-next-line
    console.log('Корзина уже есть! Вот она: ', results.results[0]);
    // eslint-disable-next-line
    console.log('Ещё одну создавать не будем, хватит этой!');
    return;
  }

  // если корзины нет, то создаём её
  const cart = await createCart(accessToken);
  // eslint-disable-next-line
  console.log('С сервера пришла корзина: ', cart);
  cartId = cart.id;
  cartVersion = cart.version;
  actualCart = cart;
}

async function getYourCart() {
  if (!accessToken) {
    // eslint-disable-next-line
    console.log(
      'Сначала нужно получить анонимный токен и только с ним мы сможем получать свои корзины!'
    );
    return;
  }
  const results = await getMyCarts(accessToken);
  // eslint-disable-next-line
  console.log(results);
}

async function addNewProduct(id: number) {
  if (!cartId || !cartVersion) {
    // eslint-disable-next-line
    console.log('Корзина ещё не создана!');
    return;
  }

  try {
    const result = await addProductToCart(accessToken, OUR_PRODUCTS_IDS[id], cartId, cartVersion);
    updateCardVariables(result);
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
}

async function removeProduct(id: number) {
  if (!cartId || !cartVersion) {
    // eslint-disable-next-line
    console.log('Корзина ещё не создана!');
    return;
  }

  if (!PRODUCT_ID_TO_CART_ID[OUR_PRODUCTS_IDS[id]]) {
    // eslint-disable-next-line
    console.log('Этого продукта нет в корзине');
    return;
  }

  try {
    const result = await removeProductFromCart(
      accessToken,
      PRODUCT_ID_TO_CART_ID[OUR_PRODUCTS_IDS[id]],
      cartId,
      cartVersion
      /* , последний параметр - количество. если не указан, то удалятся все экземпляры этого продукта, если цифра, например 1, то будет удалять столько единиц */
    );
    updateCardVariables(result);
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
}

const Saved = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <h1>Отложенные товары</h1>

        <button className="button button-second" onClick={getNewToken}>
          Получить анонимный токен
        </button>

        <button className="button button-second" onClick={makeNewCart}>
          Создать корзину
        </button>
        <button className="button button-second" onClick={getYourCart}>
          Получить корзины
        </button>

        <hr />
        <button className="button button-second" onClick={() => addNewProduct(0)}>
          Добавить продукт 0
        </button>

        <button className="button button-second" onClick={() => addNewProduct(1)}>
          Добавить продукт 1
        </button>

        <button className="button button-second" onClick={() => addNewProduct(2)}>
          Добавить продукт 2
        </button>

        <button className="button button-second" onClick={() => addNewProduct(3)}>
          Добавить продукт 3
        </button>

        <hr />

        <button className="button button-second" onClick={() => removeProduct(0)}>
          Удалить продукт 0
        </button>

        <button className="button button-second" onClick={() => removeProduct(1)}>
          Удалить продукт 1
        </button>

        <button className="button button-second" onClick={() => removeProduct(2)}>
          Удалить продукт 2
        </button>

        <button className="button button-second" onClick={() => removeProduct(3)}>
          Удалить продукт 3
        </button>
      </main>
      <Footer />
    </div>
  );
};

export { Saved };
