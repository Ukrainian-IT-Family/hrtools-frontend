import { Button } from '@mui/material';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { FixLoader, Loader } from 'src/components';
import { vacationsActions } from 'src/store/actions';

import * as S from './styles';

function getStatus(status) {
  switch (status) {
    case 0:
      return 'Відхиленно';
    case 1:
      return 'Схваленно';
    default:
      return 'На розгляді';
  }
}

function getType(type) {
  switch (type) {
    case 0:
      return 'Відпустка';
    case 1:
      return 'Лікарнянний';
    default:
      return 'Відпустка';
  }
}
const MyVacations = () => {
  const dispatch = useDispatch();
  const waiter = useSelector((state) => state.vacationsReducer.waiter);
  const fixWaiter = useSelector((state) => state.vacationsReducer.fixWaiter);
  const vacations = useSelector((state) => state.vacationsReducer.vacations);
  const vacationsMeta = useSelector((state) => state.vacationsReducer.vacationsMeta);

  useEffect(() => {
    dispatch(vacationsActions.getVacationsHr(1));
  }, []);

  const handleChangePage = (page) => {
    dispatch(vacationsActions.getVacationsHr(page));
  };

  const handleAccept = (id) => {
    dispatch(vacationsActions.acceptVacationHr(id));
  };

  const handleCancel = (id) => {
    dispatch(vacationsActions.cancelVacationHr(id));
  };

  return (
    <>
      {fixWaiter && <FixLoader />}

      <S.Title>Мої запити</S.Title>
      {!waiter ? (
        <>
          {vacations && vacations.length ? (
            <S.HrList>
              {vacations.map((item) => (
                <S.Vac key={item.id}>
                  <S.VacTop>
                    <S.VacItem>
                      <S.VacLabel>Дата/тип</S.VacLabel>
                      <S.VacType>{getType(item.type)}</S.VacType>
                      <S.VacData>
                        {item.dateStart} - {item.dateEnd}
                      </S.VacData>
                    </S.VacItem>
                    <S.VacItem>
                      <S.VacLabel>Кількість днів</S.VacLabel>
                      <S.VacData>{item.daysCount}</S.VacData>
                    </S.VacItem>
                    <S.VacItem>
                      <S.VacLabel>Дата запиту</S.VacLabel>
                      <S.VacData>{getStatus(item.status)}</S.VacData>
                    </S.VacItem>
                  </S.VacTop>
                  {item.comment && <S.VacComment>{item.comment}</S.VacComment>}
                  {item.status === null && (
                    <S.VacBtns>
                      <Button variant="contained" onClick={() => handleAccept(item.id)}>
                        Затвердити
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleCancel(item.id)}
                      >
                        Відхилити
                      </Button>
                    </S.VacBtns>
                  )}
                </S.Vac>
              ))}
              {vacationsMeta.total > 0 && (
                <S.Paginate>
                  <ReactPaginate
                    breakLabel="..."
                    onPageChange={(nextPage) => handleChangePage(nextPage.selected + 1)}
                    pageCount={vacationsMeta.last_page}
                    forcePage={vacationsMeta.current_page - 1}
                    activeClassName="active"
                    pageRangeDisplayed="2"
                    marginPagesDisplayed="1"
                  />
                </S.Paginate>
              )}
            </S.HrList>
          ) : (
            <>Немає запитів</>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MyVacations;
