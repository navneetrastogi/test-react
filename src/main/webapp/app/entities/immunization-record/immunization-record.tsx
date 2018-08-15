import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './immunization-record.reducer';
import { IImmunizationRecord } from 'app/shared/model/immunization-record.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImmunizationRecordProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ImmunizationRecord extends React.Component<IImmunizationRecordProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { immunizationRecordList, match } = this.props;
    return (
      <div>
        <h2 id="immunization-record-heading">
          <Translate contentKey="testreactApp.immunizationRecord.home.title">Immunization Records</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="testreactApp.immunizationRecord.home.createLabel">Create new Immunization Record</Translate>
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
                  <Translate contentKey="testreactApp.immunizationRecord.createdOn">Created On</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.immunizationRecord.vaccinationDoneOn">Vaccination Done On</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.immunizationRecord.vaccinationName">Vaccination Name</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.immunizationRecord.isOnTime">Is On Time</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.immunizationRecord.studentProfile">Student Profile</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {immunizationRecordList.map((immunizationRecord, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${immunizationRecord.id}`} color="link" size="sm">
                      {immunizationRecord.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={immunizationRecord.createdOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={immunizationRecord.vaccinationDoneOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{immunizationRecord.vaccinationName}</td>
                  <td>{immunizationRecord.isOnTime ? 'true' : 'false'}</td>
                  <td>
                    {immunizationRecord.studentProfile ? (
                      <Link to={`student-profile/${immunizationRecord.studentProfile.id}`}>{immunizationRecord.studentProfile.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${immunizationRecord.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${immunizationRecord.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${immunizationRecord.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ immunizationRecord }: IRootState) => ({
  immunizationRecordList: immunizationRecord.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImmunizationRecord);
