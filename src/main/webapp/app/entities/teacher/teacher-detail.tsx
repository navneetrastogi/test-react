import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './teacher.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeacherDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TeacherDetail extends React.Component<ITeacherDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { teacherEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.teacher.detail.title">Teacher</Translate> [<b>{teacherEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="testreactApp.teacher.name">Name</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.name}</dd>
            <dt>
              <span id="contactNumber">
                <Translate contentKey="testreactApp.teacher.contactNumber">Contact Number</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.contactNumber}</dd>
            <dt>
              <span id="gender">
                <Translate contentKey="testreactApp.teacher.gender">Gender</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.gender}</dd>
            <dt>
              <span id="address">
                <Translate contentKey="testreactApp.teacher.address">Address</Translate>
              </span>
            </dt>
            <dd>{teacherEntity.address}</dd>
            <dt>
              <span id="createdOn">
                <Translate contentKey="testreactApp.teacher.createdOn">Created On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={teacherEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="joiningDate">
                <Translate contentKey="testreactApp.teacher.joiningDate">Joining Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={teacherEntity.joiningDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="testreactApp.teacher.center">Center</Translate>
            </dt>
            <dd>{teacherEntity.center ? teacherEntity.center.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/teacher" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/teacher/${teacherEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ teacher }: IRootState) => ({
  teacherEntity: teacher.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDetail);
