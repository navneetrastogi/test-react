import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './immunization-record.reducer';
import { IImmunizationRecord } from 'app/shared/model/immunization-record.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImmunizationRecordDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ImmunizationRecordDetail extends React.Component<IImmunizationRecordDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { immunizationRecordEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.immunizationRecord.detail.title">ImmunizationRecord</Translate> [<b>
              {immunizationRecordEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createdOn">
                <Translate contentKey="testreactApp.immunizationRecord.createdOn">Created On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={immunizationRecordEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="vaccinationDoneOn">
                <Translate contentKey="testreactApp.immunizationRecord.vaccinationDoneOn">Vaccination Done On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={immunizationRecordEntity.vaccinationDoneOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="vaccinationName">
                <Translate contentKey="testreactApp.immunizationRecord.vaccinationName">Vaccination Name</Translate>
              </span>
            </dt>
            <dd>{immunizationRecordEntity.vaccinationName}</dd>
            <dt>
              <span id="isOnTime">
                <Translate contentKey="testreactApp.immunizationRecord.isOnTime">Is On Time</Translate>
              </span>
            </dt>
            <dd>{immunizationRecordEntity.isOnTime ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="testreactApp.immunizationRecord.studentProfile">Student Profile</Translate>
            </dt>
            <dd>{immunizationRecordEntity.studentProfile ? immunizationRecordEntity.studentProfile.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/immunization-record" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/immunization-record/${immunizationRecordEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ immunizationRecord }: IRootState) => ({
  immunizationRecordEntity: immunizationRecord.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImmunizationRecordDetail);
