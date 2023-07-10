import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { avatarDefault } from 'src/assets/images';
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

  function getPosition(userRole) {
    switch (userRole) {
      case 1:
        return 'Адмін';
      case 2:
        return 'Працівник';
      case 3:
        return 'Hr manager';
      default:
        return 'Адмін';
    }
  }

  return (
    <>
      <S.Title>Запити працівників</S.Title>

      {!waiter ? (
        <>
          {vacations && vacations.length ? (
            <S.HrList>
              {vacations.map((item) => (
                <S.Vac id={item.id}>
                  <S.VacTop>
                    <S.VacItem>
                      <S.VacLabel>Працівник</S.VacLabel>
                      <S.VacWorker>
                        <S.VacWorkerAvatar src={item.user.avatar || avatarDefault} />
                        <S.VacWorkerName>
                          {item.user.fullName}
                          <div>{getPosition(item.user.role)}</div>
                        </S.VacWorkerName>
                      </S.VacWorker>
                    </S.VacItem>
                    <S.VacItem>
                      <S.VacLabel>Дата/тип</S.VacLabel>
                      <S.VacType>{item.type}</S.VacType>
                      <S.VacData>
                        {item.dateStart} - {item.dateEnd}
                      </S.VacData>
                    </S.VacItem>
                    <S.VacItem>
                      <S.VacLabel>Кількість днів</S.VacLabel>

                      <S.VacData>{item.daysCount}</S.VacData>
                    </S.VacItem>
                  </S.VacTop>
                </S.Vac>
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
