import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './video.reducer';
import { IVideo } from 'app/shared/model/video.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVideoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class VideoDetail extends React.Component<IVideoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { videoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.video.detail.title">Video</Translate> [<b>{videoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="uploadedDate">
                <Translate contentKey="testreactApp.video.uploadedDate">Uploaded Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={videoEntity.uploadedDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="url">
                <Translate contentKey="testreactApp.video.url">Url</Translate>
              </span>
            </dt>
            <dd>{videoEntity.url}</dd>
            <dt>
              <Translate contentKey="testreactApp.video.event">Event</Translate>
            </dt>
            <dd>{videoEntity.event ? videoEntity.event.id : ''}</dd>
            <dt>
              <Translate contentKey="testreactApp.video.activity">Activity</Translate>
            </dt>
            <dd>{videoEntity.activity ? videoEntity.activity.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/video" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/video/${videoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ video }: IRootState) => ({
  videoEntity: video.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoDetail);
