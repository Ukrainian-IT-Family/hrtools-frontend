import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, MyModal } from 'src/components';
import { pollActions } from 'src/store/actions';

import CreatePoll from './create-poll';
import DetailPoll from './detail-poll/detail-poll';
import * as S from './styles';

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

const HrAdminPoll = ({ isMain }) => {
  const waiter = useSelector((state) => state.pollReducer.waiter);
  const polls = useSelector((state) => state.pollReducer.polls);
  const pollsMeta = useSelector((state) => state.pollReducer.pollsMeta);
  const dispatch = useDispatch();
  const role = useSelector((state) => state.authReducer.user.role);
  const [openCreatePoll, setOpenCreatePoll] = useState(false);
  const handleOpen = () => setOpenCreatePoll(true);
  const handleClose = () => setOpenCreatePoll(false);

  const [selectPollId, setSelectPollId] = useState(0);
  const [openDetailPoll, setOpenDetailPoll] = useState(false);
  const handleOpenDetail = () => setOpenDetailPoll(true);
  const handleCloseDetail = () => setOpenDetailPoll(false);

  useEffect(() => {
    if (role === 1) {
      dispatch(pollActions.getPollsAdmin());
    } else if (role === 3) {
      dispatch(pollActions.getPollsHr());
    }

    dispatch(pollActions.getPollsType());
  }, []);

  const handleChangePage = (page) => {
    if (role === 1) {
      dispatch(pollActions.getPollsAdmin(page));
    } else if (role === 3) {
      dispatch(pollActions.getPollsHr(page));
    }
  };

  return (
    <>
      <S.Title>
        Всі опитування
        <Button startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Cтворити опитування
        </Button>
      </S.Title>

      {!waiter ? (
        <>
          {polls && polls.length ? (
            <S.HrList>
              {polls.map((item) => (
                <S.HrRow key={item.id}>
                  <S.HrName
                    onClick={() => {
                      setSelectPollId(item.id);
                      handleOpenDetail();
                    }}
                  >
                    {item.title}
                  </S.HrName>
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
              {pollsMeta.total > 0 && !isMain && (
                <S.Paginate>
                  <ReactPaginate
                    breakLabel="..."
                    onPageChange={(nextPage) => handleChangePage(nextPage.selected + 1)}
                    pageCount={pollsMeta.last_page}
                    forcePage={pollsMeta.current_page - 1}
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

      <MyModal
        isOpen={openCreatePoll}
        handleOpen={handleOpen}
        handleClose={handleClose}
        width={1000}
      >
        {openCreatePoll && <CreatePoll handleClose={handleClose} handleOpen={handleOpen} />}
      </MyModal>

      <MyModal
        isOpen={openDetailPoll}
        handleOpen={handleOpenDetail}
        handleClose={handleCloseDetail}
        width={1000}
      >
        {openDetailPoll && (
          <DetailPoll role={role} selectPollId={selectPollId} handleClose={handleCloseDetail} />
        )}
      </MyModal>
    </>
  );
};
HrAdminPoll.propTypes = {
  isMain: PropTypes.bool.isRequired,
};
export default HrAdminPoll;
