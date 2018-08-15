import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './milestone.reducer';
import { IMilestone } from 'app/shared/model/milestone.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMilestoneDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class MilestoneDetail extends React.Component<IMilestoneDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { milestoneEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.milestone.detail.title">Milestone</Translate> [<b>{milestoneEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="testreactApp.milestone.title">Title</Translate>
              </span>
            </dt>
            <dd>{milestoneEntity.title}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="testreactApp.milestone.description">Description</Translate>
              </span>
            </dt>
            <dd>{milestoneEntity.description}</dd>
            <dt>
              <span id="imageUrl">
                <Translate contentKey="testreactApp.milestone.imageUrl">Image Url</Translate>
              </span>
            </dt>
            <dd>{milestoneEntity.imageUrl}</dd>
            <dt>
              <span id="createdOn">
                <Translate contentKey="testreactApp.milestone.createdOn">Created On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={milestoneEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModifiedOn">
                <Translate contentKey="testreactApp.milestone.lastModifiedOn">Last Modified On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={milestoneEntity.lastModifiedOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/milestone" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/milestone/${milestoneEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ milestone }: IRootState) => ({
  milestoneEntity: milestone.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MilestoneDetail);
