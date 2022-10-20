import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, MyModal } from 'src/components';
import { pollActions } from 'src/store/actions';

import * as S from '../styles';
import DoPoll from './do-poll';
import VeiwPoll from './view-poll';

const WorkerPoll = () => {
  const waiter = useSelector((state) => state.pollReducer.waiter);
  const polls = useSelector((state) =>
    state.pollReducer.polls.filter((poll) => poll.passed === false),
  );
  const [openDoPoll, setOpenDoPoll] = useState(false);
  const [selectPoll, setSelectPoll] = useState(0);
  const handleOpen = (id) => {
    setSelectPoll(id);
    setOpenDoPoll(true);
  };
  const handleClose = () => setOpenDoPoll(false);

  const [openViewPoll, setOpenViewPoll] = useState(false);
  const handleOpenViewPoll = (id) => {
    setSelectPoll(id);
    setOpenViewPoll(true);
  };
  const handleCloseViewPoll = () => setOpenViewPoll(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pollActions.getPollsWorker());
  }, []);

  return (
    <>
      <S.Title>Всі опитування</S.Title>
      {!waiter ? (
        <>
          {polls && polls.length ? (
            <S.PollList>
              <>
                {polls.map((item) => (
                  <S.PollRow key={item.id}>
                    <S.PollName>{item.title}</S.PollName>
                    <S.PollData>{item.date}</S.PollData>
                    <S.PollButton>
                      {!item.passed ? (
                        <Button variant="contained" onClick={() => handleOpen(item.id)}>
                          Пройти
                        </Button>
                      ) : (
                        <Button onClick={() => handleOpenViewPoll(item.id)}>Пройдено</Button>
                      )}
                    </S.PollButton>
                  </S.PollRow>
                ))}
              </>
            </S.PollList>
          ) : (
            <>Немає опитувань</>
          )}
        </>
      ) : (
        <Loader />
      )}

      <MyModal isOpen={openDoPoll} handleOpen={handleOpen} handleClose={handleClose} width={1000}>
        {openDoPoll && <DoPoll selectPoll={selectPoll} closeComponent={handleClose} />}
      </MyModal>

      <MyModal
        isOpen={openViewPoll}
        handleOpen={handleOpenViewPoll}
        handleClose={handleCloseViewPoll}
        width={1000}
      >
        {openViewPoll && <VeiwPoll selectPoll={selectPoll} />}
      </MyModal>
    </>
  );
};

export default WorkerPoll;
