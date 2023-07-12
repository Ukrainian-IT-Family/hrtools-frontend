import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, MyModal } from 'src/components';
import { vacationsActions } from 'src/store/actions';

import CreateVac from './create-vac';
import * as S from './styles';

const MyVacationsInfo = () => {
  const dispatch = useDispatch();
  const myVacationInfo = useSelector((state) => state.vacationsReducer.myVacationInfo);
  const waiter = useSelector((state) => state.vacationsReducer.myVacationInfoWaiter);
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  useEffect(() => {
    dispatch(vacationsActions.myVacationInfo());
  }, []);

  return (
    <>
      <S.Title>
        Відпустка/лікарняний
        <Button startIcon={<AddIcon />} onClick={() => handleOpenCreate()}>
          Cтворити запит
        </Button>
      </S.Title>
      {waiter ? (
        <Loader />
      ) : (
        <S.Vac>
          {myVacationInfo && (
            <>
              <S.VacItem>
                <S.VacItemLabel>Відпустка</S.VacItemLabel>
                <S.VacItemText>
                  <span>Доступно: {myVacationInfo.availableVacationsDays}</span>{' '}
                  <span>Використано: {myVacationInfo.vacationDaysUsed}</span>
                </S.VacItemText>
              </S.VacItem>
              <S.VacItem>
                <S.VacItemLabel>Лірканяний</S.VacItemLabel>
                <S.VacItemText>
                  <span>Використано: {myVacationInfo.hospitalDaysUsed}</span>
                </S.VacItemText>
              </S.VacItem>
            </>
          )}
        </S.Vac>
      )}
      <MyModal isOpen={openCreate} handleClose={handleCloseCreate} width={600}>
        {openCreate && <CreateVac handleClose={handleCloseCreate} />}
      </MyModal>
    </>
  );
};

export default MyVacationsInfo;
