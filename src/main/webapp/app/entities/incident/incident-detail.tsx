import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './incident.reducer';
import { IIncident } from 'app/shared/model/incident.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIncidentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class IncidentDetail extends React.Component<IIncidentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { incidentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.incident.detail.title">Incident</Translate> [<b>{incidentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="natureOfIncident">
                <Translate contentKey="testreactApp.incident.natureOfIncident">Nature Of Incident</Translate>
              </span>
            </dt>
            <dd>{incidentEntity.natureOfIncident}</dd>
            <dt>
              <span id="firstAidProvided">
                <Translate contentKey="testreactApp.incident.firstAidProvided">First Aid Provided</Translate>
              </span>
            </dt>
            <dd>{incidentEntity.firstAidProvided ? 'true' : 'false'}</dd>
            <dt>
              <span id="firstAidNotes">
                <Translate contentKey="testreactApp.incident.firstAidNotes">First Aid Notes</Translate>
              </span>
            </dt>
            <dd>{incidentEntity.firstAidNotes}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="testreactApp.incident.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={incidentEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdOn">
                <Translate contentKey="testreactApp.incident.createdOn">Created On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={incidentEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="isAdminOnly">
                <Translate contentKey="testreactApp.incident.isAdminOnly">Is Admin Only</Translate>
              </span>
            </dt>
            <dd>{incidentEntity.isAdminOnly ? 'true' : 'false'}</dd>
            <dt>
              <span id="notes">
                <Translate contentKey="testreactApp.incident.notes">Notes</Translate>
              </span>
            </dt>
            <dd>{incidentEntity.notes}</dd>
            <dt>
              <Translate contentKey="testreactApp.incident.studentProfile">Student Profile</Translate>
            </dt>
            <dd>{incidentEntity.studentProfile ? incidentEntity.studentProfile.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/incident" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/incident/${incidentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ incident }: IRootState) => ({
  incidentEntity: incident.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncidentDetail);
