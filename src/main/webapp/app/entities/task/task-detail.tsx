import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITaskDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TaskDetail extends React.Component<ITaskDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { taskEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.task.detail.title">Task</Translate> [<b>{taskEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="testreactApp.task.title">Title</Translate>
              </span>
            </dt>
            <dd>{taskEntity.title}</dd>
            <dt>
              <span id="notes">
                <Translate contentKey="testreactApp.task.notes">Notes</Translate>
              </span>
            </dt>
            <dd>{taskEntity.notes}</dd>
            <dt>
              <span id="startDate">
                <Translate contentKey="testreactApp.task.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={taskEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">
                <Translate contentKey="testreactApp.task.endDate">End Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={taskEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="reminderType">
                <Translate contentKey="testreactApp.task.reminderType">Reminder Type</Translate>
              </span>
            </dt>
            <dd>{taskEntity.reminderType}</dd>
            <dt>
              <Translate contentKey="testreactApp.task.room">Room</Translate>
            </dt>
            <dd>{taskEntity.room ? taskEntity.room.id : ''}</dd>
            <dt>
              <Translate contentKey="testreactApp.task.parent">Parent</Translate>
            </dt>
            <dd>{taskEntity.parent ? taskEntity.parent.id : ''}</dd>
            <dt>
              <Translate contentKey="testreactApp.task.taskType">Task Type</Translate>
            </dt>
            <dd>{taskEntity.taskType ? taskEntity.taskType.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/task" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/task/${taskEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ task }: IRootState) => ({
  taskEntity: task.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail);
