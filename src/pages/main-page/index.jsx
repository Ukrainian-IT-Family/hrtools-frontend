import { useSelector } from 'react-redux';
import { Header, Sidebar } from 'src/components';
import * as GS from 'src/global-styles';

import News from './news';
import PollWorker from './pollWokrer';
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
              <News />
            </S.MainRightBlock>
            <S.MainRightBlock>{role === 2 ? <PollWorker /> : ''}</S.MainRightBlock>
          </GS.MainRight>
        </GS.Main>
      </GS.Wrap>
    </GS.MainWrap>
  );
};

export default mainPage;
