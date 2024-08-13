import { MainLayout } from '../../Components/Layouts/MainLayouts';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { Service } from '../../Models/Services/Services';
import { FC } from 'react';
import ScenariosListView from '../../Views/Scenarios/ScenariosListView';
import { ScenariosProvider } from '../../Providers/Services/ScenariosProvider';
import ServiceView from '../../Views/Services/ServiceView';
import { BaseToolbarView } from '../../Components/Toolbar/BaseToolbarView';

type ScenariosPageProps = {
  service: Service;
};

const ScenariosPage: FC<ScenariosPageProps> = ({ service }) => {
  return (
    <MainLayout>
      <BaseToolbarView title={`Scenarios for ${service.name}`} />
      <ServiceView />
      <ScenariosProvider>
        <ScenariosListView />
      </ScenariosProvider>
    </MainLayout>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service
});
export default connect(getState)(ScenariosPage);
