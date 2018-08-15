import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './parent.reducer';
import { IParent } from 'app/shared/model/parent.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IParentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ParentDetail extends React.Component<IParentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { parentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.parent.detail.title">Parent</Translate> [<b>{parentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="testreactApp.parent.name">Name</Translate>
              </span>
            </dt>
            <dd>{parentEntity.name}</dd>
            <dt>
              <span id="createdOn">
                <Translate contentKey="testreactApp.parent.createdOn">Created On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={parentEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="phoneNumber">
                <Translate contentKey="testreactApp.parent.phoneNumber">Phone Number</Translate>
              </span>
            </dt>
            <dd>{parentEntity.phoneNumber}</dd>
            <dt>
              <span id="relation">
                <Translate contentKey="testreactApp.parent.relation">Relation</Translate>
              </span>
            </dt>
            <dd>{parentEntity.relation}</dd>
            <dt>
              <span id="studentName">
                <Translate contentKey="testreactApp.parent.studentName">Student Name</Translate>
              </span>
            </dt>
            <dd>{parentEntity.studentName}</dd>
            <dt>
              <span id="isAccountActive">
                <Translate contentKey="testreactApp.parent.isAccountActive">Is Account Active</Translate>
              </span>
            </dt>
            <dd>{parentEntity.isAccountActive ? 'true' : 'false'}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="testreactApp.parent.email">Email</Translate>
              </span>
            </dt>
            <dd>{parentEntity.email}</dd>
            <dt>
              <Translate contentKey="testreactApp.parent.studentProfile">Student Profile</Translate>
            </dt>
            <dd>{parentEntity.studentProfile ? parentEntity.studentProfile.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/parent" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/parent/${parentEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ parent }: IRootState) => ({
  parentEntity: parent.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParentDetail);