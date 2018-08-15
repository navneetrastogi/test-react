import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './milestone-record.reducer';
import { IMilestoneRecord } from 'app/shared/model/milestone-record.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMilestoneRecordProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class MilestoneRecord extends React.Component<IMilestoneRecordProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { milestoneRecordList, match } = this.props;
    return (
      <div>
        <h2 id="milestone-record-heading">
          <Translate contentKey="testreactApp.milestoneRecord.home.title">Milestone Records</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="testreactApp.milestoneRecord.home.createLabel">Create new Milestone Record</Translate>
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
                  <Translate contentKey="testreactApp.milestoneRecord.createdOn">Created On</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.milestoneRecord.notes">Notes</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.milestoneRecord.studentProfile">Student Profile</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.milestoneRecord.milestone">Milestone</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {milestoneRecordList.map((milestoneRecord, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${milestoneRecord.id}`} color="link" size="sm">
                      {milestoneRecord.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={milestoneRecord.createdOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{milestoneRecord.notes}</td>
                  <td>
                    {milestoneRecord.studentProfile ? (
                      <Link to={`student-profile/${milestoneRecord.studentProfile.id}`}>{milestoneRecord.studentProfile.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {milestoneRecord.milestone ? (
                      <Link to={`milestone/${milestoneRecord.milestone.id}`}>{milestoneRecord.milestone.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${milestoneRecord.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${milestoneRecord.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${milestoneRecord.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ milestoneRecord }: IRootState) => ({
  milestoneRecordList: milestoneRecord.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MilestoneRecord);
