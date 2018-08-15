import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './attendance.reducer';
import { IAttendance } from 'app/shared/model/attendance.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAttendanceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Attendance extends React.Component<IAttendanceProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { attendanceList, match } = this.props;
    return (
      <div>
        <h2 id="attendance-heading">
          <Translate contentKey="testreactApp.attendance.home.title">Attendances</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="testreactApp.attendance.home.createLabel">Create new Attendance</Translate>
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
                  <Translate contentKey="testreactApp.attendance.attendanceEvent">Attendance Event</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.attendance.datetime">Datetime</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.attendance.createdOn">Created On</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.attendance.studentProfile">Student Profile</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((attendance, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${attendance.id}`} color="link" size="sm">
                      {attendance.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`testreactApp.AttendanceEvent.${attendance.attendanceEvent}`} />
                  </td>
                  <td>
                    <TextFormat type="date" value={attendance.datetime} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={attendance.createdOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {attendance.studentProfile ? (
                      <Link to={`student-profile/${attendance.studentProfile.id}`}>{attendance.studentProfile.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${attendance.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${attendance.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${attendance.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ attendance }: IRootState) => ({
  attendanceList: attendance.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Attendance);
