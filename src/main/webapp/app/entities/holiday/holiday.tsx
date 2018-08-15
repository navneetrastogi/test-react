import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './holiday.reducer';
import { IHoliday } from 'app/shared/model/holiday.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHolidayProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Holiday extends React.Component<IHolidayProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { holidayList, match } = this.props;
    return (
      <div>
        <h2 id="holiday-heading">
          <Translate contentKey="testreactApp.holiday.home.title">Holidays</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="testreactApp.holiday.home.createLabel">Create new Holiday</Translate>
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
                  <Translate contentKey="testreactApp.holiday.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.holiday.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.holiday.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.holiday.center">Center</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {holidayList.map((holiday, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${holiday.id}`} color="link" size="sm">
                      {holiday.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={holiday.date} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{holiday.title}</td>
                  <td>{holiday.description}</td>
                  <td>{holiday.center ? <Link to={`center/${holiday.center.id}`}>{holiday.center.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${holiday.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${holiday.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${holiday.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ holiday }: IRootState) => ({
  holidayList: holiday.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Holiday);