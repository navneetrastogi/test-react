import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './timeline.reducer';
import { ITimeline } from 'app/shared/model/timeline.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITimelineDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TimelineDetail extends React.Component<ITimelineDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { timelineEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.timeline.detail.title">Timeline</Translate> [<b>{timelineEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="date">
                <Translate contentKey="testreactApp.timeline.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={timelineEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="isVisible">
                <Translate contentKey="testreactApp.timeline.isVisible">Is Visible</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={timelineEntity.isVisible} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="testreactApp.timeline.schedule">Schedule</Translate>
            </dt>
            <dd>{timelineEntity.schedule ? timelineEntity.schedule.id : ''}</dd>
            <dt>
              <Translate contentKey="testreactApp.timeline.studentProfile">Student Profile</Translate>
            </dt>
            <dd>{timelineEntity.studentProfile ? timelineEntity.studentProfile.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/timeline" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/timeline/${timelineEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ timeline }: IRootState) => ({
  timelineEntity: timeline.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineDetail);
