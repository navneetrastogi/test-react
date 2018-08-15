import { Moment } from 'moment';
import { IImmunizationRecord } from 'app/shared/model//immunization-record.model';
import { IIllnessRecord } from 'app/shared/model//illness-record.model';
import { IPayment } from 'app/shared/model//payment.model';
import { IKudosRecord } from 'app/shared/model//kudos-record.model';
import { IMilestoneRecord } from 'app/shared/model//milestone-record.model';
import { IAttendance } from 'app/shared/model//attendance.model';
import { IIncident } from 'app/shared/model//incident.model';
import { ITimeline } from 'app/shared/model//timeline.model';
import { IParent } from 'app/shared/model//parent.model';
import { IGallery } from 'app/shared/model//gallery.model';

export const enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export interface IStudentProfile {
  id?: number;
  dream?: string;
  birthDate?: Moment;
  bloodGroup?: string;
  gender?: Gender;
  immunizationRecords?: IImmunizationRecord[];
  illnessRecords?: IIllnessRecord[];
  payments?: IPayment[];
  kudosRecords?: IKudosRecord[];
  milestoneRecords?: IMilestoneRecord[];
  attendances?: IAttendance[];
  incidents?: IIncident[];
  timelines?: ITimeline[];
  parents?: IParent[];
  galleryItems?: IGallery[];
}

export const defaultValue: Readonly<IStudentProfile> = {};
