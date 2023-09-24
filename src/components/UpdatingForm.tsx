import { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from './Button';
import { Context } from '../store/Context';
import 'react-toastify/dist/ReactToastify.css';
import { UpdatingPersonalDataForm } from './UpdatingPersonalData';
import { UpdatingAddressesForm } from './UpdatingAddresses';
import { UpdatingUserSettingsForm } from './UpdatingUserSettings';

const UpdatingForm = observer(() => {
  const { user } = useContext(Context);

  if (!user || user.user === null || user.user.user === null) {
    return null;
  }
  const [showedPage, setShowedPage] = useState('userInfo');
  const changePage = (namePage: string) => {
    if (showedPage !== namePage) {
      setShowedPage(namePage);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="button-wrapper">
        <Button className="button" type="button" onClick={() => changePage('userInfo')}>
          Персональные данные
        </Button>
        <Button className="button" type="button" onClick={() => changePage('address')}>
          Адреса
        </Button>
        <Button className="button" type="button" onClick={() => changePage('personalData')}>
          Настройки профиля
        </Button>
      </div>
      {showedPage === 'userInfo' && <UpdatingPersonalDataForm />}
      {showedPage === 'address' && <UpdatingAddressesForm />}
      {showedPage === 'personalData' && <UpdatingUserSettingsForm />}
    </div>
  );
});

export { UpdatingForm };
