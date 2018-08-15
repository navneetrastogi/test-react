import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './illness-record.reducer';
import { IIllnessRecord } from 'app/shared/model/illness-record.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIllnessRecordProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class IllnessRecord extends React.Component<IIllnessRecordProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { illnessRecordList, match } = this.props;
    return (
      <div>
        <h2 id="illness-record-heading">
          <Translate contentKey="testreactApp.illnessRecord.home.title">Illness Records</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="testreactApp.illnessRecord.home.createLabel">Create new Illness Record</Translate>
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
                  <Translate contentKey="testreactApp.illnessRecord.createdOn">Created On</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.illnessRecord.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.illnessRecord.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.illnessRecord.isCured">Is Cured</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.illnessRecord.studentProfile">Student Profile</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {illnessRecordList.map((illnessRecord, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${illnessRecord.id}`} color="link" size="sm">
                      {illnessRecord.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={illnessRecord.createdOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{illnessRecord.name}</td>
                  <td>{illnessRecord.description}</td>
                  <td>{illnessRecord.isCured ? 'true' : 'false'}</td>
                  <td>
                    {illnessRecord.studentProfile ? (
                      <Link to={`student-profile/${illnessRecord.studentProfile.id}`}>{illnessRecord.studentProfile.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${illnessRecord.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${illnessRecord.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${illnessRecord.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ illnessRecord }: IRootState) => ({
  illnessRecordList: illnessRecord.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IllnessRecord);
