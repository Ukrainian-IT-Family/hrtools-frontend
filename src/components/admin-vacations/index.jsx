import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'src/components';
import { vacationsActions } from 'src/store/actions';

import * as S from './styles';

const AdminVacations = ({ isMain }) => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.authReducer.user.role);
  const waiter = useSelector((state) => state.vacationsReducer.waiter);
  const vacations = useSelector((state) => state.vacationsReducer.vacations);
  const vacationsMeta = useSelector((state) => state.vacationsReducer.vacationsMeta);

  useEffect(() => {
    dispatch(vacationsActions.getVacationsAdmin(1));
  }, []);

  const handleChangePage = (page) => {
    if (role === 1) {
      dispatch(vacationsActions.getVacationsAdmin(page));
    } else if (role === 3) {
      dispatch(vacationsActions.getVacationsAdmin(page));
    }
  };

  function getStatusTitle(statusId) {
    switch (statusId) {
      case 1:
        return 'Нове';
      case 2:
        return 'Активне';
      case 3:
        return 'Завершене';
      default:
        return 'Нове';
    }
  }

  return (
    <>
      <S.Title>Усі запити</S.Title>

      {!waiter ? (
        <>
          {vacations && vacations.length ? (
            <S.HrList>
              {vacations.map((item) => (
                <S.HrRow key={item.id}>
                  <S.HrName>{item.title}</S.HrName>
                  <S.HrWrap>
                    <S.HrCol>
                      <S.HrColInfo>
                        {item.date && <S.HrColInfoItem>Створенно: {item.date}</S.HrColInfoItem>}
                        {!item.anonymous ? (
                          <S.HrColInfoItem>Автор: {item.author.fullName}</S.HrColInfoItem>
                        ) : (
                          <S.HrColInfoItem>Анонімне</S.HrColInfoItem>
                        )}
                      </S.HrColInfo>
                    </S.HrCol>
                    <S.HrCol>
                      <S.HrStatus>{getStatusTitle(item.status)}</S.HrStatus>
                    </S.HrCol>
                    <S.HrCol>
                      <S.HrStatusCount>
                        {item.resultCount}/{item.workersCount}
                      </S.HrStatusCount>
                    </S.HrCol>
                  </S.HrWrap>
                </S.HrRow>
              ))}
              {vacationsMeta.total > 0 && !isMain && (
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
            <>Немає опитувань</>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
AdminVacations.propTypes = {
  isMain: PropTypes.bool.isRequired,
};
export default AdminVacations;
