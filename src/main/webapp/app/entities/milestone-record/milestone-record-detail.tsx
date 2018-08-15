import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './milestone-record.reducer';
import { IMilestoneRecord } from 'app/shared/model/milestone-record.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMilestoneRecordDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class MilestoneRecordDetail extends React.Component<IMilestoneRecordDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { milestoneRecordEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.milestoneRecord.detail.title">MilestoneRecord</Translate> [<b>{milestoneRecordEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createdOn">
                <Translate contentKey="testreactApp.milestoneRecord.createdOn">Created On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={milestoneRecordEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="notes">
                <Translate contentKey="testreactApp.milestoneRecord.notes">Notes</Translate>
              </span>
            </dt>
            <dd>{milestoneRecordEntity.notes}</dd>
            <dt>
              <Translate contentKey="testreactApp.milestoneRecord.studentProfile">Student Profile</Translate>
            </dt>
            <dd>{milestoneRecordEntity.studentProfile ? milestoneRecordEntity.studentProfile.id : ''}</dd>
            <dt>
              <Translate contentKey="testreactApp.milestoneRecord.milestone">Milestone</Translate>
            </dt>
            <dd>{milestoneRecordEntity.milestone ? milestoneRecordEntity.milestone.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/milestone-record" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/milestone-record/${milestoneRecordEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ milestoneRecord }: IRootState) => ({
  milestoneRecordEntity: milestoneRecord.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MilestoneRecordDetail);
