import { useSelector } from 'react-redux';
import { AdminVacations, Header, Sidebar } from 'src/components';
import * as GS from 'src/global-styles';

const Vacations = () => {
  const role = useSelector((state) => state.authReducer.user.role);

  return (
    <GS.MainWrap>
      <Header pageName="Відпустка/Лікарняний" />
      <GS.Wrap>
        <GS.Main>
          <GS.MainLeft>
            <Sidebar />
          </GS.MainLeft>
          <GS.MainRight>{role !== 2 && <AdminVacations isMain={false} />}</GS.MainRight>
        </GS.Main>
      </GS.Wrap>
    </GS.MainWrap>
  );
};

export default Vacations;
