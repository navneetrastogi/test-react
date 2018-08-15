import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './student.reducer';
import { IStudent } from 'app/shared/model/student.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStudentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class StudentDetail extends React.Component<IStudentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { studentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.student.detail.title">Student</Translate> [<b>{studentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="testreactApp.student.name">Name</Translate>
              </span>
            </dt>
            <dd>{studentEntity.name}</dd>
            <dt>
              <span id="createdOn">
                <Translate contentKey="testreactApp.student.createdOn">Created On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={studentEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModifiedOn">
                <Translate contentKey="testreactApp.student.lastModifiedOn">Last Modified On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={studentEntity.lastModifiedOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="testreactApp.student.center">Center</Translate>
            </dt>
            <dd>{studentEntity.center ? studentEntity.center.id : ''}</dd>
            <dt>
              <Translate contentKey="testreactApp.student.room">Room</Translate>
            </dt>
            <dd>{studentEntity.room ? studentEntity.room.id : ''}</dd>
            <dt>
              <Translate contentKey="testreactApp.student.id">Id</Translate>
            </dt>
            <dd>{studentEntity.id ? studentEntity.id.id : ''}</dd>
            <dt>
              <Translate contentKey="testreactApp.student.incident">Incident</Translate>
            </dt>
            <dd>{studentEntity.incident ? studentEntity.incident.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/student" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/student/${studentEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ student }: IRootState) => ({
  studentEntity: student.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDetail);
