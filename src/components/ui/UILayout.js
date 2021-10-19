import { Layout, Menu } from 'antd';

import {
  BookOutlined,
  SolutionOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import React from 'react';
import {
  Switch,
  Redirect,
  Route,
  Link,
  BrowserRouter as Router,
  NavLink,
} from 'react-router-dom';
import { ExamenScreen } from '../examen/ExamenScreen';
import { AlumnosScreen } from '../alumno/AlumnosScreen';
import { CursosScreen } from '../curso/CursosScreen';

const { Sider, Content } = Layout;

export const UILayout = () => {
  return (
    <Router>
      <Layout style={{ height: '100vh' }}>
        <Sider collapsedWidth='0' breakpoint='md'>
          <div className='logo' />
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1' icon={<TeamOutlined />}>
              <NavLink activeClassName='active' exact to='/alumnos'>
                Alumnos
              </NavLink>
            </Menu.Item>
            <Menu.Item key='2' icon={<SolutionOutlined />}>
              <Link to='/cursos'>Cursos</Link>
            </Menu.Item>
            <Menu.Item key='3' icon={<BookOutlined />}>
              <Link to='/examenes'>Examenes</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className='site-layout'>
          <Content
            className='site-layout-background'
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}>
            <Switch>
              <Route exact path='/examenes' component={ExamenScreen} />
              <Route exact path='/alumnos' component={AlumnosScreen} />
              <Route exact path='/cursos' component={CursosScreen} />

              <Redirect to='/examenes' />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
