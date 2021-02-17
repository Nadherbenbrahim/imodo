import React from 'react'
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Home from './dachboard/Home';
import SideMenu from './components/SideMenu';
import Entitys from './dachboard/Entitys';
import AddEntitys from './dachboard/AddEntitys';
import Agent from './dachboard/Agent';
import WizardsHome from './dachboard/WizardsHome';
import WizardsPosts from './dachboard/WizardsPosts';
import Project from './dachboard/Project';
import TestAgent from './dachboard/TestAgent';
import AgentDetail from './dachboard/AgentDetail';
import Check from './dachboard/Check';
import AddCategory from './dachboard/AddCategory';

function Dachboard() {
    let match = useRouteMatch();
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', background: '#F9F9F9' }}>
            <SideMenu />
            <div style={{ flex: 4.4 }}>
                <Switch>
                    <Route path={`${match.path}/`} component={Home} exact />
                    <Route path={`${match.path}/entities`} component={Entitys} exact />
                    <Route path={`${match.path}/entities/add/`} component={AddCategory} exact />
                    <Route path={`${match.path}/entities/add/:id`} component={AddEntitys} exact />
                    <Route path={`${match.path}/agent`} component={Agent} exact />
                    <Route path={`${match.path}/agent/:id`} component={AgentDetail} />
                    <Route path={`${match.path}/wizard/pages/:mode`} component={WizardsHome} exact />
                    <Route path={`${match.path}/wizard/`} component={Check} exact />
                    <Route path={`${match.path}/wizard/:mode/:id`} component={WizardsPosts} exact />
                    <Route path={`${match.path}/wizard/:mode/:id/project/:idpost`} component={Project} exact />
                    <Route path={`${match.path}/wizard/:mode/:id/project/:idpost/test`} component={TestAgent} />
                </Switch>
            </div>
        </div>
    )
}

export default Dachboard
