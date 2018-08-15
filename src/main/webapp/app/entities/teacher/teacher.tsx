import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './teacher.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeacherProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Teacher extends React.Component<ITeacherProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { teacherList, match } = this.props;
    return (
      <div>
        <h2 id="teacher-heading">
          <Translate contentKey="testreactApp.teacher.home.title">Teachers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="testreactApp.teacher.home.createLabel">Create new Teacher</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.teacher.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.teacher.contactNumber">Contact Number</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.teacher.gender">Gender</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.teacher.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.teacher.createdOn">Created On</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.teacher.joiningDate">Joining Date</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.teacher.center">Center</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {teacherList.map((teacher, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${teacher.id}`} color="link" size="sm">
                      {teacher.id}
                    </Button>
                  </td>
                  <td>{teacher.name}</td>
                  <td>{teacher.contactNumber}</td>
                  <td>
                    <Translate contentKey={`testreactApp.Gender.${teacher.gender}`} />
                  </td>
                  <td>{teacher.address}</td>
                  <td>
                    <TextFormat type="date" value={teacher.createdOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={teacher.joiningDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{teacher.center ? <Link to={`center/${teacher.center.id}`}>{teacher.center.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${teacher.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${teacher.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${teacher.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ teacher }: IRootState) => ({
  teacherList: teacher.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teacher);
