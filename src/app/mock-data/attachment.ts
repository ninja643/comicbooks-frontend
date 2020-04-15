import { Attachment, AttachmentType } from '../model/attachment';

// tslint:disable-next-line:max-line-length
export const logo = 'https://scontent.fbeg5-1.fna.fbcdn.net/v/t1.0-9/p960x960/54518077_2327064720646046_5115715385689112576_o.jpg?_nc_cat=101&_nc_sid=85a577&_nc_oc=AQlGs7GBdrLCJKNUOtJeV15tt7cQOX2vOJML2q8ItoWdhXIV1tXguYQ5LQL8LqvqMdk&_nc_ht=scontent.fbeg5-1.fna&_nc_tp=6&oh=ea9d29cd39d45995d8c85690347f444d&oe=5EA09BED';
export const frontPageImageMock: Attachment = {
	id: 'fsdfds',
	type: AttachmentType.Image,
	name: 'dsds',
	url: logo
};
