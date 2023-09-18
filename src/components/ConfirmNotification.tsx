import { PropsWithoutRef } from 'react';

const ConfirmNotification = ({
  onClose,
}: PropsWithoutRef<{ onClose: (answer: boolean) => void }>) => (
  <div className="notification">
    <div className="notification__overlay"></div>
    <div className="notification__content confirm">
      <h1>
        Вы уверены, что хотите удалить все товары из корзины?
        <span className="notification__close" onClick={() => onClose(false)}>
          ×
        </span>
      </h1>
      <div className="notification__body">
        <div className="notification__product">
          <div className="notification__total-info">
            <div className="notification__subtotal confirm">
              Это действие нельзя будет отменить, и все выбранные товары будут безвозвратно удалены.
            </div>
          </div>
        </div>
        <div className="notification__buttons">
          <div className="notification__btn-left">
            <a className="button-second button" onClick={() => onClose(false)}>
              <bdi>Отменить</bdi>
            </a>
          </div>
          <div className="notification__btn-right">
            <a className="button-second button" onClick={() => onClose(true)}>
              <bdi>Очистить корзину</bdi>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export { ConfirmNotification };
