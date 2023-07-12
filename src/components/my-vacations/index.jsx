import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { FixLoader, Loader, MyModal } from 'src/components';
import { vacationsActions } from 'src/store/actions';

import DeleteVac from './delete-vac';
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
  const waiter = useSelector((state) => state.vacationsReducer.myVacationWaiter);
  const fixWaiter = useSelector((state) => state.vacationsReducer.fixWaiter);
  const myVacations = useSelector((state) => state.vacationsReducer.myVacations);
  const myVacationsMeta = useSelector((state) => state.vacationsReducer.myVacationsMeta);

  useEffect(() => {
    dispatch(vacationsActions.myVacation(1));
  }, []);

  const handleChangePage = (page) => {
    dispatch(vacationsActions.myVacation(page));
  };

  const [deleteId, setDeleteId] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  return (
    <>
      {fixWaiter && <FixLoader />}

      <S.Title>Мої запити</S.Title>
      {!waiter ? (
        <>
          {myVacations && myVacations.length ? (
            <S.HrList>
              {myVacations.map((item) => (
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
                    <S.VacItem>
                      <S.VacLabel>Операції</S.VacLabel>
                      <Button
                        color="error"
                        onClick={() => {
                          setDeleteId(item.id);
                          handleOpenDelete();
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </S.VacItem>
                  </S.VacTop>
                  {item.comment && <S.VacComment>{item.comment}</S.VacComment>}
                </S.Vac>
              ))}
              {myVacationsMeta.total > 0 && myVacationsMeta.last_page > 1 && (
                <S.Paginate>
                  <ReactPaginate
                    breakLabel="..."
                    onPageChange={(nextPage) => handleChangePage(nextPage.selected + 1)}
                    pageCount={myVacationsMeta.last_page}
                    forcePage={myVacationsMeta.current_page - 1}
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

      <MyModal
        isOpen={openDelete}
        handleOpen={handleOpenDelete}
        handleClose={handleCloseDelete}
        width={500}
      >
        {openDelete && (
          <DeleteVac
            deleteId={deleteId}
            handleClose={handleCloseDelete}
            handleOpen={handleOpenDelete}
          />
        )}
      </MyModal>
    </>
  );
};

export default MyVacations;
