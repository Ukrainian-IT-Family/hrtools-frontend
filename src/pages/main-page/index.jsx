import { useSelector } from 'react-redux';
import { AdminVacations, Header, HrAdminPoll, Sidebar, WorkerPolls } from 'src/components';
import * as GS from 'src/global-styles';

import * as S from './styles';

const mainPage = () => {
  const role = useSelector((state) => state.authReducer.user.role);

  return (
    <GS.MainWrap>
      <Header pageName="Головна" />
      <GS.Wrap>
        <GS.Main>
          <GS.MainLeft>
            <Sidebar />
          </GS.MainLeft>
          <GS.MainRight>
            <S.MainRightBlock>
              {role === 2 ? <WorkerPolls isMain /> : <HrAdminPoll isMain />}
            </S.MainRightBlock>
            {role === 1 && (
              <S.MainRightBlock>
                <AdminVacations isMain />
              </S.MainRightBlock>
            )}
          </GS.MainRight>
        </GS.Main>
      </GS.Wrap>
    </GS.MainWrap>
  );
};

export default mainPage;
